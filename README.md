# el Raco Dark Mode

This is a modified fork of the original `raco_dark_mode` project for restyling `el Raco` with UserCSS.

Original upstream:

<https://github.com/naritanara/raco_dark_mode>

This fork keeps the original GPL-3.0-only license and credits the original author while adding extended dark-mode coverage for additional Raco pages.

## Building

You can either download the compiled CSS from the latest GitHub release or build it locally.

To build it yourself, you will need `node` and `pnpm`:

```sh
pnpm install
pnpm build
```

You will find the UserCSS file in the root of the project (`main.user.css`) as well as an equivalent vanilla CSS file (`main.css`).

***Note:*** *You can clean the workspace with `pnpm clean` and update the output on changes with `pnpm watch`.*

## Installation

The recommended installer is [Stylus](https://github.com/openstyles/stylus), which supports UserCSS files in Chrome, Firefox, and Chromium-based browsers such as Brave, Edge, Opera, and Vivaldi.

### With Stylus

1. Install Stylus for your browser:
   - [Chrome Web Store](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne) for Chrome and most Chromium-based browsers.
   - [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/styl-us/) for Firefox.
2. Get the generated UserCSS file:
   - Recommended: open the [latest release](https://github.com/Pandax40/raco_dark_mode/releases/latest) and download `main.user.css`.
   - Direct download: <https://github.com/Pandax40/raco_dark_mode/releases/latest/download/main.user.css>
   - If you cloned this repository and want to compile it yourself, run `pnpm install` and `pnpm build`, then use the generated `main.user.css` file in the project root.
   - If you are installing from a GitHub fork, open the raw `main.user.css` URL, not the normal GitHub preview page. The URL should look like:

     ```text
     https://raw.githubusercontent.com/YOUR_USERNAME/raco_dark_mode/main/main.user.css
     ```

3. Open the UserCSS file in your browser:
   - Firefox: drag `main.user.css` into a browser tab, or use `Ctrl+O` / `Cmd+O` and select the file.
   - Chrome/Chromium: open Stylus first, then drag `main.user.css` into the Stylus manager or popup. If you want to open local `.user.css` files directly in a tab, go to the browser extension details for Stylus and enable **Allow access to file URLs**.
4. Stylus should show an installer page. Click **Install style**.
5. Open <https://raco.fib.upc.edu/> and check that the dark style is active. If it is not, open the Stylus popup on that page and make sure the style is enabled.

Stylus needs the file to be served as raw/plain text and the filename or URL must end in `.user.css`. If the browser only shows a GitHub code page, use the **Raw** button or a `raw.githubusercontent.com` URL.

### Alternatives

- [Cascadea](https://cascadea.app/) is a Safari/macOS option with UserCSS support. Open the raw `main.user.css` file in Safari and install it through Cascadea.
- [xStyle](https://addons.mozilla.org/firefox/addon/xstyle/) is another Firefox userstyle manager. It can be useful if you do not want to use Stylus, but Stylus is still the primary target for this project.
- Manual custom CSS tools can work if they let you paste CSS and restrict it to `raco.fib.upc.edu`, but you may lose UserCSS metadata, automatic updates, and variables. Prefer `main.css` for manual paste-based tools and `main.user.css` for UserCSS managers.

## Publishing A Fork

If you publish this under your own GitHub fork, update `package.json`:

```json
"userCss": {
  "namespace": "https://github.com/YOUR_USERNAME/raco_dark_mode"
}
```

Then run `pnpm build` so `main.user.css` contains the updated metadata.

## Releasing

GitHub Actions can build and publish a release from `main`.

To publish a new release:

1. Go to **Actions > Release > Run workflow**.
2. Select the `main` branch.
3. Enter the release version without the leading `v`, for example `3.0.1`.
4. Run the workflow.

You can also start it from the GitHub CLI:

```sh
gh workflow run Release --ref main -f version=3.0.1
```

Release versions must use this exact format:

```text
MAJOR.MINOR.PATCH
```

Examples: `3.0.0`, `3.0.1`, `4.1.0`.

The workflow will:

- update `package.json` if its `"version"` does not match the requested release,
- skip the version commit if `package.json` is already correct,
- create and push the matching `vMAJOR.MINOR.PATCH` tag, for example `v3.0.1`,
- build both CSS outputs,
- publish a GitHub release with `main.user.css` and `main.css`.

Do not create the release tag manually for normal releases. The workflow creates it after the version commit, so the tag points to the exact source version used for the release.

If the release step fails with a permission error, check the repository setting under **Settings > Actions > General > Workflow permissions** and allow GitHub Actions to create releases with write access. If the version commit cannot be pushed, check whether branch protection rules for `main` block commits made by GitHub Actions.

## Credits

- Original project: Nara Diaz Vinolas
- Modified fork and extended page coverage: panda

See `AUTHORS.md` and `FORK_NOTICE.md` for attribution and redistribution notes.

## License

This project is licensed under the GNU General Public License v3.0 only (`GPL-3.0-only`).

You may fork, modify, and redistribute this project, provided that you:

- keep the same GPL-3.0-only license,
- keep the `LICENSE` file,
- credit the original author,
- clearly mark modified versions as modified,
- provide access to the corresponding source code when distributing the generated CSS/UserCSS.
