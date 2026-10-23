import {test,expect} from '@playwright/test';
const consumption='#include <stdio.h>\nint main(void){double d,l;scanf("%lf%lf",&d,&l);if(d<0||l<=0)printf("Dados invalidos");else printf("%.10g",d/l);return 0;}';
const setCode=(page,code)=>page.evaluate(v=>window.ace.edit('editor').setValue(v,-1),code);
test('C corrige, persiste e troca de linguagem preservando rascunhos e simulado de Portugol',async({page})=>{
 const por={drafts:{consumo:'programa { funcao inicio() { escreva("antigo") } }'},history:{},exam:{started:123,finished:false,answers:{consumo:'resposta Portugol'}}};
 await page.goto('/');await page.evaluate(value=>localStorage.setItem('portugol-pratica-v1',JSON.stringify(value)),por);await page.reload();
 await page.waitForSelector('.ace_editor');await expect(page.locator('#language-switch')).toHaveValue('c');
 await setCode(page,consumption);await page.click('#submit');await expect(page.locator('.result-summary')).toContainText('6 de 6');
 await page.reload();await expect(page.locator('#done')).toHaveText('1');
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('portugol-pratica-v1')))).toEqual(por);
 await page.selectOption('#language-switch','portugol');await expect(page.locator('#language-switch')).toHaveValue('portugol');await expect(page.locator('#exam-banner')).toContainText('1/8');
 expect(await page.evaluate(()=>window.ace.edit('editor').getValue())).toBe(por.drafts.consumo);
 await page.selectOption('#language-switch','c');await expect(page.locator('#done')).toHaveText('1');expect(await page.evaluate(()=>window.ace.edit('editor').getValue())).toBe(consumption);
});
test('C exibe diagnóstico, limita laço infinito e permite interromper',async({page})=>{
 await page.goto('/');await page.waitForSelector('.ace_editor');await page.click('.custom summary');
 await setCode(page,'int main(void){nao_existe;return 0;}');await page.click('#run-custom');await expect(page.locator('#custom-output')).toContainText('Linha 1');
 await setCode(page,'int main(void){while(1){}return 0;}');await page.click('#run-custom');await expect(page.locator('#custom-output')).toContainText('Tempo limite');
 await page.click('#run-custom');await page.click('#stop');await expect(page.locator('#custom-output')).toContainText('interrompida');
 await setCode(page,'int main(void){printf("ação");return 0;}');await page.click('#run-custom');await expect(page.locator('#custom-output')).toHaveText('ação');
});
test('C portátil funciona sem assets externos e cabe no celular',async({page})=>{
 await page.setViewportSize({width:390,height:844});const assets=[];page.on('request',r=>{if(/\/assets\//.test(r.url()))assets.push(r.url());});
 await page.goto('/Pratica-C.html');await page.waitForSelector('.ace_editor');await setCode(page,consumption);await page.click('#submit');await expect(page.locator('.result-summary')).toContainText('6 de 6');
 expect(assets).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('backup de outra linguagem é rejeitado sem alterar C',async({page})=>{
 await page.goto('/');await page.waitForSelector('.ace_editor');await setCode(page,consumption);
 await page.locator('#import-file').setInputFiles({name:'antigo.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({drafts:{consumo:'antigo'},history:{}}))});
 await expect(page.locator('#backup-message')).toContainText('outra linguagem');expect(await page.evaluate(()=>window.ace.edit('editor').getValue())).toBe(consumption);
});
test('C conta existente mantém sessão nas duas trilhas e sincroniza resultados separados',async({page})=>{
 const username='c'+Date.now().toString(36);await page.goto('/');await page.waitForSelector('.ace_editor');
 await page.click('#open-auth');await page.click('#auth-register-tab');await page.fill('#auth-name','Aluno C');await page.fill('#auth-username',username);await page.fill('#auth-password','study-test-2026');await page.fill('#auth-confirm','study-test-2026');await page.click('#auth-submit');await expect(page.locator('#auth-dialog')).not.toBeVisible();
 await setCode(page,consumption);await page.click('#submit');await expect(page.locator('.result-summary')).toContainText('6 de 6');
 await page.selectOption('#language-switch','portugol');await expect(page.locator('#account-bar')).toContainText('@'+username);await expect(page.locator('#done')).toHaveText('0');
 await setCode(page,'programa { funcao inicio() { escreva("Portugol preservado") } }');
 await page.selectOption('#language-switch','c');await expect(page.locator('#account-bar')).toContainText('@'+username);await expect(page.locator('#done')).toHaveText('1');expect(await page.evaluate(()=>window.ace.edit('editor').getValue())).toBe(consumption);
 await page.selectOption('#language-switch','portugol');await expect(page).toHaveURL(/language=portugol/);await page.waitForSelector('.ace_editor');expect(await page.evaluate(()=>window.ace.edit('editor').getValue())).toContain('Portugol preservado');
});
