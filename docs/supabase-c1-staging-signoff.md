# Phase C1 — Supabase Hardening (Staging Sign-off)

Complete **C1** on the live Supabase project while the site stays on GitHub Pages staging. **C2** (DNS, `GITHUB_PAGES_BASE=/`, production uptime) is out of scope here.


| Environment      | Public site                                        | Admin                        |
| ---------------- | -------------------------------------------------- | ---------------------------- |
| **Staging (C1)** | `https://sdg-ai-lab.github.io/sdgailab.github.io/` | `.../admin`                  |
| Production (C2)  | `https://sdgailab.org`                             | `https://sdgailab.org/admin` |


## Repo artifacts (already in place)

- Migrations `001`–`005` under `supabase/migrations/`
- Automated SQL checks: `supabase/verify_c1_hardening.sql`
- Operator runbook: [supabase-hardening-runbook.md](./supabase-hardening-runbook.md)
- Backup guide: [supabase-backup-restore.md](./supabase-backup-restore.md)
- Client auth: magic link only, `shouldCreateUser: false` (`LoginPage.tsx`)
- Allowlist enforcement: `is_admin_user()` + `admin_users` RLS (`003`, `005`)



## Operator workflow (~45–60 minutes)



### A. Apply pending migrations

In `Supabase -> SQL Editor`, run in order (skip any already applied):

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_storage_policies.sql` (after creating `public-assets` bucket)
3. `supabase/migrations/003_secure_editor_access.sql`
4. `supabase/migrations/004_project_portfolio_metadata.sql`
5. `supabase/migrations/005_admin_users_management_model.sql`

Optional seeds (not migrations): `supabase/seed.sql`, `supabase/team_members.sql`

### B. Run automated verification

1. Open `supabase/verify_c1_hardening.sql` in SQL Editor
2. Execute and save the full result
3. **C1 gate:** every row must be `PASS` or `INFO`; fix all `FAIL` before sign-off
4. Review `WARN` rows (orphan allowlist emails → create Auth user or deactivate row)



### C. Dashboard — Auth URL configuration

`Authentication -> URL Configuration`


| Setting           | Staging value                                           |
| ----------------- | ------------------------------------------------------- |
| **Site URL**      | `https://sdg-ai-lab.github.io/sdgailab.github.io/`      |
| **Redirect URLs** | `https://sdg-ai-lab.github.io/sdgailab.github.io/admin` |
|                   | `http://localhost:4321/admin`                           |
|                   | `https://sdgailab.org/admin` *(optional; prep for C2)*  |


Remove unused localhost ports and stale preview domains.

### D. Dashboard — Auth providers

`Authentication -> Providers`

- [x] Email / magic link enabled
- [x] Unused providers disabled (Google, GitHub, etc. unless required)
- [x] No public self-service path to CMS (app uses existing Auth users only)



### E. Dashboard — Rate limits

`Authentication -> Rate Limits`

Recommended starting points (tighten if abuse observed; test editor login after changes):


| Limit             | Suggested     | Notes                       |
| ----------------- | ------------- | --------------------------- |
| Email sent / hour | 4–10 per user | Prevents magic-link spam    |
| OTP / verify      | 10–30 / hour  | Brute-force protection      |
| Anonymous users   | 10–30 / hour  | General auth endpoint abuse |


Editors see friendly copy when throttled (`docs/editor-guide.md` — “Too many login attempts”).

Management API alternative: [runbook Step 8](./supabase-hardening-runbook.md#step-8-harden-auth-rate-limits).

### F. Dashboard — Backups

Per [supabase-backup-restore.md](./supabase-backup-restore.md):

- [ ] Confirm backup/PITR status for your plan
- [ ] Record last backup date and where exports are stored
- [ ] Run export before any further schema change



### G. Allowlist audit

`Table Editor -> admin_users` or:

```sql
select email, role, active, updated_at from admin_users order by lower(email);
```

- [x] Every active row matches a user in `Authentication -> Users`
- [x] Revoked editors have `active = false` (not deleted)
- [x] Roles are only `admin` or `editor`
- [x] No shared accounts



### H. Manual smoke tests (three accounts)


| Test           | Account                        | Expected                                  |
| -------------- | ------------------------------ | ----------------------------------------- |
| Public read    | Anonymous browser              | Published content visible on staging site |
| Draft hidden   | Anonymous / REST with anon key | Draft rows not returned                   |
| Editor CRUD    | Active allowlisted editor      | All content types + image upload work     |
| Revoked editor | `active = false`               | `/admin` shows access denied              |
| Non-editor     | Auth user not in allowlist     | `/admin` shows access denied              |


Detailed steps: [runbook Step 9](./supabase-hardening-runbook.md#step-9-verify-public-vs-editor-access).

### I. Secrets hygiene (repo + GitHub)

- [x] Only `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` in GitHub Actions / `.env`
- [x] Service-role key **not** in frontend, git, or GitHub Pages build
- [x] Rotate keys if ever exposed



## Sign-off record

Copy this table into your internal ops tracker when C1 is complete:


| Item                               | Status | Date | Initials |
| ---------------------------------- | ------ | ---- | -------- |
| Migrations 001–005 applied         |        |      |          |
| `verify_c1_hardening.sql` all PASS |        |      |          |
| Auth redirect URLs (staging)       |        |      |          |
| Rate limits reviewed               |        |      |          |
| Backups documented                 |        |      |          |
| Allowlist audited                  |        |      |          |
| Smoke tests (3 accounts)           |        |      |          |


**Signed off by:** ___________________  **Date:** ___________________

## Deferred to C2

- Change Site URL to `https://sdgailab.org`
- Set `GITHUB_PAGES_BASE=/` in deploy workflow
- Point uptime checks at production
- Remove staging admin redirect URL if no longer needed

See [production-cutover-checklist.md](./production-cutover-checklist.md).

## Quick links

- [supabase-hardening-checklist.md](./supabase-hardening-checklist.md) — full control matrix
- [supabase-hardening-runbook.md](./supabase-hardening-runbook.md) — step-by-step SQL and dashboard paths
- [editor-guide.md](./editor-guide.md) — editor-facing login and rate-limit behavior

