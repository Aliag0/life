// rating.js

document.addEventListener("DOMContentLoaded", function() {
    initializeButtonRow("button-row-daily");
    initializeButtonRow("button-row-weekly");
});

function initializeButtonRow(rowId) {
    const buttonRow = document.getElementById(rowId);

    function toggleButtonState(event) {
        const button = event.target;
        const clickedClass = "clicked";

        // Toggle the 'clicked' class and update localStorage based on new state
        if (button.classList.toggle(clickedClass)) {
            localStorage.setItem(button.id, "true");
        } else {
            localStorage.setItem(button.id, "false");
        }
    }

    // Create a row of 10 buttons
    const ligne = document.createElement("div");
    ligne.className = "ligne";

    for (let i = 0; i < 10; i++) {
        const button = document.createElement("div");
        button.className = "rating-button";
        button.id = `rating_button_${i}`;

        // Load initial state from localStorage
        if (localStorage.getItem(button.id) === "true") {
            button.classList.add("clicked");
        }

        button.addEventListener("click", toggleButtonState);
        ligne.appendChild(button);
    }

    // Append the container to the row
    buttonRow.appendChild(ligne);
};
