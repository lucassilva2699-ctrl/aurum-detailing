import "./guard.js";
import {
    CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_URL
} from "./config.js";
import {
    saveGalleryImage,
    getGalleryImages,
    deleteGalleryImage
} from "./firebase.js";

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("modalOverlay");

// Abrir modal
openModal.addEventListener("click", () => {

    modal.style.display = "flex";

});

// Fechar modal
closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

// Fechar clicando fora do modal
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

    }

    reader.readAsDataURL(file);

});
const cancelModal = document.getElementById("cancelModal");

cancelModal.addEventListener("click", () => {

    modal.style.display = "none";

});

// ======================================
// UPLOAD PARA CLOUDINARY
// ======================================

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
// ======================================
// BOTÃO SALVAR
// ======================================

const saveImage = document.getElementById("saveImage");

saveImage.addEventListener("click", async () => {

    const file = imageInput.files[0];

    if (!file) {

        alert("Selecione uma imagem.");

        return;

    }
    const title = document.getElementById("imageTitle").value.trim();
const description = document.getElementById("imageDescription").value.trim();

if (!title || !description) {

    alert("Preencha todos os campos.");

    return;

}

    try {

        saveImage.disabled = true;

        saveImage.textContent = "Enviando...";

      const result = await uploadToCloudinary(file);
await saveGalleryImage({

    title,
    description,

    imageUrl: result.secure_url,

    publicId: result.public_id

});
await loadGallery();
// Mensagem
alert("Imagem cadastrada com sucesso!");

// Fecha o modal
modal.style.display = "none";

// Limpa formulário
document.getElementById("imageTitle").value = "";
document.getElementById("imageDescription").value = "";

// Limpa seleção da imagem
imageInput.value = "";
previewImage.src = "";
previewContainer.style.display = "none";    

    }

    catch(error){

        console.error(error);

        alert("Erro no upload.");

    }

    finally{

        saveImage.disabled = false;

        saveImage.textContent = "Salvar imagem";

    }

});
// ======================================
// TESTE FIRESTORE
// ======================================

const images = await getGalleryImages();

console.log(images);
// ======================================
// CARREGAR GALERIA
// ======================================

async function loadGallery(){

    const galleryGrid = document.getElementById("galleryGrid");

    const images = await getGalleryImages();

    galleryGrid.innerHTML = "";

    images.forEach(image=>{

       galleryGrid.innerHTML += `

<div class="gallery-card">

    <img src="${image.imageUrl}" alt="${image.title}">

    <div class="gallery-card-content">

        <h3>${image.title}</h3>

        <p>${image.description}</p>

        <div class="gallery-actions">

            <button
                class="btn-delete"
                data-id="${image.id}">

                <i class="fas fa-trash"></i>

                Excluir

            </button>

        </div>

    </div>

</div>

`;
// Liga os botões de excluir

document.querySelectorAll(".btn-delete").forEach(button => {

    button.addEventListener("click", async () => {

        const confirmar = confirm("Deseja realmente excluir esta imagem?");

        if (!confirmar) return;

        await deleteGalleryImage(button.dataset.id);

        await loadGallery();

    });

});

    });

}

loadGallery();