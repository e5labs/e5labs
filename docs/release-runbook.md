# Release Runbook — e5labs.com

## Overview

| Item | Detail |
|---|---|
| **Product** | e5labs.com marketing site |
| **Stack** | Next.js 16 · React 19 · Tailwind CSS 4 · shadcn/ui |
| **Hosting** | Vercel (project: `e5labs`, ID: `prj_CGswkyRkFzIpt8cIX95OHmJ2BGiS`) |
| **Node** | 22 (see `.nvmrc`) |
| **Package manager** | npm |
| **CI** | GitHub Actions — `.github/workflows/ci.yml` |
| **Domain** | `e5labs.com` (DNS managed in Cloudflare; hosting on Vercel) |

---

## Branch & Environment Conventions

| Environment | Branch | Vercel auto-deploy |
|---|---|---|
| Production | `main` | Yes — every merge to `main` triggers a production deploy |
| Preview | Any PR targeting `main` | Yes — every PR gets a Preview deploy URL |

There is no staging environment. Pre-production validation happens through CI + Preview deploys.

---

## Pre-Release Checklist

Before merging any PR or cutting a release, verify:

- [ ] **CI passes** — lint, typecheck, build, and tests all green on the PR branch
- [ ] **Preview deploy reviewed** — open the Vercel Preview URL; smoke-test key pages:
  - `/` (homepage hero, services, process, CTA)
  - `/about`
  - `/services`
  - `/contact` (form renders, submits, success state renders)
- [ ] **No console errors** — open DevTools → Console on each Preview page
- [ ] **Responsive spot-check** — verify layout at mobile (375 px) and desktop (1280 px)
- [ ] **Accessibility quick-check** — tab through hero and nav, verify focus indicators
- [ ] **Lighthouse baseline** — run Lighthouse on Preview; aim for Performance ≥ 90, Accessibility ≥ 95 (not a gate, but regressions warrant investigation)
- [ ] **Vercel environment variables** — confirm all required env vars are set in Vercel dashboard (see Environment Variables section below)

---

## Release Process

### Standard release (most common)

Every merge to `main` is a production release. Vercel auto-deploys.

```
1. Merge the PR into main
2. Vercel picks up the push and starts building
3. Monitor deploy at https://vercel.com/dashboard → e5labs project
4. Once "Ready", verify at https://e5labs.com
```

### Manual promotion (if needed)

If Vercel auto-deploy is paused or you need to promote a Preview deploy:

```
1. In Vercel dashboard → e5labs → Deployments
2. Find the Preview deploy you validated
3. Click ⋮ → Promote to Production
4. Verify at https://e5labs.com
```

### Hotfix release

```
1. Branch from main:  git checkout -b hotfix/<description>
2. Make the fix, commit, push
3. Open PR against main
4. CI must pass; Preview deploy must validate
5. Merge PR → Vercel auto-deploys to production
6. Verify on e5labs.com
```

---

## Post-Release Verification

After every production deploy:

1. **Smoke-test production** — same pages as pre-release checklist above
2. **Verify OG metadata** — share `https://e5labs.com` in a social debugger:
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator) (or similar)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
3. **Check Vercel logs** — confirm no 5xx or spike in error rate in the first 10 minutes
4. **Monitor performance** — Vercel Analytics or Speed Insights (if enabled)

---

## Rollback

If a production deploy introduces a breaking issue:

1. **Vercel instant rollback** (fastest):
   - Vercel dashboard → e5labs → Deployments
   - Find the last known-good production deploy
   - Click ⋮ → Promote to Production
   - This swaps the alias without a rebuild (~seconds)

2. **Git revert** (if instant rollback is unavailable):
   ```
   git revert <merge-commit-sha>
   git push origin main
   ```
   - Vercel auto-deploys the revert commit
   - Slower (requires a full rebuild)

3. **Pause auto-deploy** (buy time):
   - Vercel dashboard → e5labs → Settings → Git
   - Toggle "Auto-deploy" off for main
   - Fix the issue on a branch, validate via Preview, then re-enable auto-deploy

---

## Emergency Contacts & Escalation

| Role | Contact |
|---|---|
| Engineering lead | Fill in when team is established |
| Vercel account owner | Fill in when team is established |
| DNS registrar admin | Cloudflare (ddavtian) |

---

## DNS Configuration

| Record | Type | Name | Value | Proxy | Purpose |
|--------|------|------|-------|-------|---------|
| A | `@` | `e5labs.com` | `76.76.21.21` | DNS only (grey cloud) | Vercel production |
| CNAME | `www` | `www.e5labs.com` | `cname.vercel-dns.com` | DNS only (grey cloud) | Vercel www redirect |

**Important**: Both records must be set to **DNS only** (grey cloud ☁️, not orange cloud 🟠). Cloudflare proxy mode terminates TLS before reaching Vercel, which breaks automatic SSL certificate provisioning. Vercel must handle TLS termination to issue and renew Let's Encrypt certificates for the domain.

**Existing records preserved** (do not modify):
- MX records (Cloudflare Email Routing — 3 records)
- SPF TXT (`v=spf1 include:_spf.mx.cloudflare.net ~all`)
- DKIM TXT (`cf2024-1._domainkey.e5labs.com`)
- DMARC TXT (`_dmarc.e5labs.com`)
- ACME challenge TXT records (2x `_acme-challenge.e5labs.com`)
- Google site verification TXT

Nameservers: `gail.ns.cloudflare.com`, `greg.ns.cloudflare.com` (Cloudflare, not Vercel DNS)

### DNS Troubleshooting

- **Site not loading**: Verify A record points to `76.76.21.21` and CNAME for `www` points to `cname.vercel-dns.com`
- **SSL errors**: Ensure both records are DNS-only (grey cloud), not proxied (orange cloud). Vercel provisions certificates automatically once DNS resolves correctly
- **Certificate provisioning delay**: Up to 48 hours in rare cases; typically 1-10 minutes. Check Vercel dashboard → e5labs → Settings → Domains for status

---

## Key URLs

| Resource | URL |
|---|---|
| Production site | https://e5labs.com |
| Vercel dashboard | https://vercel.com/dashboard |
| GitHub repo | Fill in when repo is public |
| CI workflow | `.github/workflows/ci.yml` |

---

## Environment Variables

The following environment variables must be configured in the Vercel project for the contact form to work in production.

| Variable | Required | Description | Where to set |
|---|---|---|---|
| `RESEND_API_KEY` | **Yes** | Resend API key for sending contact form emails. Get one at https://resend.com/api-keys | Vercel dashboard → e5labs → Settings → Environment Variables |
| `RESEND_TO_EMAIL` | No | Destination email for contact form submissions. Defaults to `hello@e5labs.com` if not set | Vercel dashboard → e5labs → Settings → Environment Variables |

**Failure mode**: If `RESEND_API_KEY` is not set, `POST /api/contact` returns HTTP 503. The form displays a user-facing error message, not a stack trace.

**Email sender**: Contact form emails are sent from `onboarding@resend.dev` (Resend's default sandbox sender). Once domain verification is complete on Resend, update the `from` address in `src/app/api/contact/route.ts` to `E5Labs Contact <noreply@e5labs.com>` and verify the domain in Resend.

**Setting env vars in Vercel**:
1. Go to https://vercel.com → e5labs project → Settings → Environment Variables
2. Add `RESEND_API_KEY` for Production, Preview, and Development environments
3. Optionally add `RESEND_TO_EMAIL`
4. Redeploy for changes to take effect (Settings → Redeploy, or push a new commit)

---

## Contact Form Operations

| Item | Detail |
|---|---|
| **API route** | `POST /api/contact` |
| **Rate limit** | 5 requests per IP per 60-second window |
| **Validation** | Name (required, max 200), Email (required, valid format), Message (required, max 2000), Company (optional, max 200), Project type (optional, max 100) |
| **Email provider** | Resend (`resend` npm package) |
| **XSS protection** | All user input is HTML-escaped before insertion into email body |

### Troubleshooting

- **Contact form returns 503**: `RESEND_API_KEY` is not set in Vercel environment variables. Add it and redeploy.
- **Contact form returns 429**: Rate limit exceeded (5 req/min per IP). Wait 60 seconds.
- **Contact form returns 502**: Resend API error. Check Resend dashboard for outages or API key validity.
- **Emails not arriving**: Check Resend dashboard → Logs. Verify the `from` address is verified. Sandbox (`onboarding@resend.dev`) only sends to the account email — verify a custom domain in Resend for production delivery.

---

## Appendix: CI Pipeline Details

The CI workflow (`ci.yml`) runs on every push to `main` and every PR targeting `main`:

1. **Install** — `npm ci`
2. **Lint** — `npm run lint` (ESLint with next/core-web-vitals + typescript configs)
3. **Type check** — `npx tsc --noEmit`
4. **Build** — `npm run build` (Next.js production build)
5. **Test** — `npx vitest run` (unit/integration tests in `src/test/`)

All steps must pass before merging. The workflow uses `cancel-in-progress: true` so only the latest commit on a branch runs CI.