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

// Elenco delle pagine degli oggetti,
// nello stesso ordine con cui compaiono nella Gallery.
const objectPages = [
    "m16.html",
    "ic1318.html",
    "lbn182.html",
    "m17.html"
    "ngc7293.html"
];

function setupObjectNavigation() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    // La navigazione automatica riguarda solo le pagine degli oggetti.
    if (!objectPages.includes(currentPage)) {
        return;
    }

    const currentIndex = objectPages.indexOf(currentPage);

    const previousPage =
        currentIndex > 0
            ? objectPages[currentIndex - 1]
            : null;

    const nextPage =
        currentIndex < objectPages.length - 1
            ? objectPages[currentIndex + 1]
            : null;

    // Tutte le barre di navigazione presenti nella pagina:
    // quella in alto e quella in fondo.
    document.querySelectorAll(".object-navigation").forEach(navigation => {

        navigation.innerHTML = "";

        // PRECEDENTE
        if (previousPage) {

            const link = document.createElement("a");
            link.href = previousPage;

            link.innerHTML = `
                <span class="lang-it">← Immagine precedente</span>
                <span class="lang-en">← Previous Object</span>
            `;

            navigation.appendChild(link);
        }

        // GALLERIA
        const galleryLink = document.createElement("a");
        galleryLink.href = "index.html#gallery";

        galleryLink.innerHTML = `
            <span class="lang-it">Galleria</span>
            <span class="lang-en">Gallery</span>
        `;

        navigation.appendChild(galleryLink);

        // SUCCESSIVO
        if (nextPage) {

            const link = document.createElement("a");
            link.href = nextPage;

            link.innerHTML = `
                <span class="lang-it">Immagine successiva →</span>
                <span class="lang-en">Next Object →</span>
            `;

            navigation.appendChild(link);
        }

    });

    // Riapplica la lingua attualmente selezionata.
    showLanguage(document.documentElement.lang || "it");
}


// Avvia la navigazione automatica
setupObjectNavigation();
