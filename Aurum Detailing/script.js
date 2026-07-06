// ==========================================
// AURUM DETAILING
// JavaScript v1.0
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ROLAGEM SUAVE
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const destino = document.querySelector(this.getAttribute("href"));

            if (destino) {

                destino.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});
    // ==========================================
    // HEADER
    // ==========================================

    const header = document.getElementById("header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 80) {

                header.style.background = "rgba(5,5,5,.97)";
                header.style.boxShadow = "0 8px 25px rgba(0,0,0,.45)";

            } else {

                header.style.background = "rgba(5,5,5,.85)";
                header.style.boxShadow = "none";

            }

        });

    }
        // ==========================================
    // MENU MOBILE
    // ==========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".menu-overlay");

    if (menuToggle && menu && overlay) {

        menuToggle.addEventListener("click", () => {

            menu.classList.toggle("active");
            overlay.classList.toggle("active");

            if (menu.classList.contains("active")) {

                menuToggle.innerHTML = '<i class="fas fa-times"></i>';

            } else {

                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

            }

        });

        overlay.addEventListener("click", () => {

            menu.classList.remove("active");
            overlay.classList.remove("active");

            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

        });

    }
        // ==========================================
    // FAQ
    // ==========================================

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        if (question) {

            question.addEventListener("click", () => {

                faqItems.forEach(faq => {

                    if (faq !== item) {

                        faq.classList.remove("active");

                    }

                });

                item.classList.toggle("active");

            });

        }

    });
        // ==========================================
    // BOTÃO VOLTAR AO TOPO
    // ==========================================

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }
        // ==========================================
    // GALERIA SWIPER
    // ==========================================

    const swiperElement = document.querySelector(".aurumSwiper");

    if (swiperElement) {

        new Swiper(".aurumSwiper", {

            loop: true,

            centeredSlides: true,

            slidesPerView: 1,

            spaceBetween: 20,

            autoplay: {

                delay: 4000,

                disableOnInteraction: false,

            },

            pagination: {

                el: ".swiper-pagination",

                clickable: true,

            },

            navigation: {

                nextEl: ".swiper-button-next",

                prevEl: ".swiper-button-prev",

            },

        });

    }
        // ==========================================
    // GLIGHTBOX
    // ==========================================

    const gallery = GLightbox({

        selector: ".glightbox",

        loop: true,

        touchNavigation: true,

        keyboardNavigation: true,

        zoomable: true

    });
    // ==========================================
// SCROLL REVEAL
// ==========================================

const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.9;

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < trigger) {

            item.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();