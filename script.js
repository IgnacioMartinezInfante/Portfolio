// Fade-in on scroll
const sections = document.querySelectorAll(".fade-section");
const insightCountEl = document.getElementById("insightCount");
const insightPopup = document.getElementById("insightPopup");
const finalMessage = document.getElementById("finalMessage");

let insights = 0;
let triggeredSections = new Set();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      if (!triggeredSections.has(entry.target)) {
        triggeredSections.add(entry.target);
        addInsight();
      }
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => {
  observer.observe(section);
});

function addInsight() {
  insights++;
  insightCountEl.textContent = insights;

  insightPopup.classList.add("show");

  setTimeout(() => {
    insightPopup.classList.remove("show");
  }, 600);

  if (insights === sections.length) {
    setTimeout(() => {
      finalMessage.classList.add("show");
    }, 800);
  }
}

// Progress bar
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.querySelector(".progress-bar").style.width = progress + "%";
});