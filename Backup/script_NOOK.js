// ==========================
// Lingua iniziale
// ==========================

const savedLanguage = localStorage.getItem("language") || "it";
showLanguage(savedLanguage);

// ==========================
// Pulsanti (solo se esistono)
// ==========================

const btnIt = document.getElementById("btn-it");
const btnEn = document.getElementById("btn-en");

if (btnIt) {
    btnIt.addEventListener("click", function () {
        showLanguage("it");
    });
}

if (btnEn) {
    btnEn.addEventListener("click", function () {
        showLanguage("en");
    });
}

// ==========================
// Funzione principale
// ==========================

function showLanguage(lang) {

    // Salva la lingua scelta
    localStorage.setItem("language", lang);

    // Aggiorna il tag <html lang="">
    document.documentElement.lang = lang;

    // Testi italiani
    document.querySelectorAll(".lang-it").forEach(el => {
        el.style.display = (lang === "it") ? "block" : "none";
    });

    // Testi inglesi
    document.querySelectorAll(".lang-en").forEach(el => {
        el.style.display = (lang === "en") ? "block" : "none";
    });

    // Evidenzia i pulsanti se esistono
    if (btnIt) {
        btnIt.classList.toggle("active", lang === "it");
    }

    if (btnEn) {
        btnEn.classList.toggle("active", lang === "en");
    }
}