import PicoModule from '../vendor/picoc/picoc.mjs';

// Each execution has its own WebAssembly memory and virtual filesystem.
// The UI runs this module only in a disposable Worker.
export async function executeC(code, input='') {
  const bytes=new TextEncoder().encode(input.replace(/\r\n/g,'\n'));
  let position=0;
  const stdout=[],stderr=[];
  const write=target=>byte=>{
    if(byte===null)return;
    if(target.length>=100000)throw new Error('Saída muito longa. Verifique o laço.');
    target.push(byte);
  };
  const runtime=await PicoModule({noInitialRun:true,stdin:()=>position<bytes.length?bytes[position++]:null,stdout:write(stdout),stderr:write(stderr)});
  // Rename identifiers only; leave comments, strings and character literals intact.
  // PicoC's Emscripten build does not flush C stdio on callMain's implicit exit.
  const wrapped=code.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\bmain\b/g, token=>token==='main'?'tropa_student_main':token);
  runtime.FS.writeFile('/solucao.c','#include <stdio.h>\n'+wrapped+'\nint main(void){int tropa_status=tropa_student_main();fflush(NULL);return tropa_status;}\n');
  let status;
  try {status=runtime.callMain(['solucao.c']);}
  catch(error){throw new Error(new TextDecoder().decode(new Uint8Array([...stdout,...stderr]))||`Erro de execução C: ${error.message}`);}
  const describe=text=>text.replace(/solucao\.c:(\d+):(\d+)/g,(_,line,col)=>`Linha ${Math.max(1,Number(line)-1)}, coluna ${col}`).replaceAll('tropa_student_main','main');
  const output=new TextDecoder().decode(new Uint8Array(stdout));
  const diagnostic=new TextDecoder().decode(new Uint8Array(stderr));
  if(status!==0)throw new Error(describe(diagnostic||output)||`O programa C terminou com código ${status}. Use return 0 em main quando concluir normalmente.`);
  if(diagnostic)throw new Error(diagnostic);
  return output;
}
