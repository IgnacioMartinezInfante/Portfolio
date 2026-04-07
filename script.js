document.addEventListener("DOMContentLoaded", () => {

  // VIDEO
  document.querySelectorAll(".project-video").forEach(container => {

    container.addEventListener("click", () => {

      const videoId = container.dataset.video

      const iframe = document.createElement("iframe")

      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
      iframe.allow = "autoplay; fullscreen"
      iframe.allowFullscreen = true

      container.innerHTML = ""
      container.appendChild(iframe)

    })

  })

  // LIGHTBOX
  const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

const images = document.querySelectorAll(".project-gallery img");
let currentIndex = 0;

// abrir imagen
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

// función para mostrar imagen
function showImage(index) {
  let direction = index > currentIndex ? "right" : "left";

  if (index < 0) {
    index = images.length - 1;
    direction = "left";
  }

  if (index >= images.length) {
    index = 0;
    direction = "right";
  }

  // salida
  lightboxImg.classList.remove("slide-in-left", "slide-in-right");
  lightboxImg.classList.add(
    direction === "right" ? "slide-out-left" : "slide-out-right"
  );

  setTimeout(() => {
    currentIndex = index;

    // preparar entrada
    lightboxImg.classList.remove("slide-out-left", "slide-out-right");
    lightboxImg.classList.add(
      direction === "right" ? "slide-in-right" : "slide-in-left"
    );

    lightboxImg.src = images[currentIndex].src;

    // animar entrada
    setTimeout(() => {
      lightboxImg.classList.remove("slide-in-left", "slide-in-right");
    }, 50);

  }, 200);
}

// cerrar
if (closeBtn) {
  closeBtn.onclick = () => {
    lightbox.style.display = "none";
  };
}

// click afuera
if (lightbox) {
  lightbox.onclick = (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  };
}

// teclado
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "block") {
    if (e.key === "Escape") lightbox.style.display = "none";
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  }
});

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

if (prevBtn) {
  prevBtn.onclick = (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  };
}

if (nextBtn) {
  nextBtn.onclick = (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  };
}

});