export function accordion() {
    
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