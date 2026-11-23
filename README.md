# Redo site

The static marketing site for Redo, built with [Astro](https://astro.build/).

## Local development

```sh
npm ci
npm run dev
```

Run the production checks locally with:

```sh
npm run check
npm run build
npm run preview
```

## GitHub Pages deployment

`.github/workflows/deploy.yml` deploys the site to GitHub Pages whenever
`main` is updated, or when the workflow is started manually.

Before the first deployment:

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Build and deployment → Source** to
   **GitHub Actions**.
3. If using `redoapp.com.au`, configure that custom domain in the repository's
   Pages settings and point its DNS records to GitHub Pages.

The site is already configured for the custom domain in `astro.config.mjs`, and
`public/CNAME` keeps that domain in the generated Pages artifact. If the site
will use the default `github.io` URL instead, update the `site` value and
remove or replace `public/CNAME` before deploying.
