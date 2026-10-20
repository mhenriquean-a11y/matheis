# Prática · Portugol

Site de estudo em português com 50 questões, editor com cores, execução real de Portugol, testes automáticos, histórico local e simulado de oito questões. Baseado nos temas das aulas e nos prints fornecidos pelo estudante. Não é uma cópia nem uma integração com o corretor oficial do professor.

## Usar sem instalar ferramentas

Abra `dist/Pratica-Portugol.html` em um navegador moderno (Chrome, Edge ou Firefox). O arquivo contém editor, estilos, questões e executor. Não precisa de conta ou acesso ao site do professor. Se o navegador restringir arquivos locais, use o servidor abaixo.

1. Selecione uma questão e leia o enunciado.
2. Escreva o programa em Portugol no editor.
3. Clique em **Testar solução** para executar todos os casos.
4. Expanda um teste para comparar entrada, saída esperada e saída recebida.
5. No terminal de teste, informe suas próprias entradas, uma por linha.
6. O histórico e os códigos ficam no armazenamento deste navegador. Use **Exportar progresso** para baixar uma cópia JSON.

**Simulado:** oito questões, sem dicas nem correção até a entrega. É necessário clicar em **Salvar resposta no simulado** em cada questão. Rascunhos não enviados não contam como respostas. O relógio registra o tempo, sem encerrar automaticamente.

O primeiro exemplo é visível antes do envio. Em modo treino, os demais casos são revelados após o teste. Como tudo executa localmente, os casos não são secretos para quem inspeciona o código-fonte. Não usar para avaliações oficiais.

## Desenvolvimento

Requer Node.js 24+ e npm.

```sh
cd /workspace/matheis
npm ci --cache /tmp/portugol-npm
npm run dev
```

O servidor usa a porta 5173. Em outro computador, use o diretório em que extraiu o projeto no lugar de `/workspace/matheis`.

```sh
npm test
npm run build
npm run preview
```

`npm run build` gera o site em `dist/` e o arquivo único `dist/Pratica-Portugol.html`. Para publicação estática, envie o conteúdo de `dist/` a uma hospedagem. A versão criada nesta tarefa não foi publicada em uma URL pública.

Testes de navegador:

```sh
npm run build
npm run test:browser
```

O teste serve o build de produção, por isso execute `npm run build` antes. O teste usa Chromium em `/usr/bin/chromium` quando disponível. Em outro ambiente, instale um navegador com `npx playwright install chromium` ou configure `BROWSER_PATH` com o caminho do executável.

## Como funciona a correção

- Executor Portugol Web em Web Worker dedicado: o programa do estudante não executa na interface.
- Limite de 3 segundos por caso e botão para interromper. Um laço infinito não bloqueia a página.
- Entrada e saída separadas: entradas não são incluídas na saída avaliada.
- Erros de compilação, entradas insuficientes, erros de execução e saídas diferentes são apresentados.
- Acentos (inclusive Unicode decomposto), CRLF e espaços externos são normalizados. Palavras e maiúsculas continuam sendo conferidas. Nas questões textuais, as quebras de linha internas também são conferidas. Questões numéricas aceitam tolerância de `1e-6 * max(1, abs(esperado))` por valor. Não é um corretor de formatação decimal fixa.
- Funções, vetores, matrizes e bibliotecas Texto, Tipos e Matematica são suportados. Bibliotecas de rede e gráficos não estão disponíveis.
- Na questão de função, também se verifica a declaração e chamada de `calcular_media`. Isso é uma checagem textual simples, não uma avaliação pedagógica completa da estrutura.
- Regras de salário do vendedor, INSS e prestação são versões de treino explícitas: os enunciados originais não estavam disponíveis. O INSS usa uma tabela fictícia, não regras legais atuais.
- Aprovação nos testes locais não garante aprovação no site do professor. A compatibilidade com todas as particularidades de portugol.dev não é garantida.
- A versão completa agora tem servidor de contas e sincronização. A versão HTML sem servidor continua em modo visitante. Não foram salvas credenciais de acesso ao site do professor.

## Validação realizada

- 130 testes automatizados de executor, questões, contas e sincronização passaram, incluindo todos os casos de cada uma das 50 questões.
- 19 testes de navegador passaram: correção, persistência, limite para laços infinitos, diagnóstico de erros, simulado e layout móvel; também execução do arquivo portátil servido sem assets externos.
- Build de produção concluído.
- Abertura direta de URL `file://` não pôde ser validada no navegador gerenciado desta máquina, que bloqueia esse protocolo por política. O arquivo portátil foi validado via HTTP sem carregar scripts, estilos ou executor externos.

## Licenças

Projeto distribuído sob GPL-3.0, incluindo o código-fonte correspondente.

Executor: [Portugol Web](https://github.com/erickweil/portugolweb), Erick Leonardo Weil e colaboradores. Commit e alteração local documentados em `vendor/portugol/NOTICE.md`. Texto completo em `LICENSE` e `vendor/portugol/LICENSE`.

Editor: [Ace](https://github.com/ajaxorg/ace), BSD, licença em `THIRD-PARTY-ACE.txt`.

## Ampliação das atividades

Foram acrescentadas 20 questões sem mudar os IDs anteriores nem a chave de armazenamento do progresso. O filtro **Mostrar só as 20 novas atividades** ajuda a encontrá-las. Cada nova questão mostra sua base nos PDFs ou um link para a referência conceitual consultada. Consulte `REFERENCIAS.md` para o mapeamento completo. Os enunciados e casos são autorais, não cópias do corretor do professor.

## Ajuste na comparação de saídas

O treino aceita mensagens com ou sem acentos, por exemplo `Divisão por zero` e `Divisao por zero`, inclusive acentos Unicode decompostos. Isso se aplica a todas as 50 questões. Valores como `0` e `0.0` continuam equivalentes nas questões numéricas. Palavras diferentes, maiúsculas diferentes, resultados incorretos e saídas extras continuam sendo rejeitados. Representações binárias continuam sendo comparadas como texto. Após atualizar, reenvie soluções antigas para obter nova correção; o histórico registra o resultado original da tentativa.

## Melhorias para estudar e revisar

- Sugestão de próxima questão: prioriza a última tentativa com erro e depois atividades ainda não tentadas, dos fundamentos aos desafios. A sugestão não altera rascunhos.
- Filtro de situação: revisar, ainda não tentei ou última tentativa correta. A busca agora aceita termos sem acentos.
- Aba **Revisão rápida**: explicações do assunto e exemplos curtos sem a resposta da questão. Indisponível no simulado, assim como a consulta ao histórico.
- Diagnóstico: o primeiro teste com falha abre automaticamente; são explicados problemas de leitura extra, laço infinito, conteúdo extra, letras maiúsculas e a linha de saída diferente. Erros com linha de código permitem navegar até ela no editor.
- Novas tentativas guardam o código e os resultados de cada teste. O histórico pode exibir a correção registrada e restaurar código, preservando o rascunho anterior. Tentativas antigas continuam disponíveis, mas não contêm o código que não havia sido registrado.
- **Importar progresso** recebe o JSON exportado, valida o conteúdo e mescla históricos sem duplicar tentativas. Se um código importado conflitar com o rascunho atual, ele fica preservado como rascunho em Minhas tentativas; o código atual não é sobrescrito. Importações inválidas não modificam o progresso.
- Controles A− e A+ ajustam o tamanho do código entre 12 e 24 px.

As dicas e recomendações são locais e baseadas no assunto e no histórico de testes. Não usam um tutor conectado nem prometem identificar automaticamente todo erro de lógica.

O limite de 3 segundos só começa após o executor sinalizar que terminou de carregar. O carregamento tem um limite separado de 30 segundos.

## Contas e sincronização

Cadastro, login, logout e alteração de senha estão implementados com servidor Node.js 24 e SQLite. Cada conta guarda seu próprio progresso; a transferência do visitante é opcional. Para executar e publicar a versão com contas, siga `CONTAS-E-PUBLICACAO.md`. Publicar apenas a pasta `dist` mantém o modo visitante e não ativa contas.
