import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questionStatus, recommendation, validateBackup, mergeBackup, searchable } from '../src/study.js';
import { explainFailure } from '../src/feedback.js';
import { questions } from '../src/questions.js';
const attempt=(passed,total=4)=>({passed,total,date:'2026-10-19T12:00:00Z'});
test('recomendação prioriza revisão e depois fundamento não tentado',()=>{
 assert.equal(recommendation(questions,{}).id,'soma');
 assert.equal(recommendation(questions,{media:[attempt(1,6)]}).id,'media');
 assert.equal(questionStatus({id:'soma'},{soma:[attempt(4),attempt(1)]}),'review');
 assert.equal(recommendation(questions,{soma:[attempt(4)]}).id,'potencia');
});
test('busca ignora acentos e caixa',()=>assert.equal(searchable('Média DEZ'),'media dez'));
test('backup antigo válido é importado sem apagar rascunhos atuais e sem duplicar histórico',()=>{
 const state={drafts:{soma:'atual'},history:{soma:[attempt(4)]},savedDrafts:{}};
 const imported=validateBackup({drafts:{soma:'antigo',idade:'codigo'},history:{soma:[attempt(4)]}},questions);
 const merged=mergeBackup(state,imported);
 assert.equal(merged.drafts.soma,'atual');assert.equal(merged.drafts.idade,'codigo');
 assert.equal(merged.savedDrafts.soma[0].code,'antigo');assert.equal(merged.history.soma.length,1);
 assert.equal(mergeBackup(merged,imported).savedDrafts.soma.length,1);
 assert.deepEqual(state.savedDrafts,{});
});
test('backup malformado é rejeitado; tentativas e rascunhos preservados retornam no novo backup',()=>{
 for(const raw of [null,[],{drafts:[],history:{}},{drafts:{},history:{soma:[attempt(5)]}}])assert.throws(()=>validateBackup(raw,questions));
 const data=validateBackup({drafts:{},history:{soma:[{...attempt(4),code:'codigo'}]},savedDrafts:{soma:[{date:attempt(0).date,code:'rascunho'}]}},questions);
 assert.equal(data.history.soma[0].code,'codigo');assert.equal(data.savedDrafts.soma[0].code,'rascunho');
});
test('diagnóstico explica linha, leituras extras, laços e saída repetida',()=>{
 assert.equal(explainFailure({error:'Linha 7: variável não declarada'},{}).codeLine,7);
 assert.match(explainFailure({error:'Seu programa pediu mais entradas do que o teste fornece.'},{}).title,/leitura extra/);
 assert.match(explainFailure({error:'Tempo limite de 3 segundos'},{}).title,/não terminou/);
 assert.match(explainFailure({output:'1',outputReceived:'1\n1'},{numeric:true}).title,/a mais/);
 assert.match(explainFailure({output:'PAR',outputReceived:'par'},{numeric:false}).title,/maiúsculas/);
});
