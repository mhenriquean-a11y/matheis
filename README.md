# Tropa do Raio · C e Portugol

## Estudar C sem perder Portugol

A página principal abre a trilha **C**, com as mesmas 100 atividades, testes
automáticos, terminal, histórico, revisão rápida e simulado. Use **Linguagem**
no cabeçalho para voltar a **Portugol**. `?language=portugol` abre essa trilha
diretamente; `?language=c` abre C. A troca aguarda a sincronização quando há conta.

- As contas, senhas, sessões e convites existentes continuam funcionando.
- Portugol mantém `portugol-pratica-v1` e `portugol-pratica-user-v1:<id>` no
  navegador e a tabela `progress` no banco, sem migração nem regravação para C.
- C usa `c-pratica-v1`, `c-pratica-user-v1:<id>` e a tabela nova `progress_c`.
  A criação da tabela é aditiva, em SQLite e PostgreSQL, com RLS no PostgreSQL.
- Rascunhos, tentativas, simulados, revisões de sincronização e pendências são
  independentes. Backups C possuem `language: "c"`; backups antigos sem essa
  propriedade continuam sendo de Portugol. Importe cada backup na sua trilha.
- Exportar progresso exporta a trilha atual. Exporte as duas para guardar ambas.

### Executor de C

PicoC Web 1.1.0, incorporado ao projeto, executa C em WebAssembly dentro de um
Web Worker descartável: nenhum código do estudante é executado no servidor de
contas. O limite é de 3 segundos por caso, com botão **Parar execução** e limite
de 100 KB de saída. A entrada/saída é UTF-8 e os critérios de comparação são os
mesmos das atividades originais. Não há serviços externos de compilação.

PicoC cobre os recursos essenciais de C para este treino, mas **não é GCC nem
uma implementação completa de ISO C**. Use `int main(void)`, `double` para reais,
vetores com tamanho fixo, `stdio.h`, `math.h`, `string.h` e `ctype.h`. Macros
avançadas e recursos mais recentes podem não funcionar; confirme no compilador
da disciplina quando necessário. O editor usa realce de C e baixa arquivos `.c`.
As sete atividades que exigem função conferem a definição e uma chamada.

`dist/Pratica-C.html` abre C e `dist/Pratica-Portugol.html` abre Portugol.
Ambos são autossuficientes, com os dois executores incorporados. Contas exigem o
servidor; abrir o HTML diretamente continua sendo modo visitante.

### Conferência anterior à adaptação

Em 23/10/2026, a árvore local estava limpa em `f6792b7`. Foram conferidas as
branches remotas e o histórico: apenas `main`, no mesmo commit, sem versão C.
Foram reaproveitados o catálogo e os casos de teste, a correção, o sistema de
contas, a sincronização, as importações e os recursos de estudo existentes.

Para atualizar o serviço existente no Render, publique este código na mesma
branch `main`, mantendo `DATABASE_URL`, convites e demais configurações. Não
crie outro serviço nem substitua o banco. A inicialização cria `progress_c` e
preserva as tabelas existentes. A versão anterior pode voltar a ler Portugol,
pois o seu formato de armazenamento continua igual.

Site de estudo em português com 100 questões, editor com cores, execução real de Portugol, testes automáticos, histórico local e simulado de oito questões. Baseado nos temas das aulas e nos prints fornecidos pelo estudante. Não é uma cópia nem uma integração com o corretor oficial do professor.

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

`npm run build` gera o site em `dist/` e o arquivo único `dist/Pratica-Portugol.html`. Para publicação estática, envie o conteúdo de `dist/` a uma hospedagem. Para atualizar o serviço com contas no Render, siga a seção de atualização ao final deste documento.

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

- Os testes automatizados verificam executor, catálogo completo, contas, sincronização, certificados TLS e casos de cada questão. Rode `npm test` para conferir o resultado atual.
- 19 testes de navegador passaram: correção, persistência, limite para laços infinitos, diagnóstico de erros, simulado e layout móvel; também execução do arquivo portátil servido sem assets externos.
- Build de produção concluído.
- Abertura direta de URL `file://` não pôde ser validada no navegador gerenciado desta máquina, que bloqueia esse protocolo por política. O arquivo portátil foi validado via HTTP sem carregar scripts, estilos ou executor externos.

## Licenças

Projeto distribuído sob GPL-3.0, incluindo o código-fonte correspondente.

Executor: [Portugol Web](https://github.com/erickweil/portugolweb), Erick Leonardo Weil e colaboradores. Commit e alteração local documentados em `vendor/portugol/NOTICE.md`. Texto completo em `LICENSE` e `vendor/portugol/LICENSE`.

Editor: [Ace](https://github.com/ajaxorg/ace), BSD, licença em `THIRD-PARTY-ACE.txt`.

## Ampliação das atividades

Foram acrescentadas 20 questões sem mudar os IDs anteriores nem a chave de armazenamento do progresso. Essas 20 questões continuam disponíveis no catálogo completo; o filtro de novidades agora destaca a leva mais recente de 50 questões. Cada nova questão mostra sua base nos PDFs ou um link para a referência conceitual consultada. Consulte `REFERENCIAS.md` para o mapeamento completo. Os enunciados e casos são autorais, não cópias do corretor do professor.

## Ajuste na comparação de saídas

O treino aceita mensagens com ou sem acentos, por exemplo `Divisão por zero` e `Divisao por zero`, inclusive acentos Unicode decompostos. Isso se aplica a todas as 100 questões. Valores como `0` e `0.0` continuam equivalentes nas questões numéricas. Palavras diferentes, maiúsculas diferentes, resultados incorretos e saídas extras continuam sendo rejeitados. Representações binárias continuam sendo comparadas como texto. Após atualizar, reenvie soluções antigas para obter nova correção; o histórico registra o resultado original da tentativa.

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

Cadastro, login, logout e alteração de senha estão implementados com servidor Node.js 24 e SQLite local ou PostgreSQL remoto. O grupo privado exige convite e permite limitar as contas; o caminho Render Free + Supabase Free está documentado. Cada conta guarda seu próprio progresso; a transferência do visitante é opcional. Para executar e publicar a versão com contas, siga `CONTAS-E-PUBLICACAO.md`. Publicar apenas a pasta `dist` mantém o modo visitante e não ativa contas.

## Atualização: Tropa do Raio e 50 novas atividades

O site passou a se chamar **Tropa do Raio**, incluindo a tela de acesso e o título da aba. Foram adicionadas 50 atividades autorais baseadas nos **quatro** PDFs das Aulas 1 a 4, confirmados pelo estudante: 5 de fundamentos, 7 de cálculos, 10 de condições, 7 de repetições, 5 de enquanto, 6 de funções, 6 de vetores e 4 de matrizes. Cada questão tem enunciado, dica, referência da aula e testes, inclusive limites e entradas inválidas quando previstos. Os critérios que complementam exercícios dos slides são explicitamente identificados como regras do treino.

O catálogo agora tem **100 questões**. O filtro **Mostrar só as 50 novas atividades** destaca a última leva; Fundamentos ganhou filtro e revisão rápida. IDs antigos, chave do progresso, cookies, contas e banco continuam compatíveis. As soluções usadas na validação ficam em `test/fixtures/revision-programs.js` e não são importadas pelo aplicativo.

Para atualizar o site hospedado, envie o código à branch `main` do GitHub. Se o Render não iniciar uma implantação automática, use **Manual Deploy → Deploy latest commit** no serviço existente. Não crie outro serviço nem altere `DATABASE_URL` ou convites. Aguarde **Live** e recarregue o mesmo link (Ctrl+F5 se estiver vendo a versão anterior). O PostgreSQL mantém o progresso entre implantações.

Os 100 enunciados são apresentados com **Objetivo, Entrada, Saída e Regras**. As dicas levantam perguntas de raciocínio, sem código de solução ou roteiro de implementação. Exemplos de entrada e saída são opcionais e ficam recolhidos por padrão; as soluções de validação não integram o aplicativo.

## Validação da adaptação para C

257 testes automatizados passaram, incluindo execução de C e preservação das
trilhas no banco. Os 28 cenários de navegador foram validados, incluindo C,
Portugol, contas, troca de trilha, persistência, interrupção, limite de execução,
backups, versão portátil e layout móvel. Build de produção concluído.
A sincronização também evita reenviar um estado remoto que apenas foi reexibido.
A publicação de produção no Render precisa ser conferida no serviço existente.
