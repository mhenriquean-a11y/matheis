import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createApplication } from '../server/app.js';
const password='test-password-only-123';
const progress=code=>({drafts:{soma:code},history:{},savedDrafts:{},exam:null,selected:'soma'});
async function fixture(options={}){
 const dir=await mkdtemp(join(tmpdir(),'pratica-accounts-')),databasePath=join(dir,'data.sqlite');
 const app=createApplication({databasePath,...options});
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
 const base=`http://127.0.0.1:${app.server.address().port}`;
 const request=async(path,{method='GET',data,cookie,origin}={})=>{
  const response=await fetch(base+path,{method,headers:{...(data?{'Content-Type':'application/json'}:{}),...(cookie?{Cookie:cookie}:{}),...(origin?{Origin:origin}:{})},body:data?JSON.stringify(data):undefined});
  return {status:response.status,data:await response.json(),cookie:response.headers.get('set-cookie')?.split(';')[0],rawCookie:response.headers.get('set-cookie')};
 };
 return {app,base,request,databasePath,cleanup:async()=>{await app.close();await rm(dir,{recursive:true,force:true});}};
}
const register=(request,username)=>request('/api/auth/register',{method:'POST',data:{username,displayName:username,password}});
test('cadastro usa hash e cookie HttpOnly; login valida senha e usuário duplicado',async()=>{
 const f=await fixture();try{
  const result=await register(f.request,'aluno_a');assert.equal(result.status,201);assert.match(result.rawCookie,/HttpOnly/);assert.match(result.rawCookie,/SameSite=Lax/);
  const db=new DatabaseSync(f.databasePath);const row=db.prepare('SELECT password_salt,password_hash FROM users').get();assert.equal(row.password_salt.length,32);assert.equal(row.password_hash.length,64);assert.notEqual(Buffer.from(row.password_hash).toString(),password);
  const session=db.prepare('SELECT token_hash FROM sessions').get();assert.notEqual(session.token_hash,result.cookie.split('=')[1]);db.close();
  assert.equal((await register(f.request,'aluno_a')).status,409);
  assert.equal((await f.request('/api/auth/login',{method:'POST',data:{username:'aluno_a',password:'wrong-password'}})).status,401);
  const login=await f.request('/api/auth/login',{method:'POST',data:{username:'ALUNO_A',password}});assert.equal(login.status,200);
  assert.equal((await f.request('/api/auth/me',{cookie:login.cookie})).data.user.username,'aluno_a');
 }finally{await f.cleanup();}
});
test('dois usuários mantêm progresso isolado e não podem trocar o dono por parâmetro',async()=>{
 const f=await fixture();try{
  const a=await register(f.request,'alice'),b=await register(f.request,'bruno');
  assert.equal((await f.request('/api/progress')).status,401);
  assert.equal((await f.request('/api/progress',{method:'PUT',cookie:a.cookie,data:{revision:0,progress:progress('codigo da Alice')}})).status,200);
  assert.equal((await f.request('/api/progress?userId='+a.data.user.id,{cookie:b.cookie})).data.progress,null);
  assert.equal((await f.request('/api/progress',{method:'PUT',cookie:b.cookie,data:{userId:a.data.user.id,revision:0,progress:progress('codigo do Bruno')}})).status,200);
  assert.equal((await f.request('/api/progress',{cookie:a.cookie})).data.progress.drafts.soma,'codigo da Alice');
  assert.equal((await f.request('/api/progress',{cookie:b.cookie})).data.progress.drafts.soma,'codigo do Bruno');
 }finally{await f.cleanup();}
});
test('revisões evitam sobrescrever silenciosamente o progresso de outro dispositivo',async()=>{
 const f=await fixture();try{const a=await register(f.request,'alice');
  assert.equal((await f.request('/api/progress',{method:'PUT',cookie:a.cookie,data:{revision:0,progress:progress('primeiro')}})).data.revision,1);
  const conflict=await f.request('/api/progress',{method:'PUT',cookie:a.cookie,data:{revision:0,progress:progress('obsoleto')}});
  assert.equal(conflict.status,409);assert.equal(conflict.data.progress.drafts.soma,'primeiro');
  assert.equal((await f.request('/api/progress',{method:'PUT',cookie:a.cookie,data:{revision:1,progress:progress('novo')}})).data.revision,2);
 }finally{await f.cleanup();}
});
test('logout invalida sessão e mudança de senha encerra outros dispositivos',async()=>{
 const f=await fixture();try{
  const a=await register(f.request,'alice'),other=await f.request('/api/auth/login',{method:'POST',data:{username:'alice',password}});
  const changed=await f.request('/api/auth/password',{method:'POST',cookie:a.cookie,data:{currentPassword:password,newPassword:'new-test-password-123'}});assert.equal(changed.status,200);
  assert.equal((await f.request('/api/progress',{cookie:other.cookie})).status,401);
  assert.equal((await f.request('/api/progress',{cookie:a.cookie})).status,401);
  assert.equal((await f.request('/api/progress',{cookie:changed.cookie})).status,200);
  assert.equal((await f.request('/api/auth/login',{method:'POST',data:{username:'alice',password}})).status,401);
  assert.equal((await f.request('/api/auth/logout',{method:'POST',cookie:changed.cookie,data:{}})).status,200);
  assert.equal((await f.request('/api/progress',{cookie:changed.cookie})).status,401);
 }finally{await f.cleanup();}
});
test('bloqueia origem externa, dados inválidos e tentativas repetidas de senha',async()=>{
 const f=await fixture({loginLimit:2});try{
  assert.equal((await f.request('/api/auth/register',{method:'POST',origin:'https://evil.example',data:{username:'alice',displayName:'Alice',password}})).status,403);
  assert.equal((await f.request('/api/auth/register',{method:'POST',data:{username:'a',displayName:'A',password:'short'}})).status,400);
  const a=await register(f.request,'alice');
  assert.equal((await f.request('/api/progress',{method:'PUT',cookie:a.cookie,data:{revision:0,progress:{drafts:[],history:{}}}})).status,400);
  for(let i=0;i<2;i++)assert.equal((await f.request('/api/auth/login',{method:'POST',data:{username:'alice',password:'invalid-password'}})).status,401);
  assert.equal((await f.request('/api/auth/login',{method:'POST',data:{username:'alice',password:'invalid-password'}})).status,429);
 }finally{await f.cleanup();}
});
test('progresso e conta persistem após reiniciar o servidor',async()=>{
 const f=await fixture();let second;
 try{const a=await register(f.request,'alice');await f.request('/api/progress',{method:'PUT',cookie:a.cookie,data:{revision:0,progress:progress('persistente')}});
  await f.app.close();second=createApplication({databasePath:f.databasePath});await new Promise(r=>second.server.listen(0,'127.0.0.1',r));
  const response=await fetch(`http://127.0.0.1:${second.server.address().port}/api/progress`,{headers:{Cookie:a.cookie}});
  assert.equal((await response.json()).progress.drafts.soma,'persistente');
 }finally{if(second)await second.close();await rm(join(f.databasePath,'..'),{recursive:true,force:true});}
});
test('cookies de produção têm Secure e prefixo restrito ao host',async()=>{
 const f=await fixture({secureCookies:true});try{const a=await register(f.request,'alice');assert.match(a.rawCookie,/^__Host-pratica_session=/);assert.match(a.rawCookie,/; Secure/);}finally{await f.cleanup();}
});

test('grupo privado exige login para HTML e arquivos; convite só pode ser usado uma vez',async()=>{
 const f=await fixture({privateAccess:true,invitationCodes:['convite-alice','convite-bruno']});try{
  const screen=await fetch(f.base+'/');assert.equal(screen.status,200);assert.match(await screen.text(),/GRUPO PRIVADO/);assert.match(screen.headers.get('cache-control'),/no-store/);
  assert.equal((await fetch(f.base+'/assets/exercises.js')).status,401);
  assert.equal((await register(f.request,'outsider')).status,403);
  const data={username:'alice',displayName:'Alice',password,invitationCode:'convite-alice'};
  const results=await Promise.all([f.request('/api/auth/register',{method:'POST',data}),f.request('/api/auth/register',{method:'POST',data:{...data,username:'intruder'}})]);
  assert.deepEqual(results.map(x=>x.status).sort(),[201,403]);
  const account=results.find(x=>x.status===201);
  assert.equal((await f.request('/api/auth/me',{cookie:account.cookie})).data.privateAccess,true);
  assert.equal((await f.request('/api/progress',{cookie:account.cookie})).status,200);
  await f.request('/api/auth/logout',{method:'POST',cookie:account.cookie,data:{}});
  assert.equal((await f.request('/api/progress',{cookie:account.cookie})).status,401);
  assert.match(await (await fetch(f.base+'/',{headers:{Cookie:account.cookie}})).text(),/GRUPO PRIVADO/);
 }finally{await f.cleanup();}
});
test('limite privado inclui o dono e impede contas extras mesmo com convites disponíveis',async()=>{
 const f=await fixture({privateAccess:true,maxAccounts:1,invitationCodes:['convite-alice','convite-bruno']});try{
  const create=(username,invitationCode)=>f.request('/api/auth/register',{method:'POST',data:{username,displayName:username,password,invitationCode}});
  assert.equal((await create('alice','convite-alice')).status,201);
  const blocked=await create('bruno','convite-bruno');assert.equal(blocked.status,403);assert.match(blocked.data.error,/vagas/);
  const db=new DatabaseSync(f.databasePath);assert.equal(db.prepare('SELECT COUNT(*) AS total FROM users').get().total,1);assert.equal(db.prepare('SELECT COUNT(*) AS total FROM invitations').get().total,1);db.close();
 }finally{await f.cleanup();}
});
test('modo privado sem configuração de convites falha fechado',()=>{
 assert.throws(()=>createApplication({databasePath:':memory:',privateAccess:true}),/convites/);
});

test('C usa a mesma conta e mantém progresso, revisões e simulado de Portugol intactos',async()=>{
 const f=await fixture();try{
  const a=await register(f.request,'alice'),b=await register(f.request,'bruno');
  const por={...progress('programa antigo'),exam:{started:123,finished:false,answers:{consumo:'resposta antiga'}}};
  await f.request('/api/progress',{method:'PUT',cookie:a.cookie,data:{revision:0,progress:por}});
  const before=(await f.request('/api/progress',{cookie:a.cookie})).data;
  assert.equal((await f.request('/api/progress/c',{cookie:a.cookie})).data.progress,null);
  const c={...progress('int main(void){return 0;}'),language:'c'};
  assert.equal((await f.request('/api/progress/c',{method:'PUT',cookie:a.cookie,data:{revision:0,progress:c}})).status,200);
  assert.deepEqual((await f.request('/api/progress',{cookie:a.cookie})).data,before);
  assert.equal((await f.request('/api/progress/c',{cookie:b.cookie})).data.progress,null);
  assert.equal((await f.request('/api/progress/c',{method:'PUT',cookie:a.cookie,data:{revision:0,progress:c}})).status,409);
  assert.equal((await f.request('/api/progress',{method:'PUT',cookie:a.cookie,data:{revision:1,progress:c}})).status,400);
  assert.equal((await f.request('/api/progress/c',{method:'PUT',cookie:a.cookie,data:{revision:1,progress:{...por,language:'portugol'}}})).status,400);
 }finally{await f.cleanup();}
});
