// Lingua iniziale
showLanguage("it");

// Pulsanti
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