const eventTimestamp = 1735689600; // Replace with your actual timestamp
const eventDate = eventTimestamp * 1000;

const timer = setInterval(function () {
  const now = Date.now();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s";

  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "The event is live!";
  }
}, 1000);
