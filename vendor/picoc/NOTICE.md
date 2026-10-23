# PicoC Web

Runtime WebAssembly incorporado de `picoc-web` 1.1.0 (npm),
https://github.com/MouhamedBourouba/picoc-web, baseado em
https://github.com/jpoirier/picoc. Licença BSD de três cláusulas em LICENSE.
O pacote npm contém o código C correspondente e as instruções de compilação.

Alteração local em picoc.mjs: remover a atribuição de process.exitCode no caminho
Node, pois o executor é uma biblioteca e erros de código do estudante não devem
alterar o status do processo hospedeiro. O caminho do navegador permanece igual.

A integração em src/c-runner.js usa I/O de bytes UTF-8, filesystem virtual e uma
chamada de fflush após main para capturar saídas sem quebra de linha.
O main do estudante é renomeado por tokens, preservando strings e comentários.
Recursos de C são os oferecidos por PicoC, não o padrão C completo.
