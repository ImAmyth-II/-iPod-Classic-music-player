const nxtBtn = document.querySelector(".mouse-click:nth-child(2)");
const prevBtn = document.querySelector(".mouse-click:nth-child(3)");
const playPauseBtn = document.querySelector(".mouse-click:nth-child(1)");
var count = 0;
var list = 0;
const song = document.querySelector(".song");
const progress = document.querySelector(".progress");
const track = document.querySelector(".albums-container");
const arts = Array.from(track.children);
const title_track = document.querySelector(".title-container");
const titles = Array.from(title_track.children);
const SetArtPosition = (art , index) => {
    art.style.left = 150 *index + 'px';
};

//song metadata
song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}
// play pause function
function playPause(){
    if(count == 0){
        count = 1;
        song.play();
    }
    else{
        count = 0;
        song.pause();
    }
}

//track slider animation
if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime
    },500);
}
// track slider change
progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
}

const sources = [
    "css/Assets/Songs/audio-1.mp3",
    "css/Assets/Songs/audio-2.mp3",
    "css/Assets/Songs/audio-3.mp3",
    "css/Assets/Songs/audio-4.mp3",
    "css/Assets/Songs/audio-5.mp3",
    "css/Assets/Songs/audio-6.mp3",
    "css/Assets/Songs/audio-7.mp3"
]


arts.forEach(SetArtPosition);
//display title
const showTitle =(visibleTitle , hiddenTitle)=>{
visibleTitle.style.display='none';
hiddenTitle.style.display='block'
visibleTitle.classList.remove('visible');
hiddenTitle.classList.add('visible')
}

const moveToArt =(track , currentArt , targetArt)=>{
    track.style.transform = 'translateX(-'+ targetArt.style.left + ')';
    currentArt.classList.remove('current-art');
    targetArt.classList.add('current-art');

}
nxtBtn.addEventListener('click', e => {
    const currentArt = track.querySelector('.current-art');
    const nextArt = currentArt.nextElementSibling;
    moveToArt(track , currentArt , nextArt);
    const visibleTitle =title_track.querySelector('.visible');
    const hiddenTitle = visibleTitle.nextElementSibling;
    showTitle(visibleTitle , hiddenTitle);
    list++;
    document.querySelector(".songSource").src=sources[list];
    console.log(sources[list]);
    song.load();
    song.play();

})
prevBtn.addEventListener('click', e => {
    const currentArt = track.querySelector('.current-art');
    const prevArt = currentArt.previousElementSibling;
    moveToArt(track , currentArt , prevArt);
    const visibleTitle =title_track.querySelector('.visible');
    const hiddenTitle = visibleTitle.previousElementSibling;
    showTitle(visibleTitle , hiddenTitle);
    list--;
    document.querySelector(".songSource").src=sources[list];
    console.log(sources[list]);
    song.load();
    song.play();
})
