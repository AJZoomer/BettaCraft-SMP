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

// AUTO-SUGGEST FUNCTIONALITY
const input = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("searchSuggestions");

input.addEventListener("input", () => {
  const query = input.value.toLowerCase().trim();

  if (!query) {
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = searchIndex.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.keywords.toLowerCase().includes(query)
  ).slice(0, 5);

  if (matches.length === 0) {
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "none";
    return;
  }

  suggestionsBox.innerHTML = matches
    .map(m => `<div data-url="${m.url}">${m.title} (${m.category})</div>`)
    .join("");

  suggestionsBox.style.display = "block";
});

// Click suggestion → go to page
suggestionsBox.addEventListener("click", (e) => {
  const url = e.target.getAttribute("data-url");
  if (url) window.location.href = url;
});

// Enter key → full search page
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    window.location.href = `search.html?q=${encodeURIComponent(input.value)}`;
  }
});
