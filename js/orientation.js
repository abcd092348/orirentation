document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const revealElements = document.querySelectorAll(".reveal");

  // Mobile navigation menu
  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "CLOSE ✕" : "MENU ☰";
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "MENU ☰";
      });
    });
  }

  // Reveal sections as they enter the viewport
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }

  // Highlight the current navigation section
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              const isCurrent =
                link.getAttribute("href") === "#" + entry.target.id;

              link.classList.toggle("active", isCurrent);
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px"
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }
});
