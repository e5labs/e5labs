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
| **Domain** | `e5labs.com` (DNS managed in Vercel) |

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
  - `/contact` (form renders, submits without errors)
- [ ] **No console errors** — open DevTools → Console on each Preview page
- [ ] **Responsive spot-check** — verify layout at mobile (375 px) and desktop (1280 px)
- [ ] **Accessibility quick-check** — tab through hero and nav, verify focus indicators
- [ ] **Lighthouse baseline** — run Lighthouse on Preview; aim for Performance ≥ 90, Accessibility ≥ 95 (not a gate, but regressions warrant investigation)

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
| DNS registrar admin | Fill in when team is established |

---

## Key URLs

| Resource | URL |
|---|---|
| Production site | https://e5labs.com |
| Vercel dashboard | https://vercel.com/dashboard |
| GitHub repo | Fill in when repo is public |
| CI workflow | `.github/workflows/ci.yml` |

---

## Appendix: CI Pipeline Details

The CI workflow (`ci.yml`) runs on every push to `main` and every PR targeting `main`:

1. **Install** — `npm ci`
2. **Lint** — `npm run lint` (ESLint with next/core-web-vitals + typescript configs)
3. **Type check** — `npx tsc --noEmit`
4. **Build** — `npm run build` (Next.js production build)
5. **Test** — `npx vitest run` (unit/integration tests in `src/test/`)

All steps must pass before merging. The workflow uses `cancel-in-progress: true` so only the latest commit on a branch runs CI.