// rating.js

document.addEventListener("DOMContentLoaded", function() {

    // Vérifier si la date a changé et réinitialiser les boutons si nécessaire
    resetRatingsIfNeeded();

    initializeButtonRow("button-row-daily", "daily");
    initializeButtonRow("button-row-weekly", "weekly");

    // Lier les événements pour changer les sections de rating
    document.getElementById("button-row-daily").addEventListener("click", function() {
        changeRatingSection("daily");
    });

    document.getElementById("button-row-weekly").addEventListener("click", function() {
        changeRatingSection("weekly");
    });
});

// Fonction pour réinitialiser les évaluations quotidiennes si nécessaire
function resetRatingsIfNeeded() {
    resetDailyRatingsIfNeeded();
    resetWeeklyRatingsIfNeeded();
}

function resetDailyRatingsIfNeeded() {
    const lastCheckedDate = localStorage.getItem("lastCheckedDate");
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    if (lastCheckedDate !== today) {
        // C'est un nouveau jour, réinitialiser les sélections des boutons
        localStorage.setItem("lastCheckedDate", today);

        // Réinitialiser les boutons 'daily'
        for (let i = 0; i < 10; i++) {
            localStorage.setItem(`daily_rating_button_${i}`, "false");
        }
    }
}

function resetWeeklyRatingsIfNeeded() {
    const lastCheckedDate = localStorage.getItem("lastCheckedWeekDate");
    const today = new Date();
    const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000; // 7 jours en millisecondes

    // Si la date de dernière réinitialisation n'est pas trouvée ou s'il s'est écoulé 7 jours
    if (!lastCheckedDate || new Date(today - new Date(lastCheckedDate)) >= sevenDaysInMillis) {
        // Réinitialiser les boutons 'weekly'
        for (let i = 0; i < 10; i++) {
            localStorage.setItem(`weekly_rating_button_${i}`, "false");
        }

        // Mettre à jour la date de dernière réinitialisation des évaluations hebdomadaires
        localStorage.setItem("lastCheckedWeekDate", today.toISOString());
    }
}

// Fonction pour initialiser les boutons dans une ligne
function initializeButtonRow(rowId, rowName) {
    const buttonRow = document.getElementById(rowId);

    function toggleButtonState(event) {
        const button = event.target;
        const clickedClass = "clicked";
        const buttons = Array.from(buttonRow.querySelectorAll(".rating-button"));
        const index = buttons.indexOf(button);

        // Ajouter la classe 'clicked' aux boutons jusqu'à l'index cliqué et sauvegarder dans localStorage
        for (let i = 0; i <= index; i++) {
            buttons[i].classList.add(clickedClass);
            localStorage.setItem(`${rowName}_rating_button_${i}`, "true");
        }

        // Si un bouton après l'index cliqué était déjà cliqué, on enlève la classe et met à jour localStorage
        for (let i = index + 1; i < buttons.length; i++) {
            buttons[i].classList.remove(clickedClass);
            localStorage.setItem(`${rowName}_rating_button_${i}`, "false");
        }
    }

    // Créer une ligne de 10 boutons
    const ligne = document.createElement("div");
    ligne.className = "ligne";

    for (let i = 0; i < 10; i++) {
        const button = document.createElement("div");
        button.className = "rating-button";
        button.id = `${rowName}_rating_button_${i}`;

        // Charger l'état initial depuis localStorage
        if (localStorage.getItem(`${rowName}_rating_button_${i}`) === "true") {
            button.classList.add("clicked");
        }

        button.addEventListener("click", toggleButtonState);
        ligne.appendChild(button);
    }

    // Ajouter la ligne au conteneur de bouton
    buttonRow.appendChild(ligne);
}
