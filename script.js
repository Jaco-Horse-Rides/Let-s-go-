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
/* 🔥 FUTURAS FUNCIONES */
/* ========================= */

// Tours
// Gallery
// Reviews
// FAQ
// Contact

/* ========================= */
/* CARRUSEL DE GALERÍA */
/* ========================= */

/* ========================= */
/* GALLERY SLIDER */
/* ========================= */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".gallery-track");
    const slides = document.querySelectorAll(".gallery-card");

    const prev = document.querySelector(".gallery-prev");
    const next = document.querySelector(".gallery-next");

    const dotsContainer = document.querySelector(".gallery-dots");

    if (!track || slides.length === 0) return;

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
            slides.length - visibleCards()
        );

    }

    /* ========================= */
    /* CREATE DOTS */
    /* ========================= */

    function createDots() {

        dotsContainer.innerHTML = "";

        for (let i = 0; i <= maxPosition(); i++) {

            const dot = document.createElement("button");

            dot.className = "gallery-dot";

            dot.addEventListener("click", () => {

                current = i;

                updateSlider();

                restartAuto();

            });

            dotsContainer.appendChild(dot);

        }

    }

    /* ========================= */
    /* UPDATE */
    /* ========================= */

    function updateSlider() {

        if (current > maxPosition()) {

            current = maxPosition();

        }

        const gap = 10;

        const width = slides[0].offsetWidth + gap;

        track.style.transform =
            `translateX(-${current * width}px)`;

        const dots =
            document.querySelectorAll(".gallery-dot");

        dots.forEach((dot, index) => {

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

        current++;

        if (current > maxPosition()) {

            current = 0;

        }

        updateSlider();

    }

    /* ========================= */
    /* PREVIOUS */
    /* ========================= */

    function previousSlide() {

        current--;

        if (current < 0) {

            current = maxPosition();

        }

        updateSlider();

    }

    /* ========================= */
    /* AUTO PLAY */
    /* ========================= */

    function startAuto() {

        autoSlide = setInterval(

            nextSlide,

            3500

        );

    }

    function restartAuto() {

        clearInterval(autoSlide);

        startAuto();

    }

    /* ========================= */
    /* BUTTONS */
    /* ========================= */

    next.addEventListener("click", () => {

        nextSlide();

        restartAuto();

    });

    prev.addEventListener("click", () => {

        previousSlide();

        restartAuto();

    });

    /* ========================= */
    /* RESPONSIVE */
    /* ========================= */

    window.addEventListener("resize", () => {

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
