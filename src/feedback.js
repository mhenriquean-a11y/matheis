import { compare, normalizeOutput } from './judge.js';
export function explainFailure(row, question) {
  if (row.error) {
    const line=row.error.match(/Linha (\d+)/)?.[1];
    if(line)return {title:`Confira a linha ${line} do código`,text:'O programa não conseguiu executar este teste. Confira a declaração das variáveis, os operadores e as chaves nessa região.',codeLine:Number(line)};
    if(row.error.includes('Tempo limite'))return {title:'O programa não terminou a tempo',text:'Confira se a variável da condição muda em todas as voltas e se o laço tem uma maneira de terminar.'};
    if(row.error.includes('mais entradas'))return {title:'O programa pediu uma leitura extra',text:'O teste já forneceu todas as entradas do enunciado. Confira a quantidade de voltas e os comandos leia.'};
    if(row.error.includes('Declare a função'))return {title:'Falta a função pedida no enunciado',text:'Além do resultado, esta atividade exige declarar e chamar a função indicada.'};
    return {title:'A execução encontrou um erro',text:'Confira o diagnóstico completo em Seu resultado.'};
  }
  const actual=normalizeOutput(row.outputReceived??''),expected=normalizeOutput(row.output);
  if(!actual)return {title:'O programa não mostrou uma saída',text:'Confira se escreva é executado e se não ficou dentro de uma condição que foi falsa.'};
  if(actual.toLowerCase()===expected.toLowerCase())return {title:'Confira as letras maiúsculas e minúsculas',text:'Acentos são aceitos, mas as maiúsculas precisam seguir o enunciado.'};
  if(question.numeric && /\d,\d/.test(actual))return {title:'Confira o separador decimal',text:'Use ponto nos números, como 2.5. Uma vírgula decimal não é tratada como ponto pelo corretor.'};
  if(question.numeric){
    const a=actual.split(/\s+/),e=expected.split(/\s+/);
    if(a.length!==e.length)return {title:a.length>e.length?'Há conteúdo a mais na saída':'Falta conteúdo na saída',text:'Compare a quantidade de resultados. Não imprima perguntas, respostas repetidas ou mensagens que não foram pedidas.'};
  }
  const a=actual.split('\n'),e=expected.split('\n');
  const index=e.findIndex((line,i)=>!compare(a[i]??'',line,question.numeric));
  return {title:`Confira a linha ${Math.max(0,index)+1} da saída`,text:'Compare o valor ou a mensagem nessa linha. 0 e 0.0 são equivalentes nas questões numéricas; acentos também são aceitos.'};
}
