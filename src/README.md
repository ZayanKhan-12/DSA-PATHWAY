# Deployment Guide

This guide explains how to fork, run, build, and deploy DSA-PATHWAY.

The project is still under active development, but it can be deployed as a working preview so other people can explore the current version.

---

## 1. Prerequisites

Before deploying, make sure you have:

- Node.js installed
- npm installed
- a GitHub account
- a Vercel account
- this repository forked or cloned

Check your versions:

```bash
node -v
npm -v
git --version
```

---

## 2. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/DSA-PATHWAY.git
cd DSA-PATHWAY
```

If the actual app is inside a `src` folder, enter it:

```bash
cd src
```

You should see files like:

```text
package.json
app/
components/
tailwind.config.ts
tsconfig.json
```

---

## 3. Install Dependencies

```bash
npm install
```

This installs all packages needed to run the Next.js app.

---

## 4. Run the Project Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already being used, Next.js may start on another port such as:

```text
http://localhost:3001
```

---

## 5. Check the Production Build

Before deploying, always run:

```bash
npm run build
```

This checks whether the project can compile successfully for production.

If the build passes, test the production version locally:

```bash
npm run start
```

Then open:

```text
http://localhost:3000
```

---

## 6. Deploy on Vercel

Vercel is the recommended deployment platform for this project because it supports Next.js directly.

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Prepare project for deployment"
git push
```

### Step 2: Import Project into Vercel

Go to Vercel and choose:

```text
Add New Project
```

Then import your GitHub repository.

### Step 3: Configure Build Settings

Use these settings:

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Development Command | `npm run dev` |

### Important Root Directory Note

If your `package.json` is at the root of the repo, leave the root directory as:

```text
./
```

If your `package.json` is inside a `src` folder, set the root directory to:

```text
src
```

This is important. Vercel needs to deploy from the folder that contains `package.json`.

---

## 7. Environment Variables

The current version does not require environment variables.

If future features add APIs, authentication, databases, or code execution services, add them in Vercel under:

```text
Project Settings → Environment Variables
```

Example future variables:

```env
NEXT_PUBLIC_API_URL=
DATABASE_URL=
AUTH_SECRET=
```

Never commit real secrets to GitHub.

---

## 8. Deployment Checklist

Before deploying, confirm:

- `npm install` works
- `npm run dev` works locally
- `npm run build` passes
- the homepage loads
- lesson pages load under `/learn/...`
- practice pages load under `/practice/...`
- clickable cards route correctly
- no temporary debug scripts are left in the code
- no secrets are committed
- the correct root directory is selected in Vercel

---

## 9. Common Deployment Issues

### Problem: Vercel cannot find `package.json`

This means the wrong root directory is selected.

Fix:

- If `package.json` is in the root, use root directory `./`
- If `package.json` is inside `src`, use root directory `src`

---

### Problem: Build fails because of TypeScript errors

Run locally:

```bash
npm run build
```

Fix the exact file and line shown in the terminal, then commit and push again.

---

### Problem: Page works locally but not after deployment

Check:

- route folder names
- singular/plural route paths
- broken imports
- case-sensitive file names
- missing files not committed to GitHub

Examples:

```text
/practice/linked-list/reverse-linked-list
/practice/linked-lists/reverse-linked-list
```

Some routes may have compatibility folders for both singular and plural paths.

---

### Problem: Styling looks different after deployment

Check that Tailwind is configured correctly and that global styles are imported in:

```text
app/layout.tsx
```

Also check:

```text
app/globals.css
tailwind.config.ts
postcss.config.mjs
```

---

## 10. Updating the Deployment

After making changes:

```bash
git add .
git commit -m "Update project"
git push
```

Vercel will automatically redeploy after the push.

---

## 11. Manual Production Test

To test exactly what Vercel will build:

```bash
rm -rf .next
npm install
npm run build
npm run start
```

Then open:

```text
http://localhost:3000
```

---

## 12. Recommended Deployment Flow

Use this workflow before every deployment:

```bash
npm install
npm run dev
npm run build
git add .
git commit -m "Ready for deployment"
git push
```

Then check the Vercel deployment logs.

---

## 13. Current Deployment Status

DSA-PATHWAY is not a final production-ready platform yet.

The current deployment should be treated as a live development preview for:

- testing the UI
- reviewing the architecture
- trying practice problem pages
- checking lesson routes
- sharing progress
- allowing others to fork and build on top of the project

---

## 14. Future Deployment Improvements

Planned improvements:

- environment-based API configuration
- backend deployment guide
- database setup guide
- Docker support
- CI/CD checks
- automated testing before deployment
- separate preview and production environments
- full multi-language code runner deployment