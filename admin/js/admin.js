import { login } from "./firebase.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value;

    try {

        await login(email, password);

        window.location.href = "dashboard.html";

    } catch (error) {

        alert("E-mail ou senha inválidos.");

        console.error(error);

    }

});