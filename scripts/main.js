let myImage = document.querySelector("img");

myImage.addEventListener("click", function () {
  let mySrc = myImage.getAttribute("src");
  if (mySrc === "images/300sl.png") {
    myImage.setAttribute("src", "images/275gtb.png");
  } else {
    myImage.setAttribute("src", "images/300sl.png");
  }
});

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

// function setUserName() {
//     let myName = prompt("Veuillez saisir votre nom.");
//     localStorage.setItem("nom", myName);
//     myHeading.textContent = "Bienvenue, " + myName;
//   }
//   if (!localStorage.getItem("nom")) {
//     setUserName();
//   } else {
//     let storedName = localStorage.getItem("nom");
//     myHeading.textContent = "Bienvenue, " + storedName;
//   }
//   myButton.addEventListener("click", function () {
//     setUserName();
//   });
  
window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    var header = document.getElementById("myHeader");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      header.style.height = "50px";
    } else {
      header.style.height = "100px";
    }
  }
  