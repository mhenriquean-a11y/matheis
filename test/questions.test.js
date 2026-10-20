import { revisionPrograms } from './fixtures/revision-programs.js';
import { extraPrograms } from './fixtures/extra-programs.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execute } from '../src/runner.js';
import { compare, requiredFunctionError } from '../src/judge.js';
import { questions } from '../src/questions.js';
const programs = {
 soma:'real a,b leia(a) leia(b) escreva(a+b)',
 calculadora:'inteiro op real a,b leia(op) leia(a) leia(b) se(op<1 ou op>4){escreva("Opcao invalida")} senao se(op==1){escreva(a+b)} senao se(op==2){escreva(a-b)} senao se(op==3){escreva(a*b)} senao se(b==0){escreva("Divisao por zero")} senao{escreva(a/b)}',
 potencia:'real a leia(a) escreva(a*a)',
 'area-circulo':'real r leia(r) se(r<=0){escreva("Raio invalido")} senao{escreva(3.14*r*r)}',
 operacoes:'real a,b leia(a) leia(b) escreva(a+b,"\n",a-b,"\n",a*b,"\n") se(b==0){escreva("Divisao por zero")} senao{escreva(a/b)}',
 vendedor:'real a,b leia(a) leia(b) se(a<0 ou b<0){escreva("Dados invalidos")} senao{escreva(a+b*0.15)}',
 inss:'real s leia(s) se(s<=0){escreva("Salario invalido")} senao se(s<=1000){escreva(s*0.08)} senao se(s<=2000){escreva(s*0.09)} senao{escreva(s*0.11)}',
 equacao:'real a,b leia(a) leia(b) se(a!=0){escreva(-b/a)} senao se(b==0){escreva("Infinitas solucoes")} senao{escreva("Sem solucao")}',
 expressao:'real a,b leia(a) leia(b) escreva((a+b)*2-a/2)',
 prestacao:'real a,p inteiro n leia(a) leia(p) leia(n) se(a<0 ou p<0 ou n<=0){escreva("Dados invalidos")} senao{escreva(a*(1+p/100)/n)}',
 consumo:'real d,l leia(d) leia(l) se(d<0 ou l<=0){escreva("Dados invalidos")} senao{escreva(d/l)}',
 idade:'inteiro a leia(a) se(a<0){escreva("Idade invalida")} senao{escreva(a*365)}',
 quadrado:'real a leia(a) se(a<=0){escreva("Medida invalida")} senao{escreva(a*a)}',
 triangulo:'real a,b leia(a) leia(b) se(a<=0 ou b<=0){escreva("Medida invalida")} senao{escreva(a*b/2)}',
 perimetro:'real r leia(r) se(r<=0){escreva("Raio invalido")} senao{escreva(2*3.14*r)}',
 par:'inteiro n leia(n) se(n%2==0){escreva("PAR")} senao{escreva("IMPAR")}',
 media:'real a,b,m leia(a) leia(b) se(a<0 ou a>10 ou b<0 ou b>10){escreva("Nota invalida")} senao{m=(a+b)/2 se(m>=7){escreva("Aprovado")} senao se(m>=5){escreva("Recuperacao")} senao{escreva("Reprovado")}}',
 salario:'real s leia(s) se(s<500){escreva(s*1.15)} senao se(s<=1000){escreva(s*1.10)} senao{escreva(s*1.05)}',
 intervalo:'inteiro n,d=0,f=0 para(inteiro i=0;i<10;i++){leia(n) se(n>10 e n<20){d++} senao{f++}} escreva(d,"\n",f)',
 'soma-zero':'inteiro n,s=0 leia(n) enquanto(n!=0){s=s+n leia(n)} escreva(s)',
 fatorial:'inteiro n,f=1 leia(n) para(inteiro i=1;i<=n;i++){f=f*i} escreva(f)',
 funcao:'real a,b leia(a) leia(b) escreva(calcular_media(a,b))',
 'decimal-binario':'inteiro n,r cadeia s="" leia(n) se(n==0){s="0"} enquanto(n>0){r=n%2 s=r+s n=n/2} escreva(s)',
 'vetor-extremos':'inteiro n,v[100],maior,menor leia(n) para(inteiro i=0;i<n;i++){leia(v[i])} maior=v[0] menor=v[0] para(inteiro i=1;i<n;i++){se(v[i]>maior){maior=v[i]} se(v[i]<menor){menor=v[i]}} escreva(maior,"\n",menor,"\n",maior-menor)',
 ordenado:'inteiro n,v[100] logico ok=verdadeiro leia(n) para(inteiro i=0;i<n;i++){leia(v[i]) se(i>0){se(v[i]<v[i-1]){ok=falso}}} se(ok){escreva("SIM")} senao{escreva("NAO")}',
 sequencia:'inteiro n,v[100],atual=1,maior=1 leia(n) para(inteiro i=0;i<n;i++){leia(v[i])} para(inteiro i=1;i<n;i++){se(v[i]>v[i-1]){atual++} senao{atual=1} se(atual>maior){maior=atual}} escreva(maior)',
 palindromo:'cadeia s logico ok=verdadeiro leia(s) s=txt.caixa_baixa(s) inteiro n=txt.numero_caracteres(s) para(inteiro i=0;i<n/2;i++){se(txt.obter_caracter(s,i)!=txt.obter_caracter(s,n-1-i)){ok=falso}} se(ok){escreva("SIM")} senao{escreva("NAO")}',
 'binario-decimal':'cadeia s inteiro n=0 logico ok=verdadeiro leia(s) para(inteiro i=0;i<txt.numero_caracteres(s);i++){caracter c=txt.obter_caracter(s,i) se(c!=\'0\' e c!=\'1\'){ok=falso} senao{n=n*2 se(c==\'1\'){n++}}} se(ok){escreva(n)} senao{escreva("INVALIDO")}',
 resistencias:'inteiro n real v[50],s=0,inv=0 logico ok=verdadeiro leia(n) para(inteiro i=0;i<n;i++){leia(v[i]) se(v[i]<=0){ok=falso} senao{s=s+v[i] inv=inv+1.0/v[i]}} se(ok){escreva(mat.arredondar(s,2),"\n",mat.arredondar(1.0/inv,2))} senao{escreva("VALOR INVALIDO")}',
 matriz:'inteiro m[2][3],s=0 para(inteiro i=0;i<2;i++){para(inteiro j=0;j<3;j++){leia(m[i][j]) s=s+m[i][j]}} escreva(s)'
};
for(const q of questions){test(`Questão ${q.id}: todos os ${q.tests.length} casos`,async()=>{
 let libraries='',func='';
 if(['palindromo','binario-decimal'].includes(q.id))libraries='inclua biblioteca Texto --> txt';
 if(q.id==='resistencias')libraries='inclua biblioteca Matematica --> mat';
 if(q.id==='funcao')func='funcao real calcular_media(real a,real b){retorne (a+b)/2}';
 const code=revisionPrograms[q.id] || extraPrograms[q.id] || `programa { ${libraries} ${func} funcao inicio(){ ${programs[q.id].replaceAll('\n','\\n')} } }`;
 assert.equal(requiredFunctionError(q,code),null);
 for(const t of q.tests){const actual=await execute(code,t.input);assert.ok(compare(actual,t.output,q.numeric),`entrada ${JSON.stringify(t.input)}: esperado ${JSON.stringify(t.output)}, recebido ${JSON.stringify(actual)}`);}
});}
