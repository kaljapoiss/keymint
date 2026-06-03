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

## Hosting (GitLab Pages)

This repo includes `.gitlab-ci.yml`. After push to GitLab, enable **Deploy → Pages**.

Project URL (replace namespace if needed):

`https://<gitlab-username>.gitlab.io/gennet/`

Pipeline publishes `index.html`, `logo.svg`, and `words.js` only.

Custom domain: GitLab project → **Settings → Pages**.
