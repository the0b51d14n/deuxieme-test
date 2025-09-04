const menuToggle = document.getElementById('menu-toggle');
const lien = document.getElementById('lien');

menuToggle.addEventListener('click', () => {
    lien.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
    const audioElements = document.querySelectorAll("audio");
    const videoWrappers = document.querySelectorAll(".video-wrapper");
    const nowPlaying = document.getElementById("now-playing");
    const nowPlayingTitle = document.getElementById("now-playing-title");

    const resetAllMedia = (exclude = null) => {
        audioElements.forEach(audio => {
            if (audio !== exclude) { audio.pause(); audio.currentTime = 0; }
        });
        videoWrappers.forEach(wrapper => {
            if (wrapper !== exclude) {
                const iframe = wrapper.querySelector("iframe");
                if (iframe) iframe.src = iframe.src;
                wrapper.classList.remove("playing");
            }
        });
    };

    audioElements.forEach(audio => {
        audio.addEventListener("play", () => {
            resetAllMedia(audio);
            nowPlaying.classList.add("show");
            nowPlayingTitle.textContent = audio.previousElementSibling.textContent || "Lecture en cours";
        });
        const hideNowPlayingIfNonePlaying = () => {
            const anyPlayingAudio = Array.from(audioElements).some(el => !el.paused);
            const anyPlayingVideo = Array.from(videoWrappers).some(wrapper => wrapper.classList.contains("playing"));
            if (!anyPlayingAudio && !anyPlayingVideo) nowPlaying.classList.remove("show");
        };
        audio.addEventListener("pause", hideNowPlayingIfNonePlaying);
        audio.addEventListener("ended", () => { audio.currentTime = 0; hideNowPlayingIfNonePlaying(); });
    });

    videoWrappers.forEach(wrapper => {
        const poster = wrapper.querySelector('.video-poster');
        poster.addEventListener('click', () => {
            resetAllMedia(wrapper);
            wrapper.classList.add('playing');
            nowPlaying.classList.add('show');
            nowPlayingTitle.textContent = wrapper.closest('.media-card').querySelector('.preview-title').textContent;
        });
    });
});