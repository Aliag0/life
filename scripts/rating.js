// rating.js
document.addEventListener("DOMContentLoaded", function() {
    const buttonRow = document.getElementById("button-row");

    function handleClick(event) {
        const caseElement = event.target;
        const clickedClass = "clicked";

        if (!caseElement.classList.contains(clickedClass)) {
            caseElement.classList.add(clickedClass);
            localStorage.setItem(caseElement.id, "true");
        } else {
            caseElement.classList.remove(clickedClass);
            localStorage.setItem(caseElement.id, "false");
        }
    }

    for (let i = 0; i < 1; i++) {
        const ligne = document.createElement("div");
        ligne.className = "ligne";

        for (let j = 0; j < 10; j++) {
            const caseElement = document.createElement("div");
            caseElement.className = "rating-button";
            caseElement.id = `rating_button_${i}_${j}`;
            if (localStorage.getItem(caseElement.id) === "true") {
                caseElement.classList.add("clicked");
            } else {
                caseElement.classList.add("not-clicked");
            }
            caseElement.addEventListener("click", handleClick);
            ligne.appendChild(caseElement);
        }

        buttonRow.appendChild(ligne);
    }
});
