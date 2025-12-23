let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

setInterval(() => {
  slides[slideIndex].style.display = 'none';
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].style.display = 'block';
}, 30000); // 30 seconds
