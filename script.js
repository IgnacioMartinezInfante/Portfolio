document.querySelectorAll(".project-video").forEach(video => {

  video.addEventListener("click", () => {

    const id = video.dataset.video;

    video.innerHTML = `
      <iframe
      src="https://www.youtube.com/embed/${id}?autoplay=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
      </iframe>
    `;

  });

});