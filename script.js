let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('audio/1.mp3');
let currentSong =1;
let currentIndex = 0;
let currentTimeEl = document.getElementById("currentTime");
let durationEl = document.getElementById("duration");

play.addEventListener('click', () => {
    if(audio.paused  || audio.currentTime == 0){
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
        updatePlayIcons(); 
    }
    else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
        updatePlayIcons();
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background =`linear-gradient(to right, #4caf50 ${progress}%, #333 ${progress}%)`;
    currentTimeEl.innerText = formatTime(audio.currentTime);
    durationEl.innerText = '-' + formatTime(audio.duration - audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
    durationEl.innerText = formatTime(audio.duration);
});

progressBar.addEventListener('input', function()  {
    let value= this.value;
    this.style.background = `linear-gradient(to right, #4caf50 ${value}%, #3333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration)/100;
});

let playMusic = Array.from(document.getElementsByClassName('playMusic')); 

makeAllPlay= () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

function updatePlayIcons() {
    document.querySelectorAll('.playMusic').forEach(icon => {
        const id = icon.id || icon.dataset.id;
        icon.classList.remove('fa-circle-pause');
        icon.classList.add('fa-circle-play');
        if (Number(id) === currentSong && !audio.paused) {
            icon.classList.remove('fa-circle-play');
            icon.classList.add('fa-circle-pause');
        }
    });
}

let allMusic =Array.from(document.getElementsByClassName('music-card'));

let songs = [
    { songName: 'I Think I Like When It Rains', songDes: 'WILLIS', songImage: 'image/1.jpg', songPath: 'audio/1.mp3' },
    { songName: 'Indecision', songDes: 'Rex Orange County & Daniel Caesar', songImage: 'image/2.jpg', songPath: 'audio/2.mp3' },
    { songName: 'Cause You Have To', songDes: 'LANY', songImage: 'image/3.jpg', songPath: 'audio/3.mp3' },
    { songName: 'Just Hush', songDes: 'Co-Pilot', songImage: 'image/4.jpg', songPath: 'audio/4.mp3' },
    { songName: 'Japanese Denim', songDes: 'Daniel Caesar', songImage: 'image/5.jpg', songPath: 'audio/5.mp3' },
    { songName: 'Hannah Montana', songDes: 'Rex Orange County', songImage: 'image/6.jpg', songPath: 'audio/6.mp3' },
    { songName: 'Sunflower', songDes: 'Rex Orange County', songImage: 'image/7.jpg', songPath: 'audio/7.mp3' },
    { songName: 'Violet', songDes: 'Daniel Caesar', songImage: 'image/8.jpg', songPath: 'audio/8.mp3' },
    { songName: 'Who Knows', songDes: 'Daniel Caesar', songImage: 'image/9.jpg', songPath: 'audio/9.mp3' },
    { songName: 'Best Friend', songDes: 'Rex Orange County', songImage: 'image/10.jpg', songPath: 'audio/10.mp3' },
    { songName: 'Shaded Cream', songDes: 'Gumi', songImage: 'image/11.jpg', songPath: 'audio/11.mp3' },
    { songName: 'If the World Was Ending', songDes: 'Julia Michaels', songImage: 'image/12.jpg', songPath: 'audio/12.mp3' },
    { songName: '34+35', songDes: 'Ariana Grande', songImage: 'image/13.jpg', songPath: 'audio/13.mp3' },
    { songName: 'Blank Space', songDes: 'Taylor Swift', songImage: 'image/14.jpg', songPath: 'audio/14.mp3' },
    { songName: 'The Cure', songDes: 'Olivia Rodrigo', songImage: 'image/15.jpg', songPath: 'audio/15.mp3' },
];

order = [...songs];

allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs (originalOrder) {
    order = [...originalOrder];
    for ( i = order.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

shuffle.addEventListener('click', () => {
    if(!songOnShuffle) {
        songOnShuffle = true;
        shuffle.classList.add('active');
        repeat.classList.remove('active');
        songOnRepeat = false;
        order = shuffleSongs(songs);
        currentIndex = 0;
    }
    else{
        songOnShuffle = false;
        shuffle.classList.remove('active');
        order = songs;
        currentIndex = currentSong - 1;
    }
});

repeat.addEventListener('click', () => {
    if(!songOnRepeat) {
        songOnRepeat = true;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
        songOnShuffle = false;
    }
    else{
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
});

playNextSong = () => {
    if (!songOnRepeat) {
        currentIndex = (currentIndex + 1) % order.length;
    }
    currentSong = songs.findIndex(s => s.songPath === order[currentIndex].songPath) + 1;
    audio.src = order[currentIndex].songPath;
    audio.currentTime = 0;
    audio.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
    updateNowBar();
    updatePlayIcons();
    updateRecentlyPlayed(currentSong);
}

playPrevSong = () => {
    if (!songOnRepeat) {
        currentIndex = (currentIndex - 1 + order.length) % order.length;
    }
    currentSong = songs.findIndex(s => s.songPath === order[currentIndex].songPath) + 1;
    audio.src = order[currentIndex].songPath;
    audio.currentTime = 0;
    audio.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
    updateNowBar();
    updatePlayIcons();
    updateRecentlyPlayed(currentSong);
}

function updateNowBar() {
    nowBar.getElementsByTagName('img')[0].src = order[currentIndex].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentIndex].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentIndex].songDes;
}

forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
});

audio.addEventListener('ended', () => {
    playNextSong();
});

backward.addEventListener('click', () => {
    playPrevSong();
});

let volumeBar = document.getElementById('volumeBar');
let volumeIcon = document.getElementById('volumeIcon');
let lastVolume = volumeBar.value / 100;
audio.volume = lastVolume;

volumeBar.addEventListener('input', () => {
    let value = volumeBar.value;
    let vol = value / 100;

    audio.muted = false; 
    audio.volume = vol;
    lastVolume = vol;
    volumeBar.style.background = `linear-gradient(to right, #4caf50 ${value}%, #333 ${value}%)`;
    if (value == 0) {
        volumeIcon.className = 'fa-solid fa-volume-mute';
        volumeIcon.style.color = '#4caf50';
    } else {
        volumeIcon.className = 'fa-solid fa-volume-high';
        volumeIcon.style.color = 'var(--nav-icon-color)';
    }
});

volumeIcon.addEventListener('click', () => {
    if (!audio.muted) {
        audio.muted = true;
        volumeIcon.className = 'fa-solid fa-volume-mute';
        volumeIcon.style.color = '#4caf50';
        volumeBar.value = 0;
        volumeBar.style.background =`linear-gradient(to right, #4caf50 0%, #333 0%)`;
    } else {
        audio.muted = false;
        audio.volume = lastVolume || 0.7;
        let value = audio.volume * 100;
        volumeBar.value = value;
        volumeIcon.className = 'fa-solid fa-volume-high';
        volumeIcon.style.color = 'var(--nav-icon-color)';
        volumeBar.style.background =
            `linear-gradient(to right, #4caf50 ${value}%, #333 ${value}%)`;
    }
});

let recentlyPlayed = [];
const MAX_RECENT = 10;

function updateRecentlyPlayed(songIndex) {
    recentlyPlayed = recentlyPlayed.filter(i => i !== songIndex);
    recentlyPlayed.unshift(songIndex);
    if (recentlyPlayed.length > MAX_RECENT) {
        recentlyPlayed.pop();
    }
    renderRecentlyPlayed();
}

function handleSongClick(index) {

    if (currentSong === index) {
        if (audio.paused) {
            audio.play();
            play.classList.replace('fa-circle-play', 'fa-circle-pause');
        } else {
            audio.pause();
            play.classList.replace('fa-circle-pause', 'fa-circle-play');
        }
    }
    else {
        currentSong = index;
        currentIndex = order.findIndex(s => s.songPath === songs[currentSong - 1].songPath);
        audio.src = order[currentIndex].songPath;
        audio.currentTime = 0;
        audio.play();
        play.classList.replace('fa-circle-play', 'fa-circle-pause');
        updateNowBar();
        updateRecentlyPlayed(currentSong);
    }
    updatePlayIcons();
}


document.addEventListener('click', (e) => {
    const icon = e.target;
    if (icon.classList.contains('playMusic')) {
        const index = Number(icon.dataset.id || icon.id);
        handleSongClick(index);
    }
});

function renderRecentlyPlayed() {
    const recentList = document.getElementById('recentList');
    if (!recentList) return;
    recentList.innerHTML = '';
    recentlyPlayed.forEach(index => {
        const song = songs[index - 1];
        const card = document.createElement('div');
        card.className = 'music-card recent-card';
        card.innerHTML = `
            <img src="${song.songImage}">
            <div class="music-play-btn">
                <i class="playMusic fa-solid fa-circle-play" data-id="${index}"></i>
            </div>
            <div class="img-title">${song.songName}</div>
            <div class="img-description">${song.songDes}</div>`;
        recentList.appendChild(card);
    });

    updatePlayIcons();
}

updateRecentlyPlayed(currentSong);

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

let greeting = document.getElementById('greeting');
let hour = new Date().getHours();

if (hour < 12) {
    greeting.innerText = 'Good morning';
}
else if (hour < 18) {
    greeting.innerText = 'Good afternoon';
}
else {
    greeting.innerText = 'Good evening';
}

let searchInput = document.querySelector('.input-box');

searchInput.addEventListener('input', () => {
    let searchText = searchInput.value.toLowerCase();

    for (let i = 0; i < allMusic.length; i++) {
        let cardText = allMusic[i].innerText.toLowerCase();

        if (cardText.includes(searchText)) {
            allMusic[i].style.display = 'block';
        }
        else {
            allMusic[i].style.display = 'none';
        }
    }
});

function goHome() {
    document.querySelector('.main-right-part').scrollTop = 0;
}

function goSearch() {
    searchInput.focus();
}

function goLibrary() {
    document.getElementById('recentList').scrollIntoView();
}

document.querySelector('.home-icon').addEventListener('click', goHome);
document.getElementById('navHome').addEventListener('click', goHome);
document.getElementById('navSearch').addEventListener('click', goSearch);
document.getElementById('navLibrary').addEventListener('click', goLibrary);


