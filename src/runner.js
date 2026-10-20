import PortugolRuntime from '../vendor/portugol/src/compiler/vm/portugolrun.js';

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
  const compiled = runtime.compilar(code, onError, false);
  if (!compiled.success || errors.length) throw new Error(errors.join('\n') || 'Erro de compilação');
  await runtime.executar(code, compiled, onError, false);
  if (errors.length) throw new Error(errors.join('\n'));
  for (const [start, end] of echoes.reverse()) value = value.slice(0, start) + value.slice(end);
  return value;
}

