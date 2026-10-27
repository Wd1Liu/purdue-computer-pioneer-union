# Contributing

Use a fork and pull request to propose changes. Direct write access is optional and requires an invitation from the repository owner using your GitHub username.

## Make a change

1. Fork [Wd1Liu/purdue-computer-pioneer-union](https://github.com/Wd1Liu/purdue-computer-pioneer-union) on GitHub.
2. Clone your fork, enter its directory, and create a branch. Replace `YOUR_USERNAME` with your GitHub username:

   ```sh
   git clone https://github.com/YOUR_USERNAME/purdue-computer-pioneer-union.git
   cd purdue-computer-pioneer-union
   git switch -c update-session-copy
   ```

3. Use the editing map in [README.md](README.md). Update report text in `data/reports.json` and session content in `dist/articles.js`. Update the generator when changing generated layouts, routes, or the shared footer.
4. Regenerate pages after source changes:

   ```sh
   node scripts/build-readers.mjs
   ```

5. Review and validate the changes below, then commit the source and generated files together:

   ```sh
   git status --short
   git diff
   git add <changed-files>
   git diff --cached
   git commit -m "Describe the change"
   git push -u origin update-session-copy
   ```

6. Open a pull request from your branch to `Wd1Liu/purdue-computer-pioneer-union:main`. Describe what changed and why, the checks you ran, and include screenshots for visible layout changes.

## Validate before opening a pull request

Run JavaScript syntax and whitespace checks from the repository root:

```sh
node --check dist/articles.js
node --check dist/script.js
node --check dist/readers.js
node --check scripts/build-readers.mjs
git diff --check
git diff --cached --check
```

After committing your intended source and generated output, verify that another rebuild produces no changes:

```sh
node scripts/build-readers.mjs
git diff --exit-code -- dist
```

Preview with `python3 -m http.server 8000 --bind 127.0.0.1 --directory dist` and open <http://localhost:8000/>. Check the homepage, People page, all seven reports, and both proposed session pages. Verify links, images, section anchors, mobile navigation, keyboard access, and readability on a narrow screen. Inspect the browser console and network panel for errors. Pages should retain their content and standard links when JavaScript is disabled.

Keep citations and figure attribution with their claims. Clearly distinguish proposed events from confirmed details. Use only approved public information for the People page; do not add private documents, offer letters, signatures, unpublished contact details, credentials, or hosting configuration. Review the staged files even when `.gitignore` is present.

Merging a pull request updates this repository. Publishing to the existing ChatGPT Sites website is a separate step; this repository has no automatic deployment configured.
