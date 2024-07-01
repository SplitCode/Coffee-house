// burger-menu_______________________________________________________________

const body = document.body;
const burger = document.querySelector(".burger__menu");
const nav = document.querySelector(".header__nav");
const navItems = document.querySelectorAll(".nav__item");
const unactiveLink = document.querySelector(".unactive__link");

burger.addEventListener("click", () => {
  burger.classList.toggle("cross");
  nav.classList.toggle("open");

  if (nav.classList.contains("open")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
});

body.addEventListener("click", function (e) {
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    burger.classList.remove("cross");
    nav.classList.remove("open");
    body.style.overflow = "auto";
  }
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    burger.classList.remove("cross");
    nav.classList.remove("open");
    body.style.overflow = "auto";
  });
});

// ----------------------------------------------------------------------------

const slider = document.querySelector('.slider__wrapper');
const sliderLine = document.querySelector(".slider__line");
const slides = document.querySelectorAll(".slider__item").length;
const prevButton = document.querySelector(".prev__button");
const nextButton = document.querySelector(".next__button");
const indicators = document.querySelectorAll(".slider__indicator");
const progressBars = document.querySelectorAll(".progress__bar");

let currentIndex = 0;
let intervalId;

let hoverPaused = false;
let holdPaused = false;

const updateIndicators = () => {
  const indicators = document.querySelectorAll(".slider__indicator");
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add("active");
      startProgress(index);
    } else {
      indicator.classList.remove("active");
      progressBars[index].style.width = "0";
    }
  });
};

const startProgress = (index) => {
  clearInterval(intervalId);

  let progress = 0;
  intervalId = setInterval(() => {
    if (!hoverPaused && !holdPaused) {
      progress += 100 / (5000 / 1000);
      progressBars[index].style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(intervalId);
        progressBars[index].style.width = "0";
        nextSlide();
      }
    }
  }, 1000);
};

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % slides;
  sliderLine.style.transform = `translateX(${-currentIndex * 100}%)`;
  updateIndicators();
};

const prevSlide = () => {
  currentIndex = (currentIndex - 1 + slides) % slides;
  sliderLine.style.transform = `translateX(${-currentIndex * 100}%)`;
  updateIndicators();
};

startProgress(0);

prevButton.addEventListener("click", () => {
  clearInterval(intervalId);
  prevSlide();
});

nextButton.addEventListener("click", () => {
  clearInterval(intervalId);
  nextSlide();
});

sliderLine.addEventListener("mouseenter", () => {
  hoverPaused = true;
});

sliderLine.addEventListener("mouseleave", () => {
  hoverPaused = false;
});

sliderLine.addEventListener("mousedown", () => {
  holdPaused = true;
});

sliderLine.addEventListener("mouseup", () => {
  holdPaused = false;
});

slider.addEventListener("touchstart", (e) => {

  touchstartX = e.touches[0].clientX;
  e.preventDefault()
  holdPaused = true;
  });

  slider.addEventListener("touchend", (e) => {
  e.preventDefault()
  const touchendX = e.changedTouches[0].clientX;
  if (touchstartX - touchendX > 50) {
  nextSlide();
  holdPaused = false;
  } else if (touchendX - touchstartX > 50) {
  prevSlide();
  holdPaused = false;
  } else {
    holdPaused = false;
  }
});