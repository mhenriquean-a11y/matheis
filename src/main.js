import './style.css';
import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/mode-text';
import { questions, examIds } from './questions.js';
import { compare, requiredFunctionError } from './judge.js';
import { questionStatus, recommendation, searchable, validateBackup, mergeBackup } from './study.js';
import { lessonFor } from './lessons.js';
import { explainFailure } from './feedback.js';
import { AccountSync } from './accounts.js';
window.ace = ace;
await import('../vendor/portugol/src/ace_editor/mode-portugol.js');
const $ = s => document.querySelector(s);
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const blank = 'programa {\n    funcao inicio() {\n        \n    }\n}\n';
let persistenceOK = true;
const account=new AccountSync({questions});
const remoteProgress=await account.initialize();
function restore() { try { return JSON.parse(localStorage.getItem(account.storageKey)) || {}; } catch { persistenceOK = false; return {}; } }
let state = remoteProgress || restore();
state.drafts ||= {}; state.history ||= {}; state.savedDrafts ||= {}; state.exam ||= null;
if (!questions.some(q => q.id === state.selected)) state.selected = 'consumo';
let selected = questions.find(q => q.id === state.selected), busy = false, activeWorker, stopCurrent;
let filter = '', search = '', tab = 'statement', onlyNew = false, statusFilter = '';
function save() { try { localStorage.setItem(account.storageKey,JSON.stringify(state)); } catch { persistenceOK = false; $('#storage-note').textContent = 'Seu navegador bloqueou o salvamento. Exporte uma cópia do progresso.'; } account.queue(state); }
const examActive = () => state.exam && !state.exam.finished;
document.getElementById('app').innerHTML = `
<header class="topbar"><a class="brand" href="./"><span class="brand-mark">{p}</span><span>prática<span class="brand-dot">.</span><small>PORTUGOL</small></span></a><nav aria-label="Principal"><span class="nav-active">Meu laboratório</span><a href="https://portugol.dev/" target="_blank" rel="noopener">Portugol.dev ↗</a></nav><div class="backup-actions"><button id="import" class="ghost">Importar progresso</button><button id="export" class="ghost">Exportar progresso ↓</button><input id="import-file" type="file" accept=".json,application/json" hidden></div></header>
<section id="account-bar" class="account-bar" aria-label="Sua conta"></section>
<main><section class="hero"><div><p class="eyebrow">SEU ESPAÇO PARA APRENDER FAZENDO</p><h1>Uma questão de cada vez<span>.</span></h1><p class="intro">Escreva, teste e entenda. Do primeiro cálculo aos vetores.</p></div><div class="exam-card"><span class="exam-icon">◷</span><div><strong>Prova · 21 de outubro, 14h</strong><p>Pratique no seu ritmo ou faça um simulado.</p><button id="exam" class="text-button">Iniciar simulado de 8 questões →</button></div></div></section>
<section class="stats" aria-label="Progresso"><div><span id="done">0</span><p>questões resolvidas</p></div><div><span>${questions.length}</span><p>questões para praticar</p></div><div><span id="attempts">0</span><p>tentativas registradas</p></div><div class="progress-stat"><p>Seu progresso</p><div class="progress-track"><div id="progress"></div></div><small id="progress-label"></small></div></section>
<section id="study-guide" class="study-guide" aria-label="Sugestão de estudo"></section><p id="backup-message" role="status" hidden></p><div id="exam-banner" hidden></div>
<section class="workspace"><aside class="catalog"><div class="catalog-title"><h2>Questões</h2><span>${questions.length}</span></div><label class="search-label"><span>⌕</span><input id="search" placeholder="Buscar uma questão…" aria-label="Buscar uma questão"></label><select id="filter" aria-label="Filtrar por conteúdo"><option value="">Todos os conteúdos</option><option>Cálculos</option><option>Condições</option><option>Repetições</option><option>Enquanto</option><option>Funções</option><option>Vetores</option><option>Cadeias</option><option>Matrizes</option></select><select id="status-filter" aria-label="Filtrar por situação"><option value="">Todas as situações</option><option value="review">Preciso revisar</option><option value="todo">Ainda não tentei</option><option value="solved">Última tentativa correta</option></select><label class="new-filter"><input id="only-new" type="checkbox"> Mostrar só as 20 novas atividades</label><div id="question-list"></div><div class="catalog-footer">✓ Seu progresso fica neste navegador.</div></aside>
<div class="exercise"><div id="question-heading"></div><div class="tabs" role="tablist"><button role="tab" id="tab-statement" aria-selected="true">Enunciado</button><button role="tab" id="tab-learn" aria-selected="false">Revisão rápida</button><button role="tab" id="tab-history" aria-selected="false">Minhas tentativas <span id="history-count">0</span></button></div><div id="content"></div>
<section class="editor-panel"><div class="editor-heading"><div><span class="file-dot"></span><strong>solucao.por</strong><span class="language">Portugol</span></div><div><button id="font-down" class="tiny" aria-label="Diminuir fonte do código">A−</button><button id="font-up" class="tiny" aria-label="Aumentar fonte do código">A+</button><button id="download" class="tiny">Baixar .por</button><button id="reset" class="tiny">Restaurar</button></div></div><div id="editor" aria-label="Editor de código Portugol"></div><div class="editor-footer"><span>Tab: indentar · Ctrl/⌘ + Enter: testar</span><span id="saved">Salvo neste navegador</span></div></section>
<div class="actions"><button id="hint" class="ghost">◉ Preciso de uma dica</button><div><button id="stop" class="ghost" hidden>Parar execução</button><button id="submit" class="primary">▶ Testar solução</button></div></div>
<div id="next-action" hidden></div><div id="hint-box" hidden></div><section id="results" aria-live="polite"></section>
<details class="custom"><summary>Terminal de teste · usar minhas entradas</summary><p>Digite uma entrada por linha. A saída será exibida após a execução.</p><label for="custom-input">Entrada</label><textarea id="custom-input" rows="4" placeholder="240&#10;20"></textarea><button id="run-custom" class="ghost">Executar com estas entradas</button><pre id="custom-output" aria-live="polite"></pre></details>
</div></section>
<footer><div><strong>prática.</strong> Feito para aprender, tentativa por tentativa.</div><p id="storage-note">Treino independente baseado nas suas aulas. Não é o corretor oficial do professor.</p><small>Contas na versão com servidor · Executor <a href="https://github.com/erickweil/portugolweb" target="_blank" rel="noopener">Portugol Web</a> · GPL-3.0 · <a href="https://github.com/ajaxorg/ace" target="_blank" rel="noopener">Editor Ace</a> · BSD. Sem bibliotecas de gráficos e rede no executor. Testes locais não garantem aprovação em outros corretores.</small></footer></main>
<dialog id="exam-dialog"><form method="dialog"><p class="eyebrow">MODO SIMULADO</p><h2>Uma prova, oito desafios.</h2><p>Você pode executar seu código com entradas próprias. Dicas e correções ficam indisponíveis até entregar. O tempo é registrado, sem encerramento automático.</p><p>Uma nova rodada preserva o histórico de treino e substitui apenas o simulado anterior.</p><div class="dialog-actions"><button value="cancel" class="ghost">Continuar treinando</button><button id="confirm-exam" type="button" class="primary">Começar simulado</button></div></form></dialog>
<dialog id="auth-dialog" class="auth-dialog"><button class="dialog-close" id="close-auth" aria-label="Fechar">×</button><p class="eyebrow">SEU ESPAÇO DE ESTUDO</p><h2 id="auth-title">Entre na sua conta</h2><p class="auth-intro">Cada pessoa tem seus próprios códigos, tentativas e progresso.</p><div class="auth-tabs"><button id="auth-login-tab" type="button" aria-pressed="true">Entrar</button><button id="auth-register-tab" type="button" aria-pressed="false">Criar conta</button></div>
<form id="auth-form"><label id="display-name-label" hidden>Seu nome<input id="auth-name" maxlength="60" autocomplete="name"></label><label>Nome de usuário<input id="auth-username" required minlength="3" maxlength="30" pattern="[A-Za-z0-9_]{3,30}" autocomplete="username" spellcheck="false" autocapitalize="none" placeholder="Ex.: matheus_estuda"></label><small>De 3 a 30 letras sem acento, números ou _.</small><label>Senha<input id="auth-password" type="password" required minlength="8" maxlength="128" autocomplete="current-password"></label><label id="confirm-password-label" hidden>Confirme a senha<input id="auth-confirm" type="password" minlength="8" maxlength="128" autocomplete="new-password"></label><label class="transfer-option"><input id="transfer-guest" type="checkbox"> Trazer o progresso de visitante deste navegador para minha conta</label><p class="auth-note">Sem marcar essa opção, o progresso de visitante fica separado. Não há recuperação automática de senha por e-mail nesta versão.</p><p id="auth-message" role="status"></p><button class="primary" id="auth-submit" type="submit">Entrar</button></form></dialog>
<dialog id="password-dialog" class="auth-dialog"><button class="dialog-close" id="close-password" aria-label="Fechar">×</button><h2>Alterar senha</h2><p>Após a alteração, os outros dispositivos precisarão entrar novamente.</p><form id="password-form"><label>Senha atual<input id="current-password" type="password" required autocomplete="current-password"></label><label>Nova senha<input id="new-password" type="password" minlength="8" maxlength="128" required autocomplete="new-password"></label><label>Confirme a nova senha<input id="new-password-confirm" type="password" minlength="8" maxlength="128" required autocomplete="new-password"></label><p id="password-message" role="status"></p><button class="primary" id="password-submit">Salvar nova senha</button></form></dialog>`;
const editor = ace.edit('editor', {theme:'ace/theme/tomorrow_night',mode:'ace/mode/portugol',fontSize:state.fontSize || 15,showPrintMargin:false,tabSize:4,useSoftTabs:true,wrap:true});
editor.session.setUseWorker(false);
editor.setValue(state.drafts[selected.id] || blank,-1);
editor.on('change',()=>{state.drafts[selected.id]=editor.getValue(); save(); $('#saved').textContent = persistenceOK ? (account.user?'Salvo neste dispositivo':'Salvo neste navegador') : 'Salvamento indisponível';});
editor.commands.addCommand({name:'testSolution',bindKey:{win:'Ctrl-Enter',mac:'Command-Enter'},exec:()=>$('#submit').click()});
function updateStats() {
 const histories = Object.values(state.history); const done = histories.filter(a=>a.some(r=>r.passed===r.total && r.total>0)).length;
 $('#done').textContent=done; $('#attempts').textContent=histories.reduce((s,a)=>s+a.length,0);
 $('#progress').style.width= `${done/questions.length*100}%`; $('#progress-label').textContent=`${done} de ${questions.length} concluídas`;
}
function list() {
 const items=questions.filter(q=>(!examActive()||examIds.includes(q.id))&&searchable(q.title+' '+q.topic).includes(searchable(search))&&q.topic.includes(filter)&&(!onlyNew||q.isNew)&&(!statusFilter||questionStatus(q,state.history)===statusFilter));
 $('#question-list').innerHTML=items.map(q=>{
 const status=questionStatus(q,state.history), solved=status==='solved';
 const examSent=examActive() && !!state.exam.answers[q.id];
 return `<button class="question-item ${q.id===selected.id?'selected':''}" data-id="${q.id}"><span class="question-status ${solved?'solved':''}">${examSent?'●':solved?'✓':status==='review'?'↻':'○'}</span><span><strong>${escape(q.title)}</strong><small>${escape(q.topic)}${status==='review'?' · REVISAR':q.isNew?' · NOVA':''}</small></span><span class="chevron">›</span></button>`;
 }).join('')||'<p class="empty">Nenhuma questão encontrada.</p>';
}
function render() {
 if(examActive())tab='statement';
 $('#tab-history').disabled=!!examActive();
 $('#question-heading').innerHTML=`<div class="breadcrumb">Meu laboratório <span>/</span> ${escape(selected.topic)}</div><div class="title-row"><h2>${escape(selected.title)}</h2><span class="badge ${selected.level==='Desafio'?'challenge':''}">${selected.level}</span></div><p class="question-meta">${selected.tests.length} casos de teste · Entrada padrão · Saída padrão</p>`;
 $('#history-count').textContent=(state.history[selected.id]||[]).length;
 $('#tab-statement').setAttribute('aria-selected',tab==='statement');$('#tab-history').setAttribute('aria-selected',tab==='history');$('#tab-learn').setAttribute('aria-selected',tab==='learn');
 if(tab==='statement') $('#content').innerHTML=`<article class="statement"><h3>Enunciado</h3><p>${escape(selected.description)}</p>${selected.source ? `<p class="question-source">${selected.source.url ? `<a href="${escape(selected.source.url)}" target="_blank" rel="noopener">${escape(selected.source.label)} ↗</a>` : escape(selected.source.label)}<br>Enunciado e testes próprios, adaptados para este treino.</p>` : ''}<div class="notice"><span>i</span> Não imprima mensagens pedindo dados. Respeite os textos e as quebras de linha do enunciado.</div><h3>Exemplo</h3><div class="example-grid"><div><label>ENTRADA</label><pre>${escape(selected.tests[0].input)}</pre></div><div><label>SAÍDA ESPERADA</label><pre>${escape(selected.tests[0].output)}</pre></div></div><small class="comparison-note">${selected.numeric?'Valores como 0 e 0.0 são equivalentes; há tolerância numérica de até 0,0001%.':'Respeite as palavras, maiúsculas e quebras de linha.'} Acentos e espaços no início/fim da saída são ignorados.</small></article>`;
 else if(tab==='learn') {
  const lesson=lessonFor(selected);
  $('#content').innerHTML=lesson?`<article class="lesson"><p class="eyebrow">REVISÃO DO ASSUNTO · SEM A SOLUÇÃO DA QUESTÃO</p><h3>${escape(lesson.title)}</h3><p>${escape(lesson.text)}</p><pre>${escape(lesson.code)}</pre><div class="lesson-check"><strong>Antes de testar</strong><p>${escape(lesson.check)}</p></div></article>`:'<p class="empty">Revise o enunciado e a dica desta atividade.</p>';
 }
 else {
  const attempts=state.history[selected.id]||[];
  $('#content').innerHTML=`<div class="history-list">${attempts.slice().reverse().map((r,i)=>`<article class="attempt"><div class="attempt-header"><span class="${r.passed===r.total?'success-text':'failure-text'}">${r.passed===r.total?'✓ Acertou':'↻ Continue tentando'}</span><span>${r.passed}/${r.total} testes</span><small>${escape(new Date(r.date).toLocaleString('pt-BR'))}</small></div>${typeof r.code==='string'?`<details><summary>Ver código desta tentativa</summary><pre>${escape(r.code)}</pre><button class="ghost" data-restore-attempt="${attempts.length-1-i}">Usar este código no editor</button></details>`:'<p class="legacy-note">Tentativa antiga: apenas o resultado foi registrado.</p>'}${r.rows?`<button class="text-button" data-show-attempt="${attempts.length-1-i}">Ver correção desta tentativa →</button>`:''}</article>`).join('')||'<p class="empty">Você ainda não enviou esta questão.</p>'}${(state.savedDrafts[selected.id]||[]).map((d,i)=>`<article class="attempt"><strong>Rascunho preservado do backup</strong><details><summary>Ver rascunho</summary><pre>${escape(d.code)}</pre><button class="ghost" data-backup-draft="${i}">Usar este rascunho</button></details></article>`).join('')}</div>`;
 }
 $('#tab-learn').disabled=!!examActive(); $('#hint').disabled=!!examActive();$('#import').disabled=!!examActive(); $('#next-action').hidden=true; $('#hint-box').hidden=true; $('#results').innerHTML='';
 $('#submit').textContent=examActive()?'Salvar resposta no simulado':'▶ Testar solução';
 $('#exam').textContent=examActive()?'Entregar simulado →':'Iniciar simulado de 8 questões →';
 $('#exam-banner').hidden=!examActive();
 if(examActive()) { const count=Object.keys(state.exam.answers).length; $('#exam-banner').innerHTML=`<div><strong>Simulado em andamento</strong><span>${count}/8 respostas salvas · Correção após a entrega</span></div><button id="finish-exam" class="primary">Entregar simulado</button>`; $('#finish-exam').onclick=finishExam; }
 list(); updateStats(); renderStudyGuide(); updateAccountBar();
}
function selectQuestion(id) {
 if(busy)return;
 const question=questions.find(q=>q.id===id);
 if(!question || (examActive()&&!examIds.includes(id)))return;
 selected=question;state.selected=id;tab='statement';editor.setValue(state.drafts[id]||blank,-1);$('#custom-output').textContent='';save();render();
}
function renderStudyGuide() {
 $('#study-guide').hidden=!!examActive();
 const next=recommendation(questions,state.history);
 if(!next){$('#study-guide').hidden=true;return;}
 const reviewing=questionStatus(next,state.history)==='review';
 const reviews=questions.filter(q=>questionStatus(q,state.history)==='review').length;
 $('#study-guide').innerHTML=`<div><p class="eyebrow">${reviewing?'RETOME O QUE PRECISA DE ATENÇÃO':'SUGESTÃO PARA O PRÓXIMO PASSO'}</p><strong>${escape(next.title)}</strong><p>${escape(next.topic)} · ${reviews?`${reviews} questão(ões) para revisar`:'Avance dos fundamentos para os desafios, no seu ritmo.'}</p></div><button class="primary" id="recommended">${reviewing?'Revisar questão':'Praticar agora'} →</button>`;
 $('#recommended').onclick=()=>selectQuestion(next.id);
}
$('#question-list').onclick=e=>{const button=e.target.closest('[data-id]');if(button)selectQuestion(button.dataset.id);};
$('#search').oninput=e=>{search=e.target.value;list();};$('#filter').onchange=e=>{filter=e.target.value;list();};$('#only-new').onchange=e=>{onlyNew=e.target.checked;list();};$('#status-filter').onchange=e=>{statusFilter=e.target.value;list();};
$('#tab-statement').onclick=()=>{tab='statement';render();};$('#tab-history').onclick=()=>{tab='history';render();};$('#tab-learn').onclick=()=>{if(!examActive()){tab='learn';render();}};
$('#hint').onclick=()=>{$('#hint-box').hidden=!$('#hint-box').hidden;$('#hint-box').textContent=selected.hint;};
$('#reset').onclick=()=>{if(!busy&&confirm('Restaurar o código desta questão? Sua tentativa atual será substituída.'))editor.setValue(blank,-1);};
function download(name,content,type='text/plain') {const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#download').onclick=()=>download(`${selected.id}.por`,editor.getValue());
$('#export').onclick=()=>download('meu-progresso-portugol.json',JSON.stringify(state,null,2),'application/json');
function changeFont(delta){state.fontSize=Math.min(24,Math.max(12,(state.fontSize||15)+delta));editor.setFontSize(state.fontSize);save();}
$('#font-up').onclick=()=>changeFont(1);$('#font-down').onclick=()=>changeFont(-1);
$('#import').onclick=()=>$('#import-file').click();
$('#import-file').onchange=async event=>{
 const file=event.target.files[0];if(!file)return;
 const message=$('#backup-message');
 try{
  if(busy||examActive())throw new Error('Finalize a execução ou o simulado antes de importar.');
  if(file.size>10*1024*1024)throw new Error('O arquivo ultrapassa 10 MB.');
  const imported=validateBackup(JSON.parse(await file.text()),questions);
  const combined=mergeBackup(state,imported);
  // Confirmar a gravação antes de substituir o estado em memória.
  localStorage.setItem(account.storageKey,JSON.stringify(combined));state=combined;persistenceOK=true;
  editor.setValue(state.drafts[selected.id]||blank,-1);render();
  message.textContent='Progresso importado. Códigos diferentes do rascunho atual estão preservados em Minhas tentativas.';
 }catch(error){message.textContent=`Não foi possível importar: ${error.message}. Seu progresso atual foi mantido.`;}
 message.hidden=false;event.target.value='';
};
$('#content').onclick=event=>{
 if(busy||examActive())return;
 const restore=event.target.closest('[data-restore-attempt]'),backup=event.target.closest('[data-backup-draft]'),show=event.target.closest('[data-show-attempt]');
 if(show){const attempt=state.history[selected.id]?.[Number(show.dataset.showAttempt)];if(attempt?.rows)showResults(attempt.rows,selected,true);return;}
 const oldCode=restore?state.history[selected.id]?.[Number(restore.dataset.restoreAttempt)]?.code:backup?state.savedDrafts[selected.id]?.[Number(backup.dataset.backupDraft)]?.code:undefined;
 if(typeof oldCode==='string' && confirm('Usar este código no editor? O rascunho atual será guardado antes da troca.')){
  const drafts=state.savedDrafts[selected.id]||=[];
  const current=editor.getValue();if(!drafts.some(d=>d.code===current))drafts.push({date:new Date().toISOString(),code:current});
  editor.setValue(oldCode,-1);save();editor.focus();
 }
};
function setBusy(value) {busy=value;$('#submit').disabled=value;$('#run-custom').disabled=value;$('#stop').hidden=!value;$('#exam').disabled=value;$('#reset').disabled=value;$('#tab-history').disabled=value||!!examActive();$('#tab-statement').disabled=value;$('#tab-learn').disabled=value||!!examActive();$('#import').disabled=value||!!examActive();const rec=$('#recommended');if(rec)rec.disabled=value;editor.setReadOnly(value);const f=$('#finish-exam');if(f)f.disabled=value;for(const button of document.querySelectorAll('#account-bar button'))button.disabled=value;}
function run(code,input) {
 return new Promise(resolve=>{
  const worker=new Worker(new URL('./worker.js',import.meta.url),{type:'module'}); activeWorker=worker;
  let completed=false, started=false;
  const end=result=>{if(completed)return;completed=true;clearTimeout(timer);worker.terminate();activeWorker=null;stopCurrent=null;resolve(result);};
  let timer=setTimeout(()=>end({error:'O executor demorou para iniciar. Recarregue a página e tente novamente.'}),30000);
  stopCurrent=()=>end({error:'Execução interrompida.'});worker.onmessage=e=>{if(e.data.ready&&!started){started=true;clearTimeout(timer);timer=setTimeout(()=>end({error:'Tempo limite de 3 segundos. Verifique se o laço termina.'}),3000);worker.postMessage({code,input});}else if(!e.data.ready){end(e.data);}};worker.onerror=e=>{e.preventDefault();end({error:e.message||'Falha no executor.'});};
 });
}
let cancelled=false;
$('#stop').onclick=()=>{cancelled=true;stopCurrent?.();};
async function judge(q,code) {
 const rows=[];
 for(const t of q.tests){if(cancelled)break;const result=await run(code,t.input);rows.push({input:t.input,output:t.output,outputReceived:result.output,error:result.error,passed:!result.error&&compare(result.output,t.output,q.numeric)});}
 // O exercício de funções também exige declarar e chamar a função pedida.
 const structureError = requiredFunctionError(q, code);
 if (structureError) rows.forEach(r=>{r.passed=false;r.error=structureError;});
 return rows;
}
function record(q,rows,code) {const result={date:new Date().toISOString(),passed:rows.filter(r=>r.passed).length,total:q.tests.length,rows,...(typeof code==='string'?{code}:{})};(state.history[q.id]||=[]).push(result);save();return result;}
function showResults(rows,q,historical=false) {
 const passed=rows.filter(r=>r.passed).length;
 const firstFailure=rows.findIndex(r=>!r.passed);
 const explanation=firstFailure>=0?explainFailure(rows[firstFailure],q):null;
 $('#results').innerHTML=`${historical?'<p class="legacy-note">Correção registrada na data da tentativa; não é uma nova execução.</p>':''}<div class="result-summary ${passed===q.tests.length?'pass':'fail'}"><strong>${passed===q.tests.length?'✓ Todos os testes passaram!':'↻ Ainda há algo para ajustar'}</strong><span>${passed} de ${q.tests.length} testes aprovados</span></div>${explanation?`<div class="feedback-box"><strong>${escape(explanation.title)}</strong><p>${escape(explanation.text)}</p>${explanation.codeLine?`<button class="text-button" data-code-line="${explanation.codeLine}">Ir à linha ${explanation.codeLine} do editor →</button>`:''}</div>`:''}${rows.map((r,i)=>`<details class="test-result" ${i===firstFailure?'open':''}><summary><span class="${r.passed?'success-text':'failure-text'}">${r.passed?'✓':'×'} Teste ${i+1}</span><span>${r.passed?'Passou':r.error?'Erro de execução':'Saída diferente'}</span></summary><div class="test-grid"><div><label>Entrada</label><pre>${escape(r.input)}</pre></div><div><label>Esperado</label><pre>${escape(r.output)}</pre></div><div><label>Seu resultado</label><pre>${escape(r.error||(r.outputReceived ?? '(saída vazia)'))}</pre></div></div></details>`).join('')}`;
 if(!historical&&passed===q.tests.length){const next=recommendation(questions,state.history,q.id);if(next){$('#next-action').hidden=false;$('#next-action').innerHTML=`<span>Questão concluída. Que tal continuar?</span><button class="text-button" id="next-question">${escape(next.title)} →</button>`;$('#next-question').onclick=()=>selectQuestion(next.id);}}
}
$('#results').onclick=event=>{const button=event.target.closest('[data-code-line]');if(button){editor.gotoLine(Number(button.dataset.codeLine),0,true);editor.focus();}};
// Separar a saída esperada da saída recebida do executor.
async function evaluate(q,code){const rows=await judge(q,code);return rows;}
$('#submit').onclick=async()=>{
 if(busy)return;
 if(examActive()){state.exam.answers[selected.id]=editor.getValue();save();render();$('#results').innerHTML='<div class="result-summary pass"><strong>Resposta salva.</strong><span>Você pode alterá-la e salvar novamente antes de entregar.</span></div>';return;}
 const q=selected;cancelled=false;setBusy(true);$('#results').innerHTML='<p class="running">Executando os testes…</p>';
 try{const rows=await evaluate(q,editor.getValue());if(!cancelled){record(q,rows,editor.getValue());showResults(rows,q);updateStats();list();renderStudyGuide();$('#history-count').textContent=state.history[q.id].length;}else $('#results').textContent='Execução interrompida. Tentativa não registrada.';}
 catch(e){$('#results').textContent=`Erro: ${e.message}`;}finally{setBusy(false);}
};
$('#run-custom').onclick=async()=>{if(busy)return;cancelled=false;setBusy(true);$('#custom-output').textContent='Executando…';try{const r=await run(editor.getValue(),$('#custom-input').value);$('#custom-output').textContent=r.error||r.output||'(saída vazia)';}finally{setBusy(false);}};
$('#exam').onclick=()=>{if(examActive())finishExam();else $('#exam-dialog').showModal();};
$('#confirm-exam').onclick=()=>{state.exam={started:Date.now(),answers:{},finished:false};selected=questions.find(q=>q.id===examIds[0]);state.selected=selected.id;filter='';search='';statusFilter='';$('#status-filter').value='';onlyNew=false;$('#only-new').checked=false;$('#filter').value='';$('#search').value='';editor.setValue(state.drafts[selected.id]||blank,-1);save();$('#exam-dialog').close();render();};
async function finishExam(){if(busy||!confirm('Entregar o simulado? Questões não salvas serão consideradas sem resposta.'))return;cancelled=false;setBusy(true);$('#results').innerHTML='<p class="running">Corrigindo o simulado…</p>';const results=[];try{for(const id of examIds){if(cancelled)break;const q=questions.find(q=>q.id===id),code=state.exam.answers[id];const rows=code?await evaluate(q,code):[];if(cancelled)break;const result=record(q,rows,code);results.push({id,...result});}if(cancelled){$('#results').textContent='Correção interrompida. O simulado continua aberto.';return;}state.exam.finished=true;state.exam.results=results;save();render();const score=results.filter(r=>r.passed===r.total).length;$('#results').innerHTML=`<div class="result-summary pass"><strong>Simulado entregue · ${score}/8 questões completas</strong><span>Tempo: ${Math.ceil((Date.now()-state.exam.started)/60000)} minutos</span></div><div class="history-list">${results.map(r=>`<article><strong>${escape(questions.find(q=>q.id===r.id).title)}</strong><span>${r.passed}/${r.total} testes</span></article>`).join('')}</div><p>O modo treino está liberado. Selecione uma questão e teste para ver os detalhes da correção.</p>`;}finally{setBusy(false);}}
let authMode='login',syncStatus=account.dirty?'pending':'saved',syncError='';
function updateAccountBar(){
 const label={pending:'Alterações aguardando sincronização',saving:'Sincronizando…',saved:'Progresso salvo na sua conta',error:'Não foi possível sincronizar',expired:'Sessão expirada — entre novamente'}[syncStatus];
 $('#account-bar').innerHTML=account.user?`<div><strong>${escape(account.user.displayName)}</strong><small>@${escape(account.user.username)} · sua conta pessoal</small></div><div class="account-controls"><span id="account-sync" role="status" class="sync-${syncStatus}">${escape(label)}${syncError?`<small>${escape(syncError)}</small>`:''}</span><button class="ghost" id="retry-sync">Sincronizar</button>${syncStatus==='expired'?'<button class="ghost" id="open-auth">Entrar novamente</button>':''}<button class="ghost" id="change-password">Alterar senha</button><button class="ghost" id="logout">Sair</button></div>`:`<div><strong>Modo visitante</strong><small>Seu progresso fica somente neste navegador.</small></div><button class="primary" id="open-auth">Entrar / criar conta</button>`;
 $('.catalog-footer').textContent=account.user?'✓ Progresso individual vinculado à sua conta.':'✓ Seu progresso fica neste navegador.';
 if(busy)for(const button of document.querySelectorAll('#account-bar button'))button.disabled=true;
}
account.onStatus=(status,message='')=>{syncStatus=status;syncError=message;updateAccountBar();};
account.onMerge=progress=>{state=progress;try{localStorage.setItem(account.storageKey,JSON.stringify(state));}catch{}updateStats();list();renderStudyGuide();};
function activateProgress(progress){
 state=progress||{};state.drafts||={};state.history||={};state.savedDrafts||={};state.exam||=null;
 if(!questions.some(q=>q.id===state.selected))state.selected='consumo';selected=questions.find(q=>q.id===state.selected);
 filter='';search='';statusFilter='';onlyNew=false;tab='statement';$('#filter').value='';$('#search').value='';$('#status-filter').value='';$('#only-new').checked=false;
 editor.setValue(state.drafts[selected.id]||blank,-1);editor.setFontSize(state.fontSize||15);$('#custom-output').textContent='';save();render();
}
function authModeView(mode){
 if(account.privateAccess&&mode==='register')mode='login';$('#auth-register-tab').hidden=account.privateAccess;authMode=mode;const register=mode==='register';if(!register)$('#auth-confirm').value='';$('#auth-title').textContent=register?'Crie sua conta':'Entre na sua conta';$('#auth-submit').textContent=register?'Criar minha conta':'Entrar';
 $('#display-name-label').hidden=!register;$('#auth-name').required=register;$('#confirm-password-label').hidden=!register;$('#auth-confirm').required=register;
 $('#auth-password').autocomplete=register?'new-password':'current-password';$('#auth-login-tab').setAttribute('aria-pressed',!register);$('#auth-register-tab').setAttribute('aria-pressed',register);$('#auth-message').textContent='';
}
$('#account-bar').onclick=async event=>{
 if(busy)return;const id=event.target.closest('button')?.id;
 if(id==='open-auth'){
  authModeView('login');$('.transfer-option').hidden=!!account.user;$('#transfer-guest').checked=false;$('#auth-dialog').showModal();
  if(!account.available){$('#auth-message').textContent='Contas precisam da versão com servidor. O arquivo HTML e a publicação apenas estática funcionam em modo visitante.';$('#auth-submit').disabled=true;}else $('#auth-submit').disabled=false;
 }
 if(id==='change-password'){$('#password-form').reset();$('#password-message').textContent='';$('#password-dialog').showModal();}
 if(id==='retry-sync'){setBusy(true);try{await account.flush();const progress=await account.load(account.user);activateProgress(progress);await account.flush();}catch(error){syncStatus=error.status===401?'expired':'error';syncError=error.message;updateAccountBar();}finally{setBusy(false);}}
 if(id==='logout'){
  setBusy(true);try{await account.logout();if(account.privateAccess){location.replace('/');return;}activateProgress(restore());syncError='';syncStatus='saved';updateAccountBar();}catch(error){syncError='Não foi possível sair sem sincronizar. '+error.message;updateAccountBar();}finally{setBusy(false);}
 }
};
$('#auth-dialog').addEventListener('cancel',event=>{if(busy)event.preventDefault();});
$('#close-auth').onclick=()=>{$('#auth-password').value='';$('#auth-confirm').value='';$('#auth-dialog').close();};
$('#auth-login-tab').onclick=()=>authModeView('login');$('#auth-register-tab').onclick=()=>authModeView('register');
$('#auth-form').onsubmit=async event=>{
 event.preventDefault();if(busy||!account.available)return;
 if(authMode==='register'&&$('#auth-password').value!==$('#auth-confirm').value){$('#auth-message').textContent='As senhas não são iguais.';return;}
 const migrate=!account.user&&$('#transfer-guest').checked,previous=JSON.parse(JSON.stringify(state));
 setBusy(true);$('#close-auth').disabled=true;$('#auth-login-tab').disabled=true;$('#auth-register-tab').disabled=true;$('#auth-submit').disabled=true;$('#auth-message').textContent='Conectando…';
 try{
  let progress=await account.authenticate(authMode,{username:$('#auth-username').value,password:$('#auth-password').value,displayName:$('#auth-name').value});
  if(migrate){progress=mergeBackup(progress,validateBackup(previous,questions));if(account.revision===0){progress.selected=previous.selected;progress.fontSize=previous.fontSize;progress.exam=previous.exam||null;}}
  activateProgress(progress);$('#auth-form').reset();$('#auth-dialog').close();
 }catch(error){$('#auth-message').textContent=error.message;}
 finally{setBusy(false);$('#close-auth').disabled=false;$('#auth-login-tab').disabled=false;$('#auth-register-tab').disabled=false;$('#auth-submit').disabled=false;}
};
$('#close-password').onclick=()=>{$('#password-form').reset();$('#password-dialog').close();};
$('#password-form').onsubmit=async event=>{
 event.preventDefault();if($('#new-password').value!==$('#new-password-confirm').value){$('#password-message').textContent='As senhas não são iguais.';return;}
 $('#password-submit').disabled=true;$('#password-message').textContent='Salvando…';
 try{await account.flush();await account.request('/api/auth/password',{method:'POST',data:{currentPassword:$('#current-password').value,newPassword:$('#new-password').value}});$('#password-form').reset();$('#password-message').textContent='Senha alterada. Os outros dispositivos precisarão entrar novamente.';}
 catch(error){$('#password-message').textContent=error.message;}finally{$('#password-submit').disabled=false;}
};
window.addEventListener('online',()=>{if(account.user)account.flush().catch(()=>{});});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&account.user)account.flush().catch(()=>{});});
if(account.user&&account.dirty)account.queue(state);
render();
