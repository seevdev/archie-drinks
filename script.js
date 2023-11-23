// SITE NAVIGATION

document.addEventListener('DOMContentLoaded', function () {
  //SELECTIONS

  const carouselContent = document.querySelectorAll('.carousel-card--content');

  // (() => {
  //   carouselContentToggle(carouselContent);
  // })();

  document.querySelector('.nav-links').addEventListener('click', function (e) {
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
    const slider = document.querySelector('.slider');
    let sliderIndex = +slider.style.getPropertyValue('--slider-index');
    const leftHandle = document.querySelector('.left-handle');
    const cards = slider.querySelectorAll('.carousel-card').length + 1;
    console.log(cards);
    let cardsPerPage = 7;

    // Pages = cards / cardsPerPage

    if (handle.classList.contains('left-handle')) {
      if (sliderIndex > 0 && sliderIndex <= Math.trunc(cards / cardsPerPage)) {
        slider.style.setProperty('--slider-index', --sliderIndex); //looks funny
      }
      if (sliderIndex === 0) {
        leftHandle.classList.add('hidden');
      }
    }

    if (handle.classList.contains('right-handle')) {
      if (
        sliderIndex > Math.trunc(cards / cardsPerPage) ||
        sliderIndex === Math.trunc(cards / cardsPerPage)
      ) {
        slider.style.setProperty('--slider-index', 0);
        leftHandle.classList.add('hidden');
      } else {
        slider.style.setProperty('--slider-index', sliderIndex + 1);
        leftHandle.classList.remove('hidden');
      }
    }
  }

  function errorMessage(error, node) {
    // document.querySelector(`${node.closest('div')}`);
    console.log(node.closest('div span'));

    const form = document.querySelector('.section-contact');
    const errorMessage = document.createElement('span');
    console.log(errorMessage);
    errorMessage.innerHTML = error;
    errorMessage.classList.add('error');
    node.after(errorMessage);
  }

  // CONTACT FORM VALIDATION
  const orderBtn = document.querySelector('.btn-submit');

  function orderBtnHandler() {
    let error = '';
    // FirstName Validation
    const firstName = document.querySelector('[name="firstName"]');
    console.log(firstName.value);

    if (firstName.value.length + 1 < 2 || firstName.value.length + 1 > 15) {
      error = 'Invalid name. Name needs to be at least 2 chars long';
      errorMessage(error, firstName);
    }

    //LastName Validation
    const lastName = document.querySelector('[name="lastName"]');

    if (lastName.value.length + 1 < 2 || lastName.value.length + 1 > 15) {
      error = 'Invalid last name. Name needs to be at least 2 chars long';
      errorMessage(error, lastName);
    }
    //Email Validation
    const email = document.querySelector('[email="email"]');

    if (!email.value.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      error = 'Invalid email.';
      errorMessage(error, email);
    }

    //Phone Validation
    const phone = document.querySelector('[phone]="phone"');
  }
  orderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    orderBtnHandler();
  });

  function carouselContentToggle(content) {
    // add type in TS
    if (window.innerWidth <= 1050) {
      [...content].map((info) => {
        info.classList.add('hidden');
      });
    } else {
      [...content].map((info) => {
        info.classList.remove('hidden');
      });
    }
  }
  window.addEventListener('resize', () => {
    carouselContentToggle(carouselContent);
  });
});
