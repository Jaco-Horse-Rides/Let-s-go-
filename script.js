/* ========================= */
/* 🔥 NAVBAR SCROLL */
/* ========================= */

window.addEventListener("scroll", () => {

  const navbar =
  document.querySelector(".navbar");

  if(window.scrollY > 50){

    navbar.classList.add("scrolled");

  }else{

    navbar.classList.remove("scrolled");

  }

});

/* ========================= */
/* 🔥 FUTURAS ANIMACIONES */
/* ========================= */

// Aquí iremos agregando:
//
// Slider Tours
// Galería Premium
// Reviews
// FAQ
// Animaciones Scroll
// WhatsApp Floating Button
