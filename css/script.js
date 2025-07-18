const nxtBtn = document.querySelector(".mouse-click:nth-child(2)");
const prevBtn = document.querySelector(".mouse-click:nth-child(3)");
const playPauseBtn = document.querySelector(".mouse-click:nth-child(1)");
var list = 0;
var count = 0;
const song = document.querySelector(".song");
const progress = document.querySelector(".progress");
const track = document.querySelector(".albums-container");
const arts = Array.from(track.children);
const title_track = document.querySelector(".title-container");
const titles = Array.from(title_track.children);
const SetArtPosition = (art, index) => {
  art.style.left = 200 * index + "px";
};

//song metadata
// Add at the top with other selectors
const currentTimeDisplay = document.querySelector(".current-time");
const totalTimeDisplay = document.querySelector(".total-time");

// Update the onloadedmetadata function
song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
  totalTimeDisplay.textContent = formatTime(song.duration);
};

// Add this helper function
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Update the interval function
if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
    currentTimeDisplay.textContent = formatTime(song.currentTime);
  }, 500);
}
// play pause function
function playPause() {
  if (count == 0) {
    count = 1;
    song.play();
  } else {
    count = 0;
    song.pause();
  }
}
console.log(count);

//track slider animation
if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}
// track slider change
progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
};

const sources = [
  "css/Assets/Songs/audio-1.mp3",
  "css/Assets/Songs/audio-2.mp3",
  "css/Assets/Songs/audio-3.mp3",
  "css/Assets/Songs/audio-4.mp3",
  "css/Assets/Songs/audio-5.mp3",
  "css/Assets/Songs/audio-6.mp3",
  "css/Assets/Songs/audio-7.mp3",
];

arts.forEach(SetArtPosition);
//display title
const showTitle = (visibleTitle, hiddenTitle) => {
  visibleTitle.style.display = "none";
  hiddenTitle.style.display = "block";
  visibleTitle.classList.remove("visible");
  hiddenTitle.classList.add("visible");
};

const moveToArt = (track, currentArt, targetArt) => {
  track.style.transform = "translateX(-" + targetArt.style.left + ")";
  currentArt.classList.remove("current-art");
  targetArt.classList.add("current-art");
};
nxtBtn.addEventListener("click", (e) => {
  const currentArt = track.querySelector(".current-art");
  const nextArt = currentArt.nextElementSibling;
  moveToArt(track, currentArt, nextArt);
  const visibleTitle = title_track.querySelector(".visible");
  const hiddenTitle = visibleTitle.nextElementSibling;
  showTitle(visibleTitle, hiddenTitle);
  list++;
  document.querySelector(".songSource").src = sources[list];
  console.log(sources[list]);
  song.load();
  count = 1;
});
prevBtn.addEventListener("click", (e) => {
  const currentArt = track.querySelector(".current-art");
  const prevArt = currentArt.previousElementSibling;
  moveToArt(track, currentArt, prevArt);
  const visibleTitle = title_track.querySelector(".visible");
  const hiddenTitle = visibleTitle.previousElementSibling;
  showTitle(visibleTitle, hiddenTitle);
  list--;
  document.querySelector(".songSource").src = sources[list];
  console.log(sources[list]);
  song.load();
  count = 1;
});
