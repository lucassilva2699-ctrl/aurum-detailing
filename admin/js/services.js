import "./guard.js";
import {
    saveService,
    getServices,
    deleteService
} from "./firebase.js";

import {
    CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_URL
} from "./config.js";

// ================================
// ELEMENTOS
// ================================

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const modal = document.getElementById("modalOverlay");

// Abrir modal
openModal.addEventListener("click", () => {

    modal.style.display = "flex";

});

// Fechar modal
closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

// Cancelar
cancelModal.addEventListener("click", () => {

    modal.style.display = "none";

});

// Fechar clicando fora
modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});
// ================================
// PREVIEW DA IMAGEM
// ================================

const imageInput = document.getElementById("imageInput");
const selectImage = document.getElementById("selectImage");
const previewContainer = document.querySelector(".preview-container");
const previewImage = document.getElementById("previewImage");

// Abre o seletor de arquivos
selectImage.addEventListener("click", () => {

    imageInput.click();

});

// Mostra o preview
imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        previewImage.src = e.target.result;

        previewContainer.style.display = "block";

    };

    reader.readAsDataURL(file);

});
// ================================
// UPLOAD PARA CLOUDINARY
// ================================

async function uploadToCloudinary(file) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {

        method: "POST",
        body: formData

    });

    if (!response.ok) {

        throw new Error("Erro ao enviar imagem.");

    }

    return await response.json();

}
// ================================
// SALVAR SERVIÇO
// ================================

const saveButton = document.getElementById("saveService");

saveButton.addEventListener("click", async () => {

    const file = imageInput.files[0];

    if (!file) {

        alert("Selecione uma imagem.");

        return;

    }

    try {

        saveButton.disabled = true;

        saveButton.textContent = "Salvando...";

        const result = await uploadToCloudinary(file);

        await saveService({

            title: document.getElementById("serviceTitle").value,

            description: document.getElementById("serviceDescription").value,

            order: Number(document.getElementById("serviceOrder").value),

            imageUrl: result.secure_url,

            publicId: result.public_id

        });
        // Limpa formulário
document.getElementById("serviceTitle").value = "";
document.getElementById("serviceDescription").value = "";
document.getElementById("serviceOrder").value = 1;

// Limpa imagem
imageInput.value = "";
previewImage.src = "";
previewContainer.style.display = "none";

// Fecha o modal
modal.style.display = "none";

// Mensagem de sucesso

     alert("Serviço cadastrado com sucesso!");

modal.style.display = "none";

await loadServices();

    } catch (error) {

        console.error(error);

        alert(error.message);

    } finally {

        saveButton.disabled = false;

        saveButton.textContent = "Salvar serviço";

    }

});
// ================================
// LISTAR SERVIÇOS
// ================================

const servicesGrid = document.getElementById("servicesGrid");
async function loadServices() {

    const services = await getServices();

    servicesGrid.innerHTML = "";

    services.forEach(service => {

        servicesGrid.innerHTML += `

        <div class="gallery-card">

            <img src="${service.imageUrl}" alt="${service.title}">

            <div class="gallery-card-content">

                <h3>${service.title}</h3>

                <p>${service.description}</p>

                <small>Ordem: ${service.order}</small>

                <div class="gallery-actions">

                    <button
                        class="btn-delete"
                        data-id="${service.id}">

                        <i class="fas fa-trash"></i>

                        Excluir

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    document.querySelectorAll(".btn-delete").forEach(button => {

        button.addEventListener("click", async () => {

            const confirmar = confirm("Deseja excluir este serviço?");

            if (!confirmar) return;

            await deleteService(button.dataset.id);

            await loadServices();

        });

    });

}

loadServices();