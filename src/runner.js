import { Tokenizer, T_parO, T_parC, T_bracesO, T_bracesC, T_squareO, T_squareC } from '../vendor/portugol/src/compiler/tokenizer.js';
import PortugolRuntime from '../vendor/portugol/src/compiler/vm/portugolrun.js';

function analysisFailure(code, errors) {
  if(errors.length)return errors.join('\n');
  // Tokenize only after an unexpected analyzer failure, so delimiters in strings and
  // comments cannot be mistaken for incomplete Portugol syntax.
  try {
    const tokenizer=new Tokenizer(code,()=>{});tokenizer.tokenize();
    const openings=new Map([[T_parO,')'],[T_bracesO,'}'],[T_squareO,']']]);
    const closings=new Map([[T_parC,T_parO],[T_bracesC,T_bracesO],[T_squareC,T_squareO]]);
    const stack=[];
    for(const token of tokenizer.getRelevantTokens()){
      if(openings.has(token.id))stack.push(token);
      else if(closings.has(token.id)){
        if(stack.at(-1)?.id!==closings.get(token.id))return `Linha ${code.slice(0,token.index).split('\n').length}: fechamento inesperado. Confira os parênteses, colchetes e chaves deste bloco.`;
        stack.pop();
      }
    }
    if(stack.length){const token=stack.at(-1);return `Linha ${code.slice(0,token.index).split('\n').length}: falta fechar ${openings.get(token.id)}. Confira também se a expressão ou declaração antes do fechamento está completa.`;}
  }catch{}
  return 'O executor não conseguiu analisar este código. Confira se as declarações e expressões estão completas. Se ele funcionar no portugol.dev, envie o código para revisão do executor.';
}

export async function execute(code, input = '') {
  let value = '', injecting = false;
  const echoes = [], errors = [];
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  if (lines.at(-1) === '') lines.pop();
  const output = {
    get value() { return value; },
    set value(next) {
      if (injecting) { echoes.push([value.length, next.length]); injecting = false; }
      if (next.length > 100000) throw new Error('Saída muito longa. Verifique o laço.');
      value = next;
    },
    async leia() {
      if (!lines.length) throw new Error('Seu programa pediu mais entradas do que o teste fornece.');
      injecting = true;
      return lines.shift() + '\n';
    }
  };
  const runtime = new PortugolRuntime(output);
  runtime.escrever_tempo = false;
  runtime.escrever_erros = false;
  runtime.iniciarBibliotecas(false, false, false, false, false);
  // Exercícios locais: não disponibilizar bibliotecas de rede.
  delete runtime.libraries.Internet;
  delete runtime.libraries.ServicosWeb;
  const onError = e => errors.push(`Linha ${e.row + 1}: ${e.text}`);
  let compiled;
  try { compiled = runtime.compilar(code, onError, false); }
  catch { throw new Error(analysisFailure(code,errors)); }
  if (!compiled.success || errors.length) throw new Error(errors.join('\n') || 'Erro de compilação');
  await runtime.executar(code, compiled, onError, false);
  if (errors.length) throw new Error(errors.join('\n'));
  for (const [start, end] of echoes.reverse()) value = value.slice(0, start) + value.slice(end);
  return value;
}

