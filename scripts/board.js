// board.js
document.addEventListener("DOMContentLoaded", function() {
    const board = document.querySelector(".board");

    function handleClickBlocked(event) {
        const caseElement = event.target;
        const clickedClass = "clicked";

        if (!caseElement.classList.contains(clickedClass)) {
            caseElement.classList.add(clickedClass);
            localStorage.setItem(caseElement.id, "true");
        }
    }

    const ligneContainer = document.createElement("div");
    ligneContainer.className = "ligne-container";
    board.appendChild(ligneContainer);

    for (let i = 0; i < 80; i++) {
        const ligne = document.createElement("div");
        ligne.className = "ligne";

        for (let j = 0; j < 52; j++) {
            const caseElement = document.createElement("div");
            caseElement.className = "case";
            caseElement.id = `case_${i}_${j}`;
            if (localStorage.getItem(caseElement.id) === "true") {
                caseElement.classList.add("clicked");
            }
            caseElement.addEventListener("click", handleClickBlocked);
            ligne.appendChild(caseElement);
        }

        ligneContainer.appendChild(ligne);
    }
});
