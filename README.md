# infinitydragon.ai

Governed AI Infinity Framework · IP: Andre Thompson Sr. / AI Infinity Group LLC

---

## Local development

Requires Node 18+ installed.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produces ./dist
```

## Deployment (Vercel)

This repo is set up for one-click Vercel deployment.

1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project → Import the repo
3. Framework preset: **Vite** (auto-detected)
4. Click Deploy
5. Add custom domain: Settings → Domains → `infinitydragon.ai` and `www.infinitydragon.ai`
6. Update DNS at GoDaddy as instructed by Vercel (typical records below)

### GoDaddy DNS records

Replace the parked-page records with:

| Type  | Name | Value                  | TTL  |
|-------|------|------------------------|------|
| A     | @    | 76.76.21.21            | 600  |
| CNAME | www  | cname.vercel-dns.com   | 600  |

(Vercel will display the exact values to use — always trust their dashboard over these defaults.)

## Project structure

```
infinitydragon-site/
├── index.html                      # entry HTML, loads React + Tailwind
├── package.json                    # dependencies + build scripts
├── vite.config.js                  # build config
└── src/
    ├── main.jsx                    # React mount point
    └── InfinityDragonSite.jsx      # the full site component
```

## Updating the site

Edit `src/InfinityDragonSite.jsx`, push to GitHub, Vercel rebuilds and deploys
automatically. ETA from push to live: ~30 seconds.
