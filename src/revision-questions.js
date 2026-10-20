// 50 exercícios autorais baseados nas Aulas 1 a 4. Soluções de validação ficam somente em test/fixtures.
export const revisionQuestions = [
  {
    "id": "boas-vindas",
    "title": "Mensagem de boas-vindas",
    "topic": "Aula 1 · Fundamentos",
    "level": "Básico",
    "description": "Leia um nome com uma única palavra, sem espaços. Mostre Bem vindo, seguido de um espaço e do nome, na mesma linha. Não escreva perguntas antes da leitura.",
    "hint": "Declare uma cadeia e use escreva para juntar a mensagem ao nome.",
    "tests": [
      {
        "input": "Ana",
        "output": "Bem vindo Ana"
      },
      {
        "input": "Matheus",
        "output": "Bem vindo Matheus"
      },
      {
        "input": "bia",
        "output": "Bem vindo bia"
      },
      {
        "input": "RAIO",
        "output": "Bem vindo RAIO"
      }
    ],
    "numeric": false,
    "source": {
      "label": "Base: Aula 1 · Fundamentos do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "troca-valores",
    "title": "Troca de duas variáveis",
    "topic": "Aula 1 · Fundamentos",
    "level": "Básico",
    "description": "Leia dois inteiros A e B. Troque os valores entre as variáveis com uma variável auxiliar. Mostre o novo A e depois o novo B, um por linha. Os testes verificam a saída.",
    "hint": "Guarde o valor original de A antes de sobrescrevê-lo.",
    "tests": [
      {
        "input": "3\n8",
        "output": "8\n3"
      },
      {
        "input": "-4\n2",
        "output": "2\n-4"
      },
      {
        "input": "0\n0",
        "output": "0\n0"
      },
      {
        "input": "7\n7",
        "output": "7\n7"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 1 · Fundamentos do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "rotacao-tres",
    "title": "Rotação de três valores",
    "topic": "Aula 1 · Fundamentos",
    "level": "Intermediário",
    "description": "Leia três inteiros A, B e C. Faça A receber o valor original de C, B receber o original de A e C receber o original de B. Mostre os novos A, B e C, um por linha.",
    "hint": "Uma variável auxiliar evita perder um valor durante a troca.",
    "tests": [
      {
        "input": "1\n2\n3",
        "output": "3\n1\n2"
      },
      {
        "input": "-1\n0\n4",
        "output": "4\n-1\n0"
      },
      {
        "input": "5\n5\n5",
        "output": "5\n5\n5"
      },
      {
        "input": "9\n-8\n-7",
        "output": "-7\n9\n-8"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 1 · Fundamentos do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "vizinhos-inteiro",
    "title": "Antecessor e sucessor",
    "topic": "Aula 1 · Fundamentos",
    "level": "Básico",
    "description": "Leia um inteiro entre -10000 e 10000. Mostre seu antecessor e seu sucessor, nessa ordem, um por linha.",
    "hint": "O antecessor fica uma unidade abaixo; o sucessor, uma acima.",
    "tests": [
      {
        "input": "5",
        "output": "4\n6"
      },
      {
        "input": "0",
        "output": "-1\n1"
      },
      {
        "input": "-3",
        "output": "-4\n-2"
      },
      {
        "input": "10000",
        "output": "9999\n10001"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 1 · Fundamentos do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "vertices-euler",
    "title": "Vértices de um poliedro",
    "topic": "Aula 1 · Fundamentos",
    "level": "Básico",
    "description": "Leia a quantidade inteira de faces F e depois a quantidade de arestas A de um poliedro convexo. As entradas sempre descrevem um poliedro válido. Calcule V = A + 2 - F e mostre apenas V.",
    "hint": "Identifique a ordem das entradas antes de aplicar a fórmula.",
    "tests": [
      {
        "input": "6\n12",
        "output": "8"
      },
      {
        "input": "4\n6",
        "output": "4"
      },
      {
        "input": "5\n8",
        "output": "5"
      },
      {
        "input": "8\n12",
        "output": "6"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 1, exemplo de entrada, processamento e saída do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "retangulo-medidas",
    "title": "Área e perímetro do retângulo",
    "topic": "Aula 2 · Cálculos",
    "level": "Básico",
    "description": "Leia base e altura reais positivas. Mostre a área e o perímetro, um por linha. Se alguma medida for menor ou igual a zero, mostre apenas Medida invalida.",
    "hint": "Área usa multiplicação; perímetro é duas vezes a soma das medidas.",
    "tests": [
      {
        "input": "3\n4",
        "output": "12\n14"
      },
      {
        "input": "2.5\n1.5",
        "output": "3.75\n8"
      },
      {
        "input": "0\n4",
        "output": "Medida invalida"
      },
      {
        "input": "2\n-1",
        "output": "Medida invalida"
      },
      {
        "input": "1\n1",
        "output": "1\n4"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 2 · Cálculos do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "celsius-fahrenheit",
    "title": "Conversão de temperatura",
    "topic": "Aula 2 · Cálculos",
    "level": "Básico",
    "description": "Leia uma temperatura real em graus Celsius. Converta para Fahrenheit pela fórmula F = C * 9.0 / 5.0 + 32 e mostre apenas F. Temperaturas negativas são válidas.",
    "hint": "Use divisão real, sem arredondar o cálculo.",
    "tests": [
      {
        "input": "0",
        "output": "32"
      },
      {
        "input": "100",
        "output": "212"
      },
      {
        "input": "-40",
        "output": "-40"
      },
      {
        "input": "37",
        "output": "98.6"
      },
      {
        "input": "-10",
        "output": "14"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 2 · Cálculos do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "tempo-viagem",
    "title": "Tempo de viagem em horas",
    "topic": "Aula 2 · Cálculos",
    "level": "Básico",
    "description": "Leia a distância real em km e a velocidade média real em km/h. Distância deve ser >= 0 e velocidade > 0. Se inválidas, mostre Dados invalidos. Caso contrário, mostre distância / velocidade, em horas.",
    "hint": "Valide antes de dividir; uma distância zero é permitida.",
    "tests": [
      {
        "input": "150\n60",
        "output": "2.5"
      },
      {
        "input": "0\n80",
        "output": "0"
      },
      {
        "input": "10\n0",
        "output": "Dados invalidos"
      },
      {
        "input": "-1\n50",
        "output": "Dados invalidos"
      },
      {
        "input": "100\n-2",
        "output": "Dados invalidos"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 2 · Cálculos do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "preco-desconto",
    "title": "Preço com desconto percentual",
    "topic": "Aula 2 · Cálculos",
    "level": "Básico",
    "description": "Leia o preço real e o percentual real de desconto. Preço deve ser >= 0 e percentual deve estar em [0,100]. Para dados inválidos, mostre Dados invalidos. Senão mostre apenas o preço final, sem arredondar.",
    "hint": "Desconte do preço a fração percentual/100.",
    "tests": [
      {
        "input": "200\n15",
        "output": "170"
      },
      {
        "input": "80\n100",
        "output": "0"
      },
      {
        "input": "0\n20",
        "output": "0"
      },
      {
        "input": "100\n0",
        "output": "100"
      },
      {
        "input": "50\n101",
        "output": "Dados invalidos"
      },
      {
        "input": "-1\n10",
        "output": "Dados invalidos"
      },
      {
        "input": "50\n-1",
        "output": "Dados invalidos"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 2 · Cálculos do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "delta-coeficientes",
    "title": "Cálculo do discriminante",
    "topic": "Aula 2 · Cálculos",
    "level": "Básico",
    "description": "Leia os coeficientes reais A, B e C, nessa ordem. Calcule delta = B*B - 4*A*C. Mostre somente delta, mesmo que seja negativo ou A seja zero. Não calcule raízes.",
    "hint": "O quadrado de B deve ser calculado antes da subtração.",
    "tests": [
      {
        "input": "1\n-3\n-10",
        "output": "49"
      },
      {
        "input": "1\n2\n1",
        "output": "0"
      },
      {
        "input": "1\n0\n1",
        "output": "-4"
      },
      {
        "input": "0\n3\n2",
        "output": "9"
      },
      {
        "input": "0.5\n2\n1",
        "output": "2"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 2, exercício de delta do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "decompor-valor",
    "title": "Notas de 10, 5 e unidades",
    "topic": "Aula 2 · Cálculos",
    "level": "Intermediário",
    "description": "Leia um valor inteiro de 0 a 10000. Decomponha usando primeiro a maior quantidade possível de notas de 10, depois notas de 5 e finalmente unidades de 1. Mostre as três quantidades, nessa ordem, uma por linha.",
    "hint": "Use divisão inteira e reaproveite o resto para a próxima denominação.",
    "tests": [
      {
        "input": "28",
        "output": "2\n1\n3"
      },
      {
        "input": "0",
        "output": "0\n0\n0"
      },
      {
        "input": "5",
        "output": "0\n1\n0"
      },
      {
        "input": "10",
        "output": "1\n0\n0"
      },
      {
        "input": "999",
        "output": "99\n1\n4"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 2 · Cálculos do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "media-tres-reais",
    "title": "Média de três números reais",
    "topic": "Aula 2 · Cálculos",
    "level": "Básico",
    "description": "Leia três números reais, que podem ser positivos, negativos ou zero. Mostre apenas a média aritmética. Não valide como notas ou alturas: qualquer real informado é válido.",
    "hint": "Some os três valores antes de dividir por 3.",
    "tests": [
      {
        "input": "1\n2\n3",
        "output": "2"
      },
      {
        "input": "-6\n0\n3",
        "output": "-1"
      },
      {
        "input": "1.5\n2.5\n3.5",
        "output": "2.5"
      },
      {
        "input": "0\n0\n0",
        "output": "0"
      },
      {
        "input": "-2\n-4\n-6",
        "output": "-4"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 2 · Cálculos do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "sinal-numero",
    "title": "Positivo, negativo ou zero",
    "topic": "Aula 3 · Condições",
    "level": "Básico",
    "description": "Leia um número real. Mostre POSITIVO se for maior que zero, NEGATIVO se for menor ou ZERO se for igual a zero.",
    "hint": "Use uma única cadeia de condições para produzir uma única resposta.",
    "tests": [
      {
        "input": "2",
        "output": "POSITIVO"
      },
      {
        "input": "-0.5",
        "output": "NEGATIVO"
      },
      {
        "input": "0",
        "output": "ZERO"
      },
      {
        "input": "0.01",
        "output": "POSITIVO"
      },
      {
        "input": "-100",
        "output": "NEGATIVO"
      }
    ],
    "numeric": false,
    "source": {
      "label": "Base: Aula 3 · Condições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "maior-tres",
    "title": "Maior de três inteiros",
    "topic": "Aula 3 · Condições",
    "level": "Básico",
    "description": "Leia três inteiros e mostre o maior deles. Valores repetidos e negativos são permitidos.",
    "hint": "Não inicialize o maior em zero: ele pode ser negativo.",
    "tests": [
      {
        "input": "1\n3\n2",
        "output": "3"
      },
      {
        "input": "-8\n-3\n-5",
        "output": "-3"
      },
      {
        "input": "7\n7\n2",
        "output": "7"
      },
      {
        "input": "0\n-1\n-2",
        "output": "0"
      },
      {
        "input": "2\n1\n9",
        "output": "9"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Condições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "ordenar-tres",
    "title": "Três valores em ordem crescente",
    "topic": "Aula 3 · Condições",
    "level": "Intermediário",
    "description": "Leia três inteiros. Mostre os valores em ordem crescente, um por linha. Mantenha as repetições.",
    "hint": "Compare pares e troque seus valores quando estiverem fora de ordem.",
    "tests": [
      {
        "input": "3\n1\n2",
        "output": "1\n2\n3"
      },
      {
        "input": "-1\n-5\n0",
        "output": "-5\n-1\n0"
      },
      {
        "input": "2\n2\n1",
        "output": "1\n2\n2"
      },
      {
        "input": "0\n0\n0",
        "output": "0\n0\n0"
      },
      {
        "input": "1\n2\n3",
        "output": "1\n2\n3"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Condições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "verifica-multiplo",
    "title": "Verificar múltiplo com divisor válido",
    "topic": "Aula 3 · Condições",
    "level": "Básico",
    "description": "Leia dois inteiros A e B. Se B for zero, mostre Divisor invalido. Senão, mostre MULTIPLO se o resto de A dividido por B for zero ou NAO MULTIPLO caso contrário. Zero é múltiplo de qualquer B diferente de zero.",
    "hint": "Não calcule A % B antes de verificar B.",
    "tests": [
      {
        "input": "12\n3",
        "output": "MULTIPLO"
      },
      {
        "input": "7\n3",
        "output": "NAO MULTIPLO"
      },
      {
        "input": "0\n5",
        "output": "MULTIPLO"
      },
      {
        "input": "-12\n3",
        "output": "MULTIPLO"
      },
      {
        "input": "4\n0",
        "output": "Divisor invalido"
      }
    ],
    "numeric": false,
    "source": {
      "label": "Base: Aula 3 · Condições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "intervalo-fechado",
    "title": "Pertence ao intervalo fechado?",
    "topic": "Aula 3 · Condições",
    "level": "Básico",
    "description": "Leia três reais: valor X, limite inferior L e limite superior U. Se L > U, mostre Intervalo invalido. Caso contrário, mostre DENTRO se L <= X <= U ou FORA. Os dois limites pertencem ao intervalo.",
    "hint": "Em Portugol, combine duas comparações usando e.",
    "tests": [
      {
        "input": "10\n10\n20",
        "output": "DENTRO"
      },
      {
        "input": "20\n10\n20",
        "output": "DENTRO"
      },
      {
        "input": "9\n10\n20",
        "output": "FORA"
      },
      {
        "input": "5\n5\n5",
        "output": "DENTRO"
      },
      {
        "input": "3\n5\n1",
        "output": "Intervalo invalido"
      },
      {
        "input": "-3\n-5\n0",
        "output": "DENTRO"
      }
    ],
    "numeric": false,
    "source": {
      "label": "Base: Aula 3 · Condições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "valores-aceitos",
    "title": "Seleção de quatro valores",
    "topic": "Aula 3 · Condições",
    "level": "Intermediário",
    "description": "Leia os inteiros A, B, C e D. Mostre valores aceitos somente se TODAS as condições forem verdadeiras: B > C, D > A, C+D > A+B, C > 0, D > 0 e A par. Caso contrário, mostre valores nao aceitos.",
    "hint": "Combine cada comparação com e. A paridade também faz parte da condição.",
    "tests": [
      {
        "input": "2\n3\n2\n4",
        "output": "valores aceitos"
      },
      {
        "input": "1\n3\n2\n4",
        "output": "valores nao aceitos"
      },
      {
        "input": "2\n2\n2\n4",
        "output": "valores nao aceitos"
      },
      {
        "input": "2\n3\n0\n6",
        "output": "valores nao aceitos"
      },
      {
        "input": "2\n9\n2\n4",
        "output": "valores nao aceitos"
      },
      {
        "input": "0\n1\n0\n2",
        "output": "valores nao aceitos"
      }
    ],
    "numeric": false,
    "source": {
      "label": "Base: Aula 3, exercício de seleção com A, B, C e D do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "media-com-exame",
    "title": "Média ponderada e exame final",
    "topic": "Aula 3 · Condições",
    "level": "Desafio",
    "description": "Leia quatro notas reais de 0 a 10, com pesos 2, 3, 4 e 1. As entradas são válidas. Se a média ponderada for >= 7, mostre Aprovado; se for < 5, mostre Reprovado. Apenas se a média estiver em [5,7), leia mais uma nota real de exame. Regra deste treino: a média final é (média ponderada + exame)/2, e o aluno é aprovado se ela for >= 5. Mostre somente Aprovado ou Reprovado. Não peça a nota de exame nos outros casos.",
    "hint": "A quinta leitura pertence somente ao bloco de recuperação. O limite de aprovação após exame foi definido para este treino.",
    "tests": [
      {
        "input": "7\n7\n7\n7",
        "output": "Aprovado"
      },
      {
        "input": "4\n4\n4\n4",
        "output": "Reprovado"
      },
      {
        "input": "5\n5\n5\n5\n5",
        "output": "Aprovado"
      },
      {
        "input": "6\n6\n6\n6\n3",
        "output": "Reprovado"
      },
      {
        "input": "6\n6\n6\n6\n4",
        "output": "Aprovado"
      },
      {
        "input": "10\n0\n10\n0\n4",
        "output": "Aprovado"
      }
    ],
    "numeric": false,
    "source": {
      "label": "Base: Aula 3, média ponderada com exame; critério final autoral do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "dia-semana",
    "title": "Dia da semana por número",
    "topic": "Aula 3 · Condições",
    "level": "Básico",
    "description": "Leia um inteiro. Mostre domingo para 1, segunda para 2, terca para 3, quarta para 4, quinta para 5, sexta para 6 ou sabado para 7. Para outro número, mostre Dia invalido. Pratique escolha/caso; os testes verificam a saída.",
    "hint": "Cada caso deve encerrar com pare quando necessário.",
    "tests": [
      {
        "input": "1",
        "output": "domingo"
      },
      {
        "input": "3",
        "output": "terca"
      },
      {
        "input": "7",
        "output": "sabado"
      },
      {
        "input": "0",
        "output": "Dia invalido"
      },
      {
        "input": "8",
        "output": "Dia invalido"
      },
      {
        "input": "6",
        "output": "sexta"
      }
    ],
    "numeric": false,
    "source": {
      "label": "Base: Aula 3 · Condições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "tarifa-veiculo",
    "title": "Tarifa por tipo de veículo",
    "topic": "Aula 3 · Condições",
    "level": "Básico",
    "description": "Regra fictícia: leia o código inteiro do veículo e depois um número inteiro positivo de horas. Código 1 custa 3 reais/hora; 2 custa 5; 3 custa 8. Se o código não estiver em [1,3] ou horas <= 0, mostre Dados invalidos. Senão mostre apenas o total.",
    "hint": "Selecione a tarifa e multiplique pelas horas, após validar.",
    "tests": [
      {
        "input": "1\n2",
        "output": "6"
      },
      {
        "input": "2\n3",
        "output": "15"
      },
      {
        "input": "3\n1",
        "output": "8"
      },
      {
        "input": "4\n2",
        "output": "Dados invalidos"
      },
      {
        "input": "1\n0",
        "output": "Dados invalidos"
      },
      {
        "input": "2\n-1",
        "output": "Dados invalidos"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Condições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "ingresso-idade",
    "title": "Ingresso por faixa etária",
    "topic": "Aula 3 · Condições",
    "level": "Básico",
    "description": "Regra fictícia: leia uma idade inteira. Se negativa, mostre Idade invalida. Crianças de 0 a 5 anos não pagam; de 6 a 17 pagam 10; de 18 a 59 pagam 20; com 60 anos ou mais pagam 10. Mostre apenas o preço.",
    "hint": "Teste as idades exatamente nos limites de cada faixa.",
    "tests": [
      {
        "input": "0",
        "output": "0"
      },
      {
        "input": "5",
        "output": "0"
      },
      {
        "input": "6",
        "output": "10"
      },
      {
        "input": "17",
        "output": "10"
      },
      {
        "input": "18",
        "output": "20"
      },
      {
        "input": "59",
        "output": "20"
      },
      {
        "input": "60",
        "output": "10"
      },
      {
        "input": "-1",
        "output": "Idade invalida"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Condições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "tabuada-dez",
    "title": "Tabuada: dez resultados",
    "topic": "Aula 3 · Repetições",
    "level": "Básico",
    "description": "Leia um inteiro N entre -100 e 100. Mostre os produtos N*1 até N*10, nessa ordem, um por linha. Mostre apenas os números, sem textos como x ou =.",
    "hint": "O contador vai de 1 a 10; o número da tabuada não muda.",
    "tests": [
      {
        "input": "3",
        "output": "3\n6\n9\n12\n15\n18\n21\n24\n27\n30"
      },
      {
        "input": "0",
        "output": "0\n0\n0\n0\n0\n0\n0\n0\n0\n0"
      },
      {
        "input": "-2",
        "output": "-2\n-4\n-6\n-8\n-10\n-12\n-14\n-16\n-18\n-20"
      },
      {
        "input": "1",
        "output": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Repetições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "soma-impares-faixa",
    "title": "Soma dos ímpares de uma faixa",
    "topic": "Aula 3 · Repetições",
    "level": "Intermediário",
    "description": "Leia dois inteiros L e U entre -1000 e 1000, com L <= U. Some os ímpares do intervalo fechado [L,U] e mostre a soma. Inclua ímpares negativos.",
    "hint": "Para identificar ímpares negativos, teste resto diferente de zero, em vez de resto igual a um.",
    "tests": [
      {
        "input": "1\n7",
        "output": "16"
      },
      {
        "input": "-5\n3",
        "output": "-5"
      },
      {
        "input": "2\n2",
        "output": "0"
      },
      {
        "input": "-3\n-1",
        "output": "-4"
      },
      {
        "input": "3\n3",
        "output": "3"
      },
      {
        "input": "-1000\n1000",
        "output": "0"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Repetições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "produto-valores",
    "title": "Produto de N valores",
    "topic": "Aula 3 · Repetições",
    "level": "Intermediário",
    "description": "Leia N (1 a 8), depois N inteiros entre -5 e 5. Mostre o produto de todos os valores.",
    "hint": "O acumulador de multiplicação começa em 1, não em zero.",
    "tests": [
      {
        "input": "3\n2\n3\n4",
        "output": "24"
      },
      {
        "input": "1\n-5",
        "output": "-5"
      },
      {
        "input": "4\n2\n0\n3\n4",
        "output": "0"
      },
      {
        "input": "3\n-2\n-2\n-2",
        "output": "-8"
      },
      {
        "input": "2\n-3\n-4",
        "output": "12"
      },
      {
        "input": "8\n5\n5\n5\n5\n5\n5\n5\n5",
        "output": "390625"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Repetições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "contagem-sinais",
    "title": "Contagem de positivos, negativos e zeros",
    "topic": "Aula 3 · Repetições",
    "level": "Básico",
    "description": "Leia N (1 a 100) e N inteiros. Mostre a quantidade de positivos, negativos e zeros, nessa ordem, uma por linha.",
    "hint": "Zero precisa de sua própria contagem. Contadores começam em zero.",
    "tests": [
      {
        "input": "5\n2\n-1\n0\n3\n0",
        "output": "2\n1\n2"
      },
      {
        "input": "1\n0",
        "output": "0\n0\n1"
      },
      {
        "input": "3\n-1\n-2\n-3",
        "output": "0\n3\n0"
      },
      {
        "input": "3\n1\n2\n3",
        "output": "3\n0\n0"
      },
      {
        "input": "100\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n-1",
        "output": "0\n1\n99"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Repetições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "multiplos-tres-cinco",
    "title": "Múltiplos de 3 ou 5 até N",
    "topic": "Aula 3 · Repetições",
    "level": "Intermediário",
    "description": "Leia N (0 a 1000). Conte quantos inteiros positivos de 1 até N são divisíveis por 3 OU por 5. Um número divisível pelos dois, como 15, deve ser contado só uma vez. Mostre a quantidade.",
    "hint": "Uma única condição com ou evita contar o mesmo número duas vezes.",
    "tests": [
      {
        "input": "15",
        "output": "7"
      },
      {
        "input": "0",
        "output": "0"
      },
      {
        "input": "2",
        "output": "0"
      },
      {
        "input": "3",
        "output": "1"
      },
      {
        "input": "30",
        "output": "14"
      },
      {
        "input": "1000",
        "output": "467"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Repetições do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "quadrados-pares",
    "title": "Quadrados dos pares até N",
    "topic": "Aula 3 · Repetições",
    "level": "Básico",
    "description": "Leia N (0 a 1000). Mostre o quadrado de cada inteiro par positivo de 2 até N, um por linha. Se N < 2, mostre Nenhum par.",
    "hint": "Avance de dois em dois e eleve cada valor ao quadrado por multiplicação.",
    "tests": [
      {
        "input": "6",
        "output": "4\n16\n36"
      },
      {
        "input": "2",
        "output": "4"
      },
      {
        "input": "3",
        "output": "4"
      },
      {
        "input": "0",
        "output": "Nenhum par"
      },
      {
        "input": "1",
        "output": "Nenhum par"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3, exercício dos quadrados de números pares do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "media-positivos-cinco",
    "title": "Média apenas dos positivos",
    "topic": "Aula 3 · Repetições",
    "level": "Intermediário",
    "description": "Leia exatamente cinco números reais. Calcule a média somente dos estritamente positivos. Ignore zero e negativos. Se não houver positivo, mostre Nenhum positivo. Caso contrário, mostre apenas a média.",
    "hint": "Divida pela quantidade de positivos, não por cinco. Evite dividir por zero.",
    "tests": [
      {
        "input": "1\n-1\n3\n0\n5",
        "output": "3"
      },
      {
        "input": "0\n0\n-1\n-2\n-3",
        "output": "Nenhum positivo"
      },
      {
        "input": "2.5\n0\n0\n0\n0",
        "output": "2.5"
      },
      {
        "input": "1\n2\n3\n4\n5",
        "output": "3"
      },
      {
        "input": "-1\n-2\n-3\n-4\n0",
        "output": "Nenhum positivo"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3, exemplo de acumulador com cinco valores do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "maior-ate-zero",
    "title": "Maior valor antes do zero",
    "topic": "Aula 3 · Enquanto",
    "level": "Intermediário",
    "description": "Leia inteiros até receber 0. O zero apenas encerra e não participa da comparação. Mostre o maior valor anterior. Se o primeiro valor for zero, mostre Sem valores. Cada teste contém o zero de encerramento.",
    "hint": "Use o primeiro valor válido como maior inicial, para funcionar com todos negativos.",
    "tests": [
      {
        "input": "3\n8\n2\n0",
        "output": "8"
      },
      {
        "input": "-5\n-2\n-9\n0",
        "output": "-2"
      },
      {
        "input": "0",
        "output": "Sem valores"
      },
      {
        "input": "-4\n0",
        "output": "-4"
      },
      {
        "input": "1\n1\n0",
        "output": "1"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Enquanto do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "senha-tentativas",
    "title": "Tentativas até acertar a senha",
    "topic": "Aula 3 · Enquanto",
    "level": "Básico",
    "description": "Leia senhas inteiras até receber 1234. Para cada tentativa errada, mostre Senha incorreta em uma linha. Ao acertar, mostre Acesso permitido em uma linha e depois a quantidade de tentativas, incluindo a correta. Todos os testes terminam com 1234.",
    "hint": "A senha errada não encerra o programa: faça nova leitura e conte cada tentativa.",
    "tests": [
      {
        "input": "1234",
        "output": "Acesso permitido\n1"
      },
      {
        "input": "111\n1234",
        "output": "Senha incorreta\nAcesso permitido\n2"
      },
      {
        "input": "0\n-1\n1234",
        "output": "Senha incorreta\nSenha incorreta\nAcesso permitido\n3"
      },
      {
        "input": "123\n123\n1234",
        "output": "Senha incorreta\nSenha incorreta\nAcesso permitido\n3"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Enquanto do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "caixa-total",
    "title": "Total de compras até quantidade zero",
    "topic": "Aula 3 · Enquanto",
    "level": "Intermediário",
    "description": "Leia uma quantidade inteira. Se for zero, encerre sem ler preço. Para cada quantidade positiva, leia o preço unitário real não negativo e acumule quantidade*preço; depois leia a próxima quantidade. Mostre só o total final. Todos os dados são válidos e há um zero ao final.",
    "hint": "A leitura do preço fica dentro do enquanto. O marcador zero não tem preço associado.",
    "tests": [
      {
        "input": "2\n5\n3\n2.5\n0",
        "output": "17.5"
      },
      {
        "input": "0",
        "output": "0"
      },
      {
        "input": "1\n0\n0",
        "output": "0"
      },
      {
        "input": "4\n1.25\n2\n10\n0",
        "output": "25"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Enquanto do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "crescimento-populacao",
    "title": "Anos para ultrapassar outra população",
    "topic": "Aula 3 · Enquanto",
    "level": "Desafio",
    "description": "Leia duas populações reais positivas A e B, com A <= B. A cresce 3.5% ao ano e B cresce 1% ao ano. Atualize ambas uma vez por ano, sem arredondar, até A ficar estritamente maior que B. Mostre o número inteiro de anos. As entradas garantem ultrapassagem em até 100 anos.",
    "hint": "Em cada volta, atualize as duas populações antes da próxima comparação.",
    "tests": [
      {
        "input": "90\n140",
        "output": "19"
      },
      {
        "input": "100\n100",
        "output": "1"
      },
      {
        "input": "100\n101",
        "output": "1"
      },
      {
        "input": "100\n102.5",
        "output": "2"
      },
      {
        "input": "1\n2",
        "output": "29"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3, exercício de crescimento populacional adaptado do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "soma-digitos",
    "title": "Soma dos dígitos de um inteiro",
    "topic": "Aula 3 · Enquanto",
    "level": "Intermediário",
    "description": "Leia um inteiro N de 0 a 1000000000. Mostre a soma dos seus dígitos decimais. Para N = 0, mostre 0.",
    "hint": "O resto por 10 fornece o último dígito; a divisão inteira por 10 o remove.",
    "tests": [
      {
        "input": "1234",
        "output": "10"
      },
      {
        "input": "0",
        "output": "0"
      },
      {
        "input": "1000",
        "output": "1"
      },
      {
        "input": "999",
        "output": "27"
      },
      {
        "input": "1000000000",
        "output": "1"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 3 · Enquanto do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "funcao-triplo",
    "title": "Função: triplo de um inteiro",
    "topic": "Aulas 3 e 4 · Funções",
    "level": "Básico",
    "description": "Crie a função inteiro triplo com um parâmetro inteiro. Ela deve retornar três vezes o parâmetro. Em inicio, leia um inteiro, chame triplo e mostre o retorno.",
    "hint": "Use retorne na função; leia e escreva em inicio.",
    "tests": [
      {
        "input": "4",
        "output": "12"
      },
      {
        "input": "0",
        "output": "0"
      },
      {
        "input": "-3",
        "output": "-9"
      },
      {
        "input": "100",
        "output": "300"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aulas 3 e 4 · Funções do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50",
    "requiredFunction": {
      "name": "triplo",
      "type": "inteiro"
    }
  },
  {
    "id": "funcao-menor-tres",
    "title": "Função: menor de três inteiros",
    "topic": "Aulas 3 e 4 · Funções",
    "level": "Intermediário",
    "description": "Crie a função inteiro menor_de_tres com três parâmetros inteiros. Ela deve retornar o menor. Em inicio, leia três inteiros, chame a função e mostre o retorno.",
    "hint": "Comece o menor com um dos parâmetros, e não com zero.",
    "tests": [
      {
        "input": "3\n1\n2",
        "output": "1"
      },
      {
        "input": "-1\n-8\n-3",
        "output": "-8"
      },
      {
        "input": "4\n4\n4",
        "output": "4"
      },
      {
        "input": "0\n1\n2",
        "output": "0"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aulas 3 e 4 · Funções do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50",
    "requiredFunction": {
      "name": "menor_de_tres",
      "type": "inteiro"
    }
  },
  {
    "id": "funcao-absoluto",
    "title": "Função: valor absoluto",
    "topic": "Aulas 3 e 4 · Funções",
    "level": "Intermediário",
    "description": "Crie a função real absoluto com um parâmetro real. Ela deve retornar o valor sem sinal negativo. Em inicio, leia um real, chame absoluto e mostre o retorno.",
    "hint": "Se o parâmetro for negativo, seu oposto é positivo.",
    "tests": [
      {
        "input": "2.5",
        "output": "2.5"
      },
      {
        "input": "-3.5",
        "output": "3.5"
      },
      {
        "input": "0",
        "output": "0"
      },
      {
        "input": "-0.01",
        "output": "0.01"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aulas 3 e 4 · Funções do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50",
    "requiredFunction": {
      "name": "absoluto",
      "type": "real"
    }
  },
  {
    "id": "funcao-soma-faixa",
    "title": "Função: soma de um intervalo",
    "topic": "Aulas 3 e 4 · Funções",
    "level": "Intermediário",
    "description": "Crie a função inteiro somar_intervalo com dois parâmetros inteiros L e U. Ela deve retornar a soma de todos os inteiros de L até U, incluindo os limites. Em inicio, leia L e U, chame a função e mostre o retorno. Os dados garantem -1000 <= L <= U <= 1000.",
    "hint": "O acumulador pertence à função; devolva a soma ao terminar.",
    "tests": [
      {
        "input": "1\n4",
        "output": "10"
      },
      {
        "input": "-2\n2",
        "output": "0"
      },
      {
        "input": "5\n5",
        "output": "5"
      },
      {
        "input": "-4\n-2",
        "output": "-9"
      },
      {
        "input": "-1000\n1000",
        "output": "0"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aulas 3 e 4 · Funções do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50",
    "requiredFunction": {
      "name": "somar_intervalo",
      "type": "inteiro"
    }
  },
  {
    "id": "funcao-primo",
    "title": "Função lógica: número primo",
    "topic": "Aulas 3 e 4 · Funções",
    "level": "Desafio",
    "description": "Crie a função logico eh_primo com um parâmetro inteiro. Retorne verdadeiro somente para números maiores que 1 com exatamente dois divisores positivos. Em inicio, leia N entre -100 e 1000 e use a função para mostrar PRIMO ou NAO PRIMO.",
    "hint": "Trate N <= 1 antes de procurar divisores.",
    "tests": [
      {
        "input": "2",
        "output": "PRIMO"
      },
      {
        "input": "1",
        "output": "NAO PRIMO"
      },
      {
        "input": "-7",
        "output": "NAO PRIMO"
      },
      {
        "input": "0",
        "output": "NAO PRIMO"
      },
      {
        "input": "49",
        "output": "NAO PRIMO"
      },
      {
        "input": "97",
        "output": "PRIMO"
      }
    ],
    "numeric": false,
    "source": {
      "label": "Base: Aulas 3 e 4 · Funções do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50",
    "requiredFunction": {
      "name": "eh_primo",
      "type": "logico"
    }
  },
  {
    "id": "funcao-desconto",
    "title": "Função: preço final com desconto",
    "topic": "Aulas 3 e 4 · Funções",
    "level": "Intermediário",
    "description": "Crie a função real aplicar_desconto com dois parâmetros reais: preço e percentual. Retorne preço*(1-percentual/100). Em inicio, leia preço >= 0 e percentual entre 0 e 100, chame a função e mostre o retorno. Todas as entradas são válidas.",
    "hint": "A função calcula; inicio faz a leitura e a escrita.",
    "tests": [
      {
        "input": "100\n10",
        "output": "90"
      },
      {
        "input": "25\n100",
        "output": "0"
      },
      {
        "input": "0\n50",
        "output": "0"
      },
      {
        "input": "19.9\n0",
        "output": "19.9"
      },
      {
        "input": "80\n12.5",
        "output": "70"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aulas 3 e 4 · Funções do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50",
    "requiredFunction": {
      "name": "aplicar_desconto",
      "type": "real"
    }
  },
  {
    "id": "vetor-indices-pares",
    "title": "Vetor: soma nos índices pares",
    "topic": "Aula 4 · Vetores",
    "level": "Intermediário",
    "description": "Leia N (1 a 100) e N inteiros para um vetor. Some os elementos das posições de índice par: 0, 2, 4, ... Mostre a soma. É a posição que deve ser par, não o valor.",
    "hint": "Os índices começam em zero. Um valor ímpar pode estar em uma posição par.",
    "tests": [
      {
        "input": "5\n1\n20\n3\n40\n5",
        "output": "9"
      },
      {
        "input": "1\n-7",
        "output": "-7"
      },
      {
        "input": "4\n2\n4\n6\n8",
        "output": "8"
      },
      {
        "input": "3\n0\n9\n0",
        "output": "0"
      },
      {
        "input": "100\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n9\n1",
        "output": "58"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 4 · Vetores do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "vetor-escalar",
    "title": "Vetor: multiplicação por um fator",
    "topic": "Aula 4 · Vetores",
    "level": "Intermediário",
    "description": "Leia N (1 a 100), N reais para um vetor e, por último, um fator real K. Mostre cada elemento multiplicado por K, mantendo a ordem, um resultado por linha.",
    "hint": "O fator só é lido depois de todos os elementos do vetor.",
    "tests": [
      {
        "input": "3\n1\n2\n3\n2",
        "output": "2\n4\n6"
      },
      {
        "input": "2\n-1\n2.5\n-2",
        "output": "2\n-5"
      },
      {
        "input": "1\n8\n0",
        "output": "0"
      },
      {
        "input": "3\n0\n1\n-1\n0.5",
        "output": "0\n0.5\n-0.5"
      },
      {
        "input": "100\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n61\n62\n63\n64\n65\n66\n67\n68\n69\n70\n71\n72\n73\n74\n75\n76\n77\n78\n79\n80\n81\n82\n83\n84\n85\n86\n87\n88\n89\n90\n91\n92\n93\n94\n95\n96\n97\n98\n99\n100\n0",
        "output": "0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 4 · Vetores do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "vetor-frequencia",
    "title": "Vetor: quantidade de ocorrências",
    "topic": "Aula 4 · Vetores",
    "level": "Intermediário",
    "description": "Leia N (1 a 100), N inteiros para um vetor e depois um inteiro X. Mostre quantas posições contêm X. Conte todas as repetições.",
    "hint": "Percorra todo o vetor, mesmo depois de encontrar a primeira ocorrência.",
    "tests": [
      {
        "input": "5\n2\n1\n2\n3\n2\n2",
        "output": "3"
      },
      {
        "input": "3\n1\n2\n3\n9",
        "output": "0"
      },
      {
        "input": "1\n-5\n-5",
        "output": "1"
      },
      {
        "input": "4\n0\n0\n0\n0\n0",
        "output": "4"
      },
      {
        "input": "100\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n7",
        "output": "100"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 4 · Vetores do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "vetor-rotacao",
    "title": "Vetor: rotação de uma posição à direita",
    "topic": "Aula 4 · Vetores",
    "level": "Desafio",
    "description": "Leia N (1 a 100) e N inteiros para um vetor. Desloque os elementos uma posição à direita, levando o último para a primeira posição. Mostre o vetor resultante, um elemento por linha. Para N=1, o valor permanece igual.",
    "hint": "Guarde o último antes de deslocar; percorra de trás para frente.",
    "tests": [
      {
        "input": "4\n1\n2\n3\n4",
        "output": "4\n1\n2\n3"
      },
      {
        "input": "1\n-8",
        "output": "-8"
      },
      {
        "input": "3\n0\n0\n1",
        "output": "1\n0\n0"
      },
      {
        "input": "3\n-1\n-2\n-3",
        "output": "-3\n-1\n-2"
      },
      {
        "input": "100\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n61\n62\n63\n64\n65\n66\n67\n68\n69\n70\n71\n72\n73\n74\n75\n76\n77\n78\n79\n80\n81\n82\n83\n84\n85\n86\n87\n88\n89\n90\n91\n92\n93\n94\n95\n96\n97\n98\n99\n100",
        "output": "100\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n61\n62\n63\n64\n65\n66\n67\n68\n69\n70\n71\n72\n73\n74\n75\n76\n77\n78\n79\n80\n81\n82\n83\n84\n85\n86\n87\n88\n89\n90\n91\n92\n93\n94\n95\n96\n97\n98\n99"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 4 · Vetores do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "vetor-intercalar",
    "title": "Intercalar dois vetores",
    "topic": "Aula 4 · Vetores",
    "level": "Intermediário",
    "description": "Leia N (1 a 50), depois N inteiros para o vetor A e depois N inteiros para B. Mostre A[0], B[0], A[1], B[1], ... até terminar, um valor por linha.",
    "hint": "As leituras dos dois vetores são separadas; a saída alterna entre eles.",
    "tests": [
      {
        "input": "3\n1\n2\n3\n10\n20\n30",
        "output": "1\n10\n2\n20\n3\n30"
      },
      {
        "input": "1\n-1\n5",
        "output": "-1\n5"
      },
      {
        "input": "2\n0\n0\n0\n0",
        "output": "0\n0\n0\n0"
      },
      {
        "input": "2\n-1\n-2\n3\n4",
        "output": "-1\n3\n-2\n4"
      },
      {
        "input": "50\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n101\n102\n103\n104\n105\n106\n107\n108\n109\n110\n111\n112\n113\n114\n115\n116\n117\n118\n119\n120\n121\n122\n123\n124\n125\n126\n127\n128\n129\n130\n131\n132\n133\n134\n135\n136\n137\n138\n139\n140\n141\n142\n143\n144\n145\n146\n147\n148\n149\n150",
        "output": "1\n101\n2\n102\n3\n103\n4\n104\n5\n105\n6\n106\n7\n107\n8\n108\n9\n109\n10\n110\n11\n111\n12\n112\n13\n113\n14\n114\n15\n115\n16\n116\n17\n117\n18\n118\n19\n119\n20\n120\n21\n121\n22\n122\n23\n123\n24\n124\n25\n125\n26\n126\n27\n127\n28\n128\n29\n129\n30\n130\n31\n131\n32\n132\n33\n133\n34\n134\n35\n135\n36\n136\n37\n137\n38\n138\n39\n139\n40\n140\n41\n141\n42\n142\n43\n143\n44\n144\n45\n145\n46\n146\n47\n147\n48\n148\n49\n149\n50\n150"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 4 · Vetores do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "vetor-diferencas",
    "title": "Diferenças entre vizinhos do vetor",
    "topic": "Aula 4 · Vetores",
    "level": "Intermediário",
    "description": "Leia N (2 a 100) e N inteiros para um vetor V. Mostre V[1]-V[0], V[2]-V[1], ... até V[N-1]-V[N-2], um resultado por linha. Não use valor absoluto.",
    "hint": "Há N-1 diferenças. Comece no índice 1 para existir um anterior.",
    "tests": [
      {
        "input": "4\n1\n4\n2\n7",
        "output": "3\n-2\n5"
      },
      {
        "input": "2\n5\n5",
        "output": "0"
      },
      {
        "input": "3\n-3\n-5\n-1",
        "output": "-2\n4"
      },
      {
        "input": "3\n3\n2\n1",
        "output": "-1\n-1"
      },
      {
        "input": "100\n0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n61\n62\n63\n64\n65\n66\n67\n68\n69\n70\n71\n72\n73\n74\n75\n76\n77\n78\n79\n80\n81\n82\n83\n84\n85\n86\n87\n88\n89\n90\n91\n92\n93\n94\n95\n96\n97\n98\n99",
        "output": "1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 4 · Vetores do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "matriz-soma-duas",
    "title": "Soma de duas matrizes 2 por 2",
    "topic": "Aula 4 · Matrizes",
    "level": "Intermediário",
    "description": "Leia primeiro os quatro inteiros da matriz A 2 por 2, linha por linha; depois os quatro da matriz B. Calcule C[i][j] = A[i][j] + B[i][j]. Mostre os quatro elementos de C, linha por linha, um elemento por linha de saída.",
    "hint": "Some posições correspondentes, sem somar todos os elementos em um único acumulador.",
    "tests": [
      {
        "input": "1\n2\n3\n4\n5\n6\n7\n8",
        "output": "6\n8\n10\n12"
      },
      {
        "input": "0\n0\n0\n0\n0\n0\n0\n0",
        "output": "0\n0\n0\n0"
      },
      {
        "input": "-1\n-2\n-3\n-4\n1\n2\n3\n4",
        "output": "0\n0\n0\n0"
      },
      {
        "input": "9\n0\n1\n-2\n-3\n4\n0\n5",
        "output": "6\n4\n1\n3"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 4 · Matrizes do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "matriz-transposta",
    "title": "Transposta de uma matriz 2 por 3",
    "topic": "Aula 4 · Matrizes",
    "level": "Desafio",
    "description": "Leia seis inteiros para uma matriz A 2 por 3, linha por linha. Sua transposta tem 3 linhas e 2 colunas: T[j][i] = A[i][j]. Mostre os elementos da transposta linha por linha, um elemento por linha de saída.",
    "hint": "Na saída, percorra primeiro as colunas originais e depois as linhas originais.",
    "tests": [
      {
        "input": "1\n2\n3\n4\n5\n6",
        "output": "1\n4\n2\n5\n3\n6"
      },
      {
        "input": "0\n0\n0\n0\n0\n0",
        "output": "0\n0\n0\n0\n0\n0"
      },
      {
        "input": "-1\n-2\n-3\n1\n2\n3",
        "output": "-1\n1\n-2\n2\n-3\n3"
      },
      {
        "input": "9\n8\n7\n6\n5\n4",
        "output": "9\n6\n8\n5\n7\n4"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 4 · Matrizes do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "diagonal-secundaria",
    "title": "Soma da diagonal secundária",
    "topic": "Aula 4 · Matrizes",
    "level": "Intermediário",
    "description": "Leia nove inteiros para uma matriz 3 por 3, linha por linha. Mostre a soma das posições [0][2], [1][1] e [2][0].",
    "hint": "Na diagonal secundária de tamanho 3, linha + coluna é igual a 2.",
    "tests": [
      {
        "input": "1\n2\n3\n4\n5\n6\n7\n8\n9",
        "output": "15"
      },
      {
        "input": "0\n0\n1\n0\n2\n0\n3\n0\n0",
        "output": "6"
      },
      {
        "input": "9\n0\n0\n0\n9\n0\n0\n0\n9",
        "output": "9"
      },
      {
        "input": "0\n0\n-1\n0\n-2\n0\n-3\n0\n0",
        "output": "-6"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 4 · Matrizes do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  },
  {
    "id": "matriz-maior-posicao",
    "title": "Maior da matriz e sua posição",
    "topic": "Aula 4 · Matrizes",
    "level": "Desafio",
    "description": "Leia seis inteiros para uma matriz 2 por 3, linha por linha. Mostre o maior valor, seu índice de linha e seu índice de coluna, nessa ordem, um por linha. Índices começam em zero. Em empate, mantenha a primeira ocorrência na ordem de leitura.",
    "hint": "Inicialize com [0][0]. Só atualize a posição se o novo valor for estritamente maior.",
    "tests": [
      {
        "input": "1\n9\n3\n4\n5\n6",
        "output": "9\n0\n1"
      },
      {
        "input": "-8\n-3\n-5\n-6\n-9\n-7",
        "output": "-3\n0\n1"
      },
      {
        "input": "7\n7\n7\n7\n7\n7",
        "output": "7\n0\n0"
      },
      {
        "input": "0\n1\n2\n3\n4\n9",
        "output": "9\n1\n2"
      }
    ],
    "numeric": true,
    "source": {
      "label": "Base: Aula 4 · Matrizes do professor · exercício autoral"
    },
    "isNew": true,
    "batch": "revisao-50"
  }
];
