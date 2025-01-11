const headerLogo = document.getElementById('header-logo');
const logoSrc1 = 'images/logo_albinks.png';
const logoSrc2 = 'images/logo_albinks_alt.png'; // Remplacez par le chemin de votre deuxième image

headerLogo.addEventListener('click', () => {
    if (headerLogo.src.includes(logoSrc1)) {
        headerLogo.src = logoSrc2;
    } else {
        headerLogo.src = logoSrc1;
    }
});