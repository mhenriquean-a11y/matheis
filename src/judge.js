// No treino, acentuação não altera a correção da lógica.
// Maiúsculas, palavras, valores e resultados extras continuam sendo conferidos.
export function normalizeOutput(value) {
  return String(value).replace(/\r\n/g, '\n').normalize('NFD').replace(/\p{M}/gu, '').trim();
}

export function compare(actual, expected, numeric = false) {
  const clean = normalizeOutput;
  if (!numeric) return clean(actual) === clean(expected);
  const a = clean(actual).split(/\s+/), b = clean(expected).split(/\s+/);
  if (a.length !== b.length) return false;
  return a.every((v, i) => {
    const x = Number(v), y = Number(b[i]);
    return v !== '' && b[i] !== '' && Number.isFinite(x) && Number.isFinite(y)
      ? Math.abs(x - y) <= 1e-6 * Math.max(1, Math.abs(y))
      : v === b[i];
  });
}

// Checagem textual complementar: não confundir comentários/strings com funções.
export function requiredFunctionError(question, code) {
  const fn = question.requiredFunction || (question.id === 'funcao' ? {name:'calcular_media',type:'real'} : null);
  if (!fn) return null;
  const executable = code.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, ' ');
  const declaration = question.language==='c'
    ? new RegExp(`\\b${fn.type}\\s+${fn.name}\\s*\\([^;{}]*\\)\\s*\\{`)
    : new RegExp(`\\bfuncao\\s+${fn.type}\\s+${fn.name}\\s*\\(`);
  const calls = executable.match(new RegExp(`\\b${fn.name}\\s*\\(`, 'g')) || [];
  const cCalls=question.language==='c'?executable.replace(new RegExp(`\\b${fn.type}\\s+${fn.name}\\s*\\([^;{}]*\\)\\s*[;{]`,'g'),' ').match(new RegExp(`\\b${fn.name}\\s*\\(`,'g')):null;
  return declaration.test(executable) && (question.language==='c'?cCalls?.length>0:calls.length>=2)
    ? null : `Declare a função ${fn.type} ${fn.name} e chame-a em ${question.language==='c'?'main':'inicio'}.`;
}
