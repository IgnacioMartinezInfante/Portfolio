document.querySelectorAll(".project-video").forEach(container => {

  const videoId = container.dataset.video
  let iframeLoaded = false

  function loadVideo() {

    if (iframeLoaded) return

    const iframe = document.createElement("iframe")

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`
    iframe.frameBorder = "0"
    iframe.allow = "autoplay; fullscreen"
    iframe.allowFullscreen = true

    container.innerHTML = ""
    container.appendChild(iframe)

    iframeLoaded = true
  }

  function unloadVideo() {

    if (!iframeLoaded) return

    const img = document.createElement("img")
    img.src = container.dataset.thumbnail

    const play = document.createElement("div")
    play.className = "play-button"
    play.innerHTML = "▶"

    container.innerHTML = ""
    container.appendChild(img)
    container.appendChild(play)

    iframeLoaded = false
  }

  container.dataset.thumbnail = container.querySelector("img").src

  container.addEventListener("mouseenter", loadVideo)
  container.addEventListener("mouseleave", unloadVideo)

  container.addEventListener("click", loadVideo)

})