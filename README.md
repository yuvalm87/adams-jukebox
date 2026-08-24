# Adam's Jukebox

A simple, playful audio player for Adam's songs and stories. It uses React, Vite, plain CSS, and one native HTML5 Audio element.

The app is prepared for local development and for GitHub Pages at a repository URL like:

```text
https://USERNAME.github.io/adams-jukebox/
```

## Run locally

```bash
npm install
npm run dev
```

## Add MP3 files

1. Put MP3 files inside `public/audio/`.
2. Open `src/data/tracks.js`.
3. Add or edit a track entry.
4. Refresh the app.

Example:

```js
{
  id: "grandpa-story",
  title: "Grandpa's Story",
  file: "audio/grandpa-story.mp3",
  emoji: "📖"
}
```

The app uses Vite's base URL when it builds audio paths, so the same `file` value works locally and on GitHub Pages.

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repository called `adams-jukebox`.
2. Push this local repository to GitHub.
3. Open the GitHub repository in your browser.
4. Go to **Settings → Pages**.
5. If GitHub asks for a source, select **GitHub Actions**.
6. Push to the `main` branch.
7. Wait for the **Deploy to GitHub Pages** workflow to finish.
8. Open the GitHub Pages URL shown by the workflow or on the Pages settings screen.

Do not create a remote repository from this app unless you are ready to publish it.

## Track configuration

Tracks live in:

```text
src/data/tracks.js
```

MP3 files live in:

```text
public/audio/
```

Several tracks are already configured in `src/data/tracks.js` and point to MP3 files in `public/audio/`.

Add more MP3 files to `public/audio/`, then add more entries to `src/data/tracks.js`.
