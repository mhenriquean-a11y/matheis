import { resolve } from 'node:path';
import { createApplication } from './app.js';
const flag=process.argv.indexOf('--port');
const port=Number(flag>=0?process.argv[flag+1]:process.env.PORT||3000);
const app=createApplication({databasePath:resolve(process.env.DATA_DIR||'.data','pratica.sqlite'),secureCookies:process.env.NODE_ENV==='production',publicOrigin:process.env.PUBLIC_ORIGIN||undefined,trustProxy:process.env.TRUST_PROXY==='1'});
app.server.listen(port,'0.0.0.0',()=>console.log(`Prática disponível na porta ${port}.`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,async()=>{await app.close();process.exit(0);});
