// Only fixed messages are logged. Driver messages can contain credentials or connection URLs.
const explanations={
  '28P01':'Usuário ou senha do banco recusados. Confira DATABASE_URL no Render e a senha definida no Supabase.',
  '28000':'Autenticação do banco recusada. Confira o usuário e o projeto na URL do Session pooler.',
  '3D000':'Banco não encontrado. Confira se o caminho final da URL é /postgres.',
  '42501':'O usuário do banco não tem permissão para preparar as tabelas do aplicativo.',
  '42601':'O banco recusou um comando de preparação das tabelas.',
  ENOTFOUND:'O endereço do banco não foi encontrado. Confira o host da URL do Session pooler.',
  EAI_AGAIN:'Falha temporária ao localizar o banco. Tente publicar novamente em alguns minutos.',
  ECONNREFUSED:'O banco recusou a conexão. Confira a disponibilidade do projeto e a porta 5432 do Session pooler.',
  ETIMEDOUT:'A conexão com o banco demorou demais. Confira se o projeto está ativo e use o Session pooler.',
  ENETUNREACH:'A rede do banco não está acessível. Use a URL do Session pooler compatível com IPv4.',
  SELF_SIGNED_CERT_IN_CHAIN:'O certificado TLS do banco precisa de uma autoridade certificadora confiável. A verificação de segurança foi mantida.',
  DEPTH_ZERO_SELF_SIGNED_CERT:'O certificado TLS do banco não foi reconhecido. A verificação de segurança foi mantida.',
  UNABLE_TO_VERIFY_LEAF_SIGNATURE:'Não foi possível verificar o certificado TLS do banco.',
  UNABLE_TO_GET_ISSUER_CERT_LOCALLY:'A autoridade certificadora do banco não está disponível no servidor.',
  ERR_TLS_CERT_ALTNAME_INVALID:'O certificado TLS não corresponde ao endereço do banco.',
  ERR_INVALID_URL:'DATABASE_URL está em um formato inválido. Confira a URL e a codificação dos caracteres especiais da senha.'
};
export function startupDiagnostic(error){
  for(const candidate of [error,error?.cause,...(Array.isArray(error?.errors)?error.errors:[])]){
    if(explanations[candidate?.code])return `[${candidate.code}] ${explanations[candidate.code]}`;
  }
  const message=typeof error?.message==='string'?error.message:'';
  if(/timeout|timed out/i.test(message))return '[CONNECTION_TIMEOUT] A conexão com o banco demorou demais. Confira se o projeto está ativo e use o Session pooler.';
  if(/tenant or user not found/i.test(message))return '[POOLER_USER] O pooler não encontrou esse projeto ou usuário. Copie novamente a URL do Session pooler do projeto correto.';
  if(/unsupported startup parameter/i.test(message))return '[POOLER_OPTIONS] O pooler recusou uma opção de conexão. Atualize a implantação para a versão mais recente do aplicativo.';
  if(/\[YOUR[-_]PASSWORD\]/i.test(message))return '[PASSWORD_PLACEHOLDER] Substitua o marcador de senha na DATABASE_URL pela senha do banco.';
  return '[DATABASE_STARTUP] Não foi possível preparar o banco. Confira DATABASE_URL e a disponibilidade do projeto no Supabase.';
}
