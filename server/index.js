import { resolve } from 'node:path';
import { createApplication } from './app.js';
import { startupDiagnostic } from './startup-diagnostics.js';
const flag=process.argv.indexOf('--port');
const port=Number(flag>=0?process.argv[flag+1]:process.env.PORT||3000);
let app;
try{app=createApplication({databaseUrl:process.env.DATABASE_URL||undefined,privateAccess:process.env.PRIVATE_ACCESS==='1',invitationCodes:(process.env.INVITATION_CODES||'').split(',').map(x=>x.trim()).filter(Boolean),maxAccounts:Number(process.env.MAX_ACCOUNTS||8),databasePath:resolve(process.env.DATA_DIR||'.data','pratica.sqlite'),secureCookies:process.env.NODE_ENV==='production',publicOrigin:process.env.PUBLIC_ORIGIN||undefined,trustProxy:process.env.TRUST_PROXY==='1'});}catch(error){console.error(startupDiagnostic(error));console.error('Configuração inválida. Confira DATABASE_URL, PRIVATE_ACCESS, MAX_ACCOUNTS e INVITATION_CODES no painel da hospedagem.');process.exit(1);}
try{await app.ready;}catch(error){console.error(startupDiagnostic(error));await app.close();process.exit(1);}
app.server.listen(port,'0.0.0.0',()=>console.log(`Tropa do Raio disponível na porta ${port}.`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,async()=>{await app.close();process.exit(0);});
