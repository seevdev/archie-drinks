// SITE NAVIGATION

document.querySelector('.nav').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav_link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// ACCORDION

const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) => {
  const header = item.querySelector('.accordion-item--header');

  header.addEventListener('click', function () {
    item.classList.toggle('open');
    const description = item.querySelector('.description');

    const icons = item.querySelectorAll('svg');

    if (item.classList.contains('open')) {
      description.style.height = `${description.scrollHeight}px`;
      description.style.marginBottom = `2.4rem`;
      icons.forEach((svg) => {
        svg.classList.toggle('hidden');
      });
    } else {
      description.style.height = '0px';
      description.style.marginBottom = `0px`;
      icons.forEach((svg) => {
        svg.classList.toggle('hidden');
      });
    }
  });
});

//CAROUSEL

document.addEventListener('click', (e) => {
  let handle;
  if (e.target.matches('.handle')) {
    handle = e.target;
  } else {
    handle = e.target.closest('.handle');
  }
  if (handle != null) {
    onHandleClick(handle);
  }
});

function onHandleClick(handle) {
  const slider = handle.closest('.slider-container').querySelector('.slider');
  let sliderIndex = +slider.style.getPropertyValue('--slider-index');
  const leftHandle = document.querySelector('.left-handle');
  const cards = slider.querySelectorAll('.carousel-card').length + 1;
  let cardsPerPage = 7;

  function leftHandleRemove() {
    if (sliderIndex > 0 && sliderIndex <= Math.trunc(cards / cardsPerPage)) {
      leftHandle.classList.remove('hidden');
    }
    if (sliderIndex === 0) {
      leftHandle.classList.add('hidden');
    }
  }

  if (handle.classList.contains('left-handle')) {
    console.log(sliderIndex);
    if (sliderIndex <= Math.trunc(cards / cardsPerPage) && sliderIndex > 0) {
      slider.style.setProperty('--slider-index', sliderIndex - 1);
      leftHandleRemove();
    }
  }

  if (handle.classList.contains('right-handle')) {
    console.log(leftHandle);
    if (
      sliderIndex > Math.trunc(cards / cardsPerPage) ||
      sliderIndex === Math.trunc(cards / cardsPerPage)
    ) {
      slider.style.setProperty('--slider-index', 0);
      leftHandleRemove();
    } else {
      slider.style.setProperty('--slider-index', sliderIndex + 1);
      console.log(sliderIndex);
      leftHandleRemove();
    }
  }
}
