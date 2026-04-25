const musicData = {
    "BTS": [
        { title: "Body to Body", file: "Body to Body - BTS (New Album).mp3", img: "images/bts.jpg", time: "2:40", vibe: "hype" },
        { title: "Hooligan", file: "BTS Hooligan MV Behind the Scenes.mp3", img: "images/bts.jpg", time: "3:41", vibe: "focus" },
        { title: "SWIM", file: "swim.mp3", img: "images/bts.jpg", time: "2:50", vibe: "chill" },
        { title: "Please", file: "Please - BTS (New album music ).mp3", img: "images/bts.jpg", time: "2:25", vibe: "chill" },
        { title: "They Don't Know 'Bout Us", file: "they don't know 'bout us.mp3", img: "images/bts.jpg", time: "2:58", vibe: "hype" }
    ],
    "Justin Bieber": [
        { title: "Anyone", file: "Justin Bieber - Anyone.mp3", img: "images/justin bieber.jpg", time: "3:10", vibe: "chill" },
        { title: "DAISIES", file: "Justin Bieber - DAISIES (Lyrics).mp3", img: "images/justin bieber.jpg", time: "2:45", vibe: "hype" },
        { title: "One Less Lonely Girl", file: "Justin Bieber - One Less Lonely Girl.mp3", img: "images/justin bieber.jpg", time: "3:48", vibe: "hype" },
        { title: "One Time", file: "one time.mp3", img: "images/justin bieber.jpg", time: "3:35", vibe: "hype" },
        { title: "YUKON", file: "yukon.mp3", img: "images/justin bieber.jpg", time: "4:12", vibe: "focus" }
    ],
    "The Weeknd": [
        { title: "After Hours", file: "The Weeknd - After Hours (Audio).mp3", img: "images/the weekend.jpg", time: "6:02", vibe: "chill" },
        { title: "Die For You", file: "The Weeknd - Die For You.mp3", img: "images/the weekend.jpg", time: "3:52", vibe: "chill" },
        { title: "Is There Someone Else?", file: "The Weeknd - Is There Someone Else_.mp3", img: "images/the weekend.jpg", time: "3:19", vibe: "chill" },
        { title: "Reminder", file: "The Weeknd - Reminder (Official Video).mp3", img: "images/the weekend.jpg", time: "3:51", vibe: "hype" },
        { title: "Save Your Tears", file: "The Weeknd - Save Your Tears (Official Music Video).mp3", img: "images/the weekend.jpg", time: "3:35", vibe: "hype" }
    ],
    "Blackpink": [
        { title: "Shut Down", file: "BLACKPINK - Shut Down MV.mp3", img: "images/blackpink.jpg", time: "3:00", vibe: "hype" },
        { title: "STAY", file: "BLACKPINK - 'STAY' MV.mp3", img: "images/blackpink.jpg", time: "3:50", vibe: "chill" },
        { title: "Tally", file: "BLACKPINK - Tally (Official Audio).mp3", img: "images/blackpink.jpg", time: "3:04", vibe: "focus" },
        { title: "Typa Girl", file: "BLACKPINK - Typa Girl (Official Audio).mp3", img: "images/blackpink.jpg", time: "2:59", vibe: "hype" },
        { title: "JUMP", file: "jump.mp3", img: "images/blackpink.jpg", time: "2:56", vibe: "hype" }
    ],
    "Lany": [
        { title: "13", file: "LANY - 13 (Official Audio).mp3", img: "images/lany.jpg", time: "3:54", vibe: "chill" },
        { title: "ILYSB", file: "LANY - ILYSB (Official Lyric Video).mp3", img: "images/lany.jpg", time: "3:31", vibe: "chill" },
        { title: "Pink Skies", file: "LANY - pink skies (Official Audio).mp3", img: "images/lany.jpg", time: "3:12", vibe: "chill" },
        { title: "Thick And Thin", file: "LANY - Thick And Thin (lyric video).mp3", img: "images/lany.jpg", time: "3:33", vibe: "focus" },
        { title: "XXL", file: "LANY - XXL (Official Lyric Video).mp3", img: "images/lany.jpg", time: "3:19", vibe: "hype" }
    ]
};

const audio = document.getElementById('main-audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const songListContainer = document.getElementById('song-list-container');
const listTitle = document.getElementById('list-title');
const volumeSlider = document.getElementById('volume-slider');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const allCards = Array.from(document.querySelectorAll('.album-card'));
const vibeBtns = document.querySelectorAll('.vibe-btn');

let isPlaying = false;
let currentSongIndex = 0;
let currentArtistName = "BTS";
const positionClasses = ['back-left', 'mid-left', 'center-focus', 'mid-right', 'back-right'];

// Volume logic
volumeSlider.addEventListener('input', (e) => { audio.volume = e.target.value; });

// Progress Bar logic
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.innerText = formatTime(audio.currentTime);
        durationTimeEl.innerText = formatTime(audio.duration);
    }
});

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Vibe filtering
vibeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const vibe = btn.getAttribute('data-vibe');
        listTitle.innerText = btn.querySelector('.title').innerText;
        songListContainer.innerHTML = "";
        let foundSongs = [];

        for (const artist in musicData) {
            musicData[artist].forEach((song, index) => {
                if (song.vibe === vibe) {
                    foundSongs.push({ ...song, artist, index });
                }
            });
        }

        foundSongs.forEach(song => {
            const div = document.createElement('div');
            div.classList.add('song-item');
            div.innerHTML = `
                <img src="${song.img}" class="mini-cover">
                <div class="song-info"><span class="title">${song.title}</span><span class="artist">${song.artist}</span></div>
                <span class="duration">${song.time}</span>
            `;
            div.addEventListener('click', () => {
                currentArtistName = song.artist;
                currentSongIndex = song.index;
                playSong(song.title, song.artist, song.file);
            });
            songListContainer.appendChild(div);
        });
    });
});

function renderList(songs, artistName) {
    songListContainer.innerHTML = "";
    songs.forEach((song, index) => {
        const div = document.createElement('div');
        div.classList.add('song-item');
        div.innerHTML = `
            <img src="${song.img}" class="mini-cover">
            <div class="song-info"><span class="title">${song.title}</span><span class="artist">${artistName}</span></div>
            <span class="duration">${song.time}</span>
        `;
        div.addEventListener('click', () => {
            currentSongIndex = index;
            currentArtistName = artistName;
            playSong(song.title, artistName, song.file);
        });
        songListContainer.appendChild(div);
    });
}

function playSong(title, artist, file) {
    currentTitle.innerText = title;
    currentArtist.innerText = artist;
    audio.src = `music/${file}`;
    audio.play();
    isPlaying = true;
    playPauseBtn.classList.replace('fa-play', 'fa-pause');
}

function playNextSong() {
    currentSongIndex++;
    const songs = musicData[currentArtistName];
    if (currentSongIndex >= songs.length) currentSongIndex = 0;
    const nextSong = songs[currentSongIndex];
    playSong(nextSong.title, currentArtistName, nextSong.file);
}

audio.addEventListener('ended', playNextSong);

playPauseBtn.addEventListener('click', () => {
    if (!audio.src) return;
    isPlaying ? audio.pause() : audio.play();
    playPauseBtn.classList.toggle('fa-pause');
    playPauseBtn.classList.toggle('fa-play');
    isPlaying = !isPlaying;
});

document.getElementById('next-btn').addEventListener('click', playNextSong);
document.getElementById('prev-btn').addEventListener('click', () => {
    currentSongIndex--;
    const songs = musicData[currentArtistName];
    if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
    const prevSong = songs[currentSongIndex];
    playSong(prevSong.title, currentArtistName, prevSong.file);
});

allCards.forEach(card => {
    card.addEventListener('click', () => {
        const selectedArtist = card.getAttribute('data-artist');
        listTitle.innerText = `Songs by ${selectedArtist}`;
        renderList(musicData[selectedArtist], selectedArtist);
        
        const clickedIndex = allCards.indexOf(card);
        const centerIndex = Math.floor(allCards.length / 2);
        const shiftBy = centerIndex - clickedIndex;

        allCards.forEach((c, idx) => {
            positionClasses.forEach(cls => c.classList.remove(cls));
            let newIndex = (idx + shiftBy) % allCards.length;
            if (newIndex < 0) newIndex += allCards.length;
            c.classList.add(positionClasses[newIndex]);
            if (positionClasses[newIndex] === 'center-focus') c.classList.add('active');
        });
    });
});

document.getElementById('browse-btn').addEventListener('click', () => {
    document.getElementById('search-container').classList.toggle('search-hidden');
});

renderList(musicData["BTS"], "BTS");

