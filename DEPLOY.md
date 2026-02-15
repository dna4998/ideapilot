# IdeaPilot — Deploy to Vercel (Permanent)

This will make your app work from anywhere, no Mac needed.

## Step-by-step:

### 1. Create a GitHub account (if you don't have one)
- Go to https://github.com and sign up

### 2. Create a new repository
- Go to https://github.com/new
- Name it: ideapilot
- Select "Public"
- Click "Create repository"
- On the next page, click "uploading an existing file"
- Drag ALL files from inside this ideapilot-vercel folder
  (api folder, public folder, package.json, vercel.json)
- Click "Commit changes"

### 3. Deploy on Vercel
- Go to https://vercel.com
- Click "Sign Up" → sign in with your GitHub account
- Click "Add New" → "Project"
- Find "ideapilot" in your repo list and click "Import"
- Before clicking Deploy, add your API key:
  - Click "Environment Variables"
  - Name: ANTHROPIC_API_KEY
  - Value: paste your API key (sk-ant-...)
  - Click "Add"
- Click "Deploy"
- Wait 1-2 minutes

### 4. Install on iPhone
- Vercel gives you a URL like: https://ideapilot-xxxxx.vercel.app
- Open that URL in Safari on your iPhone
- Tap Share (↑) → "Add to Home Screen" → Add
- Done! Works anywhere, anytime.

### 5. (Optional) Custom domain
- In Vercel dashboard, go to your project → Settings → Domains
- Add a custom domain like ideapilot.yourdomain.com

## File structure:
```
ideapilot-vercel/
├── api/
│   └── chat.js          ← Secure API proxy (your key stays hidden)
├── public/
│   ├── index.html       ← The app
│   ├── manifest.json    ← PWA config
│   ├── sw.js            ← Service worker
│   └── icons/           ← All app icons
├── package.json
├── vercel.json          ← Routing config
└── DEPLOY.md            ← This file
```

## Security
Your API key is stored as a Vercel environment variable.
It never appears in your code or browser — only the server sees it.
