import {test} from 'node:test';
import assert from 'node:assert/strict';
import {executeC} from '../src/c-runner.js';
import {cQuestions} from '../src/c-curriculum.js';
import {questions} from '../src/questions.js';
import {compare,requiredFunctionError} from '../src/judge.js';
const program=body=>'#include <stdio.h>\n#include <math.h>\n#include <string.h>\n#include <ctype.h>\n'+body;
const cases={
 soma:'int main(void){double a,b;scanf("%lf%lf",&a,&b);printf("%.10g",a+b);return 0;}',
 consumo:'int main(void){double d,l;scanf("%lf%lf",&d,&l);if(d<0||l<=0)printf("Dados invalidos");else printf("%.10g",d/l);return 0;}',
 media:'int main(void){double a,b,m;scanf("%lf%lf",&a,&b);m=(a+b)/2;if(a<0||a>10||b<0||b>10)puts("Nota invalida");else if(m>=7)puts("Aprovado");else if(m>=5)puts("Recuperacao");else puts("Reprovado");return 0;}',
 intervalo:'int main(void){int n,d=0;for(int i=0;i<10;i++){scanf("%d",&n);if(n>10&&n<20)d++;}printf("%d\\n%d",d,10-d);return 0;}',
 'soma-zero':'int main(void){int n,s=0;while(scanf("%d",&n)==1&&n!=0)s+=n;printf("%d",s);return 0;}',
 funcao:'double calcular_media(double a,double b){return (a+b)/2;} int main(void){double a,b;scanf("%lf%lf",&a,&b);printf("%.10g",calcular_media(a,b));return 0;}',
 'vetor-extremos':'int main(void){int n,v[100],lo,hi;scanf("%d",&n);for(int i=0;i<n;i++)scanf("%d",&v[i]);lo=v[0];hi=v[0];for(int i=1;i<n;i++){if(v[i]<lo)lo=v[i];if(v[i]>hi)hi=v[i];}printf("%d\\n%d\\n%d",hi,lo,hi-lo);return 0;}',
 palindromo:'int main(void){char s[101];int ok=1;scanf("%100s",s);int n=strlen(s);for(int i=0;i<n;i++)if(tolower(s[i])!=tolower(s[n-1-i]))ok=0;puts(ok?"SIM":"NAO");return 0;}',
 matriz:'int main(void){int a[2][3],s=0;for(int i=0;i<2;i++)for(int j=0;j<3;j++){scanf("%d",&a[i][j]);s+=a[i][j];}printf("%d",s);return 0;}',
 bhaskara:'int main(void){double a,b,c,d;scanf("%lf%lf%lf",&a,&b,&c);d=b*b-4*a*c;if(a==0||d<0)puts("Impossivel calcular");else printf("%.10g\\n%.10g",(-b+sqrt(d))/(2*a),(-b-sqrt(d))/(2*a));return 0;}'
};
test('catálogo C preserva os 100 contratos de entrada e saída sem alterar Portugol',()=>{
 assert.equal(cQuestions.length,100);
 for(const [i,q]of cQuestions.entries()){
  assert.equal(q.id,questions[i].id);assert.deepEqual(q.tests,questions[i].tests);
  assert.equal(q.language,'c');assert.ok(!questions[i].language);
  assert.doesNotMatch(JSON.stringify(q.statement),/funcao |Matematica\.|\binicio\b/);
 }
});
for(const[id,body]of Object.entries(cases))test(`C executa todos os casos de ${id}`,async()=>{
 const q=cQuestions.find(q=>q.id===id),code=program(body);
 assert.equal(requiredFunctionError(q,code),null);
 for(const t of q.tests)assert.ok(compare(await executeC(code,t.input),t.output,q.numeric),`${id}: ${t.input}`);
});
test('erros de C são diagnósticos; saídas parciais e UTF-8 são preservados',async()=>{
 await assert.rejects(executeC(program('int main(void){nao_existe;return 0;}')),/Linha 5/);
 assert.equal(await executeC(program('int main(void){printf("a");printf("ção");return 0;}')),'ação');
 await assert.rejects(executeC(program('int main(void){return 2;}')),/código 2/);
});
test('estrutura C exige definição além de comentário ou protótipo',()=>{
 const q=cQuestions.find(q=>q.id==='funcao');
 assert.ok(requiredFunctionError(q,'double calcular_media(double a,double b); int main(void){calcular_media(1,2);}'));
 assert.ok(requiredFunctionError(q,'// double calcular_media(double a,double b){} calcular_media(1,2)'));
});
