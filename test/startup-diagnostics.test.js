import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startupDiagnostic } from '../server/startup-diagnostics.js';
const secret='postgresql://someone:private-password@secret-host:5432/postgres';
test('startup diagnostics distinguish authentication, network, TLS and schema failures without leaking credentials',()=>{
 for(const [code,match] of [['28P01',/senha/],['ENOTFOUND',/endereço/],['SELF_SIGNED_CERT_IN_CHAIN',/TLS/],['42501',/permissão/]]){
  const result=startupDiagnostic({code,message:secret,detail:secret});assert.match(result,match);assert.ok(!result.includes(secret));assert.ok(!result.includes('private-password'));
 }
 assert.match(startupDiagnostic({cause:{code:'ECONNREFUSED',message:secret}}),/recusou/);
 assert.match(startupDiagnostic({errors:[{code:'ENETUNREACH',message:secret}]}),/IPv4/);
 assert.match(startupDiagnostic({message:'Connection terminated due to connection timeout '+secret}),/CONNECTION_TIMEOUT/);
 assert.match(startupDiagnostic({message:'Tenant or user not found '+secret}),/POOLER_USER/);
 assert.match(startupDiagnostic({message:'unsupported startup parameter: options '+secret}),/POOLER_OPTIONS/);
 assert.match(startupDiagnostic({message:'[YOUR-PASSWORD]'}),/PASSWORD_PLACEHOLDER/);
 assert.ok(!startupDiagnostic({code:secret,message:secret}).includes(secret));
});
