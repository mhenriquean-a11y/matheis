# Supabase production certificate authorities

Public CA certificates copied unchanged from the official Supabase CLI repository:
https://github.com/supabase/cli/tree/8803a3e90dd18ca14c857026da20f7a073bc6b22/apps/cli-go/internal/gen/types/templates

- `prod-ca-2021.crt`: SHA-256 `807025ad50d4ed219d2c9c7d299c004f824eb00cf7f65afef607d07b72e6cafa`, expires 2031-04-26.
- `prod-ca-2025.crt`: SHA-256 `5f9b77951a7aa1303f9b58eea9bfa89e358cfdc15f9786ff10d4930a722c9ae2`, expires 2035-09-01.

These contain public certificates only, never private keys. `database-tls.js` adds them to Node's standard trust roots only for Supabase database/pooler hostnames. Certificate-chain and hostname validation remain enabled. Update from an official provider source when the provider rotates its CA.
