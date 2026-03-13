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