# Audio files

Put Adam's MP3 files in this folder.

Then open `src/data/tracks.js` and add or edit a track entry:

```js
{
  id: "grandpa-story",
  title: "Grandpa's Story",
  file: "audio/grandpa-story.mp3",
  emoji: "📖"
}
```

The `file` path should start with `audio/` because everything in this folder is served from the public site root.
