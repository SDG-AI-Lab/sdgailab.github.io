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

## Contact form email notifications

The public contact form uses the `contact-submit` Supabase Edge Function.

Apply the migration:

```sql
supabase/migrations/009_contact_submissions.sql
```

For the temporary Gmail notification setup, use Google Apps Script as the email webhook. See:

```text
docs/contact-form/gmail-notifications.md
```

Configure Supabase secrets after creating the Apps Script web app:

```bash
supabase secrets set CONTACT_EMAIL_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
supabase secrets set CONTACT_EMAIL_WEBHOOK_SECRET="your-long-random-secret"
supabase secrets set CONTACT_NOTIFICATION_TO="josueuzj9@gmail.com"
supabase functions deploy contact-submit
```

For production, replace `CONTACT_NOTIFICATION_TO` with the Lab inbox and use an approved institutional sender/workflow where possible.