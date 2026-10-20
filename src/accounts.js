import { mergeBackup, validateBackup } from './study.js';
export const GUEST_KEY='portugol-pratica-v1';
function browserStorage(){try{return globalThis.localStorage;}catch{return {getItem:()=>null,setItem:()=>{throw new Error('Armazenamento local indisponível.');},removeItem:()=>{}};}}
const empty=()=>({drafts:{},history:{},savedDrafts:{},exam:null,selected:'consumo'});
export class AccountSync {
  constructor({questions,fetcher=globalThis.fetch?.bind(globalThis),storage=browserStorage(),onStatus=()=>{},onMerge=()=>{}}){
    this.questions=questions;this.fetcher=fetcher;this.storage=storage;this.onStatus=onStatus;this.onMerge=onMerge;
    this.user=null;this.available=false;this.revision=0;this.latest=null;this.dirty=false;this.timer=null;this.inflight=null;
  }
  get storageKey(){return this.user?`portugol-pratica-user-v1:${this.user.id}`:GUEST_KEY;}
  get pendingKey(){return this.storageKey+':pending';}
  async request(path,{method='GET',data,timeout=10000}={}){
    const response=await this.fetcher(path,{method,credentials:'same-origin',headers:data?{'Content-Type':'application/json'}:{},body:data?JSON.stringify(data):undefined,signal:AbortSignal.timeout(timeout)});
    let payload;try{payload=await response.json();}catch{throw new Error('O servidor de contas não está disponível nesta versão.');}
    if(!response.ok){const error=new Error(payload.error||'Não foi possível concluir a operação.');error.status=response.status;error.payload=payload;throw error;}
    return payload;
  }
  async initialize(){
    if(globalThis.location?.protocol==='file:')return null;
    try{
      const result=await this.request('/api/auth/me',{timeout:5000});this.available=true;
      if(!result.user)return null;
      return await this.load(result.user);
    }catch{this.available=false;return null;}
  }
  async load(user){
    const result=await this.request('/api/progress');
    this.user=user;this.dirty=false;this.revision=result.revision;this.latest=result.progress||empty();
    try{
      const pending=JSON.parse(this.storage.getItem(this.pendingKey)||'null');
      if(pending){const valid=validateBackup(pending.progress,this.questions);this.latest=mergeBackup({...pending.progress,...valid},validateBackup(result.progress||empty(),this.questions));this.dirty=true;}
    }catch{}
    this.onStatus(this.dirty?'pending':'saved');
    return this.latest;
  }
  async authenticate(kind,data){
    clearTimeout(this.timer);if(this.inflight)await this.inflight.catch(()=>{});
    const result=await this.request(`/api/auth/${kind}`,{method:'POST',data});this.available=true;
    return this.load(result.user);
  }
  queue(progress){
    if(!this.user)return;
    this.latest=progress;this.dirty=true;this.onStatus('pending');
    try{this.storage.setItem(this.pendingKey,JSON.stringify({progress,revision:this.revision}));}catch{}
    clearTimeout(this.timer);this.timer=setTimeout(()=>this.flush().catch(()=>{}),700);
  }
  async flush(){
    clearTimeout(this.timer);
    if(!this.user||!this.dirty)return;
    if(this.inflight){await this.inflight;if(this.dirty)return this.flush();return;}
    this.inflight=this.write();
    try{await this.inflight;}finally{this.inflight=null;}
  }
  async write(){
    this.onStatus('saving');
    try{
      for(let retry=0;retry<3;retry++){
        const snapshot=JSON.stringify(this.latest);
        let result;
        try{result=await this.request('/api/progress',{method:'PUT',data:{revision:this.revision,progress:JSON.parse(snapshot)}});}
        catch(error){
          if(error.status!==409)throw error;
          const remote=error.payload.progress||empty();
          this.revision=error.payload.revision;
          this.latest=mergeBackup(this.latest,validateBackup(remote,this.questions));
          this.onMerge(this.latest);
          try{this.storage.setItem(this.pendingKey,JSON.stringify({progress:this.latest,revision:this.revision}));}catch{}
          continue;
        }
        this.revision=result.revision;
        if(JSON.stringify(this.latest)===snapshot){this.dirty=false;try{this.storage.removeItem(this.pendingKey);}catch{}this.onStatus('saved');return;}
      }
      throw new Error('Outro dispositivo está atualizando a conta. Tente sincronizar novamente.');
    }catch(error){this.dirty=true;this.onStatus(error.status===401?'expired':'error',error.message);throw error;}
  }
  async logout(){
    try{await this.flush();}catch(error){if(error.status!==401)throw error;}
    const unsynced=this.dirty;
    await this.request('/api/auth/logout',{method:'POST',data:{}});
    const key=this.storageKey;clearTimeout(this.timer);this.user=null;this.latest=null;this.dirty=false;this.revision=0;
    try{this.storage.removeItem(key);if(!unsynced)this.storage.removeItem(key+':pending');}catch{}
  }
}
