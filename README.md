# Portfolio (Vue) — archived dev project

This Vue/Vite app is **no longer deployed** to GitHub Pages.

Production portfolio lives in the main CV repo:

- **Site:** https://trabajador.github.io/portfolio/
- **Source:** [Trabajador/Trabajador.github.io/portfolio](https://github.com/Trabajador/Trabajador.github.io/tree/master/portfolio)

## Local development only

```bash
npm install
npm run dev
```

Opens at http://localhost:5173/portfolio/ — this is the legacy Vue layout, not the live static portfolio.

## Why deploy was removed

Both this repo and `Trabajador.github.io` published to `trabajador.github.io/portfolio/`. The Vue build overwrote the static CV-matching portfolio. Deploy is disabled so the main CV repo owns that URL.

**One-time GitHub setting:** In [Trabajador/portfolio](https://github.com/Trabajador/portfolio) → Settings → Pages → set Source to **None** (if the old Vue site still appears after pushing the CV repo).
