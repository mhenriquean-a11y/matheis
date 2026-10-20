import { readFileSync } from 'node:fs';
import { rootCertificates } from 'node:tls';
const supabaseRoots=['2021','2025'].map(year=>readFileSync(new URL(`./certs/supabase-prod-ca-${year}.crt`,import.meta.url),'utf8'));
export function databaseTls(hostname){
  const host=hostname.toLowerCase();
  const supabase=/^[a-z0-9.-]+\.pooler\.supabase\.com$/.test(host)||/^db\.[a-z0-9]+\.supabase\.co$/.test(host);
  // Retain certificate-chain and hostname verification. Add the provider's private CAs
  // only for its own hosts; never trust an arbitrary certificate supplied by the peer.
  return supabase?{rejectUnauthorized:true,ca:[...rootCertificates,...supabaseRoots]}:{rejectUnauthorized:true};
}
