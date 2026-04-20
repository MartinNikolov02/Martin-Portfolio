// main.js — Martin Nikolov Portfolio

// Auto-update footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

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


// ── 🐕 FIXED DOG (stays inside screen nicely) ──
let dogActive = false;
let dogInterval;

function toggleDog(btn) {
  const dog = document.getElementById('walkingDog');
  dogActive = !dogActive;

  if (dogActive) {
    btn.style.background = "#ffb347";

    dog.style.display = "block";   // ✅ show dog

    moveDog();
    dogInterval = setInterval(moveDog, 900);
  } else {
    btn.style.background = "";

    clearInterval(dogInterval);

    dog.style.display = "none";   // ✅ hide dog
  }
}

function moveDog() {
  const dog = document.getElementById('walkingDog');
  const tiles = document.querySelectorAll('.tile');
  const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
  const rect = randomTile.getBoundingClientRect();

  const dogSize = 50; // approx size of emoji

  let x = rect.left + rect.width / 2;
  let y = rect.top + rect.height / 2;

  // ✅ Clamp properly to viewport INCLUDING dog size
  x = Math.max(dogSize, Math.min(window.innerWidth - dogSize, x));
  y = Math.max(dogSize, Math.min(window.innerHeight - dogSize, y));

  dog.style.transition = "all 0.35s ease";
  dog.style.left = x + "px";
  dog.style.top = y + "px";

  dog.style.transform = "translate(-50%, -50%) scale(1.15)";
  setTimeout(() => {
    dog.style.transform = "translate(-50%, -50%) scale(1)";
  }, 180);
}


// ── 🎉 Confetti ──
function popConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colours = ['#f0e040', '#3cffc8', '#b36fff', '#ff3c3c', '#3c9fff', '#ff6eb4', '#ffb347'];
  const pieces = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: 6 + Math.random() * 8,
    h: 10 + Math.random() * 10,
    colour: colours[Math.floor(Math.random() * colours.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: 2 + Math.random() * 4,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.15,
    opacity: 1,
  }));

  let frame;
  let elapsed = 0;
  const duration = 3000;
  let last = performance.now();

  function draw(now) {
    elapsed += now - last;
    last = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fade = Math.max(0, 1 - elapsed / duration);

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.angle += p.spin;

      ctx.save();
      ctx.globalAlpha = fade;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.colour;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < duration + 1000) {
      frame = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(frame);
    }
  }

  cancelAnimationFrame(frame);
  elapsed = 0;
  last = performance.now();
  frame = requestAnimationFrame(draw);
}