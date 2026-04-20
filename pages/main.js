// main.js — Martin Nikolov Portfolio

// Auto-update footer year — works on index (#year) and inner pages (.js-year)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Tile entrance animation — stagger tiles on load
document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach((tile, i) => {
    tile.style.opacity = '0';
    tile.style.transform = 'translateY(20px)';
    tile.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s, border-color 0.15s, box-shadow 0.15s`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        tile.style.opacity = '1';
        tile.style.transform = 'translateY(0)';
      }, 50);
    });
  });
});
