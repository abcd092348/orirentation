const slides = [
  {
    eyebrow: "CHAPTER 01 / THE BEGINNING",
    title: "THE FUTURE<br>IS <span>INTELLIGENT.</span>",
    description:
      "Welcome to a world where technology is more than a tool. It is a way to solve problems, explore possibilities, and create a better future.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85",
    alt: "Humanoid robot representing future technology"
  },
  {
    eyebrow: "CHAPTER 02 / THE POSSIBILITIES",
    title: "IMAGINE.<br>CREATE. <span>INNOVATE.</span>",
    description:
      "From intelligent machines to computer vision and automation, robotics and AI bring ideas into the real world and help us tackle complex challenges.",
    image:
      "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=1200&q=85",
    alt: "Robotics and engineering technology"
  },
  {
    eyebrow: "CHAPTER 03 / YOUR JOURNEY",
    title: "YOUR IDEAS.<br><span>YOUR FUTURE.</span>",
    description:
      "Ask questions, build projects, learn continuously, and work with others. Every great innovation begins with curiosity and a willingness to try.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    alt: "Electronic components used in technology projects"
  }
];

const eyebrow = document.getElementById("introEyebrow");
const title = document.getElementById("introTitle");
const description = document.getElementById("introDescription");
const image = document.getElementById("introImage");
const counter = document.getElementById("slideCounter");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");
const progressLines = document.querySelectorAll(".progress-line");
const audio = document.getElementById("introAudio");
const soundToggle = document.getElementById("soundToggle");

let currentSlide = 0;

function renderSlide() {
  const slide = slides[currentSlide];

  eyebrow.textContent = slide.eyebrow;
  title.innerHTML = slide.title;
  description.textContent = slide.description;

  image.style.opacity = "0";

  window.setTimeout(function () {
    image.src = slide.image;
    image.alt = slide.alt;
    image.style.opacity = "0.85";
  }, 100);

  counter.textContent =
    String(currentSlide + 1).padStart(2, "0") +
    " / " +
    String(slides.length).padStart(2, "0");

  progressLines.forEach(function (line, index) {
    line.classList.toggle("active", index <= currentSlide);
  });

  backButton.disabled = currentSlide === 0;

  nextButton.innerHTML =
    currentSlide === slides.length - 1
      ? "ENTER ORIENTATION ↗"
      : "CONTINUE <span>→</span>";
}

nextButton.addEventListener("click", function () {
  if (currentSlide < slides.length - 1) {
    currentSlide += 1;
    renderSlide();
  } else {
    window.location.href = "orientation.html";
  }
});

backButton.addEventListener("click", function () {
  if (currentSlide > 0) {
    currentSlide -= 1;
    renderSlide();
  }
});

soundToggle.addEventListener("click", async function () {
  if (!audio) return;

  if (audio.paused) {
    try {
      await audio.play();
      soundToggle.textContent = "SOUND: ON";
      soundToggle.setAttribute("aria-pressed", "true");
    } catch (error) {
      soundToggle.textContent = "AUDIO UNAVAILABLE";
    }
  } else {
    audio.pause();
    soundToggle.textContent = "SOUND: OFF";
    soundToggle.setAttribute("aria-pressed", "false");
  }
});

renderSlide();
