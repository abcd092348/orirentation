
/* =====================================================
   UET TAXILA — INTRODUCTION PAGE
   File: js/intro.js
   Designed by MUHAMMAD HUSSNAIN AKRAM (MH)
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ---------- ELEMENTS ----------

  const introImage = document.getElementById("introImage");
  const introEyebrow = document.getElementById("introEyebrow");
  const introTitle = document.getElementById("introTitle");
  const introDescription = document.getElementById("introDescription");

  const backButton = document.getElementById("backButton");
  const nextButton = document.getElementById("nextButton");

  const slideCounter = document.getElementById("slideCounter");
  const progressLines = document.querySelectorAll(".progress-line");

  const soundToggle = document.getElementById("soundToggle");
  const introAudio = document.getElementById("introAudio");

  // ---------- INTRODUCTION SLIDES ----------

  const slides = [
    {
      eyebrow: "CHAPTER 01 / THE BEGINNING",
      title: 'THE FUTURE<br>IS <span>INTELLIGENT.</span>',
      description:
        "Welcome to a world where technology is more than a tool. It is a way to solve problems, explore possibilities, and create a better future.",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85",
      imageAlt: "Robot representing future technology"
    },
    {
      eyebrow: "CHAPTER 02 / THE INNOVATION",
      title: 'THINK <span>BEYOND.</span><br>BUILD THE FUTURE.',
      description:
        "Robotics and Artificial Intelligence bring ideas to life through intelligent machines, programming, automation, and creative problem-solving.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
      imageAlt: "Electronic technology and circuit board"
    },
    {
      eyebrow: "CHAPTER 03 / YOUR JOURNEY",
      title: 'YOUR JOURNEY<br><span>STARTS HERE.</span>',
      description:
        "Begin your academic journey at UET Taxila, develop practical skills, explore new ideas, and prepare to contribute to the technologies of tomorrow.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/38/UET_Taxila_Gate000.jpg",
      imageAlt: "Entrance gate of UET Taxila"
    }
  ];

  // ---------- STATE ----------

  let currentSlide = 0;
  let isTransitioning = false;

  // ---------- HELPER: UPDATE BUTTONS ----------

  function updateControls() {
    if (backButton) {
      backButton.disabled = currentSlide === 0;
    }

    if (nextButton) {
      if (currentSlide === slides.length - 1) {
        nextButton.innerHTML = 'START ORIENTATION <span aria-hidden="true">→</span>';
      } else {
        nextButton.innerHTML = 'CONTINUE <span aria-hidden="true">→</span>';
      }
    }
  }

  // ---------- HELPER: UPDATE PROGRESS ----------

  function updateProgress() {
    progressLines.forEach(function (line, index) {
      line.classList.toggle("active", index === currentSlide);
      line.classList.toggle("completed", index < currentSlide);
    });

    if (slideCounter) {
      slideCounter.textContent =
        String(currentSlide + 1).padStart(2, "0") +
        " / " +
        String(slides.length).padStart(2, "0");
    }
  }

  // ---------- SHOW SLIDE ----------

  function showSlide(index) {
    if (isTransitioning) return;

    if (index < 0 || index >= slides.length) return;

    currentSlide = index;

    const slide = slides[currentSlide];

    if (introEyebrow) {
      introEyebrow.textContent = slide.eyebrow;
    }

    if (introTitle) {
      introTitle.innerHTML = slide.title;
    }

    if (introDescription) {
      introDescription.textContent = slide.description;
    }

    if (introImage) {
      introImage.alt = slide.imageAlt;

      // Fade out before changing the image.
      introImage.style.opacity = "0";

      const newImage = new Image();

      newImage.onload = function () {
        introImage.src = slide.image;
        introImage.style.opacity = "1";
      };

      newImage.onerror = function () {
        introImage.style.opacity = "1";
      };

      newImage.src = slide.image;

      // If the browser already has the image cached.
      if (newImage.complete && newImage.naturalWidth > 0) {
        introImage.src = slide.image;
        introImage.style.opacity = "1";
      }
    }

    updateControls();
    updateProgress();
  }

  // ---------- NEXT BUTTON ----------

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
      } else {
        window.location.href = "orientation.html";
      }
    });
  }

  // ---------- BACK BUTTON ----------

  if (backButton) {
    backButton.addEventListener("click", function () {
      if (currentSlide > 0) {
        showSlide(currentSlide - 1);
      }
    });
  }

  // ---------- KEYBOARD NAVIGATION ----------

  document.addEventListener("keydown", function (event) {
    const tagName = event.target.tagName;

    if (
      tagName === "INPUT" ||
      tagName === "TEXTAREA" ||
      tagName === "SELECT"
    ) {
      return;
    }

    if (event.key === "ArrowRight") {
      if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
      }
    }

    if (event.key === "ArrowLeft") {
      if (currentSlide > 0) {
        showSlide(currentSlide - 1);
      }
    }
  });

  // ---------- SOUND ON / OFF ----------

  function updateSoundButton(isOn) {
    if (!soundToggle) return;

    soundToggle.textContent = isOn ? "SOUND: ON" : "SOUND: OFF";
    soundToggle.setAttribute("aria-pressed", String(isOn));
  }

  if (introAudio) {
    introAudio.addEventListener("ended", function () {
      if (!introAudio.loop) {
        updateSoundButton(false);
      }
    });

    introAudio.addEventListener("error", function () {
      updateSoundButton(false);
    });
  }

  if (soundToggle && introAudio) {
    soundToggle.addEventListener("click", async function () {
      if (introAudio.paused) {
        try {
          await introAudio.play();
          updateSoundButton(true);
        } catch (error) {
          updateSoundButton(false);
          console.warn(
            "Audio could not play. Check assets/sound.mp3.",
            error
          );
        }
      } else {
        introAudio.pause();
        updateSoundButton(false);
      }
    });
  }

  // ---------- INITIALIZE ----------

  if (introImage) {
    introImage.style.transition = "opacity 0.3s ease";
  }

  showSlide(0);
  updateSoundButton(false);
});
