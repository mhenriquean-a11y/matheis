import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, randomUUID, scrypt, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { mkdirSync, chmodSync, existsSync, createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { dirname, resolve, extname, sep } from 'node:path';
import { normalizeProgress } from './progress.js';
const derive=promisify(scrypt);
const digest=value=>createHash('sha256').update(value).digest('hex');
const DAY=86400000, MAX_BODY=6*1024*1024;
const dummySalt='00'.repeat(16),dummyHash=scryptSync('not-a-real-password',dummySalt,64);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon'};
class RequestError extends Error {constructor(status,message){super(message);this.status=status;}}
export function createApplication({databasePath,staticRoot=resolve('dist'),secureCookies=false,publicOrigin,trustProxy=false,loginLimit=10}={}) {
  if(!databasePath)throw new Error('databasePath é obrigatório.');
  if(databasePath!==':memory:')mkdirSync(dirname(databasePath),{recursive:true,mode:0o700});
  const db=new DatabaseSync(databasePath);
  if(databasePath!==':memory:')chmodSync(databasePath,0o600);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,username TEXT NOT NULL UNIQUE,display_name TEXT NOT NULL,password_salt TEXT NOT NULL,password_hash BLOB NOT NULL,created_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS progress(user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,body TEXT NOT NULL,revision INTEGER NOT NULL,updated_at INTEGER NOT NULL);`);
  const cookieName=secureCookies?'__Host-pratica_session':'pratica_session';
  const rates=new Map();
  function rate(key,max,window=15*60000){
    const now=Date.now(),entry=rates.get(key);
    if(!entry||entry.until<now){rates.set(key,{count:1,until:now+window});if(rates.size>10000)for(const [k,v]of rates)if(v.until<now)rates.delete(k);return;}
    if(++entry.count>max)throw new RequestError(429,'Muitas tentativas. Aguarde alguns minutos e tente novamente.');
  }
  function cookie(token,maxAge=7*86400){return `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secureCookies?'; Secure':''}`;}
  function tokenFrom(req){return (req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1);}
  function session(req){const token=tokenFrom(req);if(!token||!/^[a-f0-9]{64}$/.test(token))return null;return db.prepare('SELECT users.id,username,display_name,expires_at FROM sessions JOIN users ON users.id=sessions.user_id WHERE token_hash=? AND expires_at>?').get(digest(token),Date.now())||null;}
  function userView(user){return user?{id:user.id,username:user.username,displayName:user.display_name}:null;}
  function signIn(req,res,id){
    const previous=tokenFrom(req);if(previous)db.prepare('DELETE FROM sessions WHERE token_hash=?').run(digest(previous));
    db.prepare('DELETE FROM sessions WHERE expires_at<=?').run(Date.now());
    const token=randomBytes(32).toString('hex');
    db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(digest(token),id,Date.now()+7*DAY);
    res.setHeader('Set-Cookie',cookie(token));
  }
  async function body(req){
    if(!(req.headers['content-type']||'').startsWith('application/json'))throw new RequestError(415,'Envie dados no formato JSON.');
    let size=0;const chunks=[];
    for await(const chunk of req){size+=chunk.length;if(size>MAX_BODY)throw new RequestError(413,'Os dados ultrapassam o limite de 6 MB.');chunks.push(chunk);}
    try{const result=JSON.parse(Buffer.concat(chunks).toString('utf8'));if(!result||typeof result!=='object'||Array.isArray(result))throw 0;return result;}catch{throw new RequestError(400,'Dados JSON inválidos.');}
  }
  function json(res,status,value){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));}
  async function handle(req,res){
    res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');res.setHeader('X-Frame-Options','DENY');
    res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:; connect-src 'self'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
    try{
      const url=new URL(req.url,'http://localhost');
      if(url.pathname==='/healthz')return json(res,200,{ok:true});
      if(url.pathname.startsWith('/api/')){
        res.setHeader('Cache-Control','no-store');
        if(!['GET','HEAD'].includes(req.method)){
          const origin=req.headers.origin;
          let allowed=!origin;
          try{allowed=allowed||(publicOrigin?new URL(origin).origin===new URL(publicOrigin).origin:new URL(origin).host===req.headers.host);}catch{}
          if(!allowed)throw new RequestError(403,'Origem não autorizada.');
        }
        const ip=trustProxy?String(req.headers['x-forwarded-for']||req.socket.remoteAddress).split(',')[0].trim():req.socket.remoteAddress;
        if(req.method==='GET'&&url.pathname==='/api/auth/me')return json(res,200,{user:userView(session(req))});
        if(req.method==='POST'&&['/api/auth/register','/api/auth/login'].includes(url.pathname)){
          const data=await body(req);const username=typeof data.username==='string'?data.username.trim().toLowerCase():'';
          const password=typeof data.password==='string'?data.password:'';
          const registering=url.pathname.endsWith('/register');
          rate(`auth:${ip}`,120);
          rate(`${registering?'register':'login'}:${ip}:${registering?'':username}`,registering?30:loginLimit);
          if(!/^[a-z0-9_]{3,30}$/.test(username)||password.length<8||Buffer.byteLength(password)>512)throw new RequestError(400,'Use um usuário de 3 a 30 letras, números ou _ e uma senha de 8 a 128 caracteres.');
          if(password.length>128)throw new RequestError(400,'A senha deve ter no máximo 128 caracteres.');
          if(registering){
            const name=typeof data.displayName==='string'?data.displayName.trim():'';
            if(!name||name.length>60)throw new RequestError(400,'Informe seu nome, com até 60 caracteres.');
            if(db.prepare('SELECT id FROM users WHERE username=?').get(username))throw new RequestError(409,'Esse nome de usuário já está em uso.');
            const salt=randomBytes(16).toString('hex'),hash=await derive(password,salt,64),id=randomUUID();
            try{db.prepare('INSERT INTO users VALUES(?,?,?,?,?,?)').run(id,username,name,salt,hash,Date.now());}catch(error){if((error.code?.includes('CONSTRAINT')||error.errcode===2067))throw new RequestError(409,'Esse nome de usuário já está em uso.');throw error;}
            signIn(req,res,id);return json(res,201,{user:userView(db.prepare('SELECT * FROM users WHERE id=?').get(id))});
          }
          const user=db.prepare('SELECT * FROM users WHERE username=?').get(username);
          const candidate=await derive(password,user?.password_salt||dummySalt,64);
          if(!timingSafeEqual(candidate,user?Buffer.from(user.password_hash):dummyHash)||!user)throw new RequestError(401,'Usuário ou senha incorretos.');
          rates.delete(`login:${ip}:${username}`);
          signIn(req,res,user.id);return json(res,200,{user:userView(user)});
        }
        if(req.method==='POST'&&url.pathname==='/api/auth/logout'){
          await body(req);const token=tokenFrom(req);if(token)db.prepare('DELETE FROM sessions WHERE token_hash=?').run(digest(token));res.setHeader('Set-Cookie',cookie('',0));return json(res,200,{ok:true});
        }
        const user=session(req);
        if(!user)throw new RequestError(401,'Entre na sua conta para continuar.');
        if(req.method==='POST'&&url.pathname==='/api/auth/password'){
          const data=await body(req);rate(`password:${user.id}`,10);
          if(typeof data.currentPassword!=='string'||typeof data.newPassword!=='string'||data.newPassword.length<8||data.newPassword.length>128||Buffer.byteLength(data.currentPassword)>512||Buffer.byteLength(data.newPassword)>512)throw new RequestError(400,'Informe a senha atual e uma nova senha de 8 a 128 caracteres.');
          const stored=db.prepare('SELECT * FROM users WHERE id=?').get(user.id),hash=await derive(data.currentPassword,stored.password_salt,64);
          if(!timingSafeEqual(hash,Buffer.from(stored.password_hash)))throw new RequestError(401,'Senha atual incorreta.');
          const salt=randomBytes(16).toString('hex'),next=await derive(data.newPassword,salt,64);
          db.exec('BEGIN IMMEDIATE');try{db.prepare('UPDATE users SET password_salt=?,password_hash=? WHERE id=?').run(salt,next,user.id);db.prepare('DELETE FROM sessions WHERE user_id=?').run(user.id);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
          signIn(req,res,user.id);return json(res,200,{ok:true});
        }
        if(url.pathname==='/api/progress'&&req.method==='GET'){
          const progress=db.prepare('SELECT body,revision FROM progress WHERE user_id=?').get(user.id);
          return json(res,200,{progress:progress?JSON.parse(progress.body):null,revision:progress?.revision||0});
        }
        if(url.pathname==='/api/progress'&&req.method==='PUT'){
          const data=await body(req);
          if(!Number.isSafeInteger(data.revision)||data.revision<0)throw new RequestError(400,'Revisão inválida.');
          let progress;try{progress=normalizeProgress(data.progress);}catch(error){throw new RequestError(400,error.message);}
          const encoded=JSON.stringify(progress);if(Buffer.byteLength(encoded)>5*1024*1024)throw new RequestError(413,'Seu progresso ultrapassa 5 MB. Exporte um backup.');
          db.exec('BEGIN IMMEDIATE');
          try{
            const previous=db.prepare('SELECT body,revision FROM progress WHERE user_id=?').get(user.id);
            if((previous?.revision||0)!==data.revision){db.exec('ROLLBACK');return json(res,409,{error:'Outro dispositivo atualizou o progresso.',progress:previous?JSON.parse(previous.body):null,revision:previous?.revision||0});}
            const revision=data.revision+1;
            db.prepare('INSERT INTO progress VALUES(?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET body=excluded.body,revision=excluded.revision,updated_at=excluded.updated_at').run(user.id,encoded,revision,Date.now());
            db.exec('COMMIT');return json(res,200,{revision});
          }catch(error){if(db.isTransaction)db.exec('ROLLBACK');throw error;}
        }
        throw new RequestError(404,'Rota não encontrada.');
      }
      if(!['GET','HEAD'].includes(req.method))throw new RequestError(405,'Método não permitido.');
      let pathname;try{pathname=decodeURIComponent(url.pathname);}catch{throw new RequestError(400,'Endereço inválido.');}
      if(pathname.includes('\0')||pathname.split('/').some(part=>part.startsWith('.')))throw new RequestError(404,'Arquivo não encontrado.');
      const root=resolve(staticRoot),file=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
      if(file!==root&&!file.startsWith(root+sep))throw new RequestError(404,'Arquivo não encontrado.');
      let info;try{info=await stat(file);}catch{throw new RequestError(404,'Arquivo não encontrado. Execute npm run build antes de iniciar o site.');}
      if(!info.isFile())throw new RequestError(404,'Arquivo não encontrado.');
      res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Content-Length':info.size,'Cache-Control':extname(file)==='.html'?'no-cache':'public, max-age=3600'});
      if(req.method==='HEAD')res.end();else createReadStream(file).on('error',()=>res.destroy()).pipe(res);
    }catch(error){if(!res.headersSent)json(res,error.status||500,{error:error.status?error.message:'Não foi possível concluir a operação.'});else res.destroy();}
  }
  const server=http.createServer((req,res)=>{handle(req,res);});
  server.requestTimeout=30000;server.headersTimeout=15000;
  return {server,close:()=>{server.closeAllConnections();return new Promise(resolve=>server.close(()=>{db.close();resolve();}));}};
}
