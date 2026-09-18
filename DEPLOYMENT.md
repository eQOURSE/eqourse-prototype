# eQOURSE Deployment Guide

## Branch Flow

```
main (development) → staging (QA) → production (live + auto git tag)
```

| Branch | Purpose | Auto-deploys to | URL |
|---|---|---|---|
| `main` | Active development | ❌ Nothing | — |
| `staging` | QA / Testing | ✅ staging.eqourse.com | https://staging.eqourse.com |
| `production` | Live website | ✅ eqourse.com + auto backup tag | https://www.eqourse.com |

---

## Day-to-Day Workflow

### Step 1: Push code to `main`
All developers push their work to the `main` branch.
```bash
git checkout main
git add .
git commit -m "feat: add new feature"
git push origin main
```

### Step 2: Deploy to Staging (for QA testing)
Merge `main` → `staging`. This auto-deploys to staging.eqourse.com.
```bash
git checkout staging
git pull origin staging
git merge main -m "deploy: merge main to staging for QA"
git push origin staging
# ✅ GitHub Actions auto-builds and deploys to staging.eqourse.com
```

### Step 3: Test on Staging
- Visit https://staging.eqourse.com
- Test all changes (frontend + backend)
- Admin panel: https://staging.eqourse.com/admin
- Same database as production (real data for QA)

### Step 4: Deploy to Production (after QA passes)
Merge `staging` → `production`. This auto-deploys to eqourse.com + creates backup tag.
```bash
git checkout production
git pull origin production
git merge staging -m "release: deploy to production after QA"
git push origin production
# ✅ GitHub Actions auto-deploys + creates tag like prod-2026.09.18-1505
```

---

## Deploy Scenarios

### Frontend Only Changes
If you only changed frontend files (`.tsx`, `.css`, `.ts` in `src/`):
```bash
# Same flow — GitHub Actions handles everything
git checkout staging && git merge main && git push origin staging
# Test on staging.eqourse.com
git checkout production && git merge staging && git push origin production
```
The workflow builds the Vite app on GitHub's servers (not your server) and deploys the `dist/` folder.

### Backend Only Changes
If you only changed backend files (in `eqourse-backend/`):
```bash
# Same flow
git checkout staging && git merge main && git push origin staging
# Test on staging.eqourse.com/api
git checkout production && git merge staging && git push origin production
```
The workflow SSHs into the server, pulls code, runs `npm install`, and restarts PM2.

### Both Frontend + Backend
Same exact flow. The workflow deploys both in parallel automatically.

---

## Emergency: Rollback with Git Tags

Every production deploy creates an automatic backup tag (e.g., `prod-2026.09.18-1505`).

### List all backup tags
```bash
git tag -l "prod-*" --sort=-version:refname
```

### Rollback to a specific tag
```bash
# Find the tag you want to restore
git tag -l "prod-*"

# Reset production branch to that tag
git checkout production
git reset --hard prod-2026.09.18-1505
git push origin production --force
# ✅ GitHub Actions auto-deploys the old version
```

---

## Infrastructure

### Server: Utho VPS (103.189.88.129)

| Service | Port | PM2 Name | Path |
|---|---|---|---|
| eQOURSE Backend (prod) | 5001 | `eqourse` | `/opt/eqourse-prototype/eqourse-backend` |
| eQOURSE Backend (staging) | 5002 | `eqourse-staging` | `/opt/staging/eqourse-prototype/eqourse-backend` |
| eQOURSE Frontend (prod) | — | — (static via Nginx) | `/opt/eqourse-prototype/dist` |
| eQOURSE Frontend (staging) | — | — (static via Nginx) | `/opt/staging/eqourse-prototype/dist` |
| TuTrain Backend (prod) | 9292 | `tutrain-app` | `/opt/Tutrain---Equorse` |
| TuTrain Backend (staging) | 9393 | `tutrain-app-staging` | `/opt/staging/tutrain-backend` |
| TuTrain Frontend (prod) | 3001 | `tutrain-ui` | `/opt/tutrain-frontend` |
| TuTrain Frontend (staging) | 4001 | `tutrain-ui-staging` | `/opt/staging/tutrain-frontend` |
| MongoDB (local) | 27017 | — (systemd) | — |

### Database
- **eQOURSE**: Local MongoDB (`mongodb://127.0.0.1:27017/eqourse`)
  - Both staging and production share the same database
- **TuTrain**: MongoDB Atlas (cloud)

### Nginx Configs
| File | Domain |
|---|---|
| `/etc/nginx/conf.d/eqourse.conf` | eqourse.com / www.eqourse.com |
| `/etc/nginx/conf.d/staging.eqourse.conf` | staging.eqourse.com |
| `/etc/nginx/conf.d/tutrain.conf` | tutrain.com |
| `/etc/nginx/conf.d/staging.tutrain.conf` | staging.tutrain.com |

### SSL Certificates
All managed by Certbot with auto-renewal.

---

## GitHub Secrets Required

Repository: `eQOURSE/eqourse-prototype`

| Secret | Purpose |
|---|---|
| `SSH_HOST` | Server IP (103.189.88.129) |
| `SSH_PORT` | SSH port (22) |
| `SSH_USER` | Deploy user (deployer) |
| `SSH_KEY` | SSH private key |
| `SSH_PASSPHRASE` | SSH key passphrase |
| `CMS_SEO_SOURCE_URL` | CMS data source for SEO prerendering |
| `VITE_API_BASE_URL` | Production API URL for frontend build |
| `STAGING_API_URL` | Staging API URL for frontend build |

---

## Troubleshooting

### Build fails on GitHub Actions
- Check the Actions tab for error logs
- Common issue: `prerender-seo` timeout → ensure `CMS_SEO_SOURCE_URL` secret is set

### Frontend not updating after deploy
- Nginx serves static files from `dist/` — hard refresh (Ctrl+Shift+R) to clear browser cache
- Check if the workflow actually completed successfully

### Backend not starting
```bash
ssh bhavesh@103.189.88.129
sudo su - deployer
pm2 logs eqourse --lines 30        # production
pm2 logs eqourse-staging --lines 30 # staging
```

### Permission denied on deploy
```bash
# Fix file ownership
sudo chown -R deployer:deployer /opt/eqourse-prototype
sudo chown -R deployer:deployer /opt/staging/eqourse-prototype
```

### Check server health
```bash
free -h                    # Memory
df -h                      # Disk
pm2 list                   # All processes
sudo systemctl status nginx # Nginx
sudo systemctl status mongod # MongoDB
```
