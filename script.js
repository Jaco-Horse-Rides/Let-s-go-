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

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".gallery-track");
    const slides = document.querySelectorAll(".gallery-slide");
    const previousButton = document.querySelector(".gallery-arrow-left");
    const nextButton = document.querySelector(".gallery-arrow-right");
    const dotsContainer = document.querySelector(".gallery-dots");

    if (
        !track ||
        slides.length === 0 ||
        !previousButton ||
        !nextButton ||
        !dotsContainer
    ) {
        return;
    }

    let currentIndex = 0;
    let automaticMovement;

    /* ========================= */
    /* CANTIDAD DE FOTOS VISIBLES */
    /* ========================= */

    function getVisibleSlides() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 3;
        }

        return 5;
    }

    /* ========================= */
    /* ÚLTIMA POSICIÓN POSIBLE */
    /* ========================= */

    function getMaximumIndex() {

        return Math.max(
            0,
            slides.length - getVisibleSlides()
        );

    }

    /* ========================= */
    /* CREAR PUNTOS */
    /* ========================= */

    function createDots() {

        dotsContainer.innerHTML = "";

        const totalPositions = getMaximumIndex() + 1;

        for (let index = 0; index < totalPositions; index++) {

            const dot = document.createElement("button");

            dot.classList.add("gallery-dot");

            dot.type = "button";

            dot.setAttribute(
                "aria-label",
                `Go to gallery position ${index + 1}`
            );

            dot.addEventListener("click", () => {

                currentIndex = index;

                updateGallery();

                restartAutomaticMovement();

            });

            dotsContainer.appendChild(dot);

        }

    }

    /* ========================= */
    /* ACTUALIZAR CARRUSEL */
    /* ========================= */

    function updateGallery() {

        const maximumIndex = getMaximumIndex();

        if (currentIndex > maximumIndex) {
            currentIndex = maximumIndex;
        }

        const firstSlide = slides[0];

        const trackStyles = window.getComputedStyle(track);

        const gap = parseFloat(trackStyles.gap) || 0;

        const movement =
            currentIndex * (firstSlide.offsetWidth + gap);

        track.style.transform =
            `translateX(-${movement}px)`;

        const dots =
            dotsContainer.querySelectorAll(".gallery-dot");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }

    /* ========================= */
    /* FOTO ANTERIOR */
    /* ========================= */

    function showPreviousPhotos() {

        const maximumIndex = getMaximumIndex();

        currentIndex =
            currentIndex <= 0
                ? maximumIndex
                : currentIndex - 1;

        updateGallery();

    }

    /* ========================= */
    /* SIGUIENTES FOTOS */
    /* ========================= */

    function showNextPhotos() {

        const maximumIndex = getMaximumIndex();

        currentIndex =
            currentIndex >= maximumIndex
                ? 0
                : currentIndex + 1;

        updateGallery();

    }

    /* ========================= */
    /* MOVIMIENTO AUTOMÁTICO */
    /* ========================= */

    function startAutomaticMovement() {

        automaticMovement = window.setInterval(
            showNextPhotos,
            3500
        );

    }

    function restartAutomaticMovement() {

        window.clearInterval(automaticMovement);

        startAutomaticMovement();

    }

    /* ========================= */
    /* EVENTOS */
    /* ========================= */

    previousButton.addEventListener("click", () => {

        showPreviousPhotos();

        restartAutomaticMovement();

    });

    nextButton.addEventListener("click", () => {

        showNextPhotos();

        restartAutomaticMovement();

    });

    window.addEventListener("resize", () => {

        createDots();

        updateGallery();

    });

    /* ========================= */
    /* INICIAR CARRUSEL */
    /* ========================= */

    createDots();

    updateGallery();

    startAutomaticMovement();

});
