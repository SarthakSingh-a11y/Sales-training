# DMH Sales Training Portal

Digital Marketing Heroes — Internal Sales Training Platform

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

## 📦 Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **GitHub Actions**
4. Create `.github/workflows/deploy.yml` (see below)

### deploy.yml
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

## 🌐 Deploy to Vercel (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Click **Deploy** ✅

## ⚙️ Config

Open `src/App.jsx` and update the config at the top:

```js
const ADMIN = {
  whatsappNumber: "919336286116", // Your WhatsApp number
};

const PHASE_CODES = {
  INITIAL: "DMH-INIT",
  DAY1:    "DMH-DAY1",
  // ... change these to your own codes
};
```
