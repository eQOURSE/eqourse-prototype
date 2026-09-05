# eQOURSE Prototype — Deployment Guide

> **Server:** `103.189.88.129` (Utho)  
> **SSH User:** `bhavesh`  
> **Deploy User:** `deployer` (used for git pull & pm2)  
> **Project Path on Server:** `/opt/eqourse-prototype/`  
> **Live Site Path:** `/var/www/eqourse/dist/`  
> **Process Manager:** PM2

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Deploy (Copy-Paste)](#quick-deploy-copy-paste)
3. [Step-by-Step Guide](#step-by-step-guide)
   - [Step 1: Commit & Push to Main](#step-1-commit--push-to-main)
   - [Step 2: Merge Main → Production](#step-2-merge-main--production)
   - [Step 3: SSH into Server](#step-3-ssh-into-server)
   - [Step 4: Pull Latest Code](#step-4-pull-latest-code)
   - [Step 5: Build Frontend](#step-5-build-frontend)
   - [Step 6: Deploy Frontend](#step-6-deploy-frontend)
   - [Step 7: Install Nginx SEO Routing](#step-7-install-nginx-seo-routing)
   - [Step 8: Restart Backend (PM2)](#step-8-restart-backend-pm2)
4. [What to Deploy When](#what-to-deploy-when)
5. [Rollback (If Something Goes Wrong)](#rollback-if-something-goes-wrong)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before your first deployment, make sure you have:

- [x] **SSH key** set up (`C:\Users\yobha\.ssh\id_ed25519`)
- [x] **GitHub PAT** (Personal Access Token) for git pull on the server — generate at [github.com/settings/tokens](https://github.com/settings/tokens) with `repo` scope
- [x] **Server password** for `bhavesh` user (for sudo commands)
- [x] **SSH passphrase** (the one you set when creating your SSH key)

---

## Quick Deploy (Copy-Paste)

### From your local machine (PowerShell):

```powershell
# 1. Make sure you're on main
cd "D:\equourse\website-prototype(eqourse)\eqourse-prototype"
git checkout main

# 2. Stage, commit, and push
git add .
git commit -m "your commit message here"
git push origin main

# 3. Merge to production and push
git checkout production
git merge main -m "Merge main into production"
git push origin production
```

### On the server (after SSH):

```bash
# 4. SSH in
ssh bhavesh@103.189.88.129

# 5. Switch to deployer and pull
sudo su - deployer
cd /opt/eqourse-prototype/
git pull

# 6. Build frontend
npm run build

# 7. Deploy frontend (exit to bhavesh first)
exit
sudo rm -rf /var/www/eqourse/dist/*
sudo cp -r /opt/eqourse-prototype/dist/* /var/www/eqourse/dist/
sudo chown -R deployer:deployer /var/www/eqourse/dist

# 8. Install the generated route rules inside the HTTPS www server block.
# On the first deployment, remove any existing `location /` and `/admin`
# blocks, then add this include line; do not create duplicate location blocks.
sudo nano /etc/nginx/sites-available/eqourse
# Add: include /opt/eqourse-prototype/deploy/nginx/eqourse-route-handling.conf;
sudo nginx -t
sudo systemctl reload nginx

# 9. Restart backend (if backend files changed)
sudo su - deployer
pm2 restart eqourse

# 10. Done! Disconnect
exit
exit
```

---

## Step-by-Step Guide

### Step 1: Commit & Push to Main

Always commit to `main` first. Never commit directly to `production`.

```powershell
cd "D:\equourse\website-prototype(eqourse)\eqourse-prototype"
git checkout main
git status
```

Review the changes, then:

```powershell
git add .
git commit -m "describe your changes here"
git push origin main
```

> **Tip:** Write descriptive commit messages like:  
> `"feat: add robotics training data page and update chatbot knowledge"`  
> Not: `"updates"` or `"changes"`

---

### Step 2: Merge Main → Production

```powershell
git checkout production
git merge main -m "Merge main into production"
git push origin production
```

> **If you see "problem with editor 'vi'":**  
> This happens on Windows. Just run `git commit -m "Merge main into production"` and then `git push origin production`.

---

### Step 3: SSH into Server

```powershell
ssh bhavesh@103.189.88.129
```

- It will ask for your **SSH key passphrase** (not the server password)
- Enter the passphrase you set when creating the SSH key

---

### Step 4: Pull Latest Code

Switch to the deployer user and pull:

```bash
sudo su - deployer
# Enter server password (bhavesh's password) when prompted

cd /opt/eqourse-prototype/
git pull
# If prompted for GitHub credentials, use your GitHub PAT as the password
```

---

### Step 5: Build Frontend

```bash
npm run build
```

Wait for the build to complete. You should see:
- `✓ built in XX.XXs`
- `[prerender-seo] Wrote XXX route(s)`

> **If the build fails:** Do NOT proceed to Step 6. Fix the error first, push the fix, and pull again.

---

### Step 6: Deploy Frontend

First, exit back to `bhavesh` user (deployer doesn't have sudo for `/var/www`):

```bash
exit
```

Then deploy the built files:

```bash
sudo rm -rf /var/www/eqourse/dist/*
sudo cp -r /opt/eqourse-prototype/dist/* /var/www/eqourse/dist/
sudo chown -R deployer:deployer /var/www/eqourse/dist
```

Enter the server password when prompted.

**Frontend is now live!**

---

### Step 7: Install Nginx SEO Routing

The generated frontend uses directory-based prerendered files such as
`/blog/article-slug/index.html`, while every canonical URL intentionally omits
the trailing slash. Nginx must serve that file internally at
`/blog/article-slug`; it must not redirect the request to
`/blog/article-slug/`.

Open the active HTTPS `www.eqourse.com` server block:

```bash
sudo nano /etc/nginx/sites-available/eqourse
```

In every eQOURSE HTTP/HTTPS server block (both `eqourse.com` and
`www.eqourse.com`), add this include before route handling:

```nginx
include /opt/eqourse-prototype/deploy/nginx/eqourse-canonical-origin.conf;
```

This is required on the non-`www` HTTPS block as well. Without it,
`https://eqourse.com/...` can return `200` and create duplicate-host canonical
signals. The guard sends HTTP and bare-domain requests directly to the final
`https://www.eqourse.com/...` URL in one permanent redirect.

Inside that server block, remove the existing public `location /`, admin
locations, trailing-slash handling and 404 handling, then add this include:

```nginx
include /opt/eqourse-prototype/deploy/nginx/eqourse-route-handling.conf;
```

Do not keep an older `try_files $uri $uri/ /index.html;` rule and do not create
duplicate `location /` blocks. The generated rule uses
`try_files $uri/index.html $uri =404;`, which is the critical part of the GSC
redirect fix.

Validate and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Confirm that a canonical route is a direct `200`, while its slash variant is a
single `301` back to the canonical URL:

```bash
curl -I https://www.eqourse.com/blog/scaling-exam-performance-blueprint-aligned-test-prep-content
curl -I https://www.eqourse.com/blog/scaling-exam-performance-blueprint-aligned-test-prep-content/
curl -I https://eqourse.com/ai-data-services
curl -I http://eqourse.com/ai-data-services
```

The first command must return `200`; the second must return `301` with a
non-trailing-slash `Location` value. Both bare-domain checks must return one
`301` whose `Location` is the same path on `https://www.eqourse.com`.

---

### Step 8: Restart Backend (PM2)

**Only needed if you changed files in `eqourse-backend/`.**

Switch back to deployer:

```bash
sudo su - deployer
```

Restart just the eqourse backend:

```bash
pm2 restart eqourse
```

Or restart all services:

```bash
pm2 restart all
```

Verify everything is online:

```bash
pm2 status
```

You should see all services with status **online**:

```
| id | name          | status |
| 3  | eqourse       | online |
| 0  | tutrain-app   | online |
| 1  | tutrain-ui    | online |
```

**Backend is now live!**

Disconnect:

```bash
exit    # exit deployer
exit    # exit bhavesh / close SSH
```

---

## What to Deploy When

| What Changed | Steps Needed |
|---|---|
| **Frontend only** (`.tsx`, `.css`, `.ts` in `src/`) | Steps 1-6 |
| **Backend only** (files in `eqourse-backend/`) | Steps 1-5, then Step 8 |
| **Both frontend + backend** | Steps 1-8 (all steps) |
| **Static assets only** (`public/` folder) | Steps 1-6 |
| **SEO / sitemap changes** | Steps 1-7 |
| **Package.json changed** (new dependencies) | Steps 1-5, run `npm install` before `npm run build`, then Steps 6-8 |

> **If `package.json` changed** (new npm packages added), run this on the server before building:
> ```bash
> npm install
> npm run build
> ```

---

## Rollback (If Something Goes Wrong)

### Rollback Frontend

If the new deployment breaks the site, revert to the previous version:

```bash
# On server, as bhavesh:
cd /opt/eqourse-prototype/

# Find the previous commit
git log --oneline -5

# Reset to previous commit
sudo su - deployer
git checkout <previous-commit-hash>
npm run build
exit

# Re-deploy
sudo rm -rf /var/www/eqourse/dist/*
sudo cp -r /opt/eqourse-prototype/dist/* /var/www/eqourse/dist/
sudo chown -R deployer:deployer /var/www/eqourse/dist
```

### Rollback Backend

```bash
sudo su - deployer
cd /opt/eqourse-prototype/
git checkout <previous-commit-hash>
pm2 restart eqourse
```

### Rollback on Local Machine

```powershell
git checkout production
git revert HEAD
git push origin production
```

---

## Troubleshooting

### "problem with editor 'vi'" during merge

Windows doesn't have `vi`. Fix by setting the merge to auto-complete:

```powershell
git config --global merge.commit no-edit
```

Or just use the `-m` flag:

```powershell
git merge main -m "Merge main into production"
```

---

### SSH: "Permission denied"

- Make sure you're entering the **SSH key passphrase**, not the server password
- If you forgot your passphrase, regenerate the key:
  ```powershell
  ssh-keygen -t ed25519 -C "bhavesh@eqourse.com" -f C:\Users\yobha\.ssh\id_ed25519
  ```
  Leave passphrase blank, then send the new `.pub` key to your vendor

---

### sudo: "3 incorrect password attempts"

- The `deployer` user does NOT have sudo access
- Always use `bhavesh` for sudo commands (`sudo rm`, `sudo cp`)
- Use `deployer` for git, npm, and pm2 commands

---

### npm run build fails

1. Check the error message
2. Fix the code locally
3. Push the fix: `git add . && git commit -m "fix: ..." && git push origin main`
4. Merge and pull again on the server

---

### PM2: "process not found"

List all processes:

```bash
pm2 list
```

If `eqourse` is missing, start it:

```bash
cd /opt/eqourse-prototype/eqourse-backend
pm2 start src/server.js --name eqourse
pm2 save
```

---

### GitHub PAT expired

Generate a new one at [github.com/settings/tokens](https://github.com/settings/tokens):
1. Click **"Generate new token (classic)"**
2. Select the **`repo`** scope
3. Copy the token and use it as password during `git pull` on the server

---

## PM2 Useful Commands

| Command | What it does |
|---|---|
| `pm2 status` | Show all running processes |
| `pm2 restart eqourse` | Restart only the eqourse backend |
| `pm2 restart all` | Restart all services |
| `pm2 logs eqourse` | View backend logs (live) |
| `pm2 logs eqourse --lines 50` | View last 50 lines of logs |
| `pm2 stop eqourse` | Stop the backend |
| `pm2 start eqourse` | Start the backend |

---

## Summary Cheatsheet

```
LOCAL:  git add . -> git commit -> git push origin main
        git checkout production -> git merge main -> git push origin production

SERVER: ssh bhavesh@103.189.88.129
        sudo su - deployer -> cd /opt/eqourse-prototype/ -> git pull -> npm run build
        exit -> sudo rm -rf /var/www/eqourse/dist/* -> sudo cp -r /opt/eqourse-prototype/dist/* /var/www/eqourse/dist/
        sudo su - deployer -> pm2 restart eqourse (only if backend changed)
```

---

*Last updated: September 2, 2026*
