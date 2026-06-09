# Songs That Remind Me of You

A static GitHub Pages playlist site with a cute pink love theme inspired by bow-and-heart stationery aesthetics. It uses only HTML, CSS, and JavaScript.

## Files

- `index.html` contains the page structure.
- `styles.css` contains the responsive layout, bows, hearts, sparkles, and animations.
- `script.js` stores the playlist data and renders the song cards.
- `README.md` explains how to edit and publish the site.

## Edit Songs

Open `script.js` and update the `playlist` array:

```js
{
  title: "Your Song Title",
  artist: "Artist Name",
  note: "Your personal love note for this song.",
  embedUrl: "https://open.spotify.com/embed/track/YOUR_TRACK_ID"
}
```

## Replace Spotify Embed URLs

1. Open Spotify.
2. Find the song you want.
3. Select Share.
4. Select Embed track.
5. Copy the embed URL from the iframe `src`.
6. Paste that URL into the `embedUrl` field in `script.js`.

The URL should look like this:

```text
https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT
```

## Publish With GitHub Pages

1. Push these files to a GitHub repository.
2. Open the repository Settings.
3. Go to Pages.
4. Set the source to your main branch and root folder.
5. Save, then wait for GitHub to publish the site.

No backend, API keys, or build step are required.
