// Cambiar el patrón de fondo
function changePattern(patternClass) {
    const currentMode = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    document.body.className = `${patternClass} ${currentMode}`;
}

// Alternar modo oscuro/claro
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const patternClass = document.body.classList.contains('pattern-circles') ? 'pattern-circles' :
                         document.body.classList.contains('pattern-lines') ? 'pattern-lines' :
                         'pattern-grid';
    document.body.className = `${patternClass} ${isDarkMode ? 'dark-mode' : 'light-mode'}`;

    // Cambiar estilos del panel de personalización en modo oscuro
    const panel = document.querySelector('.customization-panel');
    if (isDarkMode) {
        panel.style.background = "rgba(0, 0, 0, 0.8)";
        panel.style.color = "#fff";
        panel.style.borderColor = "#444";
    } else {
        panel.style.background = "rgba(255, 255, 255, 0.9)";
        panel.style.color = "#000";
        panel.style.borderColor = "#ddd";
    }
}

// Añadir evento para guardar notas editadas
function saveNoteAsText(noteContent) {
    const blob = new Blob([noteContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nota.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Añadir interacción de guardar al hacer doble clic en una nota
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.note').forEach(note => {
        note.addEventListener('dblclick', () => {
            const noteContent = note.textContent.trim();
            saveNoteAsText(noteContent);
        });
    });
});