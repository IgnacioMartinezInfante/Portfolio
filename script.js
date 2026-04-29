document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // VIDEO (YOUTUBE EMBED)
  // =======================
  document.querySelectorAll(".project-video").forEach(container => {

    container.addEventListener("click", () => {

      const videoId = container.dataset.video;

      const iframe = document.createElement("iframe");

      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.allow = "autoplay; fullscreen";
      iframe.allowFullscreen = true;

      container.innerHTML = "";
      container.appendChild(iframe);

    });

  });

  // =======================
  // LIGHTBOX (SOLO SI EXISTE)
  // =======================
  const lightbox = document.getElementById("lightbox");

  if (lightbox) {

    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxVideo = document.getElementById("lightbox-video");

    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    const mediaElements = document.querySelectorAll(
      ".project-gallery img, .project-gallery video"
    );

    let mediaList = [];
    let currentIndex = 0;

    // construir lista
    mediaElements.forEach((el, index) => {

      if (el.tagName === "IMG") {
        mediaList.push({ type: "img", src: el.src });
      } else {
        mediaList.push({
          type: "video",
          src: el.querySelector("source").src
        });
      }

      el.addEventListener("click", () => {
        currentIndex = index;
        openLightbox();
      });

    });

    function openLightbox() {
      lightbox.style.display = "block";
      showMedia(currentIndex);
    }

    function showMedia(index) {

      let direction = index > currentIndex ? "right" : "left";

      if (index < 0) {
        index = mediaList.length - 1;
        direction = "left";
      }

      if (index >= mediaList.length) {
        index = 0;
        direction = "right";
      }

      const currentElement = mediaList[currentIndex].type === "img"
        ? lightboxImg
        : lightboxVideo;

      // animación salida
      currentElement.classList.remove("slide-in-left", "slide-in-right");
      currentElement.classList.add(
        direction === "right" ? "slide-out-left" : "slide-out-right"
      );

      setTimeout(() => {

        // reset
        lightboxImg.style.display = "none";
        lightboxVideo.style.display = "none";
        lightboxVideo.pause();
        lightboxVideo.src = "";

        currentIndex = index;
        const media = mediaList[currentIndex];

        const nextElement = media.type === "img"
          ? lightboxImg
          : lightboxVideo;

        nextElement.classList.remove("slide-out-left", "slide-out-right");
        nextElement.classList.add(
          direction === "right" ? "slide-in-right" : "slide-in-left"
        );

        if (media.type === "img") {
          lightboxImg.src = media.src;
          lightboxImg.style.display = "block";
        } else {
          lightboxVideo.src = media.src;
          lightboxVideo.style.display = "block";
          lightboxVideo.play();
        }

        setTimeout(() => {
          nextElement.classList.remove("slide-in-left", "slide-in-right");
        }, 50);

      }, 200);
    }

    // cerrar
    if (closeBtn) {
      closeBtn.onclick = () => {
        lightbox.style.display = "none";
        lightboxVideo.pause();
        lightboxVideo.src = "";
      };
    }

    // click afuera
    lightbox.onclick = (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        lightboxVideo.pause();
        lightboxVideo.src = "";
      }
    };

    // teclado
    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display === "block") {

        if (e.key === "Escape") {
          lightbox.style.display = "none";
          lightboxVideo.pause();
          lightboxVideo.src = "";
        }

        if (e.key === "ArrowRight") showMedia(currentIndex + 1);
        if (e.key === "ArrowLeft") showMedia(currentIndex - 1);
      }
    });

    // botones
    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.stopPropagation();
        showMedia(currentIndex - 1);
      };
    }

    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.stopPropagation();
        showMedia(currentIndex + 1);
      };
    }

  }

  // =======================
  // SCROLL ANIMATION
  // =======================
  const elements = document.querySelectorAll("section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  elements.forEach(el => observer.observe(el));

});

// =======================
// NAVBAR ACTIVE LINK
// =======================
let currentPage = window.location.pathname.split("/").pop();

if (currentPage === "") {
  currentPage = "index.html";
}

document.querySelectorAll(".navbar a").forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});