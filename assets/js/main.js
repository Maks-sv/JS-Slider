const slides = document.querySelectorAll('.slide');
const pauseButton = document.querySelector('#pause');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

const SLIDES_COUNT = slides.length;
const PAUSE = 'Pause';
const PLAY = 'Play';

let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;

function goToNth(n){
slides[currentSlide].className = 'slide';
currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
slides[currentSlide].className = 'slide active';
}
const goToPrev = () => goToNth(currentSlide - 1);
const goToNext = () => goToNth(currentSlide + 1);

function pause(){
isPlaying = false;
pauseButton.innerHTML = PLAY;
clearInterval(timerID);
}
function play(){
isPlaying = true;
pauseButton.innerHTML = PAUSE;
timerID = setInterval(goToNext,interval); 
  }

const pausePlay = () => isPlaying ? pause() : play(); 

function prev(){
  pause();
  goToPrev();
}

function next(){
  pause();
  goToNext();
}

pauseButton.addEventListener('click', pausePlay);
previousButton.addEventListener('click',prev);
nextButton.addEventListener('click',next);

timerID = setInterval(goToNext,interval);
