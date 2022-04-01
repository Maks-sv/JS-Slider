import SwipeCarousel from './swipe-carousel.js';

const carousel = new SwipeCarousel({
  containerID: '#slider',
  slideID:'.item',
  interval: 2000,
  isPlaying:false
});

carousel.init();