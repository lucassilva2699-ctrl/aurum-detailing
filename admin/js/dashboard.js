import "./guard.js";
import { countDocuments, logout } from "./firebase.js";


async function loadDashboard() {

    try {

        const [
            gallery,
            services,
            plans,
            faq,
        ] = await Promise.all([
            countDocuments("gallery"),
            countDocuments("services"),
            countDocuments("plans"),
            countDocuments("faq")
        ]);

        document.getElementById("galleryCount").textContent = gallery;
        document.getElementById("servicesCount").textContent = services;
        document.getElementById("plansCount").textContent = plans;
        document.getElementById("faqCount").textContent = faq;

    } catch (error) {

        console.error("Erro ao carregar dashboard:", error);

    }

}

loadDashboard();
const logoutButton = document.querySelector(".btn-logout");

logoutButton.addEventListener("click", async () => {

    await logout();

    window.location.href = "index.html";

});