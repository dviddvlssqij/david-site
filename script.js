/* ============================================================
   ПОЯВЛЕНИЕ БЛОКОВ ПРИ ПРОКРУТКЕ

   IntersectionObserver — встроенный в браузер механизм.
   Он следит, попал ли элемент в видимую часть экрана,
   и не нагружает страницу, в отличие от отслеживания скролла вручную.
   ============================================================ */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // isIntersecting = элемент показался на экране
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Больше за ним не следим: анимация одноразовая
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,              // сработает, когда видно 12% элемента
    rootMargin: '0px 0px -60px 0px' // чуть раньше, чем элемент дойдёт до низа экрана
  }
);

// Вешаем наблюдение на все элементы с классом reveal
const items = document.querySelectorAll('.reveal');

items.forEach((el, i) => {
  // Каскад: каждый следующий элемент появляется на 90мс позже соседа
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  observer.observe(el);
});
