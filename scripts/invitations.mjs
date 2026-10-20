import { randomBytes } from 'node:crypto';
import { writeFileSync } from 'node:fs';
const codes=Array.from({length:8},()=>randomBytes(18).toString('base64url'));
// Exclusive creation avoids overwriting invitations already distributed.
writeFileSync('.env.invitations',`PRIVATE_ACCESS=1\nMAX_ACCOUNTS=8\nINVITATION_CODES=${codes.join(',')}\n`,{mode:0o600,flag:'wx'});
console.log('8 convites salvos em .env.invitations (arquivo privado, ignorado pelo Git). Guarde-os e compartilhe um por pessoa.');
