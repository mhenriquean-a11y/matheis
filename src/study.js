const stages = ['Fundamentos','Cálculos','Condições','Repetições','Enquanto','Funções','Vetores','Cadeias','Matrizes'];
export function questionStatus(question, history) {
  const attempts = history[question.id] || [];
  if (!attempts.length) return 'todo';
  const last = attempts.at(-1);
  return last.total > 0 && last.passed === last.total ? 'solved' : 'review';
}
export function recommendation(questions, history, excludeId) {
  const rank = q => { const i = stages.findIndex(s=>q.topic.includes(s)); return i < 0 ? stages.length : i; };
  const ordered = questions.filter(q=>q.id!==excludeId).slice().sort((a,b)=>rank(a)-rank(b));
  return ordered.find(q=>questionStatus(q,history)==='review') || ordered.find(q=>questionStatus(q,history)==='todo') || ordered[0];
}
export function searchable(text) { return text.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase(); }

// Importação validada antes de qualquer gravação. Somente dados conhecidos são aceitos.
export function validateBackup(raw, questions) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) || !raw.drafts || typeof raw.drafts !== 'object' || Array.isArray(raw.drafts) || !raw.history || typeof raw.history !== 'object' || Array.isArray(raw.history)) throw new Error('Arquivo inválido. Use um JSON exportado pelo site.');
  const ids = new Set(questions.map(q=>q.id));
  const drafts = {}, history = {};
  for (const [id,code] of Object.entries(raw.drafts)) {
    if (!ids.has(id)) continue;
    if (typeof code !== 'string' || code.length > 200000) throw new Error('Há um código inválido no arquivo.');
    drafts[id] = code;
  }
  for (const [id,attempts] of Object.entries(raw.history)) {
    if (!ids.has(id)) continue;
    if (!Array.isArray(attempts) || attempts.length>5000) throw new Error('Histórico inválido.');
    history[id] = attempts.map(attempt=>{
      if (!attempt || !Number.isInteger(attempt.passed) || !Number.isInteger(attempt.total) || attempt.total<1 || attempt.passed<0 || attempt.passed>attempt.total || !Number.isFinite(Date.parse(attempt.date))) throw new Error('Uma tentativa possui dados inválidos.');
      const clean={date:attempt.date,passed:attempt.passed,total:attempt.total};
      if(typeof attempt.code==='string' && attempt.code.length<=200000)clean.code=attempt.code;
      if(Array.isArray(attempt.rows))clean.rows=attempt.rows.slice(0,100).filter(r=>r&&typeof r.input==='string'&&typeof r.output==='string'&&typeof r.passed==='boolean').map(r=>({input:r.input,output:r.output,passed:r.passed,...(typeof r.outputReceived==='string'?{outputReceived:r.outputReceived}:{}),...(typeof r.error==='string'?{error:r.error}:{})}));
      return clean;
    });
  }
  const savedDrafts={};
  if(raw.savedDrafts && typeof raw.savedDrafts==='object')for(const [id,items] of Object.entries(raw.savedDrafts)){
    if(ids.has(id) && Array.isArray(items))savedDrafts[id]=items.filter(d=>d&&typeof d.code==='string'&&d.code.length<=200000&&Number.isFinite(Date.parse(d.date))).slice(0,500);
  }
  return {drafts,history,savedDrafts};
}
export function mergeBackup(state, imported) {
  const merged={...state,drafts:{...state.drafts},history:{...state.history},savedDrafts:{...state.savedDrafts}};
  // Preservar o rascunho atual quando o backup tem outro código da mesma questão.
  for(const [id,code] of Object.entries(imported.drafts)) {
    if(merged.drafts[id] && merged.drafts[id]!==code) {
      const drafts=[...(merged.savedDrafts[id]||[])];
      if(!drafts.some(a=>a.code===code))drafts.push({date:new Date().toISOString(),code});
      merged.savedDrafts[id]=drafts;
    } else merged.drafts[id]=code;
  }
  for(const [id,attempts] of Object.entries(imported.history)) {
    const existing=[...(merged.history[id]||[])];
    const key=a=>JSON.stringify([a.date,a.passed,a.total,a.code||'']);
    const seen=new Set(existing.map(key));
    for(const attempt of attempts)if(!seen.has(key(attempt))){existing.push(attempt);seen.add(key(attempt));}
    merged.history[id]=existing.sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
  }
  for(const [id,items] of Object.entries(imported.savedDrafts||{})) {
    const drafts=[...(merged.savedDrafts[id]||[])];
    for(const draft of items)if(!drafts.some(d=>d.code===draft.code))drafts.push({date:draft.date,code:draft.code});
    merged.savedDrafts[id]=drafts;
  }
  return merged;
}
