// Enunciados e casos autorais. Referências são conceituais; não copiamos soluções.
const base = 'https://github.com/UNIVALI-LITE/Portugol-Studio/blob/5640a2e95de1c5d63c11f453c324812b4d6a8f6c/ide/src/main/assets/exemplos/';
const studio = path => ({ label: 'Referência: exemplos do Portugol Studio / UNIVALI', url: base + path });
const aula = label => ({ label: `Base: ${label} do professor · exercício autoral` });
const t = (input, output) => ({input:String(input),output:String(output)});
const q = (id,title,topic,level,description,tests,numeric,hint,source,requiredFunction) => ({id,title,topic,level,description,tests,numeric,hint,source,requiredFunction,isNew:true});
export const extraQuestions = [
 q('altura-media','Média de três alturas','Aula 2 · Cálculos','Básico','Leia três alturas reais positivas, em metros, uma por linha. Mostre a média aritmética. Se alguma altura for menor ou igual a zero, mostre Altura invalida.',[
  t('1.5\n1.8\n1.8','1.7'),t('1\n1\n1','1'),t('0\n1.5\n1.7','Altura invalida'),t('1.7\n-1\n1.8','Altura invalida'),t('1.2\n1.5\n1.8','1.5')
 ],true,'Some as três alturas e divida por 3. Valide todas antes de calcular.',studio('algoritmos_sequenciais/altura_media.por')),
 q('duracao','Duração em horas, minutos e segundos','Aula 2 · Cálculos','Básico','Leia um inteiro S entre 0 e 1000000, representando uma duração em segundos. Mostre as horas completas, os minutos restantes e os segundos restantes, nessa ordem, um por linha. Horas podem ultrapassar 23.',[
  t('3661','1\n1\n1'),t('0','0\n0\n0'),t('59','0\n0\n59'),t('3600','1\n0\n0'),t('86400','24\n0\n0')
 ],true,'Use divisão inteira para obter unidades completas e % para obter o que sobra.',studio('operacoes_aritmeticas/divisoes_inteiras.por')),
 q('imc','Cálculo do IMC','Aula 2 · Cálculos','Básico','Leia peso em kg e altura em metros, ambos reais. Se algum for <= 0, mostre Dados invalidos. Caso contrário, mostre apenas o IMC, calculado por peso / (altura * altura). Não classifique o resultado.',[
  t('80\n2','20'),t('72\n1.5','32'),t('0\n1.7','Dados invalidos'),t('60\n0','Dados invalidos'),t('-1\n1.5','Dados invalidos')
 ],true,'Parênteses garantem que você divida pelo quadrado da altura.',aula('Aula 2, operações matemáticas')),
 q('media-ponderada','Média ponderada de quatro notas','Aula 2 · Cálculos','Intermediário','Leia quatro notas reais válidas entre 0 e 10. Os pesos, na mesma ordem, são 2, 3, 4 e 1. Mostre a média ponderada: soma dos produtos nota * peso dividida pela soma dos pesos. As entradas sempre são válidas.',[
  t('6\n7\n8\n9','7.4'),t('0\n0\n0\n0','0'),t('10\n10\n10\n10','10'),t('10\n0\n0\n0','2'),t('0\n0\n10\n0','4')
 ],true,'Os pesos somam 10. Não divida a soma ponderada pela quantidade de notas.',aula('Aula 3, exercício de média ponderada')),
 q('triangulo-tipo','Classificação de triângulos','Aula 3 · Condições','Intermediário','Leia três lados reais. Se algum for <= 0 ou a soma de dois lados não for estritamente maior que o terceiro, mostre NAO FORMA TRIANGULO. Caso contrário, mostre EQUILATERO para três lados iguais, ISOSCELES para exatamente dois iguais ou ESCALENO para todos diferentes.',[
  t('3\n3\n3','EQUILATERO'),t('3\n3\n4','ISOSCELES'),t('3\n4\n5','ESCALENO'),t('1\n2\n3','NAO FORMA TRIANGULO'),t('0\n2\n2','NAO FORMA TRIANGULO'),t('4\n3\n3','ISOSCELES')
 ],false,'Verifique primeiro se existe triângulo. Depois classifique os lados.',studio('desvios_condicionais/tipo_triangulo.por')),
 q('mes','Número do mês','Aula 3 · Condições','Básico','Leia um inteiro. De 1 a 12, mostre o mês correspondente em minúsculas, sem acentos: janeiro, fevereiro, marco, abril, maio, junho, julho, agosto, setembro, outubro, novembro ou dezembro. Para outro valor, mostre Mes invalido. Pratique a estrutura escolha/caso; os testes verificam o resultado.',[
  t('1','janeiro'),t('3','marco'),t('10','outubro'),t('12','dezembro'),t('0','Mes invalido'),t('13','Mes invalido')
 ],false,'Cada caso pode escrever um mês e terminar com pare. Use caso contrario para inválidos.',aula('Aula 3, escolha múltipla')),
 q('bhaskara','Raízes da equação do segundo grau','Aula 3 · Condições','Desafio','Leia A, B e C reais da equação A*x²+B*x+C=0. Se A for zero ou delta = B*B-4*A*C for negativo, mostre Impossivel calcular. Caso contrário, mostre (-B + raiz de delta)/(2*A) na primeira linha e (-B - raiz de delta)/(2*A) na segunda. Para delta zero, mostre a mesma raiz duas vezes.',[
  t('1\n-3\n2','2\n1'),t('1\n-2\n1','1\n1'),t('0\n2\n1','Impossivel calcular'),t('1\n0\n1','Impossivel calcular'),t('-1\n3\n-2','1\n2')
 ],true,'Valide A e delta antes da divisão e da raiz. A biblioteca Matematica oferece raiz(delta, 2.0).',aula('Aula 3, exercício de Bhaskara')),
 q('regressiva','Contagem regressiva com enquanto','Aula 3 · Enquanto','Básico','Leia um inteiro N entre 0 e 20. Mostre N, N-1, ..., 0, um por linha. Depois mostre FIM em uma nova linha. Pratique enquanto; os testes verificam o resultado.',[
  t('3','3\n2\n1\n0\nFIM'),t('0','0\nFIM'),t('1','1\n0\nFIM'),t('5','5\n4\n3\n2\n1\n0\nFIM')
 ],false,'O zero deve aparecer. Atualize o contador em toda volta para evitar laço infinito.',studio('lacos_repeticao/contagem_regressiva.por')),
 q('media-dez','Média de dez números com enquanto','Aula 3 · Enquanto','Intermediário','Leia exatamente 10 números reais e mostre apenas a média aritmética. Os números podem ser negativos ou zero. Pratique enquanto usando contador e acumulador; os testes verificam o resultado.',[
  t('1\n2\n3\n4\n5\n6\n7\n8\n9\n10','5.5'),t(Array(10).fill('0').join('\n'),'0'),t(Array(10).fill('-2').join('\n'),'-2'),t(Array(10).fill('1.5').join('\n'),'1.5')
 ],true,'Comece soma em zero e conte as dez leituras. Mostre soma / 10 fora do laço.',studio('lacos_repeticao/media_dez_numeros.por')),
 q('nota-valida','Repetir até uma nota válida','Aula 3 · Enquanto','Intermediário','Leia notas reais até receber a primeira nota válida no intervalo fechado [0, 10]. Para cada nota inválida, mostre Nota invalida em uma linha. Ao receber uma válida, mostre somente essa nota na última linha e encerre. Toda entrada de teste contém uma nota válida ao final.',[
  t('-1\n11\n7.5','Nota invalida\nNota invalida\n7.5'),t('0','0'),t('10','10'),t('10.1\n-0.1\n5','Nota invalida\nNota invalida\n5'),t('4','4')
 ],true,'Faça nova leitura quando a nota for inválida. Não use retorne no erro: aqui é necessário tentar novamente.',studio('lacos_repeticao/consistencia.por')),
 q('votacao','Contagem de votos até zero','Aula 3 · Enquanto','Intermediário','Leia inteiros até receber 0, que encerra sem contar como voto. Conte votos 1 para candidato A, 2 para candidato B, 3 para branco e qualquer outro inteiro para nulo. Mostre as quatro contagens, nessa ordem, uma por linha.',[
  t('1\n2\n1\n3\n9\n0','2\n1\n1\n1'),t('0','0\n0\n0\n0'),t('-1\n7\n0','0\n0\n0\n2'),t('3\n3\n2\n0','0\n1\n2\n0')
 ],true,'Leia antes de testar o zero. Não conte o marcador de encerramento.',studio('lacos_repeticao/eleicao.por')),
 q('soma-pares','Soma dos pares até N','Aula 3 · Repetições','Básico','Leia um inteiro N entre 0 e 1000. Some os números pares positivos menores ou iguais a N e mostre apenas a soma. Para N menor que 2, a soma é zero.',[
  t('6','12'),t('7','12'),t('0','0'),t('1','0'),t('2','2'),t('10','30')
 ],true,'Comece em 2 e avance de dois em dois, acumulando a soma.',aula('Aula 3, laços e acumuladores')),
 q('conta-primos','Quantos números são primos?','Aula 3 · Repetições','Desafio','Leia N (1 a 20) e depois N inteiros entre -100 e 1000. Mostre quantos deles são primos. Um primo é maior que 1 e tem exatamente dois divisores positivos. Conte ocorrências repetidas separadamente.',[
  t('5\n2\n3\n4\n1\n-7','2'),t('4\n0\n1\n-2\n9','0'),t('3\n2\n2\n2','3'),t('5\n5\n7\n11\n13\n17','5'),t('4\n25\n49\n97\n100','1')
 ],true,'Para cada número, reinicie a contagem de divisores. Zero, um e negativos não são primos.',aula('Aula 3, contadores e modularização com primos')),
 q('vetor-inverso','Vetor na ordem inversa','Aula 4 · Vetores','Intermediário','Leia N (1 a 100), depois N inteiros e armazene-os em um vetor. Mostre os elementos do último para o primeiro, um por linha.',[
  t('4\n3\n-1\n7\n2','2\n7\n-1\n3'),t('1\n9','9'),t('3\n0\n0\n0','0\n0\n0'),t('3\n-1\n-2\n-3','-3\n-2\n-1')
 ],true,'O último índice utilizado é N-1. Leia tudo antes de exibir de trás para frente.',aula('Aula 4, vetores unidimensionais')),
 q('busca-vetor','Busca: primeira posição no vetor','Aula 4 · Vetores','Intermediário','Leia N (1 a 100), depois N inteiros para um vetor e, por último, o inteiro procurado. Mostre o índice da primeira ocorrência, começando em zero. Se não existir, mostre -1.',[
  t('5\n4\n7\n4\n9\n1\n4','0'),t('3\n1\n2\n3\n3','2'),t('3\n1\n2\n3\n8','-1'),t('1\n-5\n-5','0'),t('4\n0\n1\n1\n2\n1','1')
 ],true,'Guarde -1 inicialmente. Ao encontrar, preserve a primeira posição.',studio('vetores_matrizes/pesquisa_vetor.por')),
 q('vetor-acima-media','Vetor: valores acima da média','Aula 4 · Vetores','Intermediário','Leia N (1 a 100) e N números reais para um vetor. Mostre a média aritmética na primeira linha e a quantidade de elementos estritamente maiores que a média na segunda. Valores iguais à média não contam.',[
  t('4\n1\n2\n3\n4','2.5\n2'),t('1\n7','7\n0'),t('3\n2\n2\n2','2\n0'),t('3\n-3\n-2\n-1','-2\n1'),t('4\n0\n0\n0\n4','1\n1')
 ],true,'Primeiro leia e calcule a média. Depois percorra o vetor novamente para contar.',aula('Aula 4, média de valores em vetores')),
 q('diagonal','Soma da diagonal principal','Aula 4 · Matrizes','Intermediário','Leia 9 números inteiros e armazene-os em uma matriz 3 por 3, preenchida linha por linha. Mostre a soma da diagonal principal: posições [0][0], [1][1] e [2][2].',[
  t('1\n2\n3\n4\n5\n6\n7\n8\n9','15'),t('0\n9\n9\n9\n0\n9\n9\n9\n0','0'),t('-1\n0\n0\n0\n-2\n0\n0\n0\n-3','-6'),t('5\n0\n0\n0\n5\n0\n0\n0\n5','15')
 ],true,'Na diagonal principal o índice da linha é igual ao da coluna.',studio('vetores_matrizes/diagonal_principal.por')),
 q('soma-linhas','Soma de cada linha da matriz','Aula 4 · Matrizes','Intermediário','Leia 6 inteiros para uma matriz 2 por 3, linha por linha. Mostre a soma da primeira linha e depois a soma da segunda, uma por linha.',[
  t('1\n2\n3\n4\n5\n6','6\n15'),t('-1\n0\n1\n2\n-2\n0','0\n0'),t('0\n0\n0\n0\n0\n0','0\n0'),t('10\n10\n10\n-1\n-2\n-3','30\n-6')
 ],true,'Reinicie o acumulador ao começar cada linha.',aula('Aula 4, vetores bidimensionais')),
 q('funcao-maior','Função: maior de dois valores','Aulas 3 e 4 · Funções','Intermediário','Crie a função inteiro maior_de_dois com dois parâmetros inteiros, retornando o maior deles. Na função inicio, leia dois inteiros, chame maior_de_dois e mostre seu retorno. Se forem iguais, retorne esse valor.',[
  t('4\n9','9'),t('7\n2','7'),t('-5\n-2','-2'),t('3\n3','3'),t('0\n-1','0')
 ],true,'A função retorna o valor com retorne. A leitura e a escrita ficam em inicio.',studio('subrotinas/procedimento_funcao.por'),{name:'maior_de_dois',type:'inteiro'}),
 q('funcao-par','Função lógica de paridade','Aulas 3 e 4 · Funções','Intermediário','Crie a função logico eh_par com um parâmetro inteiro, retornando verdadeiro se ele for par e falso caso contrário. Na função inicio, leia um inteiro e chame eh_par para decidir entre escrever PAR ou IMPAR. Zero e pares negativos também são pares.',[
  t('2','PAR'),t('0','PAR'),t('-4','PAR'),t('7','IMPAR'),t('-3','IMPAR')
 ],false,'Uma expressão como n % 2 == 0 já produz um valor lógico que pode ser retornado.',aula('Aula 3, retorno lógico e parâmetros'),{name:'eh_par',type:'logico'})
];
