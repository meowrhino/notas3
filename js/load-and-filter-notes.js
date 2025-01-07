// Encapsular generación de botones de etiqueta
function generateTagButtons(tagSet) {
    const tagFiltersContainer = document.getElementById('tag-filters');
    tagFiltersContainer.innerHTML = '';
    tagSet.forEach(tag => {
        const button = document.createElement('button');
        button.textContent = tag;
        button.setAttribute('data-tag', tag);
        button.setAttribute('aria-pressed', 'false');
        button.onclick = () => applyTagFilter(tag, button);
        tagFiltersContainer.appendChild(button);
    });
}

// Permitir seleccionar múltiples etiquetas
function applyTagFilter(tag, btn) {
    const isPressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', isPressed ? 'false' : 'true');
    const activeTags = Array.from(document.querySelectorAll('#tag-filters button[aria-pressed="true"]'))
        .map(b => b.getAttribute('data-tag'));

    document.querySelectorAll('.note').forEach(article => {
        const tags = Array.from(article.querySelectorAll('.tags span')).map(t => t.textContent.trim());
        article.style.display = activeTags.some(t => tags.includes(t)) || activeTags.length === 0
            ? 'block'
            : 'none';
    });
}

async function loadArticles() {
    let articles = ['notas3/2025-01-03-1932.html', 'notas3/2025-01-03-1928.html', 'notas3/2025-01-03-1900.html', 'notas3/2025-01-03-1857.html', 'notas3/2025-01-03-1855.html', 'notas3/2025-01-03-1807.html', 'notas3/2025-01-03-1758.html', 'notas3/2025-01-03-1749.html', 'notas3/2025-01-03-1737.html', 'notas3/2025-01-03-1731.html', 'notas3/2025-01-03-1728.html', 'notas3/2025-01-03-1656.html', 'notas3/2025-01-03-1654.html', 'notas3/2025-01-03-1634.html', 'notas3/2025-01-03-1625.html', 'notas3/2025-01-03-1621.html', 'notas3/2025-01-03-1618.html', 'notas3/2025-01-02-1556.html', 'notas3/2025-01-02-0737.html', 'notas3/2025-01-01-1725.html', 'notas3/2025-01-01-0603.html', 'notas3/2024-12-29-1752.html', 'notas3/2024-12-28-1246.html', 'notas3/2024-12-28-1245.html', 'notas3/2024-12-27-1407.html', 'notas3/2024-12-23-1534.html', 'notas3/2024-12-23-0344.html', 'notas3/2024-12-20-1623.html', 'notas3/2024-12-18-1145.html', 'notas3/2024-12-18-1057.html', 'notas3/2024-12-18-1025.html', 'notas3/2024-12-18-1022.html', 'notas3/2024-12-18-1012.html', 'notas3/2024-12-18-0941.html', 'notas3/2024-12-16-1202.html', 'notas3/2024-12-15-1045.html', 'notas3/2024-12-10-1723.html', 'notas3/2024-12-10-0912.html', 'notas3/2024-12-07-1719.html', 'notas3/2024-12-07-0946.html', 'notas3/2024-12-06-0943.html', 'notas3/2024-12-05-0944.html', 'notas3/2024-12-05-0944.html', 'notas3/2024-12-04-0946.html', 'notas3/2024-12-04-0944.html', 'notas3/2024-12-03-1942.html', 'notas3/2024-12-03-0947.html', 'notas3/2024-12-03-0946.html', 'notas3/2024-12-02-1942.html', 'notas3/2024-12-01-1941.html', 'notas3/2024-11-30-1941.html', 'notas3/2024-11-30-1941.html', 'notas3/2024-11-29-1945.html', 'notas3/2024-11-29-1945.html', 'notas3/2024-11-29-1944.html', 'notas3/2024-11-29-1941.html', 'notas3/2024-11-29-1937.html', 'notas3/2024-11-29-1937.html', 'notas3/2024-11-29-0943.html', 'notas3/2024-11-28-1947.html', 'notas3/2024-11-28-1947.html', 'notas3/2024-11-28-1945.html', 'notas3/2024-11-26-1948.html', 'notas3/2024-11-24-1948.html', 'notas3/2024-11-23-2002.html', 'notas3/2024-11-23-2002.html', 'notas3/2024-11-23-1951.html', 'notas3/2024-11-20-2003.html', 'notas3/2024-11-20-2003.html', 'notas3/2024-11-18-2003.html', 'notas3/2024-11-17-2009.html', 'notas3/2024-11-17-2008.html', 'notas3/2024-11-17-2008.html', 'notas3/2024-11-17-2007.html', 'notas3/2024-11-17-2006.html', 'notas3/2024-11-17-2006.html', 'notas3/2024-11-17-2003.html', 'notas3/2024-11-15-2009.html', 'notas3/2024-11-14-2010.html', 'notas3/2024-11-12-2017.html', 'notas3/2024-11-12-2017.html', 'notas3/2024-11-12-2015.html', 'notas3/2024-11-12-2014.html', 'notas3/2024-11-11-2019.html', 'notas3/2024-11-10-2021.html', 'notas3/2024-11-10-2021.html', 'notas3/2024-11-10-2020.html', 'notas3/2024-11-10-2020.html', 'notas3/2024-11-10-2019.html', 'notas3/2024-11-10-2019.html', 'notas3/2024-11-09-2026.html', 'notas3/2024-11-09-2023.html', 'notas3/2024-11-09-2023.html', 'notas3/2024-11-06-2027.html', 'notas3/2024-11-05-2027.html', 'notas3/2024-11-05-2027.html', 'notas3/2024-11-03-2031.html', 'notas3/2024-11-03-2029.html', 'notas3/2024-11-03-2028.html', 'notas3/2024-11-03-2028.html', 'notas3/2024-11-03-1135.html', 'notas3/2024-11-02-2038.html', 'notas3/2024-11-02-2036.html', 'notas3/2024-11-02-2036.html', 'notas3/2024-11-02-2031.html', 'notas3/2024-11-02-2031.html', 'notas3/2024-11-02-2031.html', 'notas3/2024-11-02-2031.html', 'notas3/2024-11-02-2031.html', 'notas3/2024-11-02-2031.html', 'notas3/2024-11-02-2031.html', 'notas3/2024-10-31-2038.html', 'notas3/2024-10-31-2038.html', 'notas3/2024-10-31-2038.html', 'notas3/2024-10-31-2038.html', 'notas3/2024-10-30-2039.html', 'notas3/2024-10-30-2039.html', 'notas3/2024-10-29-2040.html', 'notas3/2024-10-24-2058.html', 'notas3/2024-10-24-2058.html', 'notas3/2024-10-19-2100.html', 'notas3/2024-10-19-2059.html', 'notas3/2024-10-19-2059.html', 'notas3/2024-10-19-2059.html', 'notas3/2024-10-11-2101.html', 'notas3/2024-10-11-2020.html', 'notas3/2024-10-09-2020.html', 'notas3/2024-10-08-2022.html', 'notas3/2024-10-06-2101.html', 'notas3/2024-10-04-2041.html', 'notas3/2024-10-02-2103.html', 'notas3/2024-10-02-2102.html', 'notas3/2024-10-02-2102.html', 'notas3/2024-10-02-2102.html', 'notas3/2024-09-28-2104.html', 'notas3/2024-09-28-2104.html', 'notas3/2024-09-27-2104.html', 'notas3/2024-09-25-2105.html', 'notas3/2024-09-25-2104.html', 'notas3/2024-09-24-2105.html', 'notas3/2024-09-23-2105.html', 'notas3/2024-09-22-2107.html', 'notas3/2024-09-22-2107.html', 'notas3/2024-09-21-1326.html', 'notas3/2024-09-21-1225.html', 'notas3/2024-09-21-1224.html', 'notas3/2024-09-21-1219.html', 'notas3/2024-09-21-1209.html', 'notas3/2024-09-21-1206.html', 'notas3/2024-09-16-2222.html', 'notas3/2024-09-16-2043.html', 'notas3/2024-09-16-2032.html', 'notas3/2024-09-16-1228.html', 'notas3/2024-09-15-2018.html', 'notas3/2024-09-15-1758.html', 'notas3/2024-09-15-1749.html', 'notas3/2024-09-15-1723.html', 'notas3/2024-09-15-1251.html', 'notas3/2024-09-15-1248.html', 'notas3/2024-09-15-1243.html', 'notas3/2024-09-15-1242.html', 'notas3/2024-09-15-1242.html', 'notas3/2024-09-15-1233.html', 'notas3/2024-09-14-1803.html', 'notas3/2024-09-14-0120.html', 'notas3/2024-09-14-0119.html', 'notas3/2024-09-13-0708.html', 'notas3/2024-09-12-2024.html', 'notas3/2024-09-08-1806.html', 'notas3/2024-09-08-1330.html', 'notas3/2024-09-08-1318.html', 'notas3/2024-09-08-0500.html', 'notas3/2024-09-08-0440.html', 'notas3/2024-09-08-0258.html', 'notas3/2024-09-04-2004.html', 'notas3/2024-09-04-1949.html', 'notas3/2024-09-02-1508.html', 'notas3/2024-09-02-1405.html', 'notas3/2024-08-31-1947.html', 'notas3/2024-08-29-2203.html', 'notas3/2024-08-28-0950.html', 'notas3/2024-08-23-1413.html', 'notas3/2024-08-23-1337.html', 'notas3/2024-08-23-1321.html', 'notas3/2024-08-23-1221.html', 'notas3/2024-08-23-1215.html', 'notas3/2024-08-23-1209.html', 'notas3/2024-08-23-1205.html', 'notas3/2024-08-23-1159.html', 'notas3/2024-08-23-1156.html', 'notas3/2024-08-23-1148.html', 'notas3/2024-08-23-1143.html', 'notas3/2024-08-23-1138.html', 'notas3/2024-08-23-1125.html', 'notas3/2024-08-23-1121.html', 'notas3/2024-08-23-1120.html', 'notas3/2024-08-23-1119.html', 'notas3/2024-08-23-1112.html', 'notas3/2024-08-23-1111.html', 'notas3/2024-08-23-1104.html', 'notas3/2024-08-23-1052.html', 'notas3/2024-08-23-1038.html', 'notas3/2024-08-23-1036.html', 'notas3/2024-08-23-1035.html', 'notas3/2024-08-23-1022.html', 'notas3/2024-08-23-1006.html', 'notas3/2024-08-23-1005.html', 'notas3/2024-08-23-1001.html', 'notas3/2024-08-23-0953.html', 'notas3/2024-08-23-0948.html', 'notas3/2024-08-23-0945.html', 'notas3/2024-08-23-0945.html', 'notas3/2024-08-23-0943.html', 'notas3/2024-08-23-0942.html', 'notas3/2024-08-23-0939.html', 'notas3/2024-08-22-1623.html', 'notas3/2024-08-22-0946.html', 'notas3/2024-08-22-0943.html', 'notas3/2024-08-21-2014.html', 'notas3/2024-08-18-2234.html', 'notas3/2024-08-18-1106.html', 'notas3/2024-08-17-2004.html', 'notas3/2024-08-17-2002.html', 'notas3/2024-08-17-0843.html', 'notas3/2024-08-17-0838.html', 'notas3/2024-08-17-0820.html', 'notas3/2024-08-17-0544.html', 'notas3/2024-08-17-0450.html', 'notas3/2024-08-17-0314.html', 'notas3/2024-08-17-0114.html', 'notas3/2024-08-17-0106.html', 'notas3/2024-08-17-0104.html', 'notas3/2024-08-16-1225.html', 'notas3/2024-08-16-1225.html', 'notas3/2024-08-11-1800.html', 'notas3/2024-08-09-0315.html', 'notas3/2024-08-07-1026.html', 'notas3/2024-08-04-1651.html', 'notas3/2024-08-02-0304.html', 'notas3/2024-08-01-1409.html'];

    // Array to collect failed articles
    const failedArticles = [];

    // Sort articles from most recent to oldest
    articles.sort((a, b) => {
        const dateA = new Date(a.split('/')[1].split('-').slice(0, 3).join('-'));
        const dateB = new Date(b.split('/')[1].split('-').slice(0, 3).join('-'));
        return dateB - dateA;
    });

    const container = document.getElementById('articles-container');
    const loading = document.getElementById('loading');
    const tagSet = new Set();
    let loadedCount = 0;
    const totalArticles = articles.length;

    loading.innerHTML = `Cargando notas... (0/${totalArticles})`;

    for (const article of articles) {
        try {
            // Decode the article path for debugging
            const decodedArticle = decodeURIComponent(article);

            const response = await fetch(decodedArticle);

            if (!response.ok) {
                console.warn(`No se pudo cargar: ${decodedArticle} - Status: ${response.status}`);
                failedArticles.push(decodedArticle);
                continue;
            }

            const articleHTML = await response.text();
            const div = document.createElement('article');

            // Extract date from filename
            const filename = decodedArticle.split('/')[1];
            const dateString = filename.split('-').slice(0, 3).join('-');
            const formattedDate = new Date(dateString).toLocaleDateString('es-ES');

            // Wrap content in a 'content' div and include the date
            div.innerHTML = `<div class="content"><span class="date">${formattedDate}</span>${articleHTML}</div>`;

            // Extraer etiquetas (se asume que las etiquetas están en un elemento con clase 'tags')
            const tagElements = div.querySelectorAll('.tags span');
            const tags = Array.from(tagElements).map(tag => tag.textContent.trim());
            tags.forEach(tag => tagSet.add(tag));

            // Asignación de clases según longitud
            const contentLength = articleHTML.length;
            div.classList.add('note');
            if (contentLength <= 1000) {
                div.classList.add('small');
            } else if (contentLength <= 5000) {
                div.classList.add('medium');
            } else {
                div.classList.add('large');
                const toggleButton = document.createElement('button');
                toggleButton.textContent = 'Leer más';
                toggleButton.classList.add('toggle-button');
                toggleButton.onclick = () => {
                    div.classList.toggle('expanded');
                    toggleButton.textContent = div.classList.contains('expanded') ? 'Leer menos' : 'Leer más';
                };
                div.appendChild(toggleButton);
            }

            container.appendChild(div);
            loadedCount++;

            // Update counter and make article visible
            loading.innerHTML = `Cargando notas... (${loadedCount}/${totalArticles})`;

            // Make article visible con animación
            setTimeout(() => {
                div.classList.add('visible');
            }, 10);

        } catch (error) {
            console.error(`Error al cargar el artículo ${decodeURIComponent(article)}:`, error);
            failedArticles.push(decodeURIComponent(article));
        }
    }

    if (loadedCount === totalArticles) {
        loading.innerHTML = `¡Cargadas todas las notas! (${loadedCount}/${totalArticles})`;
        setTimeout(() => {
            loading.style.opacity = '0';
        }, 2000);
    }

    generateTagButtons(tagSet);

    loading.style.display = 'none';
    container.style.display = 'block';

    // Log failed articles with detailed information
    if (failedArticles.length > 0) {
        console.log('Artículos que no se pudieron cargar:', failedArticles);
    }
}

loadArticles();

// Reemplazar los event listeners existentes con la nueva lógica de filtros
const filters = document.getElementById('filters');
filters.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const btn = event.target;
        const isPressed = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', isPressed ? 'false' : 'true');
        const activeFilters = Array.from(filters.querySelectorAll('button[aria-pressed="true"]'))
            .map(b => b.getAttribute('data-filter'));

        document.querySelectorAll('.note').forEach(note => {
            const classes = ['small', 'medium', 'large'];
            if (activeFilters.includes('all')) {
                note.style.display = classes.some(cls => note.classList.contains(cls) && activeFilters.includes(cls))
                    ? 'block'
                    : 'none';
            } else {
                note.style.display = classes.some(cls => note.classList.contains(cls) && activeFilters.includes(cls))
                    ? 'block'
                    : 'none';
            }
        });
    }
});

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