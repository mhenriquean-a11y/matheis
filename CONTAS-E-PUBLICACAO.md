# Contas individuais e publicação

## Grupo privado gratuito: Render Free + Supabase Free

Esta é a opção escolhida para o dono e sete amigos. Não contrate disco ou compute pago. Os planos gratuitos têm limites de recursos e podem suspender projetos inativos; o primeiro acesso após inatividade pode demorar. Não existe garantia de disponibilidade contínua.

1. No Supabase, crie uma organização **Free** e um projeto `pratica-portugol`. Guarde a senha do banco. Não é necessário usar Supabase Auth: as contas e senhas continuam sendo administradas pelo servidor do site.
2. Em **Connect**, selecione a conexão PostgreSQL **Session pooler**, porta **5432**. Ela costuma funcionar em hospedagens IPv4. Copie a URL, substitua o marcador da senha pela senha do banco, codificando caracteres especiais como parte de uma URL. Não envie essa conexão no chat ou em prints.
3. Gere oito convites com `npm run invitations`. Eles ficam no arquivo privado `.env.invitations`, ignorado pelo Git. Não rode novamente sobre esse arquivo: os convites já distribuídos precisam continuar válidos.
4. No Render, crie um Web Service a partir do repositório, branch `main`, linguagem Docker, plano **Free ($0)**. Não adicione disco persistente. O Dockerfile faz o build e inicia o servidor automaticamente.
5. Configure as variáveis abaixo diretamente no painel do Render:

| Variável | Valor |
| --- | --- |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | URL privada do Session pooler do Supabase |
| `PRIVATE_ACCESS` | `1` |
| `MAX_ACCOUNTS` | `8` |
| `INVITATION_CODES` | Os oito códigos de `.env.invitations`, separados por vírgula |
| `TRUST_PROXY` | `1` |

Não configure `DATA_DIR`: com `DATABASE_URL`, contas, sessões, convites utilizados e progresso ficam no PostgreSQL, sem depender do disco temporário do Render. O servidor cria as tabelas no esquema `pratica_privada`, separado da API pública do Supabase e com RLS habilitado. A conexão exige TLS com certificado válido. Os certificados CA oficiais de produção do Supabase estão incluídos em `server/certs` e são utilizados somente para os endereços do provedor, mantendo a verificação do certificado e do hostname.

6. Publique e abra o endereço HTTPS fornecido pelo Render. Depois configure `PUBLIC_ORIGIN` com esse endereço exato, sem caminho.
7. Use um convite para criar sua conta. Compartilhe o link e **um convite diferente** com cada amigo. Cada convite cria uma única conta; oito contas incluem o dono. O limite e o consumo dos convites são conferidos dentro de uma transação, inclusive em cadastros simultâneos.
8. Teste em janela anônima: sem entrar, devem aparecer somente o formulário de acesso e a opção de cadastro por convite. Atividades e arquivos do aplicativo exigem sessão válida. Não há perfil de administrador nem uma função para convidar pessoas pelo navegador nesta versão.
9. Para trazer o estudo anterior, exporte o progresso no navegador antigo e importe depois de entrar na conta. Não há cópia automática do SQLite local para o Supabase.

Um link repassado não permite cadastrar outra conta sem convite. Pessoas já autorizadas podem copiar ou compartilhar o conteúdo que visualizam; login não impede essa ação. Não publique credenciais ou códigos de convite no GitHub. A versão portátil do HTML continua independente, em modo visitante, e não é o site privado hospedado.

Se a implantação falhar, confira o log sem expor a URL de conexão. O servidor não imprime essa URL. Antes de considerar concluída a publicação, valide cadastro com convite, rejeição de convite reutilizado, login de outro navegador, persistência após reinício e isolamento de progresso entre duas contas.

## O que está pronto

- Cadastro por nome, usuário e senha; login e logout.
- Senhas derivadas com scrypt e salt aleatório, nunca armazenadas como texto.
- Sessão por cookie HttpOnly e SameSite=Lax. Em produção, Secure e prefixo __Host-.
- Troca de senha com confirmação da senha atual e invalidação das outras sessões.
- Rascunhos, tentativas, correções, preferências e simulado associados ao usuário no banco.
- Sincronização em outro navegador ou dispositivo após entrar na mesma conta.
- Revisões de progresso evitam sobrescritas silenciosas: códigos em conflito ficam preservados em Minhas tentativas.
- Visitantes continuam com o armazenamento local anterior. A transferência para uma conta é opcional e não acontece automaticamente.
- Uma falha de sincronização é indicada na tela; a pendência local fica disponível para tentar novamente.

As contas não têm e-mail nem recuperação automática de senha. A tela informa isso no cadastro. Guarde a senha; ela pode ser alterada enquanto o usuário souber a atual.

## Executar no computador ou nesta máquina

Requer **Node.js 24+**.

```sh
npm ci
npm run build
npm start
```

A aplicação completa fica na porta 3000. Em desenvolvimento, `npm run dev` inicia o servidor na porta 3000 e o editor com Vite na porta 5173, encaminhando `/api` para o servidor.

O banco é criado em `.data/pratica.sqlite`. Esse diretório é local e está ignorado no Git e nos pacotes de distribuição. Não há contas pré-criadas nem senhas padrão.

Configuração opcional:

```sh
cp .env.example .env
node --env-file=.env server/index.js
```

O arquivo `.env.example` não contém senhas. Nunca publique `.env` nem `.data`.

## Alternativa com SQLite e disco persistente (pode ser paga)

**Enviar apenas `dist` ao Netlify Drop não publica o servidor de contas.** Esse envio continua permitindo o modo visitante, mas não login, cadastro ou sincronização.

Para manter o SQLite local em uma hospedagem, use Node.js 24 e **disco persistente**, por exemplo um serviço Web no Render ou um serviço equivalente com volume. A configuração não foi publicada automaticamente e nenhum serviço pago foi criado.

Configuração de um serviço Node:

- Build: `npm ci && npm run build`
- Início: `npm start`
- Runtime: Node.js 24+
- `NODE_ENV=production`
- `DATA_DIR=/data`, com volume persistente montado em `/data` e permissão de escrita pelo processo
- `PUBLIC_ORIGIN=https://seu-endereco-real`, sem caminho, usando o endereço final da hospedagem
- `PORT`: use o valor fornecido pela hospedagem
- `TRUST_PROXY=1` somente se a aplicação estiver atrás do proxy reverso confiável da hospedagem

O domínio deve ter HTTPS. A aplicação em produção usa cookie Secure; login por HTTP comum não funciona nesse modo.

Depois da publicação:

1. Abra o endereço HTTPS e crie sua conta.
2. Se quiser manter o estudo anterior, marque a transferência do visitante ou use Importar progresso após entrar.
3. Saia e teste outra conta. Ela deve começar com seu próprio progresso.
4. Entre na mesma conta em outro navegador para conferir a sincronização.
5. Compartilhe o endereço HTTPS pelo WhatsApp.

## Docker

O `Dockerfile` usa Node.js 24. Com `DATABASE_URL`, o banco fica no PostgreSQL remoto e não precisa de volume. Sem essa variável, o modo SQLite usa `/data` e exige volume persistente para hospedagem. Nesse modo local, use uma única instância do servidor. Em ambos os modos, execute atrás de HTTPS.

Para testar localmente por HTTP:

```sh
docker build -t pratica-portugol .
docker run --rm -p 3000:3000 -e NODE_ENV=development -v pratica-dados:/data pratica-portugol
```

Em produção, mantenha `NODE_ENV=production` e informe `PUBLIC_ORIGIN` com o endereço HTTPS correto.

## Dados, disponibilidade e limites

- No modo SQLite, reiniciar o processo preserva contas e progresso **se o volume permanecer**. Disco temporário pode perder o banco em uma nova publicação.
- Faça backups do banco com a API de backup do SQLite ou pare o serviço e copie o diretório de dados inteiro; copiar apenas o arquivo principal enquanto há gravações WAL pode gerar um backup incompleto.
- Cada usuário pode exportar seu progresso em JSON; não há senha nem cookie de sessão no arquivo exportado.
- O limite é de 5 MB de progresso por conta. O servidor rejeita dados maiores sem sobrescrever o progresso anterior.
- O histórico de treino é pessoal e editável no cliente. Não foi projetado como sistema antifraude para provas oficiais.
- A versão HTML portátil funciona sem servidor apenas como visitante. Ela não cria contas fictícias no navegador.
