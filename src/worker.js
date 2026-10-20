import { execute } from './runner.js';
self.onmessage = async ({data}) => {
  try { self.postMessage({output: await execute(data.code, data.input)}); }
  catch (error) { self.postMessage({error: String(error.message || error)}); }
};
self.addEventListener('unhandledrejection', event => {
  event.preventDefault();
  self.postMessage({error: String(event.reason?.message || event.reason)});
});

// Avisar quando o executor terminou de carregar, antes de contar o tempo do código.
self.postMessage({ready:true});
