function Carousel(containerID = '#carousel',slideID = '.slide'){

  this.container = document.querySelector(containerID);
  this.slides =this.container.querySelectorAll(slideID);
  
}
Carousel.prototype = {
_initProps(){
  this.currentSlide = 0;
  this.isPlaying = true;
  this.interval = 2000;
  
  this.SLIDES_COUNT = this.slides.length;
  this.CODE_LEFT_ARROW = "ArrowLeft";
  this.CODE_RIGHT_ARROW = "ArrowRight";
  this.CODE_SPACE = "Space";
  this.FA_PAUSE = '<i class="fa fa-pause-circle"></i>';
  this.FA_PLAY = '<i class="fa fa-play-circle"></i>';
  
},
_initIndicators () {
const indicators = document.createElement('div');
indicators.setAttribute('class','indicators');

for(let i = 0; i < this.SLIDES_COUNT; i++){
 const indicator = document.createElement('div');
 indicator.setAttribute('class','indicator');
 indicator.dataset.slideTo = `${i}`;
 i === 0 && indicator.classList.add('active');
 indicators.append(indicator)
}
this.container.append(indicators);

  this.indContainer = this.container.querySelector('.indicators');
  this.indicators = this.indContainer.querySelectorAll('.indicator');
},

_initControls(){
  const controls = document.createElement('div');
  const PAUSE = '<span id="pause-btn" class="control control-pause"><i class="fa fa-pause-circle"></i></span>';
  const PREV = '<span id="prev-btn" class="control control-prev"><i class="fa fa-angle-left"></i></span>';
  const NEXT = ' <span id="next-btn" class="control control-next"><i class="fa fa-angle-right"></i></span>';

  controls.setAttribute('class', 'controls');
  controls.innerHTML = PAUSE+PREV+NEXT;

  this.container.append(controls);
  
  this.pauseBtn = this.container.querySelector('#pause-btn');
  this.previousBtn = this.container.querySelector('#prev-btn');
  this.nextBtn = this.container.querySelector('#next-btn');
},

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.previousBtn.addEventListener('click',this.prev.bind(this));
    this.nextBtn.addEventListener('click',this.next.bind(this));      
    this.indContainer.addEventListener('click',this._indicate.bind(this));
    document.addEventListener('keydown',this._pressKey.bind(this));
   },

 _goToNth(n) {
  this.slides[this.currentSlide].classList.toggle('active');
  this.indicators[this.currentSlide].classList.toggle('active');
  this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
  this.slides[this.currentSlide].classList.toggle('active');
  this.indicators[this.currentSlide].classList.toggle('active');
    },

  _goToPrev() {
    this._goToNth(this.currentSlide - 1);
   },

  _goToNext() {
    this._goToNth(this.currentSlide + 1);
   },

 _pause() {
    this.isPlaying = false;
    this.pauseBtn.innerHTML = this.FA_PLAY;
    clearInterval(this.timerID);
    },

 _play() {
    this.isPlaying = true;
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this._tick();
  },      

 _indicate(e) {
   const target = e.target;
  if(target.classList.contains('indicator')){
    this._pause();
          
    this._goToNth(+target.dataset.slideTo);
  }
 },

 _pressKey(e) {
      if(e.code === this.CODE_LEFT_ARROW)this.prev();
      if(e.code === this.CODE_RIGHT_ARROW)this.next();
      if(e.code === this.CODE_SPACE) this.pausePlay();
 },

_tick (){
  this.timerID = setInterval(this._goToNext.bind(this),this.interval);
},
 pausePlay() {
  this.isPlaying ? this._pause() : this._play();
 },

  prev() {
    this._pause();
    this._goToPrev();
 },

 next () {
  this._pause();
  this._goToNext();
 },

 init() {
   this._initProps();
  this._initControls();
  this._initIndicators();
  this._initListeners();
  this._tick();
 }
};
Carousel.prototype.construct = Carousel;