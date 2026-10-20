import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compare } from '../src/judge.js';
import { questions } from '../src/questions.js';

const accents = text => text.replace(/Divisao/g,'Divisão').replace(/Opcao/g,'Opção')
 .replace(/invalida/g,'inválida').replace(/invalido/g,'inválido').replace(/INVALIDO/g,'INVÁLIDO')
 .replace(/Recuperacao/g,'Recuperação').replace(/Salario/g,'Salário').replace(/solucoes/g,'soluções')
 .replace(/solucao/g,'solução').replace(/Impossivel/g,'Impossível').replace(/NAO/g,'NÃO')
 .replace(/IMPAR/g,'ÍMPAR').replace(/ISOSCELES/g,'ISÓSCELES').replace(/Mes/g,'Mês').replace(/marco/g,'março');

test('regressão do print: 5.0, 5.0, 0.0 e Divisão por zero passam',()=>{
 assert.ok(compare('5.0\n5.0\n0.0\nDivisão por zero','5\n5\n0\nDivisao por zero',true));
});
test('acentos são aceitos em mensagens, classificações e Unicode decomposto',()=>{
 for(const [actual,expected] of [['Nota inválida','Nota invalida'],['Recuperação','Recuperacao'],['NÃO','NAO'],['ÍMPAR','IMPAR'],['março','marco']]) {
  assert.ok(compare(actual,expected));assert.ok(compare(actual.normalize('NFD'),expected));
 }
});
for(const q of questions) {
 test(`auditoria ${q.id}: todos os casos aceitam acentos e formatos numéricos equivalentes`,()=>{
  for(const t of q.tests) {
   assert.ok(compare(accents(t.output),t.output,q.numeric));
   assert.ok(compare(accents(t.output).normalize('NFD'),t.output,q.numeric));
   if(q.numeric){
    const decimalVariant=accents(t.output).split('\n').map(line=>line.replace(/^-?\d+$/,n=>`${n}.0`)).join('\n');
    assert.ok(compare(decimalVariant,t.output,true));
   }
   assert.ok(!compare(t.output+'\nMensagem extra',t.output,q.numeric));
  }
 });
}
test('a tolerância não esconde erros de lógica, palavras, maiúsculas ou divisões extras',()=>{
 assert.ok(!compare('5.0\n5.0\n1.0\nDivisão por zero','5\n5\n0\nDivisao por zero',true));
 assert.ok(!compare('5\n5\n0\n0\nDivisão por zero','5\n5\n0\nDivisao por zero',true));
 assert.ok(!compare('Dados validos','Dados invalidos',true));
 assert.ok(!compare('divisão por zero','Divisao por zero',true));
 assert.ok(!compare('12.5','12',true));
 assert.ok(!compare('5,0','5',true));
});
