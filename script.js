const FA_PLAY = 'fa-play';
const FA_PAUSE = 'fa-pause';
const NEXT = true;
const PREV = false;

const title = document.getElementById('titlte');
const artist = document.getElementById('artist');
const img = document.querySelector('img');

const audioElem = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
];

// Check if Playing
let isPlaying = false;

// Current Song
let currentSong = 0;

function togglePlayButton(isPlaying) {
    isPlaying ? playBtn.classList.replace(FA_PAUSE, FA_PLAY) : playBtn.classList.replace(FA_PLAY, FA_PAUSE);
    isPlaying ? audioElem.pause() : audioElem.play();
}

// Toggle Play Button
function PlayBtnClick() {
    togglePlayButton(isPlaying);
    isPlaying = isPlaying ? false : true;
}


// Update DOM
function loadSong(song_id) {
    song = songs[song_id]
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    audioElem.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
    currentTimeElement.innerHTML = '0:00';
    durationElement.innerHTML = '0:00'
}

function changeSong(isNext) {
    isNext ? currentSong-- : currentSong++;
    currentSong = (currentSong < 0) ? songs.length - 1 : (currentSong >= songs.length) ? 0 : currentSong;
    loadSong(currentSong);
    PlayBtnClick();
    isPlaying = true;
}

function prevSong() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);
    isPlaying = false;
    PlayBtnClick();
}


function nextSong() {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    loadSong(currentSong);
    isPlaying = false;
    PlayBtnClick();
}

function TimeToString(t){
    let min = Math.floor(t / 60);
    let sec = Math.floor(t % 60);

    if (sec){
        return (sec < 10)? `${min}:0${sec}` : `${min}:${sec}`;
    }else{
        return '0:00';
    }
}

// update progressbar
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        

        durationElement.textContent = TimeToString(duration);
        currentTimeElement.textContent = TimeToString(currentTime);
    }
}

function setProgressbar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = audioElem;
    audioElem.currentTime = duration * clickX / width;
}



// Event Listeners
audioElem.addEventListener('timeupdate', updateProgressBar);

// Auto play next song
audioElem.addEventListener('ended', nextSong)

// Progessbar on Click
progressContainer.addEventListener('click', setProgressbar);

// Play Btn Click
playBtn.addEventListener('click', PlayBtnClick);
prevBtn.addEventListener('click', nextSong);
nextBtn.addEventListener('click', prevSong);

// Onload Function
loadSong(currentSong);