/* ==========================================================================
   GALAXY BAND - CAROUSEL LOGIC (carousel.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Musicians Carousel Arrow Navigation
  const musiciansGrid = document.querySelector('.musicians-grid');
  const musicianPrevBtn = document.getElementById('musicians-prev-btn');
  const musicianNextBtn = document.getElementById('musicians-next-btn');

  if (musiciansGrid && musicianPrevBtn && musicianNextBtn) {
    musicianPrevBtn.addEventListener('click', () => {
      const scrollAmount = musiciansGrid.firstElementChild?.clientWidth ? (musiciansGrid.firstElementChild.clientWidth + 20) : 300;
      musiciansGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    musicianNextBtn.addEventListener('click', () => {
      const scrollAmount = musiciansGrid.firstElementChild?.clientWidth ? (musiciansGrid.firstElementChild.clientWidth + 20) : 300;
      musiciansGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // 2. Showreel Carousel Arrow Navigation (if controls exist)
  const showreelGrid = document.querySelector('.showreel-grid');
  const showreelPrevBtn = document.getElementById('showreel-prev-btn');
  const showreelNextBtn = document.getElementById('showreel-next-btn');

  if (showreelGrid && showreelPrevBtn && showreelNextBtn) {
    showreelPrevBtn.addEventListener('click', () => {
      const scrollAmount = showreelGrid.firstElementChild?.clientWidth ? (showreelGrid.firstElementChild.clientWidth + 20) : 300;
      showreelGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    showreelNextBtn.addEventListener('click', () => {
      const scrollAmount = showreelGrid.firstElementChild?.clientWidth ? (showreelGrid.firstElementChild.clientWidth + 20) : 300;
      showreelGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
});
