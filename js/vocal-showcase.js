/* ==========================================================================
   GALAXY BAND - ARTIST STAGE DECK & BENTO LOGIC (vocal-showcase.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Artist Stage Deck Interactive Cards
  const artistCards = document.querySelectorAll('.artist-deck-card');

  artistCards.forEach(card => {
    card.addEventListener('click', () => {
      artistCards.forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');

      const artistName = card.getAttribute('data-name');
      const sampleSong = card.getAttribute('data-sample-song');

      // Update Hero Mini Player with the selected artist's track
      const playerTitle = document.querySelector('.player-title');
      if (playerTitle && sampleSong) {
        playerTitle.textContent = `${artistName} — ${sampleSong}`;
      }
    });
  });

  // 2. Bento Filter Chips Interactive Filter
  const filterChips = document.querySelectorAll('.bento-filter-chip');
  const bentoTiles = document.querySelectorAll('.bento-tile');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterCategory = chip.getAttribute('data-filter');

      bentoTiles.forEach(tile => {
        const tileCategory = tile.getAttribute('data-category');
        if (filterCategory === 'all' || tileCategory === filterCategory) {
          tile.style.opacity = '1';
          tile.style.transform = 'scale(1)';
        } else {
          tile.style.opacity = '0.4';
          tile.style.transform = 'scale(0.98)';
        }
      });
    });
  });
});
