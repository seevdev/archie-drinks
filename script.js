// SITE NAVIGATION

document.addEventListener('DOMContentLoaded', function () {
  //SELECTIONS

  const carouselContent = document.querySelectorAll('.carousel-card--content');
  const btnMenu = document.querySelector('.btn-menu');
  const navMobile = document.querySelector('.nav-mobile');
  const btnNavMobile = document.querySelector('.nav-mobile--btn');
  const navMobileList = document.querySelector('.nav-mobile--list');
  const navMobileLinks = document.querySelectorAll('.navlink-mobile');
  const card = document.querySelector('.carousel-card');

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

  //Carousel 2

  const slider = document.querySelector('.slider');
  document.addEventListener('click', (e) => {
    let handle;
    if (e.target.matches('.handle')) {
      handle = e.target;
    } else {
      handle = e.target.closest('.handle');
    }
    if (handle !== null) {
      onHandleClick(handle);
    }
  });

  function onHandleClick(handle) {
    let sliderIndex = +slider.style.getPropertyValue('--slider-index');
    const leftHandle = document.querySelector('.left-handle');
    const cards = slider.querySelectorAll('.carousel-card').length + 1;
    let cardsPerPage = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--cards-per-page');

   let cardWidth = getComputedStyle(card)
   console.log(cardWidth);

    if (handle.classList.contains('left-handle')) {
      //MOVE SLIDER TO THE LEFT

      if (sliderIndex > 0 && sliderIndex <= Math.trunc(cards / cardsPerPage)) {
        slider.style.setProperty('--slider-index', --sliderIndex);
      }
      if (sliderIndex === 0) {
        leftHandle.classList.add('hidden');
      }
    }

    if (handle.classList.contains('right-handle')) {
      //RETURN SLIDER TO THE FIRST ITEM
      console.log(sliderIndex);
      console.log(window.innerWidth);
      if (
        (sliderIndex > 0 && sliderIndex > Math.trunc(cards / cardsPerPage)) ||
        (sliderIndex > 0 && sliderIndex === Math.trunc(cards / cardsPerPage))
      ) {
        slider.style.setProperty('--slider-index', 0);
        leftHandle.classList.add('hidden');
      }

      // MOVE SLIDER TO THE RIGHT

      if (sliderIndex >= 0 && sliderIndex < Math.trunc(cards / cardsPerPage)) {
        slider.style.setProperty('--slider-index', ++sliderIndex);
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
        ``;
        info.classList.remove('hidden');
      });
    }
  }
  window.addEventListener('resize', () => {
    carouselContentToggle(carouselContent);
  });

  //  NAV MOBILE

  //EVENT LISTENERS
  btnNavMobile.addEventListener('click', btnNavMobileHandler);
  btnMenu.addEventListener('click', btnMenuHandler);
  navMobileList.addEventListener('click', navMobileListHandler);

  //OPEN NAV MENU

  function btnMenuHandler() {
    navMobile.style.right = '0';
    document.querySelector('html').style.overflowY = 'hidden';
  }

  //CLOSE NAV MENU

  function btnNavMobileHandler() {
    navMobile.style.right = '-100%';
    document.querySelector('html').style.overflowY = 'scroll';
  }

  //NAV LIST
  function navMobileListHandler(e) {
    e.preventDefault();
    console.log(e.target.classList);

    if (e.target.classList.contains('navlink-mobile')) {
      e.target.style.color = '#00f1d4';

      navMobile.style.right = '-100%';

      const id = e.target.getAttribute('href');

      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
      });
      document.querySelector('html').style.overflowY = 'scroll';

      navMobileLinks.forEach((link) => {
        link.style.color = '#FFF';
      });
    }
  }
});
