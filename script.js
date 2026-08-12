const SITE_VERSION = "V26.3.1";

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
// ===============================
// AUTO-SUGGEST FUNCTIONALITY
// ===============================

const input = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("searchSuggestions");

// Build safe suggestion elements
function buildSuggestionElement(item) {
  const div = document.createElement("div");
  div.textContent = `${item.title} (${item.category})`;
  div.setAttribute("data-url", item.url);
  return div;
}

input.addEventListener("input", () => {
  const query = input.value.toLowerCase().trim();

  if (!query) {
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = searchIndex
    .filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.keywords.toLowerCase().includes(query)
    )
    .slice(0, 5);

  if (matches.length === 0) {
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "none";
    return;
  }

  // Clear old suggestions
  suggestionsBox.innerHTML = "";

  // Add safe DOM elements
  matches.forEach(item => {
    const suggestion = buildSuggestionElement(item);
    suggestionsBox.appendChild(suggestion);
  });

  suggestionsBox.style.display = "block";
});

// ===============================
// SAFE CLICK HANDLER
// ===============================
suggestionsBox.addEventListener("click", (e) => {
  const raw = e.target.getAttribute("data-url");
  if (!raw) return;

  try {
    const url = new URL(raw);

    // Internal site links (all under /BettaCraft-SMP/)
    if (url.hostname === "ajzoomer.github.io") {
      // Always redirect exactly to the provided URL
      window.location.href = url.href;
      return;
    }

    // External links (Season 2 / Season 3 downloads)
    if (url.protocol === "https:" || url.protocol === "http:") {
      window.location.href = url.href;
    }
  } catch {
    // Invalid URL — ignore
  }
});

// ===============================
// ENTER KEY → SEARCH PAGE
// ===============================

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    window.location.href = `search.html?q=${encodeURIComponent(input.value)}`;
  }
});

// Version Number Loader
document.addEventListener("DOMContentLoaded", () => {
  const versionElement = document.getElementById("siteVersion");
  if (versionElement) {
    versionElement.textContent = SITE_VERSION;
  }
});
