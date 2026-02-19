const modal = document.getElementById("dealModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".deal-btn").forEach(button => {
    button.addEventListener("click", function() {
        const card = this.closest(".deal-card");
        modalTitle.textContent = card.querySelector("h3").textContent;
        modalDescription.textContent = card.dataset.deal;
        modal.style.display = "flex";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
