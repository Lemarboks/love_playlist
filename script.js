const playlist = [
  {
    title: "Pink Cloud Daydream",
    artist: "Placeholder Artist",
    note: "This one feels like holding hands while the whole world turns soft and rosy.",
    embedUrl: "https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT"
  },
  {
    title: "Bow-Tied Heart",
    artist: "Sample Sweetheart",
    note: "A tiny soundtrack for every cute message, every smile, and every little inside joke.",
    embedUrl: "https://open.spotify.com/embed/track/7ouMYWpwJ422jRcDASZB7P"
  },
  {
    title: "Strawberry Moon",
    artist: "Demo Darling",
    note: "For slow evenings, warm lights, and the kind of quiet that only feels right with you.",
    embedUrl: "https://open.spotify.com/embed/track/1rqqCSm0Qe4I9rUvWncaom"
  },
  {
    title: "Love Letter Loop",
    artist: "The Placeholder Hearts",
    note: "I would replay this during a walk just to think about how lucky I am.",
    embedUrl: "https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b"
  },
  {
    title: "Cherry Ribbon",
    artist: "Soft Pop Sample",
    note: "Cute, bright, and impossible not to associate with your favorite laugh.",
    embedUrl: "https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp"
  },
  {
    title: "Always You",
    artist: "Placeholder Romance",
    note: "The closing-credits song for every perfect little memory I want to keep.",
    embedUrl: "https://open.spotify.com/embed/track/6habFhsOp2NvshLv26DqMb"
  }
];

const songList = document.querySelector("#song-list");

function createSongCard(song) {
  const article = document.createElement("article");
  article.className = "song-card";

  article.innerHTML = `
    <div class="card-top">
      <div>
        <h3>${song.title}</h3>
        <p class="artist">${song.artist}</p>
      </div>
      <span class="card-decoration" aria-hidden="true"></span>
    </div>
    <p class="note">${song.note}</p>
    <iframe
      class="spotify-frame"
      title="Spotify embed for ${song.title}"
      src="${song.embedUrl}"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy">
    </iframe>
  `;

  return article;
}

playlist.forEach((song) => {
  songList.appendChild(createSongCard(song));
});
