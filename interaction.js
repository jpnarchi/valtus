// Carrusel tipo reel: autoplay, arrastre con mouse/touch y pausa al interactuar.
const rail = document.querySelector('.product-viewport');
const oldGoTo = goTo;
let dragging = false;
let dragStart = 0;
let dragDelta = 0;
let autoplay;

goTo = (index) => {
  oldGoTo(index);
  document.querySelectorAll('.product-card').forEach((card, i) => card.classList.toggle('active', i === active));
};

const stopAutoplay = () => clearInterval(autoplay);
const startAutoplay = () => {
  stopAutoplay();
  autoplay = setInterval(() => goTo(active + 1), 4800);
};

rail.addEventListener('pointerdown', (event) => {
  dragging = true;
  dragStart = event.clientX;
  dragDelta = 0;
  rail.setPointerCapture(event.pointerId);
  stopAutoplay();
});
rail.addEventListener('pointermove', (event) => {
  if (dragging) dragDelta = event.clientX - dragStart;
});
rail.addEventListener('pointerup', () => {
  if (!dragging) return;
  dragging = false;
  if (Math.abs(dragDelta) > 45) goTo(active + (dragDelta < 0 ? 1 : -1));
  startAutoplay();
});
rail.addEventListener('pointercancel', () => { dragging = false; startAutoplay(); });
rail.addEventListener('mouseenter', stopAutoplay);
rail.addEventListener('mouseleave', startAutoplay);
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') goTo(active + 1);
  if (event.key === 'ArrowLeft') goTo(active - 1);
});

goTo(active);
startAutoplay();
