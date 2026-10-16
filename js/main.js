
/* =====================================================
   UET TAXILA ORIENTATION WEBSITE
   Designed by MUHAMMAD HUSSNAIN AKRAM (MH)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    // Close menu after selecting a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });

    // Close menu when returning to desktop layout
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      }
    });
  }

  // Automatically update the footer year
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Smooth scrolling for links to sections on this page
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      }
    });
  });

  // Add a visual effect when cards enter the viewport
  const animatedCards = document.querySelectorAll(
    ".programme-card, .nextgen-card"
  );

  if ("IntersectionObserver" in window && animatedCards.length > 0) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    animatedCards.forEach((card) => observer.observe(card));
  }

  console.log(
    "UET Taxila Orientation Website | Designed by MUHAMMAD HUSSNAIN AKRAM (MH)"
  );
});
