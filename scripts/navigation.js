// navigation.js
document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.getElementById("burger-menu");
    const sidebar = document.getElementById("sidebar");

    // Toggle sidebar visibility and transform burger into a cross
    burgerMenu.addEventListener("click", function() {
        sidebar.classList.toggle("open");
        burgerMenu.classList.toggle("open"); // Toggle the 'open' class on burger menu
    });

    // Add event listeners to sidebar links
    document.getElementById('homeLink').addEventListener('click', function() {
        showSection('home');
    });
    document.getElementById('boardLifeLink').addEventListener('click', function() {
        showSection('board-life');
    });
    document.getElementById('ratingLink').addEventListener('click', function() {
        showSection('rating');
    });

    // Function to handle showing/hiding content sections
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(function(section) {
            section.style.display = 'none';
        });

        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.style.display = 'block';
        }
    }
});
