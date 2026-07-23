# Supabase — SDG AI Lab CMS

## Migrations (run in order)

| File | Purpose |
|------|---------|
| `migrations/001_initial_schema.sql` | Tables, RLS, `is_admin_user()`, triggers |
| `migrations/002_storage_policies.sql` | `public-assets` storage policies (create bucket first) |
| `migrations/003_secure_editor_access.sql` | Allowlist-gated editor access (replaces broad authenticated policies) |
| `migrations/004_project_portfolio_metadata.sql` | Extra project portfolio columns |
| `migrations/005_admin_users_management_model.sql` | Documents allowlist ops model (no client writes) |

## Verification

- **C1 hardening:** `verify_c1_hardening.sql` — run in SQL Editor; all checks should be `PASS` or `INFO`
- **Operator guide:** [docs/supabase-c1-staging-signoff.md](../docs/supabase-c1-staging-signoff.md)

## Seeds (optional, not migrations)

| File | Purpose |
|------|---------|
| `seed.sql` | Sample CMS content for development |
| `team_members.sql` | Upsert team into `people` table |
| `demo_day_projects.sql` | Demo project data |

Seeds can be re-run; migrations should be applied once per environment (idempotent where noted).
