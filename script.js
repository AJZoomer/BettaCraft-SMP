window.onload = () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');

  console.log("Slides found:", slides.length); // Debug line

  if (slides.length === 0) return;

  setInterval(() => {
    slides[slideIndex].style.display = 'none';
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].style.display = 'block';
  }, 30000);
};

