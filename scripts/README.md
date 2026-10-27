# Static PCPU readers

The site is buildless: everything in `dist/` is ready to serve. The seven research reports and two sessions are standalone HTML documents, including their complete text, sources, figures, and navigation. JavaScript only enhances navigation and the reading-progress indicator.

Editorial source:
- `data/reports.json`: expanded research reports, source metadata, and figure placements.
- `dist/articles.js`: original article metadata and session copy; used by the generator, not fetched by the site.
- `dist/assets/reports/`: original topical illustrations and the sourced explanatory figures referenced by the reports.

Regenerate static pages and homepage cards:

```sh
node scripts/build-readers.mjs
```

Optionally regenerate the nine decorative topic illustrations:

```sh
python scripts/build-hero-art.py
```

Both commands run offline, use repository-relative paths, and do not alter deployment configuration. The explanatory report figures are maintained as source SVGs in `dist/assets/reports/`; the decorative-illustration script does not overwrite them.

The generator also normalizes the shared footer on all 11 HTML pages (including
`index.html` and `team.html`) and keeps homepage session panels on their topical
SVG artwork. Standalone sessions intentionally omit venue photography; their
proposed/TBA status and the report illustrations are retained.
