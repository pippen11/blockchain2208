// 슬라이크 전체 크기(width 구하기)
const slide = document.querySelector(".slide");
let slideWidth = slide.clientWidth;
console.log(slideWidth);

// 버튼 엘리먼트 선택하기
const prevBtn = document.querySelector(".slide_prev_button");
const nextBtn = document.querySelector(".slide_next_button");

// 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
const slideItems = document.querySelectorAll(".slide_item");
// 현재 슬라이드 위치가 슬라이드 개수를 넘기지 않게 하기 위한 변수
const maxSlide = slideItems.length;

console.log(maxSlide);

// 버튼 클릭할 때 마다 현재 슬라이드가 어디인지 알려주기 위한 변수
let currSlide = 1;

// 버튼 엘리먼트에 클릭 이벤트 추가하기
nextBtn.addEventListener("click", () => {
  // 이후 버튼 누를 경우 현재 슬라이드를 변경
  currSlide++;

  // 마지막 슬라이드 이상으로 넘어가지 않게 하기 위해서
  if (currSlide <= maxSlide) {
    // 슬라이드를 이동시키기 위한 offset 계산
    const offset = slideWidth * (currSlide - 1);

    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
  } else {
    currSlide--;
  }
});
