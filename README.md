# Mind Bucket

A planner for busy, multi-interest people. Split each day into time buckets, then fit your interests, to-dos, purchases, ideas and trip plans into them.

Version 1 runs in guest mode. There is no login, and each visitor's planner is saved in their own browser (localStorage). Settings has a backup you can download, so a planner can be moved to another browser or device.

## What's in this folder

| File | Purpose |
| --- | --- |
| `index.html` | The whole app: markup, styles and script in one file. No build step. |
| `favicon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Browser and home-screen icons |
| `manifest.webmanifest` | Lets people add Mind Bucket to their phone's home screen as an app |
| `vercel.json` | Clean URLs and basic security headers for Vercel |

## Deploy on Vercel

### Option A: GitHub + Vercel dashboard (recommended)
Every push to GitHub redeploys the site automatically.

1. Create a new GitHub repository, for example `mind-bucket`, and upload every file in this folder to it (on GitHub: **Add file → Upload files**).
2. Go to https://vercel.com/new, connect your GitHub account and pick the `mind-bucket` repository.
3. Leave the framework preset as **Other**. Leave the build command and output directory empty.
4. Click **Deploy**. The site goes live at `https://<project-name>.vercel.app`.

### Option B: Vercel CLI
From a terminal inside this folder:

```bash
npm i -g vercel
vercel login
vercel --prod
```

The first `vercel` run asks a few setup questions. Accept the defaults.

## Custom domain
In the Vercel project, open **Settings → Domains → Add Domain** and enter your domain. Vercel then shows the DNS record to add at your domain registrar: an **A** record for a root domain such as `mindbucket.app`, or a **CNAME** record for a subdomain such as `app.yourname.com`. HTTPS is set up automatically once the record is verified.

## Preview locally

```bash
npx serve .
```

Then open the address it prints. You can also open `index.html` directly in a browser.

## Next steps (from the PRD)
- Accounts and cloud sync (for example Next.js with Supabase Auth and Postgres)
- Reminders and notifications
- Google Calendar import
