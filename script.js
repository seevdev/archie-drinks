'use strict';

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
  const headerOrderBtn = document.querySelector('.section-hero--order-btn');
  const orderBtn = document.querySelector('.btn-submit');
  const sideBtn = document.querySelector('.side-form_btn');
  const mainForm = document.querySelector('.contact-form');
  const modal = document.querySelector('.modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const btnSubmitModal = document.querySelector('.btn-submit_modal');
  const btnClose = document.querySelector('.btn-close');

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

      setParams(width);
    });

    function setParams(width) {
      if (width <= 551) {
        cardsPerPage = 1;
        document.documentElement.style.setProperty(
          '--cards-per-page',
          cardsPerPage
        );
      }

      if (width <= 780 && width > 551) {
        console.log('yeaahhhhh 780');
        cardsPerPage = 2;
        document.documentElement.style.setProperty(
          '--cards-per-page',
          cardsPerPage
        );
      }

      if (width <= 1101 && width > 780) {
        cardsPerPage = 3;

        document.documentElement.style.setProperty(
          '--cards-per-page',
          cardsPerPage
        );
        console.log('cardsPerPage:' + cardsPerPage);
      }
      if (width > 1101) {
        cardsPerPage = Math.floor(width / 257);
        document.documentElement.style.setProperty(
          '--cards-per-page',
          cardsPerPage
        );
        console.log('cardsPerPage:' + cardsPerPage);
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

  btnSubmitModal.addEventListener('click', btnSubmitModalHandler);
  sideBtn.addEventListener('click', openModal);
  modalOverlay.addEventListener('click', closeModal);
  btnClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (
      e.target.classList.contains('input') ||
      e.target.classList.contains('modal-form-comment') ||
      e.target.classList.contains('checkbox')
    ) {
      document.querySelector('#modal-form_err').innerHTML = '';
    }
  });

  function openModal() {
    modal.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
  }

  function btnSubmitModalHandler(e) {
    e.preventDefault();

    let firstName = document.querySelector('.form-modal input[name=firstName]');
    let lastName = document.querySelector('.form-modal input[name=lastName]');
    let email = document.querySelector('.form-modal input[name=email]');
    let phone = document.querySelector('.form-modal input[name=phone]');
    let comment = document.querySelector('.form-modal div[name=comment]');
    let agreement = document.querySelector('.form-modal input[name=policies]');

    if (!agreement.checked) {
      agreement.value = 'нет';
    } else {
      agreement.value = 'да';
    }

    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      comment: comment.value,
      agreement: agreement.value,
    };

    sendForm(formData, true).then((success) => {
      if (success) {
        Toastify({
          text: 'Ваша форма успешно отправлена!',
          duration: 3000,
          destination: 'https://github.com/apvarun/toastify-js',
          newWindow: true,
          close: false,
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: '#00F1D4',
            width: '350px',
            height: '75px',
            borderRadius: '8px',
            color: '#060606',
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
          },
          onClick: function () {}, // Callback after click
        }).showToast();

        firstName.value = '';
        lastName.value = '';
        email.value = '';
        phone.value = '';
        comment.innerHTML = '';
        agreement.checked = false;
      }
    });
  }

  // MAIN FORM

  orderBtn.addEventListener('click', orderBtnHandler);
  mainForm.addEventListener('click', function (e) {
    if (
      e.target.classList.contains('input') ||
      e.target.classList.contains('contact-form-comment') ||
      e.target.classList.contains('checkbox')
    ) {
      document.querySelector('#main-form_err').innerHTML = '';
    }
  });

  function orderBtnHandler(e) {
    e.preventDefault();

    let firstName = document.querySelector(
      '.contact-form input[name=firstName]'
    );
    let lastName = document.querySelector('.contact-form input[name=lastName]');
    let email = document.querySelector('.contact-form input[name=email]');
    let phone = document.querySelector('.contact-form input[name=phone]');
    let comment = document.querySelector('.contact-form div[name=comment]');
    let agreement = document.querySelector(
      '.contact-form input[name=policies] '
    );

    if (!agreement.checked) {
      agreement.value = 'нет';
    } else {
      agreement.value = 'да';
    }

    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      comment: comment.value,
      agreement: agreement.value,
    };

    sendForm(formData).then((success) => {
      if (success === true) {
        Toastify({
          text: 'Ваша форма успешно отправлена!',
          duration: 3000,
          destination: 'https://github.com/apvarun/toastify-js',
          newWindow: true,
          close: false,
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: '#00F1D4',
            width: '350px',
            height: '75px',
            borderRadius: '8px',
            color: '#060606',
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
          },
          onClick: function () {}, // Callback after click
        }).showToast();

        firstName.value = '';
        lastName.value = '';
        email.value = '';
        phone.value = '';
        comment.innerHTML = '';
        agreement.checked = false;
      }
    });
  }

  async function sendForm(formData, isModal = false) {
    try {
      const response = await fetch('send_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        isModal
          ? (document.querySelector(
              '#modal-form_err'
            ).innerHTML = `*${data.message}`)
          : (document.querySelector(
              '#main-form_err'
            ).innerHTML = `*${data.message}`);
      }

      if (data.success && isModal) {
        closeModal();
        return true;
      }
      if (data.success) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
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
