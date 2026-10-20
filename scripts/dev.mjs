import { spawn } from 'node:child_process';
const children=[spawn(process.execPath,['server/index.js'],{stdio:'inherit'}),spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','0.0.0.0'],{stdio:'inherit'})];
let stopping=false;
function stop(code=0){if(stopping)return;stopping=true;for(const child of children)child.kill('SIGTERM');process.exitCode=code;}
for(const child of children)child.on('exit',code=>stop(code||0));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>stop());
