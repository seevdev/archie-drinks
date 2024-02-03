document.documentElement.style.setProperty(
  '--cards-per-page',
  Math.floor(window.innerWidth / 257)
);

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
  const cardsAll = document.querySelectorAll('.carousel-card');
  const headerOrderBtn = document.querySelector('.section-hero--order-btn');
  const orderBtn = document.querySelector('.btn-submit');
  const sideBtn = document.querySelector('.side-form_btn');
  const orderBtnMobile = document.querySelector('.btn-submit--mobile');
  const form = document.querySelector('.section-contact');
  const modal = document.querySelector('.modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const btnSubmitModal = document.querySelector('.btn-submit_modal');

  document.querySelector('.nav-links').addEventListener('click', scrollHandler);

  headerOrderBtn.addEventListener('click', scrollHandler);

  function scrollHandler(e) {
    e.preventDefault();
    if (e.target.classList.contains('nav_link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  // ACCORDION

  function accordion() {
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
  }

  accordion();

  //SLIDER//

  function slider() {
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

    let cardsPerPage = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--cards-per-page');

    window.addEventListener('resize', () => {
      let width = window.innerWidth;
      console.log(width);
      setParams(width);
    });

    function setParams(width) {
      if (width < 551) {
        cardsPerPage = 1;
        document.documentElement.style.setProperty(
          '--cards-per-page',
          cardsPerPage
        );
      }

      //***** THE PROBLEM IS HERE*****//

      if (width < 780) {
        console.log('yeaahhhhh 780');
        console.log(cardsPerPage);
        cardsPerPage = 2;
        document.documentElement.style.setProperty(
          '--cards-per-page',
          cardsPerPage
        );
      }
      // ________________________________________//

      if (width < 1101) {
        cardsPerPage = 3;
        document.documentElement.style.setProperty(
          '--cards-per-page',
          cardsPerPage
        );
      } else {
        cardsPerPage = Math.floor(width / 257);
        document.documentElement.style.setProperty(
          '--cards-per-page',
          cardsPerPage
        );
      }
    }

    function onHandleClick(handle) {
      let sliderIndex = +slider.style.getPropertyValue('--slider-index');
      const leftHandle = document.querySelector('.left-handle');
      const cards = slider.querySelectorAll('.carousel-card').length;
      console.log(cards);

      if (handle.classList.contains('left-handle')) {
        //MOVE SLIDER TO THE LEFT//

        if (
          sliderIndex > 0 &&
          sliderIndex <= Math.floor(cards / cardsPerPage)
        ) {
          sliderIndex = sliderIndex - 1;
          slider.style.setProperty('--slider-index', sliderIndex);
        }
        if (sliderIndex === 0) {
          leftHandle.classList.add('hidden');
        }
      }

      if (handle.classList.contains('right-handle')) {
        //RETURN SLIDER TO THE FIRST ITEM

        if (
          (sliderIndex > 0 &&
            sliderIndex >= Math.trunc(cards / cardsPerPage)) ||
          (sliderIndex > 0 && sliderIndex === Math.trunc(cards / cardsPerPage))
        ) {
          slider.style.setProperty('--slider-index', 0);
          leftHandle.classList.add('hidden');
        }

        // MOVE SLIDER TO THE RIGHT//

        if (
          sliderIndex >= 0 &&
          sliderIndex < Math.floor(cards / cardsPerPage)
        ) {
          sliderIndex = sliderIndex + 1;
          slider.style.setProperty('--slider-index', sliderIndex);
          leftHandle.classList.remove('hidden');
        }
      }
    }
  }
  slider();

  // MODAL FORM

  sideBtn.addEventListener('click', openModal);
  modalOverlay.addEventListener('click', closeModal);
  btnSubmitModal.addEventListener('click', btnSubmitModalHandler);

  function openModal() {
    modal.classList.remove('hidden');
  }
  function closeModal() {
    modal.classList.add('hidden');
  }
  function btnSubmitModalHandler() {
    orderBtnHandler();
    closeModal();
  }

  // CONTACT FORM VALIDATION

  orderBtn.addEventListener('click', orderBtnHandler);

  function orderBtnHandler(e) {
    //Empty the fields
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    phone.value = '';
  }

  //  NAV MOBILE

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
