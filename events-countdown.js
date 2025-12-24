// === Simple Bold Countdown (Unix Time Version) ===

// Toggle countdown manually
const COUNTDOWN_ENABLED = true; // set to false to hide the countdown

// Set your event Unix timestamp here (seconds, not ms)
const eventUnix = 1767184200; 
const eventDate = eventUnix * 1000;

const countdownContainer = document.getElementById("countdown");

function updateCountdown() {
  // Manual override: disable countdown
  if (!COUNTDOWN_ENABLED) {
    countdownContainer.innerHTML = `<p style="text-align:center; margin-top:1em;">You're a bit early — the NYE Stream Event countdown will appear closer to the date.</p>`;
    return;
  }

  const now = Date.now();
  const distance = eventDate - now;

  // If the event is live
  if (distance <= 0) {
    countdownContainer.textContent = "The event is live!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  const d = String(days).padStart(2, "0");
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  countdownContainer.textContent = `${d}d : ${h}h : ${m}m : ${s}s`;
}

// Run immediately once, then every second
updateCountdown();
setInterval(updateCountdown, 1000);
