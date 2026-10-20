import { test } from 'node:test';
import assert from 'node:assert/strict';
import { X509Certificate } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { databaseTls } from '../server/database-tls.js';
test('Supabase connections trust the official roots while keeping certificate verification enabled',()=>{
 for(const host of ['aws-0-us-east-1.pooler.supabase.com','aws-1-sa-east-1.pooler.supabase.com','db.exampleproject.supabase.co']){
  const tls=databaseTls(host);assert.equal(tls.rejectUnauthorized,true);
  for(const year of ['2021','2025']){
   const pem=readFileSync(new URL(`../server/certs/supabase-prod-ca-${year}.crt`,import.meta.url),'utf8');
   assert.ok(tls.ca.includes(pem));const cert=new X509Certificate(pem);assert.equal(cert.ca,true);assert.equal(cert.verify(cert.publicKey),true);
  }
 }
});
test('unrelated database hosts cannot inherit the Supabase trust roots',()=>{
 for(const host of ['example.com','aws-0-us-east-1.pooler.supabase.com.attacker.example','supabase.com','pooler.supabase.com','localhost']){
  assert.deepEqual(databaseTls(host),{rejectUnauthorized:true});
 }
});
