# Keymint

A futuristic local generator for passwords, API keys, and hostnames. Everything runs in your browser — no data is sent anywhere.

**Brand:** *Keymint* — mint fresh credentials on demand.

## Usage

Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

## Features

- **Password** — length, character sets, strength estimate
- **API key** — hex, Base64URL, UUID v4, custom prefix (`keymint_`)
- **Hostname** — 500 unique words per category; no repeats within a batch

## Word lists

Regenerate `words.js`:

```bash
node build-words.js
```

## Hosting (GitHub Pages)

Pushes to `main` run `.github/workflows/pages.yml` and deploy the static site.

Live URL: **https://kaljapoiss.github.io/keymint/**

First-time setup in the repo on GitHub:

1. **Settings → Pages → Build and deployment** → Source: **GitHub Actions**
2. Push to `main` (or re-run the workflow under **Actions**)

Custom domain: **Settings → Pages → Custom domain**.
