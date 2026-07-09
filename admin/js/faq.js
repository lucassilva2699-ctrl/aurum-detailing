import "./guard.js";

import {
    saveFaq,
    getFaq,
    deleteFaq
} from "./firebase.js";
// Modal
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const modalOverlay = document.getElementById("modalOverlay");

// Abrir
openModal.addEventListener("click", () => {

    modalOverlay.classList.add("active");

});

// Fechar
closeModal.addEventListener("click", () => {

    modalOverlay.classList.remove("active");

});

// Cancelar
cancelModal.addEventListener("click", () => {

    modalOverlay.classList.remove("active");

});

// Fechar clicando fora
modalOverlay.addEventListener("click", (e) => {

    if (e.target === modalOverlay) {

        modalOverlay.classList.remove("active");

    }

});
// ==========================================
// SALVAR FAQ
// ==========================================

const saveButton = document.getElementById("saveFaq");

saveButton.addEventListener("click", async () => {

    const question = document.getElementById("faqQuestion").value.trim();

    const answer = document.getElementById("faqAnswer").value.trim();

    const order = Number(document.getElementById("faqOrder").value);

    if (!question || !answer) {

        alert("Preencha todos os campos.");

        return;

    }

    await saveFaq({

        question,
        answer,
        order

    });
    modalOverlay.classList.remove("active");

document.getElementById("faqQuestion").value = "";
document.getElementById("faqAnswer").value = "";
document.getElementById("faqOrder").value = 1;

loadFaq();

    alert("Pergunta salva com sucesso!");

});
// ==========================================
// LISTAR FAQ
// ==========================================

async function loadFaq() {

    const faq = await getFaq();

    const grid = document.getElementById("faqGrid");

    grid.innerHTML = "";

    faq.forEach(item => {

        grid.innerHTML += `

        <div class="gallery-card">

            <div class="gallery-card-content">

                <h3>${item.question}</h3>

                <p>${item.answer}</p>

                <small>Ordem: ${item.order}</small>

                <br><br>

                <button
                    class="btn-danger"
                    onclick="removeFaq('${item.id}')">

                    Excluir

                </button>

            </div>

        </div>

        `;

    });

}

loadFaq();
window.removeFaq = async (id) => {

    if (!confirm("Deseja realmente excluir esta pergunta?")) {

        return;

    }

    await deleteFaq(id);

    loadFaq();

};