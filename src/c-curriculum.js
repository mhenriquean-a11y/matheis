import { questions as portugolQuestions } from './questions.js';
// Keep exercise IDs and all input/output contracts; progress is stored per language.
export function cText(text) {
  return text.replace(/funcao real/g,'double').replace(/funcao inteiro/g,'int')
    .replace(/funcao logico/g,'int').replace(/\bfuncao\b/g,'função')
    .replace(/\binicio\b/g,'main').replace(/Matematica\.arredondar/g,'round de math.h')
    .replace(/\bretorne\b/g,'return').replace(/\benquanto\b/g,'while')
    .replace(/\bpara\s*\(/g,'for (').replace(/\bcadeia\b/g,'string (vetor de char)')
    .replace(/\bTexto\b/g,'string.h e ctype.h');
}
export const cQuestions=portugolQuestions.map(q=>({
  ...q,language:'c',description:cText(q.description),hint:cText(q.hint),
  statement:Object.fromEntries(Object.entries(q.statement).map(([key,value])=>[key,cText(value)])),
  requiredFunction:q.requiredFunction?{...q.requiredFunction,type:({inteiro:'int',real:'double',logico:'int'})[q.requiredFunction.type]}:
    q.id==='funcao'?{name:'calcular_media',type:'double'}:undefined
}));
