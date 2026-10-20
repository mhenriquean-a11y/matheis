import { test, expect } from '@playwright/test';
const password='study-test-2026';
const name=()=>`u${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`;
const draft=value=>`programa { funcao inicio() { escreva("${value}") } }`;
async function setCode(page,value){await page.evaluate(v=>window.ace.edit('editor').setValue(v,-1),value);}
async function currentCode(page){return page.evaluate(()=>window.ace.edit('editor').getValue());}
async function open(page){await page.goto('/');await page.waitForSelector('.ace_editor');await expect(page.locator('#open-auth')).toBeVisible();}
async function register(page,username,transfer=false){
 await page.click('#open-auth');await page.click('#auth-register-tab');await page.fill('#auth-name','Estudante '+username);await page.fill('#auth-username',username);await page.fill('#auth-password',password);await page.fill('#auth-confirm',password);
 if(transfer)await page.check('#transfer-guest');await page.click('#auth-submit');await expect(page.locator('#auth-dialog')).not.toBeVisible();await expect(page.locator('#account-bar')).toContainText('@'+username);
}
async function login(page,username,pass=password){await page.click('#open-auth');await page.fill('#auth-username',username);await page.fill('#auth-password',pass);await page.click('#auth-submit');await expect(page.locator('#auth-dialog')).not.toBeVisible();await expect(page.locator('#account-bar')).toContainText('@'+username);}
async function sync(page){await page.click('#retry-sync');await expect(page.locator('#account-sync')).toContainText('Progresso salvo na sua conta');}

test('duas contas no mesmo navegador não misturam códigos nem recebem o progresso de visitante sem escolha',async({page})=>{
 const a=name(),b=name();await open(page);await setCode(page,draft('visitante'));
 await register(page,a);expect(await currentCode(page)).not.toContain('visitante');
 await setCode(page,draft('apenas Alice'));await sync(page);await page.click('#logout');await expect(page.locator('#account-bar')).toContainText('Modo visitante');expect(await currentCode(page)).toContain('visitante');
 await register(page,b);expect(await currentCode(page)).not.toContain('Alice');expect(await currentCode(page)).not.toContain('visitante');
 await setCode(page,draft('apenas Bruno'));await sync(page);await page.click('#logout');await login(page,a);expect(await currentCode(page)).toContain('apenas Alice');expect(await currentCode(page)).not.toContain('Bruno');
});
test('importação opcional de visitante e acesso à mesma conta em outro dispositivo',async({page,browser})=>{
 const user=name();await open(page);
 await page.evaluate(()=>localStorage.setItem('portugol-pratica-v1',JSON.stringify({selected:'soma',drafts:{soma:'programa {funcao inicio(){escreva(123)}}'},history:{soma:[{date:'2026-10-20T12:00:00Z',passed:4,total:4}]},savedDrafts:{},exam:null})));
 await page.reload();await register(page,user,true);await sync(page);await expect(page.locator('#done')).toHaveText('1');expect(await currentCode(page)).toContain('123');
 const context=await browser.newContext();try{const other=await context.newPage();await open(other);await login(other,user);await expect(other.locator('#done')).toHaveText('1');expect(await currentCode(other)).toContain('123');
  await setCode(other,draft('outro dispositivo'));await sync(other);await sync(page);expect(await currentCode(page)).toContain('outro dispositivo');
 }finally{await context.close();}
});
test('dois dispositivos editando preservam os dois rascunhos ao sincronizar',async({page,browser})=>{
 const user=name();await open(page);await register(page,user);await sync(page);
 const context=await browser.newContext();try{const other=await context.newPage();await open(other);await login(other,user);await sync(other);
  await setCode(page,draft('dispositivo A'));await sync(page);await setCode(other,draft('dispositivo B'));await sync(other);
  const response=await other.request.get('/api/progress');const data=await response.json();expect(data.progress.drafts.consumo).toContain('dispositivo B');expect(data.progress.savedDrafts.consumo.some(d=>d.code.includes('dispositivo A'))).toBe(true);
  expect(await currentCode(other)).toContain('dispositivo B');
 }finally{await context.close();}
});
test('alterar senha mantém o progresso e exige nova entrada em outro dispositivo',async({page,browser})=>{
 const user=name();await open(page);await register(page,user);await setCode(page,draft('guardado na conta'));await sync(page);
 const context=await browser.newContext();try{const other=await context.newPage();await open(other);await login(other,user);
  await page.click('#change-password');await page.fill('#current-password',password);await page.fill('#new-password','new-study-test-2026');await page.fill('#new-password-confirm','new-study-test-2026');await page.click('#password-submit');await expect(page.locator('#password-message')).toContainText('Senha alterada');await page.click('#close-password');
  await other.reload();await expect(other.locator('#account-bar')).toContainText('Modo visitante');await login(other,user,'new-study-test-2026');expect(await currentCode(other)).toContain('guardado na conta');
 }finally{await context.close();}
});

test('grupo privado permite cadastro por convite, protege arquivos e volta à entrada ao sair',async({page})=>{
 const {createApplication}=await import('../server/app.js');
 const app=createApplication({databasePath:':memory:',privateAccess:true,invitationCodes:['browser-invite-alice']});
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
 const base=`http://127.0.0.1:${app.server.address().port}`;
 try{
  await page.goto(base);await expect(page.locator('#title')).toHaveText('Entre para estudar');
  expect(await page.locator('#editor').count()).toBe(0);
  expect((await page.request.get(base+'/Pratica-Portugol.html')).status()).toBe(401);
  await page.click('#toggle');await page.fill('#name','Alice');await page.fill('#username','private_alice');await page.fill('#password',password);await page.fill('#confirm',password);await page.fill('#invite','browser-invite-alice');await page.click('#submit');
  await page.waitForSelector('.ace_editor');await expect(page.locator('#account-bar')).toContainText('@private_alice');
  await setCode(page,draft('grupo privado'));await sync(page);
  await page.click('#logout');await expect(page.locator('#title')).toHaveText('Entre para estudar');
  expect((await page.request.get(base+'/Pratica-Portugol.html')).status()).toBe(401);
  await page.fill('#username','private_alice');await page.fill('#password',password);await page.click('#submit');
  await page.waitForSelector('.ace_editor');expect(await currentCode(page)).toContain('grupo privado');
 }finally{await page.goto('about:blank');await app.close();}
});
