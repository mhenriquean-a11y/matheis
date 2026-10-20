import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../src/questions.js';
import { revisionQuestions } from '../src/revision-questions.js';
import { revisionPrograms } from './fixtures/revision-programs.js';
import { extraQuestions } from '../src/extra-questions.js';
import { compare, requiredFunctionError } from '../src/judge.js';
import { extraPrograms } from './fixtures/extra-programs.js';
import { execute } from '../src/runner.js';

test('catálogo mantém IDs antigos, novas questões e testes bem formados', () => {
 assert.equal(questions.length,100);assert.equal(extraQuestions.length,20);assert.equal(revisionQuestions.length,50);assert.equal(questions.filter(q=>q.isNew).length,50);
 assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 assert.ok(questions.find(q=>q.id==='consumo'));
 for(const q of [...extraQuestions,...revisionQuestions]){assert.ok(q.source.label);assert.ok(q.tests.length>=4);assert.ok(extraPrograms[q.id]||revisionPrograms[q.id]);for(const t of q.tests){assert.equal(typeof t.input,'string');assert.equal(typeof t.output,'string');}}
});
test('funções requeridas: aceita código válido e ignora comentários e strings', () => {
 for(const id of ['funcao-maior','funcao-par']){
  const q=questions.find(q=>q.id===id);
  assert.equal(requiredFunctionError(q,extraPrograms[id]),null);
  assert.ok(requiredFunctionError(q,`programa { funcao inicio(){ escreva("${q.requiredFunction.name}(1)") } } // funcao ${q.requiredFunction.type} ${q.requiredFunction.name}(inteiro n)`));
 }
});
test('nota válida: soluções erradas de limites são rejeitadas', async () => {
 const q=questions.find(q=>q.id==='nota-valida');
 const wrong='programa {funcao inicio(){real n leia(n) enquanto(n<=0 ou n>=10){escreva("Nota invalida\\n") leia(n)} escreva(n)}}';
 // Entrada extra permite a versão errada terminar: a saída não deve passar.
 assert.ok(!compare(await execute(wrong,'0\n5'),'0',true));
 assert.ok(!compare(await execute(wrong,'10\n5'),'10',true));
});
test('busca: última ocorrência não passa no caso com repetição', async () => {
 const wrong='programa {funcao inicio(){inteiro n,v[100],a,p=-1 leia(n) para(inteiro i=0;i<n;i++){leia(v[i])} leia(a) para(inteiro i=0;i<n;i++){se(v[i]==a){p=i}} escreva(p)}}';
 const q=questions.find(q=>q.id==='busca-vetor'),t=q.tests[0];
 assert.ok(!compare(await execute(wrong,t.input),t.output,true));
});

test('todos os enunciados têm contrato completo e dicas sem soluções prontas',()=>{
 for(const q of questions){
  for(const field of ['goal','input','output','rules'])assert.ok(q.statement[field]?.trim(),`${q.id}: ${field}`);
  assert.equal(q.description,q.statement.goal);assert.ok(q.hint);
  assert.ok(!/programa\s*\{|funcao\s+inicio\s*\(/.test(q.hint));
 }
});
