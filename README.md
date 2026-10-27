# Purdue Computer Pioneer Union

The PCPU website: seven illustrated research reports, two proposed session plans, and a People page. It is a static English-language site built with HTML, CSS, and JavaScript. The complete website is committed in `dist/`; serving it needs no package installation or build step.

**Live site:** [purdue-computer-pioneer-union.bloomytrout516.chatgpt.site](https://purdue-computer-pioneer-union.bloomytrout516.chatgpt.site/)

## Preview locally

From the repository root, with Python 3 installed:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Open <http://localhost:8000/>. Serve `dist/` as the web root: report navigation and assets use root-absolute paths such as `/notes/flashattention-4.html` and `/assets/logo-mark.svg`. Opening HTML files directly or hosting beneath a repository subpath will not resolve all links correctly.

## Edit content

| File or directory | Purpose |
| --- | --- |
| `data/reports.json` | Expanded report text, source citations, takeaways, and figure placements. |
| `dist/articles.js` | Original article metadata and proposed session content, read by the generator. |
| `dist/index.html` | Homepage layout and organization copy; report cards, session artwork panels, and footer are refreshed by the generator. |
| `dist/team.html` | People, public profile links, and shared next chapters; footer is refreshed by the generator. |
| `dist/styles.css`, `dist/readers.css` | Homepage, People page, report, and session styles. |
| `dist/script.js`, `dist/readers.js` | Navigation, homepage animation, and reading enhancements. |
| `dist/assets/` | Logos, icons, and SVG illustrations. |
| `scripts/build-readers.mjs` | Report/session templates, route metadata, homepage cards, and shared footer. |

After editing report or session sources, regenerate the standalone pages with Node.js:

```sh
node scripts/build-readers.mjs
```

Commit both the edited source and regenerated `dist/` files. Do not edit generated files in `dist/notes/`, `dist/events/`, or `dist/report-index.json` directly. Decorative topic illustrations can optionally be regenerated with `python3 scripts/build-hero-art.py`; explanatory diagrams are maintained as SVG source files. Both generators use only standard libraries and run offline. See [scripts/README.md](scripts/README.md) for details.

## Contribute and deploy

Contributors can fork this public repository, make changes on a branch, and open a pull request. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and checks. Direct write access requires the owner to invite specific GitHub usernames.

The live website remains hosted on ChatGPT Sites. A GitHub push or merged pull request does **not** automatically update that deployment. Publishing the updated `dist/` is a separate action. GitHub Pages is not configured; its usual repository-subpath hosting would require path or hosting changes first.
