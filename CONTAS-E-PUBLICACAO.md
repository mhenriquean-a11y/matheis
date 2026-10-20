# Contas individuais e publicação

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

## Compartilhar um endereço público com contas

**Enviar apenas `dist` ao Netlify Drop não publica o servidor de contas.** Esse envio continua permitindo o modo visitante, mas não login, cadastro ou sincronização.

Para contas reais, use uma hospedagem que execute Node.js 24 e disponibilize **disco persistente**, por exemplo um serviço Web no Render ou um serviço equivalente com volume. A configuração não foi publicada automaticamente e nenhum serviço pago foi criado.

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

O `Dockerfile` usa Node.js 24 e mantém o banco fora do código, em `/data`. Em produção, execute atrás de HTTPS e monte um volume persistente. Não execute duas instâncias com discos separados esperando que compartilhem contas: esta implementação usa um único banco SQLite e uma instância de servidor.

Para testar localmente por HTTP:

```sh
docker build -t pratica-portugol .
docker run --rm -p 3000:3000 -e NODE_ENV=development -v pratica-dados:/data pratica-portugol
```

Em produção, mantenha `NODE_ENV=production` e informe `PUBLIC_ORIGIN` com o endereço HTTPS correto.

## Dados, disponibilidade e limites

- Reiniciar o processo preserva contas e progresso **se o volume permanecer**. Disco temporário pode perder o banco em uma nova publicação.
- Faça backups do banco com a API de backup do SQLite ou pare o serviço e copie o diretório de dados inteiro; copiar apenas o arquivo principal enquanto há gravações WAL pode gerar um backup incompleto.
- Cada usuário pode exportar seu progresso em JSON; não há senha nem cookie de sessão no arquivo exportado.
- O limite é de 5 MB de progresso por conta. O servidor rejeita dados maiores sem sobrescrever o progresso anterior.
- O histórico de treino é pessoal e editável no cliente. Não foi projetado como sistema antifraude para provas oficiais.
- A versão HTML portátil funciona sem servidor apenas como visitante. Ela não cria contas fictícias no navegador.
