'use strict';


/**
 * all music information
 */

const musicData = [
  {
    song_num: 0,
    backgroundImage: "./assets/images/cropped-blueboi.jpg",
    posterUrl: "./assets/images/cropped-blueboi.jpg",
    title: "blue boi",
    album: "blue boi",
    year: 2018,
    artist: "Lakey Inspired",
    musicPath: "./assets/music/blueboi.mp3",
    favorite: false
  },
  {
    song_num: 1,
    backgroundImage: "./assets/images/wwwisathing.png",
    posterUrl: "./assets/images/wwwisathing.png",
    title: "www is a thing",
    album: "wwwisathing",
    year: 2018,
    artist: "DJ QUads",
    musicPath: "./assets/music/wwwisathing.mp3",
    favorite: false
  },
  {
    song_num: 2,
    backgroundImage: "./assets/images/andsoitbegins.jpg",
    posterUrl: "./assets/images/andsoitbegins.jpg",
    title: "And So It Begins",
    album: "Chillin' In Tonight's Sky",
    year: 2016,
    artist: "Artificial Music",
    musicPath: "./assets/music/AndSoItBegins.mp3",
    favorite: false
  },
  {
    song_num: 3,
    backgroundImage: "./assets/images/pieces.png",
    posterUrl: "./assets/images/pieces.png",
    title: "Pieces",
    album: "Pieces",
    year: 2020,
    artist: "After the fall",
    musicPath: "./assets/music/pieces.mp3",
    favorite: false
  },
  {
    song_num: 4,
    backgroundImage: "./assets/images/lofi-orchestra.png",
    posterUrl: "./assets/images/lofi-orchestra.png",
    title: "Lofi Orchestra",
    album: "Lofi Orchestra",
    year: 2023,
    artist: "xethrocc",
    musicPath: "./assets/music/lofi-orchestra.mp3",
    favorite: false
  }
];



function favorite(song_number)
{

  var isFav = localStorage.getItem(`isFav_song_num_${song_number}`);

  if (isFav == "true") {
    localStorage.setItem(`isFav_song_num_${song_number}`, "false")
  } else {
    localStorage.setItem(`isFav_song_num_${song_number}`, "true")
  }
  change_favorite(song_number)
  favbuttoncheck()
}

function check_favorite(song_number)
{
  var i = song_number;
  var isFav = localStorage.getItem(`isFav_song_num_${song_number}`);
  if (isFav == "true") {
    playlist.innerHTML += `
    <li>
      <div>
        <div id="icon${musicData[i].song_num}">
          <span class="material-symbols-rounded filledin" id="star_${musicData[i].song_num}" onclick="favorite('${musicData[i].song_num}')">star</span>
        </div>
        <button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
        <img src="${musicData[i].posterUrl}" width="800" height="800" alt="${musicData[i].title} Album Poster"
        class="img-cover">
          <div class="item-icon">
            <span class="material-symbols-rounded">equalizer</span>
          </div>
        </button>
      </div>
    </li>
    `;
  } else {
    playlist.innerHTML += `
    <li>
      <div>
        <div id="icon${musicData[i].song_num}">
          <span class="material-symbols-rounded" id="star_${musicData[i].song_num}" onclick="favorite('${musicData[i].song_num}')">star</span>
        </div>
        <button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
        <img src="${musicData[i].posterUrl}" width="800" height="800" alt="${musicData[i].title} Album Poster"
        class="img-cover">
          <div class="item-icon">
            <span class="material-symbols-rounded">equalizer</span>
          </div>
        </button>
      </div>
    </li>
    `;
  }
}

function change_favorite(i)
{
  var song_number = i
  var changing_star = document.getElementById(`icon${song_number}`)
  var isFav = localStorage.getItem(`isFav_song_num_${song_number}`);
  if (isFav == "true") {
    changing_star.innerHTML = `
          <span class="material-symbols-rounded filledin" id="star_${song_number}" onclick="favorite('${song_number}')">star</span>
      `;
  } else {
    changing_star.innerHTML = `
          <span class="material-symbols-rounded" id="star_${song_number}" onclick="favorite('${song_number}')">star</span>
      `;
  }
}


/**
 * add eventListnere on all elements that are passed
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PLAYLIST
 * 
 * add all music in playlist, from 'musicData'
 */

const playlist = document.querySelector("[data-music-list]");

for (let i = 0, len = musicData.length; i < len; i++) {
  var num = i;
  check_favorite(num);
}



/**
 * PLAYLIST MODAL SIDEBAR TOGGLE
 * 
 * show 'playlist' modal sidebar when click on playlist button in top app bar
 * and hide when click on overlay or any playlist-item
 */

const playlistSideModal = document.querySelector("[data-playlist]");
const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglePlaylist = function () {
  playlistSideModal.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("modalActive");
}

addEventOnElements(playlistTogglers, "click", togglePlaylist);



/**
 * PLAYLIST ITEM
 * 
 * remove active state from last time played music
 * and add active state in clicked music
 */

const playlistItems = document.querySelectorAll("[data-playlist-item]");

let currentMusic = 0;
let lastPlayedMusic = 0;

const changePlaylistItem = function () {
  playlistItems[lastPlayedMusic].classList.remove("playing");
  playlistItems[currentMusic].classList.add("playing");
  favbuttoncheck()
}

addEventOnElements(playlistItems, "click", function () {
  lastPlayedMusic = currentMusic;
  currentMusic = Number(this.dataset.playlistItem);
  changePlaylistItem();

});

/**
 * PLAYER
 * 
 * change all visual information on player, based on current music
 */

const playerBanner = document.querySelector("[data-player-banner]");
const playerTitle = document.querySelector("[data-title]");
const playerAlbum = document.querySelector("[data-album]");
const playerYear = document.querySelector("[data-year]");
const playerArtist = document.querySelector("[data-artist]");

const audioSource = new Audio(musicData[currentMusic].musicPath);

const changePlayerInfo = function () {
  playerBanner.src = musicData[currentMusic].posterUrl;
  playerBanner.setAttribute("alt", `${musicData[currentMusic].title} Album Poster`);
  document.body.style.backgroundImage = `url(${musicData[currentMusic].backgroundImage})`;
  playerTitle.textContent = musicData[currentMusic].title;
  playerAlbum.textContent = musicData[currentMusic].album;
  playerYear.textContent = musicData[currentMusic].year;
  playerArtist.textContent = musicData[currentMusic].artist;

  audioSource.src = musicData[currentMusic].musicPath;

  audioSource.addEventListener("loadeddata", updateDuration);
  playMusic();

  
}




doShuffleIcon()

function doShuffleIcon () {
  var doShuffleFav = localStorage.getItem("doShuffleFav");
  if (doShuffleFav == "1") {
    localStorage.setItem("doShuffleFav", "1")
    document.getElementById("shufflefav").innerHTML = `
    <span class="material-symbols-rounded"onclick="shufflefav()">shuffle_on</span>
  `;
  } else {
    localStorage.setItem("doShuffleFav", "0")
    document.getElementById("shufflefav").innerHTML = `
    <span class="material-symbols-rounded"onclick="shufflefav()">shuffle</span>
  `;
  }
}
function shufflefav() {
  if (localStorage.getItem("doShuffleFav") == "1") {
    localStorage.setItem("doShuffleFav", "0")
  } else {
    localStorage.setItem("doShuffleFav", "1")
  }
  doShuffleIcon()
}

favbuttoncheck()
function favbuttoncheck() {
  var isFav = localStorage.getItem(`isFav_song_num_${musicData[currentMusic].song_num}`);
    if (isFav == "true") {
      document.querySelector("[favbutton]").innerHTML = `
      <div>
        <button class="btn-icon" onclick="favorite('${musicData[currentMusic].song_num}')">
          <span class="material-symbols-rounded filledin default-icon">star</span>
        </button>
        </div>
        `;
    } else {
      document.querySelector("[favbutton]").innerHTML = `
      <div>
        <button class="btn-icon" onclick="favorite('${musicData[currentMusic].song_num}')">
          <span class="material-symbols-rounded default-icon">star</span>
        </button>
        </div>
        `;
    }
}
addEventOnElements(playlistItems, "click", changePlayerInfo);

/** update player duration */
const playerDuration = document.querySelector("[data-duration]");
const playerSeekRange = document.querySelector("[data-seek]");

/** pass seconds and get timcode formate */
const getTimecode = function (duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration - (minutes * 60));
  const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return timecode;
}

const updateDuration = function () {
  playerSeekRange.max = Math.ceil(audioSource.duration);
  playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
}

audioSource.addEventListener("loadeddata", updateDuration);



/**
 * PLAY MUSIC
 * 
 * play and pause music when click on play button
 */

const playBtn = document.querySelector("[data-play-btn]");

let playInterval;

const playMusic = function () {
  if (audioSource.paused) {
    audioSource.play();
    playBtn.classList.add("active");
    playInterval = setInterval(updateRunningTime, 500);
  } else {
    audioSource.pause();
    playBtn.classList.remove("active");
    clearInterval(playInterval);
  }
}

playBtn.addEventListener("click", playMusic);


/** update running time while playing music */

const playerRunningTime = document.querySelector("[data-running-time");

const updateRunningTime = function () {
  playerSeekRange.value = audioSource.currentTime;
  playerRunningTime.textContent = getTimecode(audioSource.currentTime);

  updateRangeFill();
  isMusicEnd();
}



/**
 * RANGE FILL WIDTH
 * 
 * change 'rangeFill' width, while changing range value
 */

const ranges = document.querySelectorAll("[data-range]");
const rangeFill = document.querySelector("[data-range-fill]");

const updateRangeFill = function () {
  let element = this || ranges[0];

  const rangeValue = (element.value / element.max) * 100;
  element.nextElementSibling.style.width = `${rangeValue}%`;
}

addEventOnElements(ranges, "input", updateRangeFill);



/**
 * SEEK MUSIC
 * 
 * seek music while changing player seek range
 */

const seek = function () {
  audioSource.currentTime = playerSeekRange.value;
  playerRunningTime.textContent = getTimecode(playerSeekRange.value);
}

playerSeekRange.addEventListener("input", seek);



/**
 * END MUSIC
 */

const isMusicEnd = function () {
  if (audioSource.ended) {
    playBtn.classList.remove("active");
    audioSource.currentTime = 0;
    playerSeekRange.value = audioSource.currentTime;
    playerRunningTime.textContent = getTimecode(audioSource.currentTime);
    updateRangeFill();
    skipNext();
    changePlayerInfo();
    changePlaylistItem();
  }
}



/**
 * SKIP TO NEXT MUSIC
 */

const playerSkipNextBtn = document.querySelector("[data-skip-next]");

const skipNext = function () {

  lastPlayedMusic = currentMusic;
  
  currentMusic >= musicData.length - 1 ? currentMusic = 0 : currentMusic++;
  changePlayerInfo();
  changePlaylistItem();
  
  if (localStorage.getItem("doShuffleFav") == true)
  {
    if (localStorage.getItem(`isFav_song_num_${currentMusic}`) != "true") {
      skipNext()
    }
  }
}



playerSkipNextBtn.addEventListener("click", skipNext);



/**
 * SKIP TO PREVIOUS MUSIC
 */

const playerSkipPrevBtn = document.querySelector("[data-skip-prev]");

const skipPrev = function () {
  lastPlayedMusic = currentMusic;

  currentMusic <= 0 ? currentMusic = musicData.length - 1 : currentMusic--;

  changePlayerInfo();
  changePlaylistItem();
}

playerSkipPrevBtn.addEventListener("click", skipPrev);

/**
 * MUSIC VOLUME
 * 
 * increase or decrease music volume when change the volume range
 */

const playerVolumeRange = document.querySelector("[data-volume]");
const playerVolumeBtn = document.querySelector("[data-volume-btn]");

const changeVolume = function () {
  audioSource.volume = playerVolumeRange.value;
  audioSource.muted = false;

  if (audioSource.volume <= 0.1) {
    playerVolumeBtn.children[0].textContent = "volume_mute";
  } else if (audioSource.volume <= 0.5) {
    playerVolumeBtn.children[0].textContent = "volume_down";
  } else {
    playerVolumeBtn.children[0].textContent = "volume_up";
  }
}

playerVolumeRange.addEventListener("input", changeVolume);


/**
 * MUTE MUSIC
 */

const muteVolume = function () {
  if (!audioSource.muted) {
    audioSource.muted = true;
    playerVolumeBtn.children[0].textContent = "volume_off";
  } else {
    changeVolume();
  }
}

playerVolumeBtn.addEventListener("click", muteVolume);

