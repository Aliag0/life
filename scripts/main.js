// Initialisation de Vue
const app = Vue.createApp({
    data() {
        return {
            currentSection: 'home',  // Section par défaut
            sidebarOpen: false       // État du sidebar (ouvert/fermé)
        };
    },
    methods: {
        // Changer la section active
        showSection(section) {
            this.currentSection = section;
            this.sidebarOpen = false; // Ferme le sidebar après la sélection
        },
        // Activer/désactiver la visibilité du sidebar
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        }
    }
});

// Composant pour la section "board"
app.component('board-grid', {
    template: `
        <div class="board">
        <div class="ligne-container">
            <div v-for="(ligne, i) in grid" :key="i" class="ligne">
            <div v-for="(caseElement, j) in ligne" :key="j"
                :class="['case', { clicked: caseElement.clicked }]"
                @click="toggleClick(i, j)"
                :id="'case_' + i + '_' + j">
            </div>
            </div>
        </div>
        </div>
    `,
    data() {
        return {
        grid: Array.from({ length: 80 }, () =>
            Array.from({ length: 52 }, () => ({ clicked: false }))
        )
        };
    },
    methods: {
        toggleClick(i, j) {
            this.grid[i][j].clicked = !this.grid[i][j].clicked;
            localStorage.setItem(`case_${i}_${j}`, this.grid[i][j].clicked);
        }
    },
    mounted() {
        // Récupère l'état des cases depuis localStorage au montage du composant
        this.grid.forEach((ligne, i) => {
        ligne.forEach((caseElement, j) => {
            caseElement.clicked = localStorage.getItem(`case_${i}_${j}`) === "true";
        });
        });
    }
});

// Composant pour la ligne de boutons de notation
app.component('button-row', {
    props: ['rowId', 'rowName'],
    template: `
        <div :id="rowId" class="button-row">
        <div v-for="(button, index) in buttons" 
            :key="index"
            class="rating-button"
            :class="{ clicked: button.clicked }"
            @click="toggleButton(index)">
            <!-- Si vous souhaitez un texte ou icône pour chaque bouton, ajoutez-le ici -->
        </div>
        </div>
    `,
    data() {
        return {
        buttons: Array.from({ length: 10 }, () => ({ clicked: false }))
        };
    },
    methods: {
        canClick() {
            const lastClickedDate = localStorage.getItem(`${this.rowName}_lastClicked`);
            if (!lastClickedDate) return true; // Aucun clic enregistré

            const lastClickedDay = new Date(lastClickedDate).toISOString().split('T')[0];
            const today = new Date().toISOString().split('T')[0];

            if (this.rowName == 'daily')
                return lastClickedDay !== today; // Autorise un seul clic par jour
            else if (this.rowName == 'weekly')
                return lastClickedDay !== today || new Date().getDay() === 5; // Autorise un clic par jour, mais seulement le vendredi
        },
        toggleButton(index) {
            if (!this.canClick()) {
                alert("Vous pouvez plus evaluer.");
                return;
            }

            // Activer tous les boutons jusqu'à l'index cliqué
            for (let i = 0; i <= index; i++) {
                this.buttons[i].clicked = true;
                localStorage.setItem(`${this.rowName}_rating_button_${i}`, true);
            }

            // Désactiver tous les boutons après l'index cliqué
            for (let i = index + 1; i < this.buttons.length; i++) {
                this.buttons[i].clicked = false;
                localStorage.setItem(`${this.rowName}_rating_button_${i}`, false);
            }

            // Enregistre uniquement la date (sans l'heure)
            localStorage.setItem(`${this.rowName}_lastClicked`, new Date().toISOString().split('T')[0]);
        }
    },
    mounted() {
        this.buttons.forEach((button, index) => {
        button.clicked = localStorage.getItem(`${this.rowName}_rating_button_${index}`) === 'true';
        });
    }
});

// Monte l'application Vue
app.mount('#app');
