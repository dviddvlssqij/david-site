/* ============================================================
   ЖИВОЕ ФОТО — поведение

   Делает три вещи:
   1. Видео играет только когда блок виден. Экономит батарею и трафик.
   2. Параллакс: картинка чуть смещается за курсором.
   3. Если система просит меньше движения — всё замирает.
   ============================================================ */

(function () {
  // Системная настройка «уменьшить движение»
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Видео играет только в зоне видимости --------------- */
  const videos = document.querySelectorAll('.live--video video.live__media');

  if (videos.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const v = entry.target;
        if (entry.isIntersecting && !reduced) {
          // play() возвращает промис: браузер может отказать в автозапуске
          v.play().catch(() => { /* не страшно: останется poster */ });
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });

    videos.forEach((v) => io.observe(v));
  }

  /* --- 2. Параллакс от курсора ------------------------------- */
  if (reduced) return;

  document.querySelectorAll('.live--parallax').forEach((box) => {
    box.addEventListener('mousemove', (e) => {
      const r = box.getBoundingClientRect();
      // Переводим позицию курсора в диапазон от -0.5 до +0.5
      const px = (e.clientX - r.left) / r.width  - 0.5;
      const py = (e.clientY - r.top)  / r.height - 0.5;
      // Знак минус — картинка уезжает от курсора, так глубина читается лучше
      box.style.setProperty('--px', (-px).toFixed(3));
      box.style.setProperty('--py', (-py).toFixed(3));
    });

    // Курсор ушёл — картинка плавно возвращается на место
    box.addEventListener('mouseleave', () => {
      box.style.setProperty('--px', 0);
      box.style.setProperty('--py', 0);
    });
  });
})();
