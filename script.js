const playlist = [
  {
    title: "Pink Cloud Daydream",
    artist: "Placeholder Artist",
    note: "This one feels like holding hands while the whole world turns soft and rosy.",
    duration: "3:18",
    color: "#ff8fbd",
    embedUrl: "https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT"
  },
  {
    title: "Bow-Tied Heart",
    artist: "Sample Sweetheart",
    note: "A tiny soundtrack for every cute message, every smile, and every little inside joke.",
    duration: "2:57",
    color: "#e73d62",
    embedUrl: "https://open.spotify.com/embed/track/7ouMYWpwJ422jRcDASZB7P"
  },
  {
    title: "Strawberry Moon",
    artist: "Demo Darling",
    note: "For slow evenings, warm lights, and the kind of quiet that only feels right with you.",
    duration: "3:44",
    color: "#ffb3ce",
    embedUrl: "https://open.spotify.com/embed/track/1rqqCSm0Qe4I9rUvWncaom"
  },
  {
    title: "Love Letter Loop",
    artist: "The Placeholder Hearts",
    note: "I would replay this during a walk just to think about how lucky I am.",
    duration: "4:02",
    color: "#ff6f9d",
    embedUrl: "https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b"
  },
  {
    title: "Cherry Ribbon",
    artist: "Soft Pop Sample",
    note: "Cute, bright, and impossible not to associate with your favorite laugh.",
    duration: "3:09",
    color: "#f04e78",
    embedUrl: "https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp"
  },
  {
    title: "Always You",
    artist: "Placeholder Romance",
    note: "The closing-credits song for every perfect little memory I want to keep.",
    duration: "3:36",
    color: "#ffc6db",
    embedUrl: "https://open.spotify.com/embed/track/6habFhsOp2NvshLv26DqMb"
  }
];

const songList = document.querySelector("#song-list");
const modal = document.querySelector("#player-modal");
const modalBackdrop = document.querySelector(".modal-backdrop");
const closeButton = document.querySelector("#close-player");
const albumCover = document.querySelector("#album-cover");
const playerTitle = document.querySelector("#player-title");
const playerArtist = document.querySelector("#player-artist");
const playerNote = document.querySelector("#player-note");
const elapsedTime = document.querySelector("#elapsed-time");
const timeLeft = document.querySelector("#time-left");
const progressFill = document.querySelector("#progress-fill");
const spotifyLink = document.querySelector("#spotify-link");
const spotifyEmbed = document.querySelector("#spotify-embed");
const playButton = document.querySelector("#play-button");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const shuffleButton = document.querySelector("#shuffle-button");
const repeatButton = document.querySelector("#repeat-button");

let currentSongIndex = 0;
let isPlaying = false;

function getSpotifyTrackUrl(embedUrl) {
  return embedUrl.replace("/embed/track/", "/track/");
}

function getDurationSeconds(duration) {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function createSongCard(song, index) {
  const article = document.createElement("button");
  article.className = "song-card";
  article.type = "button";
  article.setAttribute("aria-label", `Open player for ${song.title} by ${song.artist}`);

  article.innerHTML = `
    <div class="card-top">
      <div>
        <h3>${song.title}</h3>
        <p class="artist">${song.artist}</p>
      </div>
      <span class="card-decoration" aria-hidden="true"></span>
    </div>
    <p class="note">${song.note}</p>
    <span class="tap-hint">Open phone player</span>
  `;

  article.addEventListener("click", () => openPlayer(index));
  return article;
}

function renderPlayer(index) {
  const song = playlist[index];
  const durationSeconds = getDurationSeconds(song.duration);
  const elapsedSeconds = isPlaying ? Math.floor(durationSeconds * 0.38) : 0;
  const remainingSeconds = durationSeconds - elapsedSeconds;

  albumCover.style.setProperty("--cover-color", song.color);
  playerTitle.textContent = song.title;
  playerArtist.textContent = song.artist;
  playerNote.textContent = song.note;
  elapsedTime.textContent = formatTime(elapsedSeconds);
  timeLeft.textContent = `-${formatTime(remainingSeconds)}`;
  progressFill.style.width = isPlaying ? "38%" : "0%";
  spotifyLink.href = getSpotifyTrackUrl(song.embedUrl);
  spotifyEmbed.src = song.embedUrl;
  playButton.textContent = isPlaying ? "❚❚" : "▶";
  playButton.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
}

function openPlayer(index) {
  currentSongIndex = index;
  isPlaying = false;
  renderPlayer(currentSongIndex);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  playButton.focus();
}

function closePlayer() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  spotifyEmbed.src = "";
}

function showSong(index) {
  currentSongIndex = (index + playlist.length) % playlist.length;
  isPlaying = false;
  renderPlayer(currentSongIndex);
}

playlist.forEach((song, index) => {
  songList.appendChild(createSongCard(song, index));
});

playButton.addEventListener("click", () => {
  isPlaying = !isPlaying;
  renderPlayer(currentSongIndex);
});

previousButton.addEventListener("click", () => {
  showSong(currentSongIndex - 1);
});

nextButton.addEventListener("click", () => {
  showSong(currentSongIndex + 1);
});

shuffleButton.addEventListener("click", () => {
  let nextIndex = Math.floor(Math.random() * playlist.length);
  if (nextIndex === currentSongIndex) {
    nextIndex = (nextIndex + 1) % playlist.length;
  }
  showSong(nextIndex);
});

repeatButton.addEventListener("click", () => {
  isPlaying = false;
  renderPlayer(currentSongIndex);
});

closeButton.addEventListener("click", closePlayer);
modalBackdrop.addEventListener("click", closePlayer);

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closePlayer();
  }

  if (event.key === "ArrowLeft") {
    showSong(currentSongIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showSong(currentSongIndex + 1);
  }
});
