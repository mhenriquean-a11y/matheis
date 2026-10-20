// Contratos de entrada e saída; não contém soluções das questões.
export const statements = {
  "soma": {
    "goal": "Um caixa precisa totalizar dois valores informados.",
    "input": "Dois números reais, um por linha.",
    "output": "Um número real: a soma dos valores.",
    "rules": "Valores negativos e zero são permitidos. Não apresente rótulos ou perguntas."
  },
  "calculadora": {
    "goal": "Implemente uma calculadora que execute uma única operação escolhida.",
    "input": "Uma opção inteira e, em seguida, dois números reais A e B, um por linha.",
    "output": "Um resultado numérico ou uma das mensagens Opcao invalida e Divisao por zero.",
    "rules": "Opções: 1 soma; 2 subtração; 3 multiplicação; 4 divisão de A por B. Outra opção é inválida. Na divisão, B não pode ser zero. Mesmo com opção inválida, as três entradas são fornecidas."
  },
  "potencia": {
    "goal": "Determine o quadrado de um valor informado.",
    "input": "Um número real.",
    "output": "Apenas o quadrado do número.",
    "rules": "Valores negativos e zero também são válidos."
  },
  "area-circulo": {
    "goal": "Calcule a área de uma região circular.",
    "input": "Um raio real.",
    "output": "A área ou a mensagem Raio invalido.",
    "rules": "Considere pi = 3.14. O raio deve ser estritamente positivo. Não arredonde o resultado."
  },
  "operacoes": {
    "goal": "Produza um relatório com as quatro operações aritméticas entre dois valores.",
    "input": "Dois reais A e B, nessa ordem.",
    "output": "Quatro linhas: soma, diferença A-B, produto e quociente A/B.",
    "rules": "Se B for zero, substitua somente a quarta linha pela mensagem Divisao por zero. As outras três operações continuam sendo exibidas."
  },
  "vendedor": {
    "goal": "Uma loja paga um valor fixo acrescido de comissão pelas vendas. Determine o salário final.",
    "input": "Salário fixo real e total real de vendas, nessa ordem.",
    "output": "O salário final ou Dados invalidos.",
    "rules": "Regra fictícia: a comissão é 15% das vendas. Nenhum dos dois valores pode ser negativo. Zero é permitido."
  },
  "inss": {
    "goal": "Determine uma contribuição usando uma tabela fictícia de treino.",
    "input": "Um salário real.",
    "output": "Somente a contribuição ou Salario invalido.",
    "rules": "Até 1000 inclusive: 8%; acima de 1000 até 2000 inclusive: 9%; acima de 2000: 11%. A taxa se aplica ao salário inteiro, sem cálculo progressivo. Salário deve ser > 0. Estas não são as regras legais atuais."
  },
  "equacao": {
    "goal": "Classifique ou resolva a equação do primeiro grau A*x + B = 0.",
    "input": "Os coeficientes reais A e B, nessa ordem.",
    "output": "Uma raiz real, Infinitas solucoes ou Sem solucao.",
    "rules": "Quando A é diferente de zero, há uma raiz. Com A e B iguais a zero, há infinitas soluções. Com A igual a zero e B diferente de zero, não há solução."
  },
  "expressao": {
    "goal": "Avalie uma expressão aritmética respeitando sua estrutura.",
    "input": "Dois reais A e B.",
    "output": "O valor da expressão (A+B)*2 - A/2.",
    "rules": "Preserve a prioridade das operações e utilize divisão real. Não arredonde."
  },
  "prestacao": {
    "goal": "Uma compra terá acréscimo percentual antes de ser dividida em parcelas iguais.",
    "input": "Valor real da compra, percentual real de acréscimo e quantidade inteira de parcelas, nessa ordem.",
    "output": "O valor de uma parcela ou Dados invalidos.",
    "rules": "Compra e percentual devem ser >= 0; parcelas deve ser > 0. Regra do treino: prestação = valor*(1+percentual/100)/parcelas. Não arredonde."
  },
  "consumo": {
    "goal": "Calcule o rendimento de um automóvel durante uma viagem.",
    "input": "Distância real em km e litros reais consumidos, nessa ordem.",
    "output": "O consumo médio em km/L ou Dados invalidos.",
    "rules": "A distância deve ser >= 0 e os litros > 0. Consumo médio é a distância percorrida por litro gasto. Não converta a distância para metros."
  },
  "idade": {
    "goal": "Estime a quantidade de dias correspondente a uma idade em anos completos.",
    "input": "Uma idade inteira em anos.",
    "output": "A estimativa em dias ou Idade invalida.",
    "rules": "Considere 365 dias por ano e ignore anos bissextos. Idade zero é válida; idade negativa é inválida."
  },
  "quadrado": {
    "goal": "Calcule a área de um terreno quadrado.",
    "input": "Um lado real.",
    "output": "A área ou Medida invalida.",
    "rules": "O lado deve ser maior que zero."
  },
  "triangulo": {
    "goal": "Calcule a área de uma região triangular a partir da base e da altura.",
    "input": "Base real e altura real, nessa ordem.",
    "output": "A área ou Medida invalida.",
    "rules": "As duas medidas devem ser estritamente positivas. A área pode ter parte decimal; não arredonde."
  },
  "perimetro": {
    "goal": "Determine o comprimento da borda de uma região circular.",
    "input": "Um raio real.",
    "output": "O perímetro ou Raio invalido.",
    "rules": "Use pi = 3.14. O raio deve ser > 0. A resposta é o comprimento da circunferência, não sua área."
  },
  "par": {
    "goal": "Classifique um inteiro de acordo com sua paridade.",
    "input": "Um número inteiro.",
    "output": "Exatamente PAR ou IMPAR.",
    "rules": "Zero é par. Números negativos também devem ser classificados."
  },
  "media": {
    "goal": "Determine a situação de um aluno a partir de duas notas.",
    "input": "Duas notas reais, uma por linha.",
    "output": "Nota invalida, Aprovado, Recuperacao ou Reprovado.",
    "rules": "Cada nota deve estar em [0,10]. Para notas válidas, use média aritmética: >= 7 aprova; de 5 inclusive até 7 exclusivo é recuperação; abaixo de 5 reprova. Dados inválidos não devem produzir classificação."
  },
  "salario": {
    "goal": "Uma empresa adota três faixas de reajuste salarial. Determine o salário após o aumento.",
    "input": "Um salário real estritamente positivo; a entrada sempre é válida.",
    "output": "Somente o novo salário.",
    "rules": "Salário abaixo de 500 recebe aumento de 15%; de 500 a 1000 inclusive, 10%; acima de 1000, 5%. O aumento incide sobre todo o salário."
  },
  "intervalo": {
    "goal": "Analise um lote de valores e separe os que pertencem a um intervalo aberto.",
    "input": "Exatamente 10 números inteiros.",
    "output": "Duas linhas: quantidade dentro e quantidade fora do intervalo.",
    "rules": "O intervalo é (10,20): 10 e 20 ficam fora. Cada valor deve ser contado em exatamente um grupo."
  },
  "soma-zero": {
    "goal": "Some os valores de uma sequência cujo encerramento é indicado por zero.",
    "input": "Inteiros, um por linha, até o primeiro 0.",
    "output": "Somente a soma dos valores anteriores ao zero.",
    "rules": "Use enquanto. Inclua valores negativos. O zero é apenas marcador de parada. Se vier primeiro, a soma é zero."
  },
  "fatorial": {
    "goal": "Determine o fatorial de um inteiro não negativo.",
    "input": "Um inteiro N entre 0 e 10.",
    "output": "Somente N!.",
    "rules": "Considere 0! = 1 e 1! = 1."
  },
  "funcao": {
    "goal": "Organize o cálculo de uma média em uma função com retorno.",
    "input": "Dois números reais.",
    "output": "Somente a média aritmética.",
    "rules": "Declare funcao real calcular_media com dois parâmetros reais e chame-a em inicio. A função deve retornar a média. A estrutura é conferida além da saída."
  },
  "decimal-binario": {
    "goal": "Represente um número decimal usando o sistema binário.",
    "input": "Um inteiro N entre 0 e 1023.",
    "output": "Sua representação binária como texto, sem zeros à esquerda.",
    "rules": "Para zero, a saída é 0. Use enquanto com divisões inteiras sucessivas por 2 e uma cadeia para representar os dígitos."
  },
  "vetor-extremos": {
    "goal": "Determine os extremos e a amplitude de um conjunto armazenado em vetor.",
    "input": "Um inteiro N entre 1 e 100, seguido de N inteiros.",
    "output": "Três linhas: maior valor, menor valor e amplitude.",
    "rules": "Armazene os N valores em um vetor. Amplitude é maior menos menor. Valores repetidos e negativos são permitidos."
  },
  "ordenado": {
    "goal": "Verifique se os valores de um vetor estão em ordem crescente não estrita.",
    "input": "N entre 1 e 100, seguido de N inteiros.",
    "output": "SIM ou NAO.",
    "rules": "SIM significa que nenhum valor é menor que o anterior. Repetições são permitidas. Um vetor com um único elemento está ordenado."
  },
  "sequencia": {
    "goal": "Encontre o maior trecho consecutivo em que os valores aumentam estritamente.",
    "input": "N entre 1 e 100, seguido de N inteiros para um vetor.",
    "output": "O tamanho do maior trecho crescente.",
    "rules": "Os elementos devem ser vizinhos no vetor. Valores iguais encerram o trecho. Um único elemento forma trecho de tamanho 1."
  },
  "palindromo": {
    "goal": "Verifique se uma palavra é a mesma nos dois sentidos de leitura.",
    "input": "Uma palavra sem espaços e sem acentos.",
    "output": "SIM ou NAO.",
    "rules": "Ignore diferenças entre maiúsculas e minúsculas. Palavras com uma única letra são palíndromos."
  },
  "binario-decimal": {
    "goal": "Valide um texto binário e determine o inteiro decimal que ele representa.",
    "input": "Uma cadeia não vazia de até 30 caracteres.",
    "output": "O inteiro correspondente ou INVALIDO.",
    "rules": "Somente os caracteres 0 e 1 são aceitos. Zeros à esquerda são permitidos. Qualquer outro caractere torna toda a entrada inválida."
  },
  "resistencias": {
    "goal": "Determine a resistência equivalente de um conjunto ligado em série e em paralelo.",
    "input": "N entre 1 e 50, seguido de N resistências reais para um vetor.",
    "output": "Duas linhas: equivalente em série e equivalente em paralelo; ou somente VALOR INVALIDO.",
    "rules": "Todas as resistências devem ser > 0. Em série, as resistências se somam. Em paralelo, o inverso da equivalente é a soma dos inversos. Arredonde só os resultados para 2 casas usando Matematica.arredondar; zeros à direita são opcionais."
  },
  "matriz": {
    "goal": "Totalize os elementos de uma matriz retangular.",
    "input": "Seis inteiros para uma matriz 2 por 3, na ordem das linhas.",
    "output": "Somente a soma de todos os elementos.",
    "rules": "Armazene os dados na matriz. Cada linha recebe três elementos. Valores negativos e zero são válidos."
  },
  "altura-media": {
    "goal": "Determine a altura média de três pessoas.",
    "input": "Três alturas reais em metros.",
    "output": "A média ou Altura invalida.",
    "rules": "As três alturas devem ser > 0. Não arredonde o resultado."
  },
  "duracao": {
    "goal": "Apresente uma duração em unidades de tempo maiores.",
    "input": "Um total inteiro de segundos entre 0 e 1000000.",
    "output": "Três linhas: horas completas, minutos restantes e segundos restantes.",
    "rules": "A quantidade de horas pode ultrapassar 23; minutos e segundos ficam entre 0 e 59. Não use formato com dois pontos."
  },
  "imc": {
    "goal": "Calcule o índice de massa corporal de uma pessoa, sem classificação.",
    "input": "Peso real em kg e altura real em metros.",
    "output": "O IMC ou Dados invalidos.",
    "rules": "Peso e altura devem ser > 0. Use IMC = peso/altura². Não apresente avaliação de saúde nem arredonde."
  },
  "media-ponderada": {
    "goal": "Determine a média ponderada de quatro avaliações.",
    "input": "Quatro notas reais entre 0 e 10, na ordem N1, N2, N3 e N4.",
    "output": "Somente a média ponderada.",
    "rules": "As entradas são válidas. Os pesos são 2, 3, 4 e 1, respectivamente. A média ponderada é a soma dos produtos das notas pelos pesos, dividida pela soma dos pesos."
  },
  "triangulo-tipo": {
    "goal": "Verifique se três segmentos formam um triângulo e classifique-o.",
    "input": "Três lados reais.",
    "output": "NAO FORMA TRIANGULO, EQUILATERO, ISOSCELES ou ESCALENO.",
    "rules": "Cada lado deve ser > 0 e menor que a soma dos outros dois. Triângulo válido com três lados iguais é equilátero; exatamente dois iguais, isósceles; todos diferentes, escaleno."
  },
  "mes": {
    "goal": "Associe um número ao mês correspondente.",
    "input": "Um número inteiro.",
    "output": "O nome do mês em minúsculas e sem acentos ou Mes invalido.",
    "rules": "1 corresponde a janeiro e 12 a dezembro. Para março, escreva marco. Valores fora de [1,12] são inválidos. Pratique escolha/caso; os testes conferem a saída."
  },
  "bhaskara": {
    "goal": "Determine as raízes reais de uma equação do segundo grau.",
    "input": "Coeficientes reais A, B e C de A*x²+B*x+C=0.",
    "output": "Duas raízes, uma por linha, ou Impossivel calcular.",
    "rules": "A deve ser diferente de zero e delta = B²-4AC deve ser >= 0. A primeira raiz usa +raiz(delta) e a segunda usa -raiz(delta), ambas divididas por 2A. Com delta zero, mostre a mesma raiz duas vezes."
  },
  "regressiva": {
    "goal": "Apresente uma contagem regressiva até zero.",
    "input": "Um inteiro N entre 0 e 20.",
    "output": "N, N-1, ..., 0, um por linha; depois FIM em uma nova linha.",
    "rules": "Zero deve aparecer. Pratique enquanto; os testes conferem a saída."
  },
  "media-dez": {
    "goal": "Calcule a média de um lote com quantidade fixa de valores.",
    "input": "Exatamente 10 números reais.",
    "output": "Somente a média aritmética.",
    "rules": "Negativos e zero são válidos e participam da média. Pratique enquanto com contador e acumulador; os testes conferem a saída."
  },
  "nota-valida": {
    "goal": "Solicite novas notas enquanto os valores informados forem inválidos.",
    "input": "Notas reais até a primeira nota no intervalo [0,10].",
    "output": "Uma linha com Nota invalida para cada erro; ao final, uma linha com a nota válida.",
    "rules": "0 e 10 são válidos. Todo teste contém uma nota válida. Não leia depois dela nem encerre na primeira tentativa inválida."
  },
  "votacao": {
    "goal": "Conte os votos de uma eleição simulada.",
    "input": "Códigos inteiros até receber 0.",
    "output": "Quatro linhas: votos de A, de B, brancos e nulos.",
    "rules": "Código 1 vota em A; 2 em B; 3 é branco; qualquer outro inteiro diferente de 0 é nulo. O zero apenas encerra e não é contado."
  },
  "soma-pares": {
    "goal": "Some os números pares positivos que não ultrapassam um limite.",
    "input": "Um inteiro N entre 0 e 1000.",
    "output": "Somente a soma.",
    "rules": "Inclua N se for par. Se não houver par positivo na faixa, a soma é zero."
  },
  "conta-primos": {
    "goal": "Determine quantos valores de um lote são números primos.",
    "input": "N entre 1 e 20, seguido de N inteiros entre -100 e 1000.",
    "output": "A quantidade de ocorrências de primos.",
    "rules": "Primo é inteiro > 1 com exatamente dois divisores positivos. Conte repetições separadamente. Zero, um e negativos não são primos."
  },
  "vetor-inverso": {
    "goal": "Apresente os valores de um vetor do último para o primeiro.",
    "input": "N entre 1 e 100, seguido de N inteiros.",
    "output": "Os N elementos em ordem inversa, um por linha.",
    "rules": "Armazene as entradas em um vetor. Não ordene os valores; apenas inverta a ordem de apresentação."
  },
  "busca-vetor": {
    "goal": "Localize a primeira ocorrência de um valor em um vetor.",
    "input": "N entre 1 e 100, depois N inteiros e, por último, o inteiro procurado.",
    "output": "O índice da primeira ocorrência ou -1 se não existir.",
    "rules": "Índices começam em zero. Em caso de repetição, deve prevalecer a menor posição."
  },
  "vetor-acima-media": {
    "goal": "Compare os valores de um vetor com a média do próprio conjunto.",
    "input": "N entre 1 e 100, seguido de N números reais.",
    "output": "Duas linhas: média aritmética e quantidade de elementos acima dela.",
    "rules": "Valores iguais à média não contam como acima. Negativos e zero são permitidos. Não arredonde a média antes de comparar."
  },
  "diagonal": {
    "goal": "Some os elementos da diagonal principal de uma matriz.",
    "input": "Nove inteiros para uma matriz 3 por 3, na ordem das linhas.",
    "output": "Somente a soma da diagonal principal.",
    "rules": "A diagonal principal contém [0][0], [1][1] e [2][2]. Os outros elementos não participam da soma."
  },
  "soma-linhas": {
    "goal": "Apresente separadamente o total de cada linha de uma matriz.",
    "input": "Seis inteiros para uma matriz 2 por 3, na ordem das linhas.",
    "output": "Duas linhas: soma da primeira linha e soma da segunda.",
    "rules": "Cada total deve incluir somente os três elementos da linha correspondente."
  },
  "funcao-maior": {
    "goal": "Encapsule em uma função a escolha do maior entre dois valores.",
    "input": "Dois inteiros.",
    "output": "Somente o maior valor.",
    "rules": "Declare funcao inteiro maior_de_dois com dois parâmetros inteiros; chame-a em inicio. Se os valores forem iguais, retorne esse valor."
  },
  "funcao-par": {
    "goal": "Use o retorno lógico de uma função para classificar paridade.",
    "input": "Um inteiro.",
    "output": "PAR ou IMPAR.",
    "rules": "Declare funcao logico eh_par com um parâmetro inteiro e chame-a em inicio. Retorne verdadeiro para pares e falso para ímpares. Zero e pares negativos são pares."
  },
  "boas-vindas": {
    "goal": "Personalize a mensagem de entrada de um sistema.",
    "input": "Uma única palavra contendo o nome, sem espaços.",
    "output": "Uma linha no formato Bem vindo NOME, substituindo NOME pelo texto lido.",
    "rules": "Preserve as letras do nome como foram informadas. Há exatamente um espaço entre a mensagem e o nome."
  },
  "troca-valores": {
    "goal": "Reorganize o conteúdo de duas variáveis sem perder os valores originais.",
    "input": "Dois inteiros A e B.",
    "output": "Duas linhas: o novo A e o novo B.",
    "rules": "Ao final, A deve conter o valor original de B e B o original de A. Pratique o uso de variável auxiliar; os testes conferem o resultado."
  },
  "rotacao-tres": {
    "goal": "Realize uma rotação entre três valores armazenados.",
    "input": "Três inteiros A, B e C.",
    "output": "Três linhas: novos A, B e C.",
    "rules": "O novo A recebe o C original; o novo B recebe o A original; o novo C recebe o B original. Considere sempre os valores anteriores à rotação."
  },
  "vizinhos-inteiro": {
    "goal": "Determine os vizinhos imediatos de um número inteiro.",
    "input": "Um inteiro de -10000 a 10000.",
    "output": "Duas linhas: antecessor e sucessor.",
    "rules": "Não inclua o próprio número na saída."
  },
  "vertices-euler": {
    "goal": "Determine o número de vértices de um poliedro convexo.",
    "input": "Quantidade inteira de faces F e depois quantidade inteira de arestas A.",
    "output": "Somente a quantidade de vértices V.",
    "rules": "Os dados descrevem um poliedro válido. Utilize a relação de Euler: V - A + F = 2."
  },
  "retangulo-medidas": {
    "goal": "Um terreno retangular precisa ter sua área e seu contorno calculados.",
    "input": "Base real e altura real.",
    "output": "Duas linhas: área e perímetro; ou apenas Medida invalida.",
    "rules": "Ambas as medidas devem ser > 0. Não arredonde. O perímetro corresponde ao contorno completo."
  },
  "celsius-fahrenheit": {
    "goal": "Converta a leitura de um termômetro para outra escala.",
    "input": "Uma temperatura real em Celsius.",
    "output": "Somente a temperatura em Fahrenheit.",
    "rules": "Use a relação F = C*9.0/5.0 + 32. Negativos são válidos. Não arredonde."
  },
  "tempo-viagem": {
    "goal": "Estime a duração de uma viagem com velocidade média constante.",
    "input": "Distância real em km e velocidade real em km/h.",
    "output": "O tempo em horas ou Dados invalidos.",
    "rules": "Distância deve ser >= 0 e velocidade > 0. Não converta o resultado para minutos nem acrescente unidade à saída."
  },
  "preco-desconto": {
    "goal": "Determine o preço cobrado depois de um desconto promocional.",
    "input": "Preço real e percentual real de desconto.",
    "output": "O preço final ou Dados invalidos.",
    "rules": "Preço deve ser >= 0; percentual, de 0 a 100 inclusive. O desconto incide sobre todo o preço. Não arredonde."
  },
  "delta-coeficientes": {
    "goal": "Determine o discriminante de uma expressão quadrática.",
    "input": "Três reais A, B e C.",
    "output": "Somente o discriminante delta.",
    "rules": "Delta = B² - 4AC. Resultados negativos e A igual a zero são permitidos. Não calcule as raízes."
  },
  "decompor-valor": {
    "goal": "Represente um valor usando notas de 10, notas de 5 e unidades de 1.",
    "input": "Um inteiro de 0 a 10000.",
    "output": "Três linhas: quantidade de notas de 10, de 5 e de unidades de 1.",
    "rules": "Priorize a maior quantidade possível de notas de 10; depois, a maior quantidade de notas de 5. O restante fica em unidades."
  },
  "media-tres-reais": {
    "goal": "Resuma um conjunto de três medições pela média aritmética.",
    "input": "Três números reais.",
    "output": "Somente a média aritmética.",
    "rules": "Não trate as entradas como notas ou alturas: qualquer valor real informado é válido, incluindo negativos e zero."
  },
  "sinal-numero": {
    "goal": "Classifique um valor de acordo com seu sinal.",
    "input": "Um número real.",
    "output": "Exatamente POSITIVO, NEGATIVO ou ZERO.",
    "rules": "Mostre uma única classificação. Considere também números fracionários próximos de zero."
  },
  "maior-tres": {
    "goal": "Encontre o maior valor de um conjunto de três inteiros.",
    "input": "Três números inteiros.",
    "output": "Somente o maior deles.",
    "rules": "Valores iguais e negativos são permitidos. Não é necessário indicar a posição."
  },
  "ordenar-tres": {
    "goal": "Organize três valores do menor para o maior.",
    "input": "Três inteiros.",
    "output": "Os três valores em ordem crescente, um por linha.",
    "rules": "Preserve repetições. Não elimine valores iguais."
  },
  "verifica-multiplo": {
    "goal": "Verifique se um inteiro é múltiplo de outro.",
    "input": "Inteiros A e B.",
    "output": "MULTIPLO, NAO MULTIPLO ou Divisor invalido.",
    "rules": "B não pode ser zero. Para B diferente de zero, A é múltiplo se sua divisão por B não deixa resto. A igual a zero é permitido."
  },
  "intervalo-fechado": {
    "goal": "Verifique se uma medição pertence a uma faixa com limites inclusivos.",
    "input": "Reais X, L e U: valor, limite inferior e limite superior.",
    "output": "DENTRO, FORA ou Intervalo invalido.",
    "rules": "L deve ser <= U. Os limites pertencem à faixa. Um intervalo com L igual a U é válido e contém apenas esse valor."
  },
  "valores-aceitos": {
    "goal": "Aplique simultaneamente os critérios de aceitação de um conjunto.",
    "input": "Quatro inteiros A, B, C e D.",
    "output": "Exatamente valores aceitos ou valores nao aceitos.",
    "rules": "Aceite somente se B>C, D>A, C+D>A+B, C>0, D>0 e A for par. Todas as condições são obrigatórias."
  },
  "media-com-exame": {
    "goal": "Determine a situação acadêmica usando média ponderada e, quando necessário, exame final.",
    "input": "Quatro notas reais válidas em [0,10]. Somente no caso de recuperação, há uma quinta nota válida de exame.",
    "output": "Apenas Aprovado ou Reprovado.",
    "rules": "Pesos das quatro notas: 2, 3, 4 e 1. Média >= 7 aprova; média < 5 reprova; média em [5,7) exige exame. Regra autoral para o exame: média final = (média ponderada + exame)/2; aprove se >= 5. Não leia exame nos outros casos."
  },
  "dia-semana": {
    "goal": "Associe códigos numéricos a dias da semana.",
    "input": "Um inteiro.",
    "output": "O nome do dia em minúsculas e sem acentos, ou Dia invalido.",
    "rules": "1: domingo; 2: segunda; 3: terca; 4: quarta; 5: quinta; 6: sexta; 7: sabado. Pratique escolha/caso; os testes conferem a saída."
  },
  "tarifa-veiculo": {
    "goal": "Calcule uma cobrança de estacionamento usando uma tabela fictícia.",
    "input": "Código inteiro do veículo e quantidade inteira de horas.",
    "output": "Somente o total ou Dados invalidos.",
    "rules": "Código 1: 3 reais/hora; 2: 5 reais/hora; 3: 8 reais/hora. Horas deve ser > 0. Códigos fora de [1,3] são inválidos. Não há cobrança progressiva."
  },
  "ingresso-idade": {
    "goal": "Determine o preço de um ingresso segundo uma tabela etária fictícia.",
    "input": "Uma idade inteira.",
    "output": "O preço ou Idade invalida.",
    "rules": "De 0 a 5 anos: 0; de 6 a 17: 10; de 18 a 59: 20; de 60 em diante: 10. Idade negativa é inválida."
  },
  "tabuada-dez": {
    "goal": "Apresente os dez primeiros múltiplos de um número, a partir de uma vez esse número.",
    "input": "Um inteiro N entre -100 e 100.",
    "output": "Dez linhas com os produtos N*1, N*2, ..., N*10, nessa ordem.",
    "rules": "Mostre somente os resultados numéricos. Não acrescente x, = ou títulos."
  },
  "soma-impares-faixa": {
    "goal": "Totalize os números ímpares de uma faixa de inteiros.",
    "input": "Inteiros L e U, com -1000 <= L <= U <= 1000.",
    "output": "Somente a soma dos ímpares na faixa.",
    "rules": "Inclua os dois limites se forem ímpares. Ímpares negativos também participam. Sem ímpares, a soma é zero."
  },
  "produto-valores": {
    "goal": "Calcule o produto de um lote com tamanho informado na entrada.",
    "input": "N entre 1 e 8, seguido de N inteiros entre -5 e 5.",
    "output": "Somente o produto dos N valores.",
    "rules": "Negativos e zero são válidos. Cada valor participa uma única vez."
  },
  "contagem-sinais": {
    "goal": "Separe um lote em três grupos conforme o sinal de cada valor.",
    "input": "N entre 1 e 100, seguido de N inteiros.",
    "output": "Três linhas: quantidade de positivos, de negativos e de zeros.",
    "rules": "Cada entrada pertence a exatamente um grupo. A soma das contagens deve corresponder a N."
  },
  "multiplos-tres-cinco": {
    "goal": "Conte os inteiros que satisfazem ao menos um entre dois critérios de divisibilidade.",
    "input": "N entre 0 e 1000.",
    "output": "Uma quantidade inteira.",
    "rules": "Considere os positivos de 1 até N, inclusive, divisíveis por 3 ou por 5. Valores divisíveis pelos dois contam apenas uma vez. O zero não participa da faixa."
  },
  "quadrados-pares": {
    "goal": "Apresente os quadrados dos pares positivos até um limite.",
    "input": "N entre 0 e 1000.",
    "output": "Um quadrado por linha ou Nenhum par.",
    "rules": "Considere apenas pares positivos de 2 até N inclusive, em ordem crescente. Se a faixa não tiver nenhum, mostre a mensagem indicada."
  },
  "media-positivos-cinco": {
    "goal": "Resuma apenas as medições positivas de um lote fixo.",
    "input": "Exatamente cinco números reais.",
    "output": "A média dos positivos ou Nenhum positivo.",
    "rules": "Ignore negativos e zero tanto na soma quanto na quantidade de elementos da média. Não arredonde."
  },
  "maior-ate-zero": {
    "goal": "Encontre o maior valor de uma sequência com marcador de encerramento.",
    "input": "Inteiros até o primeiro 0.",
    "output": "O maior valor anterior ao zero ou Sem valores.",
    "rules": "O zero não participa da comparação. Se for a primeira entrada, não há valores a comparar. O lote pode conter somente negativos."
  },
  "senha-tentativas": {
    "goal": "Simule a validação de uma senha, registrando as tentativas realizadas.",
    "input": "Senhas inteiras até o primeiro 1234.",
    "output": "Senha incorreta para cada erro; depois Acesso permitido e, na linha seguinte, a quantidade total de tentativas.",
    "rules": "1234 é a senha correta desta simulação. A tentativa correta também deve ser contada. Todo teste termina com ela."
  },
  "caixa-total": {
    "goal": "Totalize uma compra com quantidade variável de itens.",
    "input": "Uma quantidade inteira; se positiva, vem em seguida um preço unitário real. Esse padrão se repete até quantidade 0.",
    "output": "Somente o total da compra.",
    "rules": "Quantidades são não negativas; preços, não negativos. Quantidade zero encerra e não possui preço associado. Cada item custa quantidade vezes preço unitário."
  },
  "crescimento-populacao": {
    "goal": "Determine quando uma população menor ultrapassará outra que cresce mais lentamente.",
    "input": "Populações reais positivas A e B, com A <= B.",
    "output": "A quantidade inteira de anos completos até A ficar maior que B.",
    "rules": "A cresce 3.5% ao ano e B cresce 1%. As duas crescem a cada ano; não arredonde. Igualdade ainda não é ultrapassagem. Os dados garantem resposta em até 100 anos."
  },
  "soma-digitos": {
    "goal": "Determine a soma dos algarismos decimais de um inteiro.",
    "input": "Um inteiro de 0 a 1000000000.",
    "output": "Somente a soma dos dígitos.",
    "rules": "O número zero tem soma dos dígitos igual a zero. Considere a representação decimal usual."
  },
  "funcao-triplo": {
    "goal": "Organize o cálculo do triplo em uma função com retorno.",
    "input": "Um inteiro.",
    "output": "Somente o triplo do valor.",
    "rules": "Declare funcao inteiro triplo com um parâmetro inteiro; chame-a em inicio. Leia e escreva apenas em inicio. A estrutura também é conferida."
  },
  "funcao-menor-tres": {
    "goal": "Crie uma função reutilizável para selecionar o menor entre três valores.",
    "input": "Três inteiros.",
    "output": "Somente o menor valor.",
    "rules": "Declare funcao inteiro menor_de_tres com três parâmetros inteiros e chame-a em inicio. Repetições e negativos são permitidos."
  },
  "funcao-absoluto": {
    "goal": "Calcule a distância de um número até zero, independentemente do sinal.",
    "input": "Um número real.",
    "output": "Seu valor absoluto.",
    "rules": "Declare funcao real absoluto com um parâmetro real e chame-a em inicio. Zero continua sendo zero. Não arredonde."
  },
  "funcao-soma-faixa": {
    "goal": "Organize em uma função a totalização de uma faixa de inteiros.",
    "input": "Inteiros L e U, com -1000 <= L <= U <= 1000.",
    "output": "Somente a soma de todos os inteiros da faixa.",
    "rules": "Declare funcao inteiro somar_intervalo com dois parâmetros inteiros e chame-a em inicio. Os dois limites participam da soma."
  },
  "funcao-primo": {
    "goal": "Crie uma função lógica para identificar números primos.",
    "input": "Um inteiro de -100 a 1000.",
    "output": "PRIMO ou NAO PRIMO.",
    "rules": "Declare funcao logico eh_primo com um parâmetro inteiro e chame-a em inicio. Primo é inteiro > 1 com exatamente dois divisores positivos; os demais não são primos."
  },
  "funcao-desconto": {
    "goal": "Encapsule a aplicação de um desconto em uma função.",
    "input": "Preço real >= 0 e percentual real em [0,100].",
    "output": "Somente o preço final.",
    "rules": "Declare funcao real aplicar_desconto com dois parâmetros reais e chame-a em inicio. Todas as entradas são válidas; não arredonde."
  },
  "vetor-indices-pares": {
    "goal": "Totalize valores armazenados em posições específicas de um vetor.",
    "input": "N entre 1 e 100, seguido de N inteiros.",
    "output": "A soma dos elementos nos índices 0, 2, 4, ...",
    "rules": "A paridade considerada é a do índice, não a do elemento. Um valor ímpar numa posição par participa da soma. Armazene os dados em vetor."
  },
  "vetor-escalar": {
    "goal": "Aplique um mesmo fator a todos os elementos de um vetor.",
    "input": "N entre 1 e 100, depois N reais e, por último, o fator real K.",
    "output": "N resultados, um por linha, mantendo a ordem original.",
    "rules": "Cada resultado corresponde ao respectivo elemento multiplicado por K. O fator pode ser zero ou negativo."
  },
  "vetor-frequencia": {
    "goal": "Conte quantas vezes um valor aparece em um vetor.",
    "input": "N entre 1 e 100, depois N inteiros e, por último, o inteiro X.",
    "output": "A quantidade de posições com valor igual a X.",
    "rules": "Conte todas as repetições. Se X não existir, mostre zero. Não mostre índices."
  },
  "vetor-rotacao": {
    "goal": "Desloque circularmente os elementos de um vetor para a direita.",
    "input": "N entre 1 e 100, seguido de N inteiros.",
    "output": "Os N valores após a rotação, um por linha.",
    "rules": "O último elemento passa a ser o primeiro; todos os demais avançam uma posição. N=1 mantém o único elemento. Não ordene os dados."
  },
  "vetor-intercalar": {
    "goal": "Combine dois vetores alternando os elementos de cada um.",
    "input": "N entre 1 e 50, depois N inteiros de A e depois N inteiros de B.",
    "output": "2*N linhas na ordem A[0], B[0], A[1], B[1], ...",
    "rules": "As leituras de A e B são feitas separadamente. Preserve a ordem interna e as repetições de cada vetor."
  },
  "vetor-diferencas": {
    "goal": "Compare cada valor de um vetor com o imediatamente anterior.",
    "input": "N entre 2 e 100, seguido de N inteiros de V.",
    "output": "N-1 linhas: V[1]-V[0], V[2]-V[1], ..., V[N-1]-V[N-2].",
    "rules": "Mantenha o sinal das diferenças. Não use valor absoluto nem compare posições que não sejam vizinhas."
  },
  "matriz-soma-duas": {
    "goal": "Calcule a soma de duas matrizes de mesmo tamanho.",
    "input": "Quatro inteiros da matriz A 2 por 2 e depois quatro da matriz B 2 por 2, ambas na ordem das linhas.",
    "output": "Quatro linhas com os elementos da matriz resultante, também na ordem das linhas.",
    "rules": "Cada posição da matriz resultante recebe a soma das posições correspondentes de A e B. Não produza um único total geral."
  },
  "matriz-transposta": {
    "goal": "Apresente a transposta de uma matriz retangular.",
    "input": "Seis inteiros de uma matriz A 2 por 3, na ordem das linhas.",
    "output": "Seis linhas com os elementos da transposta 3 por 2, na ordem das linhas.",
    "rules": "A transposição troca linhas por colunas: T[j][i] corresponde a A[i][j]. Mostre um elemento por linha de saída."
  },
  "diagonal-secundaria": {
    "goal": "Some os elementos da diagonal secundária de uma matriz quadrada.",
    "input": "Nove inteiros de uma matriz 3 por 3, na ordem das linhas.",
    "output": "Somente a soma da diagonal secundária.",
    "rules": "Participam as posições [0][2], [1][1] e [2][0]. Não confunda com a diagonal principal."
  },
  "matriz-maior-posicao": {
    "goal": "Localize o maior elemento de uma matriz e indique onde ele está.",
    "input": "Seis inteiros de uma matriz 2 por 3, na ordem das linhas.",
    "output": "Três linhas: maior valor, índice da linha e índice da coluna.",
    "rules": "Índices começam em zero. Em empate, prevalece a primeira ocorrência na ordem de leitura. Valores negativos são permitidos."
  }
};

const topicHints = {
 Fundamentos:'Quais dados você precisa ler e em que ordem? Que valores precisam ser preservados antes de uma nova atribuição?',
 Cálculos:'Quais grandezas o problema relaciona? As unidades e os tipos escolhidos combinam com o resultado pedido?',
 Condições:'Quais casos são diferentes entre si? O que deve acontecer exatamente nos limites de cada faixa?',
 Repetições:'O que representa uma volta do laço? Qual informação deve ser contada ou acumulada ao longo das voltas?',
 Enquanto:'Qual acontecimento encerra as leituras? Esse valor participa do resultado ou serve apenas para parar?',
 Funções:'Quais informações entram pelos parâmetros? Que tipo de resultado a função precisa devolver a quem a chamou?',
 Vetores:'Você precisa do valor de uma posição ou de seu índice? Quais posições realmente pertencem ao vetor preenchido?',
 Matrizes:'Que posição representa linha e que posição representa coluna? A ordem de leitura é a mesma da saída?',
 Cadeias:'Quais caracteres e diferenças de escrita são permitidos? A comparação considera maiúsculas e minúsculas?'
};
const specificHints = {
 'boas-vindas':'O nome é um número ou um texto? Confira os espaços exigidos no formato da mensagem.',
 'equacao':'Quantas situações distintas os coeficientes podem produzir? Em qual delas há uma raiz numérica?',
 'media-com-exame':'Em quais situações a entrada realmente fornece uma quinta nota? Sua solução pede dados que não existem?',
 'intervalo':'Os limites pertencem ao intervalo? Como você conferiria isso com um valor exatamente igual a cada limite?',
 'intervalo-fechado':'O problema admite limites iguais? E o que acontece quando a ordem dos limites é inválida?',
 'verifica-multiplo':'Existe algum divisor para o qual a operação deixa de ser válida?',
 'produto-valores':'O valor inicial escolhido mantém o resultado correto quando só existe um elemento no lote?',
 'media-positivos-cinco':'Quantos valores de fato participam dessa média? O que acontece se nenhum deles atender à regra?',
 'maior-ate-zero':'Sua comparação também funciona quando todos os valores anteriores ao encerramento são negativos?',
 'vetor-extremos':'Teste mentalmente um vetor com todos os elementos negativos e outro com um único elemento.',
 'vetor-indices-pares':'O enunciado fala em paridade da posição ou do número armazenado? Eles podem ser diferentes?',
 'vetor-frequencia':'Encontrar a primeira ocorrência é suficiente para responder à quantidade total?',
 'vetor-rotacao':'O que acontece com o último elemento? Seu resultado também respeita a regra quando N é 1?',
 'matriz-maior-posicao':'Como o desempate deve funcionar quando o maior valor aparece mais de uma vez?',
 'matriz-soma-duas':'A saída pede uma soma geral ou um resultado para cada posição correspondente?',
 'crescimento-populacao':'As duas populações mudam no mesmo período? Igualar a outra população já satisfaz a condição?',
 'binario-decimal':'O texto inteiro continua válido se um único caractere não for permitido?'
};
export function statementHint(question){return specificHints[question.id]||Object.entries(topicHints).find(([topic])=>question.topic.includes(topic))?.[1]||'Confira a ordem da entrada, as regras e o formato exato da saída.';}
