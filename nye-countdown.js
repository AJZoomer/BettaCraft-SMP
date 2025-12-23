// === Flip Clock Countdown (Unix Time Version) ===

// Toggle countdown manually
const COUNTDOWN_ENABLED = true; // set to false to disable

// Set your event Unix timestamp here (seconds, not ms)
const eventUnix = 1767184200; 
const eventDate = eventUnix * 1000;

const countdownContainer = document.getElementById("countdown");

// Create a flip unit element (FIXED VERSION)
function createFlipUnit(initialValue) {
  const unit = document.createElement("div");
  unit.className = "flip-unit";

  const upper = document.createElement("div");
  upper.className = "upper";
  upper.textContent = initialValue;

  const lower = document.createElement("div");
  lower.className = "lower";
  lower.textContent = initialValue;

  const flip = document.createElement("div");
  flip.className = "flip-animation";
  flip.setAttribute("data-digit", initialValue); // UPDATED

  unit.appendChild(upper);
  unit.appendChild(lower);
  unit.appendChild(flip);

  return unit;
}

// Update a flip unit when the digit changes
function updateFlipUnit(unit, newValue) {
  const upper = unit.querySelector(".upper");
  const lower = unit.querySelector(".lower");
  const flip = unit.querySelector(".flip-animation");

  if (upper.textContent === newValue) return; // No change → no animation

  // OLD: flip.textContent = upper.textContent;
  flip.setAttribute("data-digit", upper.textContent); // UPDATED

  upper.textContent = newValue;         // Set new value on top
  lower.textContent = newValue;         // Set new value on bottom

  flip.classList.remove("flip-animate");
  void flip.offsetWidth; // Force reflow so animation restarts
  flip.classList.add("flip-animate");
}

// Build the full flip clock structure
function buildClockStructure() {
  countdownContainer.innerHTML = "";

  const labels = ["d", "h", "m", "s"];
  const units = {};

  labels.forEach(label => {
    const wrapper = document.createElement("span");

    units[label] = {
      tens: createFlipUnit("0"),
      ones: createFlipUnit("0")
    };

    wrapper.appendChild(units[label].tens);
    wrapper.appendChild(units[label].ones);

    const lbl = document.createElement("span");
    lbl.className = "time-label";
    lbl.textContent = label;

    wrapper.appendChild(lbl);
    countdownContainer.appendChild(wrapper);
  });

  return units;
}

const flipUnits = buildClockStructure();

// Update the countdown every second
setInterval(() => {

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

  const values = {
    d: String(days).padStart(2, "0"),
    h: String(hours).padStart(2, "0"),
    m: String(minutes).padStart(2, "0"),
    s: String(seconds).padStart(2, "0")
  };

  Object.keys(values).forEach(label => {
    const tens = values[label][0];
    const ones = values[label][1];

    updateFlipUnit(flipUnits[label].tens, tens);
    updateFlipUnit(flipUnits[label].ones, ones);
  });

}, 1000);

