import "./guard.js";
import {
    savePlan,
    getPlans,
    deletePlan
} from "./firebase.js";

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const modal = document.getElementById("modalOverlay");

openModal.addEventListener("click", () => {

    modal.style.display = "flex";

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

cancelModal.addEventListener("click", () => {

    modal.style.display = "none";

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});
// ================================
// SALVAR PLANO
// ================================

const saveButton = document.getElementById("savePlan");

saveButton.addEventListener("click", async () => {
    saveButton.disabled = true;
saveButton.textContent = "Salvando...";

    try {
const title = document.getElementById("planTitle").value.trim();
const price = document.getElementById("planPrice").value.trim();
const benefits = document.getElementById("planBenefits").value.trim();
const order = Number(document.getElementById("planOrder").value);

if (!title || !price || !benefits) {

    alert("Preencha todos os campos.");

    return;

}
        await savePlan({
            
 title,
    price,
    benefits,
    order
            

        });
        
// Limpa os campos somente depois de salvar
document.getElementById("planTitle").value = "";
document.getElementById("planPrice").value = "";
document.getElementById("planBenefits").value = "";
document.getElementById("planOrder").value = 1;

        alert("Plano cadastrado com sucesso!");

        modal.style.display = "none";

        await loadPlans();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }
     finally {

    saveButton.disabled = false;
    saveButton.textContent = "Salvar plano";

}

});
// ================================
// LISTAR PLANOS
// ================================

const plansGrid = document.getElementById("plansGrid");

async function loadPlans() {

    const plans = await getPlans();

    plansGrid.innerHTML = "";

    plans.forEach(plan => {
       const benefits = (plan.benefits || "")
    .split("\n")
    .filter(item => item.trim() !== "")
    .map(item => `<li><i class="fas fa-check"></i> ${item}</li>`)
    .join("");

        plansGrid.innerHTML += `

<div class="gallery-card">

    <div class="gallery-card-content">

        <h3>${plan.title}</h3>

        <h2>${plan.price}</h2>

        <ul class="plan-benefits">

            ${benefits}

        </ul>

        <small>Ordem: ${plan.order}</small>

        <div class="gallery-actions">

            <button
                class="btn-delete"
                data-id="${plan.id}">

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

            if (!confirm("Deseja excluir este plano?")) return;

            await deletePlan(button.dataset.id);

            await loadPlans();

        });

    });

}

loadPlans();