let openseas = document.querySelectorAll(".opensea");
let openseastrings = document.querySelectorAll(".openseastring");
let firstTop = openseas[0].offsetTop;
let secondTop = openseastrings[0].offsetTop;

openseas[0].onclick = function () {
  window.scroll({ top: firstTop, behavior: "smooth" });
};
openseastrings[0].onclick = function () {
  window.scroll({ top: secondTop, behavior: "smooth" });
};

// let mainbar = document.querySelector(".firstbar");

// let mainbarHeight = mainbar.getBoundingClientRect().height;

// document.addEventListener("scroll", () => {
//   if (window.scrollY < mainbarHeight) {
//     mainbar.classList.add("firstbar");
//   } else {
//     mainbar.classList.add("firstbarchange");
//   }
// });

// console.log(window.scrollY);
