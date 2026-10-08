// ==========================================
// GESTIONE LINGUA
// ==========================================

// Lingua iniziale
showLanguage("it");

// Pulsanti lingua
document.getElementById("btn-it").addEventListener("click", function () {
    showLanguage("it");
});

document.getElementById("btn-en").addEventListener("click", function () {
    showLanguage("en");
});

function showLanguage(lang) {

    document.documentElement.lang = lang;

    document.querySelectorAll(".lang-it").forEach(el => {
        el.style.display = (lang === "it") ? "block" : "none";
    });

    document.querySelectorAll(".lang-en").forEach(el => {
        el.style.display = (lang === "en") ? "block" : "none";
    });

    document.getElementById("btn-it").classList.toggle("active", lang === "it");
    document.getElementById("btn-en").classList.toggle("active", lang === "en");
}


// ==========================================
// NAVIGAZIONE AUTOMATICA DEGLI OGGETTI
// ==========================================

// L'elenco delle immagini viene letto direttamente dalla Gallery
// presente in index.html. In questo modo, quando si aggiunge una
// nuova immagine alla Gallery, non è necessario modificare le pagine
// precedenti: la navigazione si aggiorna automaticamente.

async function setupObjectNavigation() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    // La navigazione automatica riguarda solo le pagine degli oggetti.
    // index.html e le altre pagine del sito vengono ignorate.
    if (currentPage === "index.html" || currentPage === "") {
        return;
    }

    const navigationBars =
        document.querySelectorAll(".object-navigation");

    if (!navigationBars.length) {
        return;
    }

    try {
        // Legge la Gallery direttamente da index.html.
        const response = await fetch("index.html");

        if (!response.ok) {
            throw new Error("Impossibile leggere index.html");
        }

        const indexHTML = await response.text();
        const parser = new DOMParser();
        const indexDocument = parser.parseFromString(indexHTML, "text/html");

        // Prende esclusivamente i link contenuti nella Gallery.
        const galleryLinks = Array.from(
            indexDocument.querySelectorAll(".gallery-grid > a[href]")
        );

        const objectPages = galleryLinks
            .map(link => link.getAttribute("href"))
            .filter(href => href && href.toLowerCase().endsWith(".html"));

        // Se la pagina corrente non appartiene alla Gallery, non fare nulla.
        const currentIndex = objectPages.indexOf(currentPage);

        if (currentIndex === -1) {
            return;
        }

        const previousPage =
            currentIndex > 0
                ? objectPages[currentIndex - 1]
                : "index.html#gallery";

        const nextPage =
            currentIndex < objectPages.length - 1
                ? objectPages[currentIndex + 1]
                : "index.html#gallery";

        // Tutte le barre di navigazione presenti nella pagina:
        // quella in alto e quella in fondo.
        navigationBars.forEach(navigation => {

            navigation.innerHTML = "";

            // PRECEDENTE
            const previousLink = document.createElement("a");
            previousLink.href = previousPage;
            previousLink.innerHTML = `
                <span class="lang-it">← Immagine precedente</span>
                <span class="lang-en">← Previous Image</span>
            `;
            navigation.appendChild(previousLink);

            // GALLERIA
            const galleryLink = document.createElement("a");
            galleryLink.href = "index.html#gallery";
            galleryLink.innerHTML = `
                <span class="lang-it">Galleria</span>
                <span class="lang-en">Gallery</span>
            `;
            navigation.appendChild(galleryLink);

            // SUCCESSIVO
            const nextLink = document.createElement("a");
            nextLink.href = nextPage;
            nextLink.innerHTML = `
                <span class="lang-it">Immagine successiva →</span>
                <span class="lang-en">Next Image →</span>
            `;
            navigation.appendChild(nextLink);
        });

        // Riapplica la lingua attualmente selezionata.
        showLanguage(document.documentElement.lang || "it");

    } catch (error) {
        console.error("Navigazione Gallery non disponibile:", error);
    }
}

// Avvia la navigazione automatica
setupObjectNavigation();
