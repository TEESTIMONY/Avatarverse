document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const leftBtn = document.querySelector('.carousel-arrow.left');
  const rightBtn = document.querySelector('.carousel-arrow.right');
  if (!track || !leftBtn || !rightBtn) return;

  const scrollAmount = 120;
  let autoScrollInterval;

  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  rightBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  function autoScrollCarousel() {
    if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 5) {
      // If at end, scroll back to start
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
  autoScrollInterval = setInterval(autoScrollCarousel, 2500);

  // Pause auto-scroll on hover
  track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  track.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(autoScrollCarousel, 2500);
  });
}); 