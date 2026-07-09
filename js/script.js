// ==========================================
// AURUM DETAILING
// JavaScript v1.0
// ==========================================
import {
    getPlans,
    getServices,
    getGallery,
    getFaq,
    
} from "./firebase.js";
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

    
        // ==========================================
    // GLIGHTBOX
    // ==========================================


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
// ==========================================
// CARREGAR PLANOS
// ==========================================

async function loadPlans() {

    const plans = await getPlans();
    console.log("Planos carregados:", plans);

    const container = document.getElementById("plansContainer");

    if (!container) return;

    container.innerHTML = "";

    plans.forEach(plan => {

        const benefits = (plan.benefits || "")
            .split("\n")
            .filter(item => item.trim() !== "")
            .map(item => `<li>${item}</li>`)
            .join("");

        container.innerHTML += `
        
        <div class="${plan.order === 2 ? "price-card destaque" : "price-card"}">
        ${plan.order === 2
    ? `<div class="badge">MAIS ESCOLHIDO</div>`
    : ""}

            <h3>${plan.title}</h3>

            <div class="plan-price">

                <span>A partir de</span>

                <h2>${plan.price}</h2>

            </div>

            <ul>

                ${benefits}

            </ul>

            <a
                href="https://wa.me/5511932762194?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20um%20orçamento."
                target="_blank"
                rel="noopener noreferrer">

                Agendar

            </a>

        </div>

        `;

    });

}

loadPlans();
// ==========================================
// CARREGAR SERVIÇOS
// ==========================================

async function loadServices() {

    const services = await getServices();

    const container = document.getElementById("servicesContainer");

    if (!container) return;

    container.innerHTML = "";

    services.forEach(service => {

        container.innerHTML += `

        <div class="card">

            <img
                src="${service.imageUrl}"
                class="service-image"
                alt="${service.title}"
                loading="lazy"
                decoding="async">

            <h3>${service.title}</h3>

            <p>${service.description}</p>

        </div>

        `;

    });

}

loadServices();
// ==========================================
// CARREGAR GALERIA
// ==========================================

async function loadGallery() {

    const images = await getGallery();

    const container = document.getElementById("galleryContainer");

    if (!container) return;

    container.innerHTML = "";

    images.forEach(image => {

        container.innerHTML += `

        <div class="swiper-slide">

            <a
                href="${image.imageUrl}"
                class="glightbox"
                data-gallery="aurum">

                <img
                    src="${image.imageUrl}"
                    alt="${image.title}">

            </a>

        </div>

        `;

    });

    new Swiper(".aurumSwiper", {

        loop: images.length > 2,

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

        }

    });

    GLightbox({

        selector: ".glightbox",

        loop: true,

        touchNavigation: true,

        keyboardNavigation: true,

        zoomable: true

    });

}
loadGallery();
// ==========================================
// CARREGAR FAQ
// ==========================================

async function loadFaq() {

    const faq = await getFaq();

    const container = document.getElementById("faqContainer");

    if (!container) return;

    container.innerHTML = "";

    faq.forEach(item => {

        container.innerHTML += `

        <div class="faq-item">

            <button class="faq-question">

                ${item.question}

                <span>+</span>

            </button>

            <div class="faq-answer">

                <p>${item.answer}</p>

            </div>

        </div>

        `;

    });

    // Reativa o comportamento de abrir/fechar
    document.querySelectorAll(".faq-item").forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            document.querySelectorAll(".faq-item").forEach(f => {

                if (f !== item) f.classList.remove("active");

            });

            item.classList.toggle("active");

        });

    });

}

loadFaq();