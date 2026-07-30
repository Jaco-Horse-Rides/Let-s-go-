/* ========================= */
/* 🔥 NAVBAR SCROLL */
/* ========================= */

window.addEventListener("scroll",()=>{

const navbar =
document.querySelector(".navbar");

if(window.scrollY > 50){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});

/* ========================= */
/* GALLERY SLIDER */
/* ========================= */

document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".gallery-track");
    const cards = document.querySelectorAll(".gallery-card");

    const prev = document.querySelector(".gallery-prev");
    const next = document.querySelector(".gallery-next");

    const dotsContainer = document.querySelector(".gallery-dots");

    if (
        !track ||
        cards.length === 0 ||
        !prev ||
        !next ||
        !dotsContainer
    ) {
        console.log("Gallery not found.");
        return;
    }

    let current = 0;
    let autoSlide;

    /* ========================= */
    /* VISIBLE CARDS */
    /* ========================= */

    function visibleCards() {

        if (window.innerWidth <= 600) return 1;

        if (window.innerWidth <= 1000) return 3;

        return 5;

    }

    /* ========================= */
    /* MAX POSITION */
    /* ========================= */

    function maxPosition() {

        return Math.max(
            0,
            cards.length - visibleCards()
        );

    }

    /* ========================= */
    /* CREATE DOTS */
    /* ========================= */

    function createDots() {

        dotsContainer.innerHTML = "";

        for (let i = 0; i <= maxPosition(); i++) {

            const dot = document.createElement("button");

            dot.classList.add("gallery-dot");

            if (i === current) {

                dot.classList.add("active");

            }

            dot.addEventListener("click", function () {

                current = i;

                updateSlider();

                restartAuto();

            });

            dotsContainer.appendChild(dot);

        }

    }

    /* ========================= */
    /* UPDATE SLIDER */
    /* ========================= */

    function updateSlider() {

        const gap = parseFloat(
            window.getComputedStyle(track).gap
        ) || 0;

        const width =
            cards[0].getBoundingClientRect().width + gap;

        track.style.transform =
            `translateX(-${current * width}px)`;

        document
            .querySelectorAll(".gallery-dot")
            .forEach(function (dot, index) {

                dot.classList.toggle(
                    "active",
                    index === current
                );

            });

    }

    /* ========================= */
    /* NEXT */
    /* ========================= */

    function nextSlide() {

        if (current >= maxPosition()) {

            current = 0;

        } else {

            current++;

        }

        updateSlider();

    }

    /* ========================= */
    /* PREVIOUS */
    /* ========================= */

    function previousSlide() {

        if (current <= 0) {

            current = maxPosition();

        } else {

            current--;

        }

        updateSlider();

    }

    /* ========================= */
    /* AUTOPLAY */
    /* ========================= */

    function startAuto() {

        clearInterval(autoSlide);

        autoSlide = setInterval(

            nextSlide,

            3500

        );

    }

    function restartAuto() {

        startAuto();

    }

    /* ========================= */
    /* BUTTON EVENTS */
    /* ========================= */

    next.addEventListener("click", function () {

        nextSlide();

        restartAuto();

    });

    prev.addEventListener("click", function () {

        previousSlide();

        restartAuto();

    });

    /* ========================= */
    /* PAUSE ON HOVER */
    /* ========================= */

    const slider =
        document.querySelector(".gallery-slider");

    slider.addEventListener("mouseenter", function () {

        clearInterval(autoSlide);

    });

    slider.addEventListener("mouseleave", function () {

        startAuto();

    });

    /* ========================= */
    /* RESPONSIVE */
    /* ========================= */

    window.addEventListener("resize", function () {

        if (current > maxPosition()) {

            current = maxPosition();

        }

        createDots();

        updateSlider();

    });

    /* ========================= */
    /* START */
    /* ========================= */

    createDots();

    updateSlider();

    startAuto();

});

/* ========================= */
/* VIDEO GALLERY SLIDER */
/* ========================= */

document.addEventListener("DOMContentLoaded", () => {

    const videoTrack = document.querySelector(".video-track");
    const videoCards = document.querySelectorAll(".video-card");

    const videoPrev = document.querySelector(".video-prev");
    const videoNext = document.querySelector(".video-next");

    const videoDotsContainer =
        document.querySelector(".video-dots");

    if (
        !videoTrack ||
        videoCards.length === 0 ||
        !videoPrev ||
        !videoNext ||
        !videoDotsContainer
    ) {
        return;
    }

    let currentVideo = 0;
    let videoAutoSlide;

    /* ========================= */
    /* VISIBLE VIDEOS */
    /* ========================= */

    function visibleVideos() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;

    }

    /* ========================= */
    /* MAX POSITION */
    /* ========================= */

    function maxVideoPosition() {

        return Math.max(
            0,
            videoCards.length - visibleVideos()
        );

    }

    /* ========================= */
    /* CREATE DOTS */
    /* ========================= */

    function createVideoDots() {

        videoDotsContainer.innerHTML = "";

        for (let i = 0; i <= maxVideoPosition(); i++) {

            const dot = document.createElement("button");

            dot.className = "video-dot";
            dot.type = "button";

            dot.addEventListener("click", () => {

                currentVideo = i;

                updateVideoSlider();

                restartVideoAuto();

            });

            videoDotsContainer.appendChild(dot);

        }

    }

    /* ========================= */
    /* UPDATE SLIDER */
    /* ========================= */

    function updateVideoSlider() {

        if (currentVideo > maxVideoPosition()) {
            currentVideo = maxVideoPosition();
        }

        const gap =
            window.innerWidth <= 600 ? 0 : 16;

        const cardWidth =
            videoCards[0].offsetWidth + gap;

        videoTrack.style.transform =
            `translateX(-${currentVideo * cardWidth}px)`;

        const dots =
            document.querySelectorAll(".video-dot");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentVideo
            );

        });

    }

    /* ========================= */
    /* NEXT */
    /* ========================= */

    function nextVideoSlide() {

        currentVideo++;

        if (currentVideo > maxVideoPosition()) {
            currentVideo = 0;
        }

        updateVideoSlider();

    }

    /* ========================= */
    /* PREVIOUS */
    /* ========================= */

    function previousVideoSlide() {

        currentVideo--;

        if (currentVideo < 0) {
            currentVideo = maxVideoPosition();
        }

        updateVideoSlider();

    }

    /* ========================= */
    /* AUTOPLAY */
    /* ========================= */

    function startVideoAuto() {

        videoAutoSlide = setInterval(
            nextVideoSlide,
            5000
        );

    }

    function restartVideoAuto() {

        clearInterval(videoAutoSlide);

        startVideoAuto();

    }

    /* ========================= */
    /* BUTTONS */
    /* ========================= */

    videoNext.addEventListener("click", () => {

        nextVideoSlide();

        restartVideoAuto();

    });

    videoPrev.addEventListener("click", () => {

        previousVideoSlide();

        restartVideoAuto();

    });

    /* ========================= */
    /* PAUSE AUTOPLAY */
/* WHILE VIDEO PLAYS */
/* ========================= */

    videoCards.forEach((card) => {

        const video = card.querySelector("video");

        video.addEventListener("play", () => {
            clearInterval(videoAutoSlide);
        });

        video.addEventListener("pause", () => {
            restartVideoAuto();
        });

        video.addEventListener("ended", () => {
            restartVideoAuto();
        });

    });

    /* ========================= */
    /* RESPONSIVE */
/* ========================= */

    window.addEventListener("resize", () => {

        createVideoDots();

        updateVideoSlider();

    });

    /* ========================= */
    /* START */
/* ========================= */

    createVideoDots();

    updateVideoSlider();

    startVideoAuto();

});

/* ========================= */
/* FAQ ACCORDION */
/* ========================= */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const selectedItem = question.closest(".faq-item");

        document.querySelectorAll(".faq-item").forEach((item) => {

            if (item !== selectedItem) {
                item.classList.remove("active");
            }

        });

        selectedItem.classList.toggle("active");

    });

});
