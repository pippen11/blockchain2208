let slides = document.querySelector(".slides");
let slide = document.querySelectorAll(".slides li");
currrnetIdx = 0;
slideCount = slide.length;
let prevBtn = document.querySelector(".prev");
slideWidth = 300;
slideMargin = 30;
let nextBtn = document.querySelector(".next");

slides.style.width =
  (slideWidth + slideMargin) * slideCount - slideMargin + "px";

function moveSlide(num) {
  slides.style.left = -num * 330 + "px";
  currentIdx = num;
}
