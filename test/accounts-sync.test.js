import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AccountSync, GUEST_KEY } from '../src/accounts.js';
import { questions } from '../src/questions.js';
const progress=code=>({drafts:{soma:code},history:{},savedDrafts:{},exam:null,selected:'soma'});
const storage=()=>{const values=new Map();return {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};};
const response=(data,status=200)=>({ok:status<400,status,json:async()=>data});
test('visitante não envia progresso para o servidor',async()=>{
 const calls=[],store=storage();const sync=new AccountSync({questions,storage:store,fetcher:async path=>{calls.push(path);return response({user:null});}});
 assert.equal(await sync.initialize(),null);sync.queue(progress('privado visitante'));await sync.flush();
 assert.deepEqual(calls,['/api/auth/me']);assert.equal(sync.storageKey,GUEST_KEY);
});
test('conta sincroniza progresso com revisão e remove marcador pendente após confirmação',async()=>{
 const calls=[],store=storage();const sync=new AccountSync({questions,storage:store,fetcher:async(path,options)=>{
  calls.push([path,options]);if(path.endsWith('/me'))return response({user:{id:'alice',username:'alice',displayName:'Alice'}});
  if(options.method==='GET')return response({progress:progress('anterior'),revision:2});return response({revision:3});
 }});
 await sync.initialize();sync.queue(progress('novo'));await sync.flush();assert.equal(sync.revision,3);assert.equal(sync.dirty,false);
 const body=JSON.parse(calls.at(-1)[1].body);assert.equal(body.revision,2);assert.equal(body.progress.drafts.soma,'novo');assert.equal(store.getItem(sync.pendingKey),null);
});
test('conflito entre dispositivos preserva ambos os códigos e reenvia com a nova revisão',async()=>{
 let writes=0,merged;const sync=new AccountSync({questions,storage:storage(),onMerge:value=>{merged=value;},fetcher:async(path,options)=>{
  if(path.endsWith('/me'))return response({user:{id:'alice'}});if(options.method==='GET')return response({progress:progress('inicial'),revision:1});
  if(++writes===1)return response({error:'conflito',progress:progress('outro dispositivo'),revision:2},409);
  const data=JSON.parse(options.body);assert.equal(data.revision,2);assert.equal(data.progress.drafts.soma,'rascunho atual');return response({revision:3});
 }});
 await sync.initialize();sync.queue(progress('rascunho atual'));await sync.flush();assert.equal(writes,2);assert.equal(merged.savedDrafts.soma[0].code,'outro dispositivo');
});
test('falha de rede mantém pendência recuperável, sem afirmar que foi salva na conta',async()=>{
 const store=storage(),statuses=[];const sync=new AccountSync({questions,storage:store,onStatus:s=>statuses.push(s),fetcher:async(path,options)=>{
  if(path.endsWith('/me'))return response({user:{id:'alice'}});if(options.method==='GET')return response({progress:null,revision:0});throw new Error('sem conexão');
 }});
 await sync.initialize();sync.queue(progress('não perder'));await assert.rejects(sync.flush());assert.equal(sync.dirty,true);assert.equal(statuses.at(-1),'error');assert.equal(JSON.parse(store.getItem(sync.pendingKey)).progress.drafts.soma,'não perder');
});
test('carregamento recupera a pendência pessoal sem importar dados do visitante',async()=>{
 const store=storage();store.setItem(GUEST_KEY,JSON.stringify(progress('visitante')));store.setItem('portugol-pratica-user-v1:alice:pending',JSON.stringify({progress:progress('pendente da Alice'),revision:0}));
 const sync=new AccountSync({questions,storage:store,fetcher:async path=>path.endsWith('/me')?response({user:{id:'alice'}}):response({progress:progress('servidor'),revision:1})});
 const loaded=await sync.initialize();assert.equal(loaded.drafts.soma,'pendente da Alice');assert.equal(loaded.savedDrafts.soma[0].code,'servidor');assert.equal(sync.dirty,true);
});
