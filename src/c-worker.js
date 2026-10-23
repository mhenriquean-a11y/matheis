import { executeC } from './c-runner.js';
self.onmessage=async({data})=>{
 try{self.postMessage({output:await executeC(data.code,data.input)});}
 catch(error){self.postMessage({error:String(error.message||error)});}
};
self.addEventListener('unhandledrejection',event=>{event.preventDefault();self.postMessage({error:String(event.reason?.message||event.reason)});});
self.postMessage({ready:true});
