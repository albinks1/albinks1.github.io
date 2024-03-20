// Assurez-vous d'avoir sélectionné votre élément SVG
var monSVG = document.querySelector('.canvas');

// Créez une timeline GSAP
var tl = gsap.timeline({repeat: -1});

// Ajoutez une animation à la timeline
tl.fromTo(monSVG, {x: '100%'}, {x: '-100%', duration: 4, ease: "power1.out"});

// Vous pouvez contrôler la vitesse de l'animation en modifiant la durée




// const canvas = document.querySelector('.canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const context = canvas.getContext("2d");
// const frameCount = 26; //img de l'anim

// const currentFrame = (index) => `./logo/${index.toString()}.png`;
// const images = [];
// let ball = {frame : 0, x: canvas.width};

// for(let i = 0; i < frameCount; i++){
//     const img = new Image();
//     img.src = currentFrame(i);
//     images.push(img);
// }

// gsap.to(ball, {
//     frame: frameCount - 1,
//     duration: 1, // Durée de l'animation
//     snap: "frame",
//     ease: "none",
//     repeat: -1, // Répète l'animation indéfiniment
//     onUpdate: render,
// });
// images[0].onload = render;

// gsap.to(ball, {
//     x: -canvas.width, // Déplace l'image de droite à gauche
//     duration: 5, // Durée de l'animation
//     ease: "none",
//     repeat: -1, // Répète l'animation indéfiniment
// });

// function render(){
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     let imgWidth = images[ball.frame].width / 3; // Réduit la largeur de l'image de moitié
//     let imgHeight = images[ball.frame].height / 3; // Réduit la hauteur de l'image de moitié
//     context.drawImage(images[ball.frame], ball.x, 0, imgWidth, imgHeight);
//     if(ball.frame === frameCount - 1){
//         ball.frame = 0; // Réinitialise l'animation de l'image à la première image
//     }
// }
