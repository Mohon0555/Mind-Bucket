# Mind Bucket

A planner for busy, multi-interest people. Split each day into time buckets, then fit your interests, to-dos, purchases, ideas and trip plans into them. A bucket list keeps the once-in-a-lifetime things, like scuba diving or paragliding, with a target year, rough cost, first steps and a plan with dates.

Anyone can use it as a guest with no login. A guest's planner is saved in their own browser (localStorage), and Settings has a backup you can download to move it to another browser or device. Once Firebase is set up (see below), people can also sign in with Google, and their planner is saved to their account and syncs across devices.

## What's in this folder

| File | Purpose |
| --- | --- |
| `index.html` | The whole app: markup, styles and script in one file. No build step. |
| `favicon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Browser and home-screen icons |
| `manifest.webmanifest` | Lets people add Mind Bucket to their phone's home screen as an app |
| `vercel.json` | Clean URLs and basic security headers for Vercel |
| `firebase-config.js` | Firebase web config. `null` means guest-only mode |
| `firestore.rules` | Security rules: each user can only read and write their own planner |

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

## Turn on Google sign-in and cloud sync (Firebase, free plan)
Without this, Mind Bucket runs in guest mode only. With it, people can **Continue with Google**, and their planner is saved to Firestore at `users/<their uid>`. Only they can read or write it, and it syncs across their devices. Guest mode keeps working for anyone who doesn't sign in.

1. Open https://console.firebase.google.com and click **Create a project**. Name it `mind-bucket`. You can turn Google Analytics off.
2. Go to **Build → Authentication → Get started → Sign-in method → Google**. Turn it **on**, pick a support email and click **Save**.
3. Go to **Authentication → Settings → Authorized domains → Add domain** and add your live address, for example `mind-bucket.vercel.app`, plus any custom domain.
4. Go to **Build → Firestore Database → Create database**. Pick a location near your users (for Bangladesh, `asia-south1` in Mumbai) and **production mode**.
5. In **Firestore → Rules**, replace everything with the contents of [`firestore.rules`](firestore.rules) and click **Publish**.
6. Go to **Project settings (gear icon) → General → Your apps → Web (`</>`)**. Register an app called `Mind Bucket` (no Firebase Hosting needed) and copy the `firebaseConfig` object.
7. Paste it into [`firebase-config.js`](firebase-config.js) as `window.MB_FIREBASE = { … };`, then commit and push. Vercel redeploys and the **Sign in** button appears.

The config values are meant to be public in website code. Access to the data is controlled by the Firestore rules.

## Preview locally

```bash
npx serve .
```

Then open the address it prints. You can also open `index.html` directly in a browser.

## Next steps (from the PRD)
- Reminders and notifications
- Google Calendar import
