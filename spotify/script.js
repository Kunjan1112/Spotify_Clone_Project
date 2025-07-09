console.log("Welcome to Spotify");

// Initialize
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songInfo = document.getElementById("currentSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

// Song list
let songs = [
    { songName: "Salam-e-Ishq", filePath: "songs/1.mp3", coverPath: "cover/1.png" },
    { songName: "Sulthan Kgf", filePath: "songs/2.mp3", coverPath: "cover/kgf.png" },
    { songName: "Pushpa The King", filePath: "songs/3.mp3", coverPath: "cover/pushpa.png" },
    { songName: "Siya Ram", filePath: "songs/4.mp3", coverPath: "cover/siya ram.png" },
    { songName: "Sapphire", filePath: "songs/5.mp3", coverPath: "cover/sapphire.png" },
    { songName: "Fighter", filePath: "songs/6.mp3", coverPath: "cover/fighter.png" },
    { songName: "Bhula Diya", filePath: "songs/7.mp3", coverPath: "cover/mujebhuladiya.png" }
];

// Dynamically update UI
songItems.forEach((element, i) => {
    if (songs[i]) {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    }
});

// Handle Play/Pause main button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updatePlayButton(true);
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        updatePlayButton(false);
        gif.style.opacity = 0;
    }
});

// Update Seek Bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek control
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all to play
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Update Master & Song Item Buttons
const updatePlayButton = (isPlaying) => {
    if (isPlaying) {
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    } else {
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
    }
};

// Song Item Click Events
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener("click", (e) => {
        let clickedIndex = parseInt(e.target.id);
        songIndex = clickedIndex;

        makeAllPlays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        updatePlayButton(true);
        gif.style.opacity = 1;

        // Update song title in footer
        if (songInfo) {
            songInfo.innerText = songs[songIndex].songName;
        }
    });
});
 