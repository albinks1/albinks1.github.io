let myImage = document.querySelector("img");

var video = document.getElementById("sr_video");
window.addEventListener("scroll", function() {
    var value = window.scrollY;
    video.classList.toggle("small", value > 0);
});

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
  
window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    var header = document.getElementById("myHeader");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      header.style.height = "50px";
    } else {
      header.style.height = "100px";
    }
  }

  function scrollFunction2() {
    var navi = document.getElementById("navbar");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navi.style.height = "30px";
    } else {
      navi.style.height = "50px";
    }
  }