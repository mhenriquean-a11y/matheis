import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, chmodSync } from 'node:fs';
import { dirname } from 'node:path';
import { AsyncLocalStorage } from 'node:async_hooks';
import pg from 'pg';
import { databaseTls } from './database-tls.js';
const schema=`
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,username TEXT NOT NULL UNIQUE,display_name TEXT NOT NULL,password_salt TEXT NOT NULL,password_hash BYTEA NOT NULL,created_at BIGINT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,expires_at BIGINT NOT NULL);
CREATE TABLE IF NOT EXISTS progress(user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,body TEXT NOT NULL,revision INTEGER NOT NULL,updated_at BIGINT NOT NULL);
CREATE TABLE IF NOT EXISTS invitations(code_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE);`;

export function createSqliteDatabase(path){
  if(!path)throw new Error('databasePath é obrigatório.');
  if(path!==':memory:')mkdirSync(dirname(path),{recursive:true,mode:0o700});
  const db=new DatabaseSync(path);
  if(path!==':memory:')chmodSync(path,0o600);
  db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;'+schema.replaceAll('BYTEA','BLOB'));
  let queue=Promise.resolve();
  return {
    ready:Promise.resolve(),prepare:sql=>db.prepare(sql),exec:sql=>db.exec(sql),
    get isTransaction(){return db.isTransaction;},
    // Async password hashing and queries must not interleave SQLite transactions.
    withRequest(task){const next=queue.then(task);queue=next.catch(()=>{});return next;},
    async close(){await queue;db.close();}
  };
}
export function postgresParameters(sql){let index=0;return sql.replaceAll('?',()=>`$${++index}`);}
export function createPostgresDatabase(databaseUrl){
  const url=new URL(databaseUrl);
  if(!['postgres:','postgresql:'].includes(url.protocol))throw new Error('DATABASE_URL deve ser uma conexão PostgreSQL.');
  if(url.password.includes('[YOUR-PASSWORD]')||decodeURIComponent(url.password).includes('[YOUR-PASSWORD]'))throw new Error('[YOUR-PASSWORD]');
  // Always verify the server certificate, even if the copied URL includes sslmode=require.
  for(const key of ['ssl','sslmode','sslcert','sslkey','sslrootcert'])url.searchParams.delete(key);
  const pool=new pg.Pool({connectionString:url.toString(),ssl:databaseTls(url.hostname),max:4,connectionTimeoutMillis:15000,idleTimeoutMillis:30000});
  pool.on('error',()=>console.error('A conexão com o banco foi interrompida. Uma nova conexão será tentada.'));
  const context=new AsyncLocalStorage();
  const ready=pool.query('CREATE SCHEMA IF NOT EXISTS pratica_privada; SET search_path TO pratica_privada; SET statement_timeout TO 15000;'+schema+`
    REVOKE ALL ON SCHEMA pratica_privada FROM PUBLIC;
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
    ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
    ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;`).then(()=>{});
  // Attach a handler immediately: startup code still awaits ready and reports a safe message.
  ready.catch(()=>{});
  const current=()=>{const store=context.getStore();if(!store)throw new Error('Consulta fora de uma requisição.');return store;};
  const query=(sql,args=[])=>current().client.query(postgresParameters(sql),args.map(value=>value instanceof Uint8Array?Buffer.from(value):value));
  return {
    ready,
    prepare(sql){return {get:async(...args)=>(await query(sql,args)).rows[0],run:async(...args)=>query(sql,args)};},
    async exec(sql){
      const store=current();
      if(sql==='BEGIN IMMEDIATE'){
        await query('BEGIN');store.transaction=true;
        // Serialize mutations across server processes, including invitation redemption and revision checks.
        await query('SELECT pg_advisory_xact_lock(94720021)');
      }else{await query(sql);if(sql==='COMMIT'||sql==='ROLLBACK')store.transaction=false;}
    },
    get isTransaction(){return current().transaction;},
    async withRequest(task){
      await ready;const client=await pool.connect();
      return context.run({client,transaction:false},async()=>{
        let broken=false;
        try{await client.query('SET search_path TO pratica_privada; SET statement_timeout TO 15000');return await task();}
        finally{if(current().transaction)try{await client.query('ROLLBACK');}catch{broken=true;}client.release(broken);}
      });
    },
    close:()=>pool.end()
  };
}
