(function () {
  "use strict";

  // ---------- Mobile nav toggle ----------
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Lightbox ----------
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.getElementById("lightbox-close");
  var galleryButtons = document.querySelectorAll(".gallery-item");
  var lastFocused = null;

  function openLightbox(fullSrc, altText) {
    if (!lightbox || !lightboxImg) return;
    lastFocused = document.activeElement;
    lightboxImg.src = fullSrc;
    lightboxImg.alt = altText || "";
    lightbox.hidden = false;
    lightboxClose.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  }

  galleryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var fullSrc = button.getAttribute("data-full");
      var img = button.querySelector("img");
      var altText = img ? img.getAttribute("alt") : "";
      openLightbox(fullSrc, altText);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // ---------- Quote request form ----------
  var quoteForm = document.getElementById("quote-form");

  if (quoteForm) {
    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var encoded = new URLSearchParams(new FormData(quoteForm)).toString();

      fetch(quoteForm.action, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Form submission failed");
          }
          var message = document.createElement("p");
          message.className = "quote-form-success";
          message.textContent = "Thanks! We'll get back to you soon.";
          quoteForm.replaceWith(message);
        })
        .catch(function () {
          quoteForm.submit();
        });
    });
  }
})();
