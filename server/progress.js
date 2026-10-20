import { questions, examIds } from '../src/questions.js';
import { validateBackup } from '../src/study.js';
const ids=new Set(questions.map(q=>q.id));
export function normalizeProgress(raw) {
  const clean=validateBackup(raw,questions);
  clean.selected=ids.has(raw.selected)?raw.selected:'consumo';
  clean.fontSize=Number.isInteger(raw.fontSize)&&raw.fontSize>=12&&raw.fontSize<=24?raw.fontSize:15;
  clean.exam=null;
  if(raw.exam!==undefined&&raw.exam!==null){
    const exam=raw.exam;
    if(typeof exam!=='object'||!Number.isFinite(exam.started)||typeof exam.finished!=='boolean'||!exam.answers||typeof exam.answers!=='object')throw new Error('Simulado inválido.');
    const answers={};
    for(const [id,code] of Object.entries(exam.answers))if(examIds.includes(id)){
      if(typeof code!=='string'||code.length>200000)throw new Error('Resposta inválida.');
      answers[id]=code;
    }
    clean.exam={started:exam.started,finished:exam.finished,answers};
    if(Array.isArray(exam.results))clean.exam.results=exam.results.filter(r=>r&&examIds.includes(r.id)&&Number.isInteger(r.passed)&&Number.isInteger(r.total)&&r.passed>=0&&r.passed<=r.total).map(r=>({id:r.id,passed:r.passed,total:r.total}));
  }
  return clean;
}
