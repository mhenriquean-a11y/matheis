const wrap = (body, functions = '', libraries = '') => `programa { ${libraries} ${functions} funcao inicio() { ${body} } }`;
export const extraPrograms = {
 'altura-media': wrap('real a,b,c leia(a) leia(b) leia(c) se(a<=0 ou b<=0 ou c<=0){escreva("Altura invalida")} senao{escreva((a+b+c)/3)}'),
 duracao: wrap('inteiro s,h,m,r leia(s) h=s/3600 r=s%3600 m=r/60 r=r%60 escreva(h,"\\n",m,"\\n",r)'),
 imc: wrap('real p,h leia(p) leia(h) se(p<=0 ou h<=0){escreva("Dados invalidos")} senao{escreva(p/(h*h))}'),
 'media-ponderada': wrap('real a,b,c,d leia(a) leia(b) leia(c) leia(d) escreva((a*2+b*3+c*4+d)/10)'),
 'triangulo-tipo': wrap('real a,b,c leia(a) leia(b) leia(c) se(a<=0 ou b<=0 ou c<=0 ou a+b<=c ou a+c<=b ou b+c<=a){escreva("NAO FORMA TRIANGULO")} senao se(a==b e b==c){escreva("EQUILATERO")} senao se(a==b ou b==c ou a==c){escreva("ISOSCELES")} senao{escreva("ESCALENO")}'),
 mes: wrap('inteiro n leia(n) escolha(n){caso 1: escreva("janeiro") pare caso 2: escreva("fevereiro") pare caso 3: escreva("marco") pare caso 4: escreva("abril") pare caso 5: escreva("maio") pare caso 6: escreva("junho") pare caso 7: escreva("julho") pare caso 8: escreva("agosto") pare caso 9: escreva("setembro") pare caso 10: escreva("outubro") pare caso 11: escreva("novembro") pare caso 12: escreva("dezembro") pare caso contrario: escreva("Mes invalido")}'),
 bhaskara: wrap('real a,b,c,d leia(a) leia(b) leia(c) d=b*b-4*a*c se(a==0 ou d<0){escreva("Impossivel calcular")} senao{real r=mat.raiz(d,2.0) escreva((-b+r)/(2*a),"\\n",(-b-r)/(2*a))}', '', 'inclua biblioteca Matematica --> mat'),
 regressiva: wrap('inteiro n leia(n) enquanto(n>=0){escreva(n,"\\n") n--} escreva("FIM")'),
 'media-dez': wrap('inteiro i=0 real n,s=0 enquanto(i<10){leia(n) s=s+n i++} escreva(s/10)'),
 'nota-valida': wrap('real n leia(n) enquanto(n<0 ou n>10){escreva("Nota invalida\\n") leia(n)} escreva(n)'),
 votacao: wrap('inteiro v,a=0,b=0,br=0,nu=0 leia(v) enquanto(v!=0){escolha(v){caso 1: a++ pare caso 2: b++ pare caso 3: br++ pare caso contrario: nu++} leia(v)} escreva(a,"\\n",b,"\\n",br,"\\n",nu)'),
 'soma-pares': wrap('inteiro n,s=0 leia(n) para(inteiro i=2;i<=n;i+=2){s=s+i} escreva(s)'),
 'conta-primos': wrap('inteiro n,v,qt=0 leia(n) para(inteiro i=0;i<n;i++){leia(v) inteiro div=0 para(inteiro j=1;j<=v;j++){se(v%j==0){div++}} se(v>1 e div==2){qt++}} escreva(qt)'),
 'vetor-inverso': wrap('inteiro n,v[100] leia(n) para(inteiro i=0;i<n;i++){leia(v[i])} para(inteiro i=n-1;i>=0;i--){escreva(v[i],"\\n")}'),
 'busca-vetor': wrap('inteiro n,v[100],alvo,pos=-1 leia(n) para(inteiro i=0;i<n;i++){leia(v[i])} leia(alvo) para(inteiro i=0;i<n;i++){se(v[i]==alvo e pos==-1){pos=i}} escreva(pos)'),
 'vetor-acima-media': wrap('inteiro n,cont=0 real v[100],s=0,m leia(n) para(inteiro i=0;i<n;i++){leia(v[i]) s=s+v[i]} m=s/n para(inteiro i=0;i<n;i++){se(v[i]>m){cont++}} escreva(m,"\\n",cont)'),
 diagonal: wrap('inteiro m[3][3],s=0 para(inteiro i=0;i<3;i++){para(inteiro j=0;j<3;j++){leia(m[i][j]) se(i==j){s=s+m[i][j]}}} escreva(s)'),
 'soma-linhas': wrap('inteiro m[2][3] para(inteiro i=0;i<2;i++){para(inteiro j=0;j<3;j++){leia(m[i][j])}} para(inteiro i=0;i<2;i++){inteiro s=0 para(inteiro j=0;j<3;j++){s=s+m[i][j]} escreva(s,"\\n")}'),
 'funcao-maior': wrap('inteiro a,b leia(a) leia(b) escreva(maior_de_dois(a,b))','funcao inteiro maior_de_dois(inteiro a,inteiro b){se(a>b){retorne a} senao{retorne b}}'),
 'funcao-par': wrap('inteiro n leia(n) se(eh_par(n)){escreva("PAR")} senao{escreva("IMPAR")}','funcao logico eh_par(inteiro n){retorne n%2==0}')
};
