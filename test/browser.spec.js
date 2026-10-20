import { test, expect } from '@playwright/test';
import { revisionPrograms } from './fixtures/revision-programs.js';
const consumption='programa { funcao inicio() { real d,l leia(d) leia(l) se(d<0 ou l<=0){escreva("Dados invalidos")} senao{escreva(d/l)} } }';
async function code(page,value){await page.evaluate(v=>window.ace.edit('editor').setValue(v,-1),value);}
test.beforeEach(async({page})=>{await page.goto('/');await page.waitForSelector('.ace_editor');});
test('correção verdadeira, saída esperada preservada e histórico persistente',async({page})=>{
 await code(page,consumption);await page.click('#submit');await expect(page.locator('.result-summary')).toContainText('6 de 6');
 await page.reload();await expect(page.locator('#done')).toHaveText('1');
 expect(await page.evaluate(()=>window.ace.edit('editor').getValue())).toBe(consumption);
 await code(page,'programa { funcao inicio() { escreva(99) } }');await page.click('#submit');await expect(page.locator('.result-summary')).toContainText('0 de 6');
 await page.locator('.test-result summary').first().click();await expect(page.locator('.test-grid').first()).toContainText('12');await expect(page.locator('.test-grid').first()).toContainText('99');
 await page.click('#tab-history');await expect(page.locator('.history-list article')).toHaveCount(2);
});
test('laço infinito é interrompido e editor continua utilizável',async({page})=>{
 await code(page,'programa { funcao inicio() { enquanto(verdadeiro){} } }');await page.click('.custom summary');await page.click('#run-custom');
 await expect(page.locator('#custom-output')).toContainText('Tempo limite',{timeout:25000});await expect(page.locator('#submit')).toBeEnabled();
 await code(page,'programa { funcao inicio() { escreva("ok") } }');await page.click('#run-custom');await expect(page.locator('#custom-output')).toHaveText('ok');
});
test('erros de compilação e entradas insuficientes são apresentados',async({page})=>{
 await page.click('.custom summary');await code(page,'programa { funcao inicio() { escreva(variavel_inexistente) } }');await page.click('#run-custom');await expect(page.locator('#custom-output')).toContainText('Linha');
 await code(page,'programa { funcao inicio() { inteiro n leia(n) escreva(n) } }');await page.fill('#custom-input','');await page.click('#run-custom');await expect(page.locator('#custom-output')).toContainText('mais entradas');
});
test('simulado salva sem corrigir e corrige após entrega',async({page})=>{
 await page.click('#exam');await page.click('#confirm-exam');await expect(page.locator('#hint')).toBeDisabled();
 await code(page,consumption);await page.click('#submit');await expect(page.locator('#results')).toContainText('Resposta salva');await expect(page.locator('.test-result')).toHaveCount(0);
 await page.reload();await expect(page.locator('#exam-banner')).toContainText('1/8');
 page.once('dialog',dialog=>dialog.accept());await page.click('#finish-exam');await expect(page.locator('#results')).toContainText('1/8 questões completas',{timeout:15000});await expect(page.locator('#hint')).toBeEnabled();
});
test('tela de celular sem transbordamento horizontal',async({page})=>{
 await page.setViewportSize({width:390,height:844});await expect(page.locator('#submit')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:'/tmp/portugol-study-mobile.png',fullPage:true});
});
test('arquivo portátil executa sem buscar assets externos',async({page})=>{
 const urls=[];page.on('request',r=>urls.push(r.url()));await page.goto('/Pratica-Portugol.html');await page.waitForSelector('.ace_editor');await code(page,consumption);await page.click('#submit');await expect(page.locator('.result-summary')).toContainText('6 de 6');
 expect(urls.filter(u=>/\/assets\//.test(u))).toEqual([]);
});

test('novas atividades: filtro, referência e retorno ao catálogo completo',async({page})=>{
 await expect(page).toHaveTitle('Tropa do Raio · Portugol');
 await expect(page.locator('.brand')).toContainText('Tropa do Raio');
 await page.check('#only-new');await expect(page.locator('.question-item')).toHaveCount(50);
 await page.locator('[data-id="vetor-frequencia"]').click();
 await expect(page.locator('.title-row')).toContainText('quantidade de ocorrências');
 await expect(page.locator('.question-source')).toContainText('Aula 4');
 await page.uncheck('#only-new');await expect(page.locator('.question-item')).toHaveCount(100);
 await page.locator('[data-id="busca-vetor"]').click();
 await expect(page.locator('.question-source a')).toHaveAttribute('href',/UNIVALI-LITE\/Portugol-Studio/);
});
test('progresso anterior é preservado ao carregar o catálogo ampliado',async({page})=>{
 const draft='programa {funcao inicio(){escreva(42)}}';
 await page.evaluate(draft=>localStorage.setItem('portugol-pratica-v1',JSON.stringify({selected:'soma',drafts:{soma:draft},history:{soma:[{date:'2026-10-18T12:00:00Z',passed:4,total:4}]},exam:null})),draft);
 await page.reload();await page.waitForSelector('.ace_editor');
 await expect(page.locator('#done')).toHaveText('1');await expect(page.locator('#attempts')).toHaveText('1');
 expect(await page.evaluate(()=>window.ace.edit('editor').getValue())).toBe(draft);
 await page.click('#tab-history');await expect(page.locator('.history-list article')).toHaveCount(1);
});
test('atividade de função corrige o código e recusa solução sem função',async({page})=>{
 await page.locator('[data-id="funcao-par"]').click();
 await code(page,'programa {funcao logico eh_par(inteiro n){retorne n%2==0} funcao inicio(){inteiro n leia(n) se(eh_par(n)){escreva("PAR")} senao{escreva("IMPAR")}}}');
 await page.click('#submit');await expect(page.locator('.result-summary')).toContainText('5 de 5');
 await code(page,'programa {funcao inicio(){inteiro n leia(n) se(n%2==0){escreva("PAR")} senao{escreva("IMPAR")}}}');
 await page.click('#submit');await expect(page.locator('.result-summary')).toContainText('0 de 5');
 await page.locator('.test-result summary').first().click();await expect(page.locator('.test-grid').first()).toContainText('Declare a função logico eh_par');
});

test('operações básicas aceitam a saída do print com acento e decimais',async({page})=>{
 await page.locator('[data-id="operacoes"]').click();
 await code(page,'programa {funcao inicio(){real a,b leia(a) leia(b) escreva(a+b,"\\n",a-b,"\\n",a*b,"\\n") se(b==0){escreva("Divisão por zero")} senao{escreva(a/b)}}}');
 await page.click('#submit');await expect(page.locator('.result-summary')).toContainText('3 de 3');
 await page.locator('.test-result summary').nth(2).click();await expect(page.locator('.test-grid').nth(2)).toContainText('Divisão por zero');
});

test('revisão rápida explica o assunto e fica indisponível no simulado',async({page})=>{
 await page.click('#tab-learn');await expect(page.locator('.lesson')).toContainText('Entrada → cálculo → saída');
 await page.screenshot({path:'/tmp/portugol-study-desktop.png',fullPage:true});
 await page.click('#exam');await page.click('#confirm-exam');
 await expect(page.locator('#tab-learn')).toBeDisabled();await expect(page.locator('#tab-history')).toBeDisabled();await expect(page.locator('.lesson')).toHaveCount(0);
});
test('tentativas guardam código, correção e podem restaurar com segurança',async({page})=>{
 await code(page,consumption);await page.click('#submit');await expect(page.locator('.result-summary')).toContainText('6 de 6');
 await code(page,'programa {funcao inicio(){escreva(99)}}');await page.click('#tab-history');
 await page.locator('.attempt details summary').first().click();
 await expect(page.locator('.attempt pre').first()).toContainText('Dados invalidos');
 await page.locator('[data-show-attempt]').first().click();await expect(page.locator('#results')).toContainText('não é uma nova execução');
 page.once('dialog',dialog=>dialog.accept());await page.locator('[data-restore-attempt]').first().click();
 expect(await page.evaluate(()=>window.ace.edit('editor').getValue())).toBe(consumption);
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('portugol-pratica-v1')).savedDrafts.consumo[0].code)).toContain('99');
});
test('feedback abre o primeiro teste errado e explica conteúdo extra',async({page})=>{
 await code(page,'programa {funcao inicio(){escreva("Resultado: 12")}}');await page.click('#submit');await expect(page.locator('.feedback-box')).toContainText('conteúdo a mais');
 await expect(page.locator('.test-result').first()).toHaveAttribute('open','');
});
test('backup importado mantém rascunho atual, evita duplicar histórico e rejeita arquivo inválido',async({page})=>{
 await code(page,'programa {funcao inicio(){escreva(1)}}');
 const backup={drafts:{consumo:consumption},history:{consumo:[{date:'2026-10-19T12:00:00Z',passed:6,total:6}]}};
 const file={name:'progresso.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))};
 await page.locator('#import-file').setInputFiles(file);await expect(page.locator('#backup-message')).toContainText('Progresso importado');
 expect(await page.evaluate(()=>window.ace.edit('editor').getValue())).toContain('escreva(1)');
 await page.locator('#import-file').setInputFiles(file);await expect(page.locator('#attempts')).toHaveText('1');
 await page.click('#tab-history');await expect(page.locator('#content')).toContainText('Rascunho preservado do backup');
 await page.locator('#import-file').setInputFiles({name:'errado.json',mimeType:'application/json',buffer:Buffer.from('[]')});
 await expect(page.locator('#backup-message')).toContainText('progresso atual foi mantido');await expect(page.locator('#attempts')).toHaveText('1');
});
test('recomendação e filtros ajudam a revisar; busca aceita texto sem acento',async({page})=>{
 await expect(page.locator('#study-guide')).toContainText('Mensagem de boas-vindas');
 await code(page,'programa {funcao inicio(){escreva(99)}}');await page.click('#submit');await expect(page.locator('.result-summary')).toBeVisible();
 await page.selectOption('#status-filter','review');await expect(page.locator('.question-item')).toHaveCount(1);
 await page.selectOption('#status-filter','');await page.fill('#search','media ponderada de quatro');await expect(page.locator('.question-item')).toHaveCount(1);
});

test('novas atividades executam leitura de cadeia e soma de duas matrizes no navegador',async({page})=>{
 await page.check('#only-new');
 for(const [id,count] of [['boas-vindas',4],['matriz-soma-duas',4]]){
  await page.locator(`[data-id="${id}"]`).click();await code(page,revisionPrograms[id]);
  await page.click('#submit');await expect(page.locator('.result-summary')).toContainText(`${count} de ${count}`);
 }
 await page.setViewportSize({width:375,height:812});
 await expect(page.locator('.brand')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});

test('enunciado de prova organiza contratos e deixa exemplo recolhido sem solução pronta',async({page})=>{
 await expect(page.locator('.statement-contract section h3')).toHaveText(['Entrada','Saída']);
 await expect(page.locator('.statement-rules')).toContainText('distância deve ser');
 await expect(page.locator('.example-grid')).not.toBeVisible();
 await page.click('#hint');await expect(page.locator('#hint-box')).toBeVisible();
 await expect(page.locator('#hint-box')).toContainText('grandezas');
 await expect(page.locator('#hint-box')).not.toContainText('escreva(');
 await page.screenshot({path:'/tmp/tropa-enunciado.png',fullPage:true});
 await page.locator('.statement-example summary').click();await expect(page.locator('.example-grid')).toBeVisible();
});
