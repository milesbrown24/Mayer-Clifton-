# Mayer & Clifton Partners

Five-page static website based on homepage direction 01 and the supplied September 22, 2026 outline. The original mockups remain in `homepage-mockups/` and are excluded from the production build.

## Preview and build

Requires Node.js 20 or later; there are no external package dependencies.

```sh
npm run dev
```

Open http://127.0.0.1:4174. After changing source files, run `npm run build` and refresh the browser. The preview server serves the rebuilt files.

```sh
npm run build
npm run check
```

The build produces `dist/` with real HTML pages for `/`, `/company/`, `/team/`, `/services/`, and `/transactions/`. Navigation and content work without JavaScript; the small-screen menu uses JavaScript.

## Editing content

- `content/site.json`: homepage copy, company history, all biographies, services, optional client/lender logos.
- `content/transactions.json`: transaction names, service labels, summaries, and optional images. Add an object to add a transaction; rebuild afterward.
- `site/assets/styles.css`: design and responsive layouts.
- `site/assets/logo.png`: supplied logo, displayed in white over dark backgrounds using CSS.
- `scripts/build.mjs`: shared layouts and page generation.

For images, place files in `site/assets/` and use `/assets/filename.jpg` in the content. Client/lender logo entries use `{ "name": "Approved name", "image": "/assets/logo.png" }`. Team `portrait` and transaction `image` accept an asset URL or `null`. Transaction `summary` accepts plain text. Content is escaped before being inserted into HTML.

## Git to Netlify

Create or connect the intended Git repository, commit these source files, then import the repository into Netlify. `netlify.toml` supplies `npm run build` and the `dist` publish directory. Each push to the selected production branch can trigger Netlify's build. No repository, Netlify project, or production deployment has been created by this implementation.

## Content still needed before public launch

- Approved property imagery. The architectural photo currently uses an illustrative external Unsplash image carried over from the approved concept; it is not presented as a financed property. Replace its URLs in the stylesheet with approved local assets before launch.
- Team portraits, if desired. Biographies are complete without fabricated portraits.
- Approved major client and lender logos. The outline requests these but supplies none. Empty content arrays are wired into the Company page and remain hidden until populated.
- Scott's nonprofit board names: the source says “including XXX.” That unfinished phrase is omitted; the board-service statement is retained.
- Lauren's London employer: the source says “XXX.” The published wording says “at a boutique development firm” until a name is provided.
- Transaction descriptions, dates, amounts, photos, and any approved attribution. Only the four names and Mansion financing types supplied in the outline are displayed. Internal instructions such as “show all and tell story” and “w Joe” are not published. “Natomomas” was normalized to “Natomas”; confirm this project name before launch.
- Contact information was not provided, so no address, phone number, or contact form was invented.

The supplied source's company history and figures are preserved. Review factual claims with the firm before launch, including the historic $12B period and current aggregate figure. This is an implementation of the supplied copy, not an independent verification of those claims.
