// ==========================================
// GESTIONE LINGUA
// ==========================================

const languageButtons = {
    it: document.getElementById("btn-it"),
    en: document.getElementById("btn-en")
};

function showLanguage(lang, persist = true) {
    const selectedLanguage = lang === "en" ? "en" : "it";
    document.documentElement.lang = selectedLanguage;
    document.documentElement.dataset.language = selectedLanguage;

    document.querySelectorAll(".lang-it").forEach(el => {
        el.style.display = selectedLanguage === "it" ? "block" : "none";
    });
    document.querySelectorAll(".lang-en").forEach(el => {
        el.style.display = selectedLanguage === "en" ? "block" : "none";
    });

    if (languageButtons.it) {
        languageButtons.it.classList.toggle("active", selectedLanguage === "it");
    }
    if (languageButtons.en) {
        languageButtons.en.classList.toggle("active", selectedLanguage === "en");
    }

    if (persist) {
        try {
            localStorage.setItem("siteLanguage", selectedLanguage);
        } catch (error) {
            // Language switching still works when storage is unavailable.
        }
    }
}

if (languageButtons.it) {
    languageButtons.it.addEventListener("click", () => showLanguage("it"));
}
if (languageButtons.en) {
    languageButtons.en.addEventListener("click", () => showLanguage("en"));
}

// The head sets this value before the page is rendered. Fall back to storage
// for pages opened without the early language initializer.
let initialLanguage = document.documentElement.dataset.language;
if (!initialLanguage) {
    try {
        initialLanguage = localStorage.getItem("siteLanguage");
    } catch (error) {
        initialLanguage = "it";
    }
}
showLanguage(initialLanguage === "en" ? "en" : "it", false);


// ==========================================
// NAVIGAZIONE AUTOMATICA DELLA GALLERIA
// ==========================================

// Keep this order in sync with the gallery links in index.html. Navigation is
// built synchronously, so it does not wait for a fetch or shift the page later.
const objectPages = [
    "m16.html",
    "ic1318.html",
    "lbn182.html",
    "m17.html",
    "ngc7293.html",
    "C_11.html"
];

function setupObjectNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const currentIndex = objectPages.indexOf(currentPage);
    if (currentIndex === -1) return;

    const navigationBars = document.querySelectorAll(".object-navigation");
    if (!navigationBars.length) return;

    const previousPage = currentIndex > 0
        ? objectPages[currentIndex - 1]
        : "index.html#gallery";
    const nextPage = currentIndex < objectPages.length - 1
        ? objectPages[currentIndex + 1]
        : "index.html#gallery";

    navigationBars.forEach(navigation => {
        navigation.innerHTML = `
            <a href="${previousPage}">
                <span class="lang-it">← Immagine precedente</span>
                <span class="lang-en">← Previous Image</span>
            </a>
            <a href="index.html#gallery">
                <span class="lang-it">Galleria</span>
                <span class="lang-en">Gallery</span>
            </a>
            <a href="${nextPage}">
                <span class="lang-it">Immagine successiva →</span>
                <span class="lang-en">Next Image →</span>
            </a>
        `;
    });

    showLanguage(document.documentElement.lang, false);
}

setupObjectNavigation();
