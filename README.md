# infinitydragon.ai

Governed AI Infinity Framework · IP: Andre Thompson Sr. / AI Infinity Group LLC

---

## Project structure

```
infinitydragon-site/
├── index.html                      entry HTML
├── package.json                    dependencies + build scripts
├── vite.config.js                  build config
├── .gitignore
└── src/
    ├── main.jsx                    React mount point
    └── InfinityDragonSite.jsx      full site component (5 sections)
```

## Local development (optional)

Requires Node 18+.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # produces ./dist
```

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import the repo
3. Framework preset: **Vite** (auto-detected)
4. Click Deploy
5. Add custom domain: Settings → Domains → infinitydragon.ai
6. Update DNS at GoDaddy as Vercel instructs

### GoDaddy DNS records

| Type  | Name | Value                  | TTL  |
|-------|------|------------------------|------|
| A     | @    | 76.76.21.21            | 600  |
| CNAME | www  | cname.vercel-dns.com   | 600  |

(Always trust Vercel's dashboard values over these defaults.)

## Updating the site

Edit `src/InfinityDragonSite.jsx`, push to GitHub, Vercel rebuilds and deploys
automatically. ETA from push to live: ~30 seconds.
