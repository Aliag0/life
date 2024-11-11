// comment.js

document.addEventListener("DOMContentLoaded", function() {
    const commentText = document.getElementById("comment-text");

    commentText.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            if (event.shiftKey) {
                // Si Shift + Enter est pressé, on laisse le retour à la ligne.
                return;
            } else {
                // Si Enter seul est pressé, on envoie le commentaire.
                event.preventDefault();
                submitComment();
            }
        }
    });

    function submitComment() {
        const comment = commentText.value.trim();
        if (comment) {
            console.log("Comment submitted:", comment);
            commentText.value = ""; // Efface le contenu après l'envoi
        }
    }
});
