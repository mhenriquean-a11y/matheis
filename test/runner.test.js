import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execute } from '../src/runner.js';
import { compare } from '../src/judge.js';

test('execução real: entrada não aparece na saída', async () => {
 assert.equal(await execute('programa { funcao inicio() { real a,b leia(a) leia(b) escreva(a+b) } }', '2.5\n3.2'), '5.7');
});
test('enquanto: soma até zero, negativos e parada imediata', async () => {
 const code='programa { funcao inicio() { inteiro n,s=0 leia(n) enquanto(n!=0){ s=s+n leia(n) } escreva(s) } }';
 assert.equal(await execute(code,'4\n-2\n7\n0'),'9');
 assert.equal(await execute(code,'0'),'0');
});
test('vetores e índices', async () => {
 const code='programa { funcao inicio() { inteiro v[3],s=0 para(inteiro i=0;i<3;i++){ leia(v[i]) s=s+v[i] } escreva(s) } }';
 assert.equal(await execute(code,'-3\n2\n7'),'6');
});
test('função com retorno', async () => {
 const code='programa { funcao real calcular_media(real a,real b){ retorne (a+b)/2 } funcao inicio(){ real a,b leia(a) leia(b) escreva(calcular_media(a,b)) } }';
 assert.ok(compare(await execute(code,'6\n8'),'7',true));
});
test('erros de compilação são reportados', async () => {
 await assert.rejects(execute('programa { funcao inicio() { escreva(x) } }'), /Linha/);
});
test('comparação numérica não aceita palavras nem saídas extras', () => {
 assert.ok(compare('12.0\n','12',true));
 assert.ok(!compare('Resultado: 12','12',true));
 assert.ok(compare('Idade inválida','Idade invalida',true));
 assert.ok(!compare('idade inválida','Idade invalida',true));
 assert.ok(!compare('1\n2','1',true));
});

test('código incompleto não expõe TypeError interno e identifica o delimitador pendente',async()=>{
 for(const code of ['programa {funcao inicio(){se(', 'programa {funcao inicio(){real a,b,']){
  await assert.rejects(execute(code),error=>{
   assert.match(error.message,/Linha \d+:.*(?:falta fechar|fim do bloco)/);
   assert.doesNotMatch(error.message,/Cannot read|undefined|TypeError/);return true;
  });
 }
});
test('erro anterior à falha do analisador é preservado',async()=>{
 await assert.rejects(execute('programa {funcao inicio(){real a = } }'),error=>{
  assert.match(error.message,/Linha/);assert.doesNotMatch(error.message,/Cannot read|TypeError/);return true;
 });
});
test('delimitadores em comentários e textos não interferem na execução válida',async()=>{
 assert.equal(await execute('programa {funcao inicio(){// ( [ {\n escreva("( ] }")}}'),'( ] }');
});

test('senao se incompleto da atividade operações mostra diagnóstico de Portugol',async()=>{
 const code='programa {funcao inicio(){real a,b leia(a) leia(b) escreva(a+b,"\\n") escreva(a-b,"\\n") escreva(a*b,"\\n") se(b==0){escreva("Divisão por zero") retorne}senao se(a/b) }}';
 await assert.rejects(execute(code,'6\n2'),error=>{assert.doesNotMatch(error.message,/Cannot read|undefined|TypeError/);assert.match(error.message,/Linha|analisar/);return true;});
});
