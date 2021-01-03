'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const navBarLinks = document.querySelectorAll('.nav__link');
const operationsContainer = document.querySelector(
  '.operations__tab-container'
);
const operationsTabs = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');
const navLinksContainer = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// MENU NAVIGATION

document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (!e.target.classList.contains('nav__link')) {
    return;
  }
  e.preventDefault();
  const targetSection = document.querySelector(
    `${e.target.getAttribute('href')}`
  );
  targetSection.scrollIntoView({ behavior: 'smooth' });
});

// SCROLL FUNCTIONALITY

btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// TAB FUNCTIONALITY

operationsContainer.addEventListener('click', function (e) {
  //Select our new tab and deal w/ cick on span
  let clickedTab = e.target;
  if (
    !e.target.classList.contains('operations__tab') &&
    !e.target.parentElement.classList.contains('operations__tab')
  ) {
    return;
  }

  clickedTab = clickedTab.closest('.operations__tab');

  // Remove active from all tabs
  operationsTabs.forEach(tab =>
    tab.classList.remove('operations__tab--active')
  );

  //Activate our new tab
  clickedTab.classList.add('operations__tab--active');

  // Update tab content
  const tabNumber = clickedTab.getAttribute('data-tab');
  operationsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  const selectedContent = document.querySelector(
    `.operations__content--${tabNumber}`
  );
  selectedContent.classList.add('operations__content--active');
});

// MENU FADE ANIIMATION

navLinksContainer.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(sibling => {
      if (sibling !== link) sibling.style.opacity = 0.5;
    });
    const logo = link.closest('nav').querySelector('img');
    logo.style.opacity = 0.5;
  }
});

navLinksContainer.addEventListener('mouseout', function () {
  navBarLinks.forEach(link => {
    link.style.opacity = 1;
  });
  document.querySelector('.nav').querySelector('img').style.opacity = 1;
});

// STICKY NAV

const navHeight = nav.getBoundingClientRect().height;

const headerObsOptions = {
  root: null,
  threshold: 0,
  // Root margin moves the observer intersection up and down
  rootMargin: `-${navHeight}px`,
};

// Need the entry object to get the isIntersecting property for event logic
const headerObsCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(
  headerObsCallback,
  headerObsOptions
);
headerObserver.observe(header);

// SLIDE IN SECTIONS

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // Remove intersection observe - better for performance
  observer.unobserve(entry.target);
};

const sectionRevealObj = {
  root: null,
  threshold: 0.1,
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  sectionRevealObj
);

const sections = document.querySelectorAll('.section');

sections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES

const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.getAttribute('data-src');

  // Wait until image loads to remove blur filter
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
};

const lazyLoadObj = {
  root: null,
  threshold: 0.5,
  rootMargin: '-200px',
};

const lazyObserver = new IntersectionObserver(lazyLoading, lazyLoadObj);
lazyImages.forEach(image => {
  lazyObserver.observe(image);
});

// ----- SLIDER COMPONENT -----

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlides = slides.length;

const createDots = function () {
  slides.forEach((slide, index) => {
    const newDot = document.createElement('button');
    newDot.className = 'dots__dot';
    newDot.dataset.slide = index;
    dotContainer.appendChild(newDot);
  });
};

createDots();
const selectorDots = document.querySelectorAll('.dots__dot');
selectorDots[0].classList.add('dots__dot--active');

const goToSlide = function (curSlide) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
  });
};

const activateDot = function (slide) {
  selectorDots.forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  selectorDots[slide].classList.add('dots__dot--active');
};

const checkEndRight = function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
};

const checkEndLeft = function () {
  if (curSlide === 0) {
    curSlide = maxSlides - 1;
  } else {
    curSlide--;
  }
};

// Initialise
goToSlide(0);

//Event Listeners

// Move slides left
btnLeft.addEventListener('click', function (e) {
  checkEndLeft();

  goToSlide(curSlide);
  activateDot(curSlide);
});

// Moves slides right
btnRight.addEventListener('click', function (e) {
  checkEndRight();

  goToSlide(curSlide);
  activateDot(curSlide);
});

// Keyboard Events
window.addEventListener('keydown', e => {
  if (e.key !== 'ArrowRight') return;
  checkEndRight();
  goToSlide(curSlide);
  activateDot(curSlide);
});

window.addEventListener('keydown', e => {
  if (e.key !== 'ArrowLeft') return;
  checkEndLeft();
  goToSlide(curSlide);
  activateDot(curSlide);
});

// Selector Dot Functionality
dotContainer.addEventListener('click', e => {
  if (!e.target.classList.contains('dots__dot')) return;
  const targetSlide = e.target.dataset.slide;
  goToSlide(targetSlide);
  curSlide = e.target.dataset.slide;
  activateDot(curSlide);
});

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// navBarLinks.forEach((link, index) => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const target = document.querySelector(`${this.getAttribute('href')}`);
//     target.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Use DRY principles and event delegation to add the event listener to the parent element of the nav links

// ----- LEARNING MATERIALS -----

// // Working out viewport height and width:
// document.documentElement.clientHeight;
// document.documentElement.clientWidth;

// btnScrollTo.addEventListener('click', e => {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   // // Scrolling --> x and y as parameters
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   // the top property is measured from the top of the current viewport, therefore to get the whole section in view we need to add this to how far we've scrolled down the page

//   // Smooth Scrolling --> pass in object with left, top and behavior properties to window.scrollTo
//   // Old school way
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   // Newer way --> much easier
//   // Only on modern browsers
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// const randomInt = (max, min) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomColor = () => {
//   return `rgb(${randomInt(255, 0)},${randomInt(255, 0)},${randomInt(255, 0)})`;
// };

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   e.stopPropogation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// Intersection Observer API
// Observe changes to the way a target element intersects the viewport or another element

// entries = array of threshold values
// const obsCallback = function (entries, observer) {
//   nav.classList.toggle('sticky');
// };

// const obsOptions = {
//   //Element that the target is intersecting - null = the viewport
//   root: null,
//   // threshold = perentage of intersection at which the clabback will be called
//   threshold: [0],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(header);

// DOM Lifecycle events

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// Complete page loaded
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// // Created immediately before user exits page
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
