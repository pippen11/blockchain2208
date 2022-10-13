//눌렀을때 스무스하게 올라가는거
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

// 스크롤내렸을때 변화
let mainbar = document.querySelector(".firstbar");

let mainbarHeight = mainbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY < mainbarHeight) {
    mainbar.classList.remove("firstbarchange");

    mainbar.classList.add("firstbar");
  } else {
    // mainbar.classList.remove("firstbar");

    mainbar.classList.add("firstbarchange");
  }
});

// 슬라이드 1

//주요이슈: 클릭을 연속으로 했을때 멈춤현상 발생

let slides = document.querySelector(".slides");
//ul태그 class갖고옴 전체
let slide = document.querySelectorAll(".slides li");
//각각 가져옴 슬라이드 li
let currentIdx = 0;
//슬라이드위치파악
let slideCount = slide.length;
//슬라이드 본원래길이가 6임

let slideWidth = 600;
//사진 넓이 600똑같이
let slideMargin = 10;
//마진 10똑같이
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
//버튼 불러옴

makeClone();
//클론부르는함수

function makeClone() {
  for (let i = 0; i < slideCount; i++) {
    //길이 6면 배열은 0부터 1 2 3 4 5임
    //a.cloneNode()-> a요소를 그대로복사 acloneNode(true)->a의 자식요소까지 복사
    let cloneSlide = slide[i].cloneNode(true);
    //자식까지 복사 전체 li복사해서 cloneSlide에넣는다
    cloneSlide.classList.add("clone");
    //clone이라는 클래스를 추가함
    //a.appendChild(b) a요소 기존에 내용 뒤에 b를 추가한다
    //1 2 3 4 5 6순으로복사해서 6뒤에 그대로붙임
    slides.appendChild(cloneSlide);
    // 1 2 3 4 5 6   clone 1 2 3 4 5 6
    //기존 1~6 클론 1~6
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    //5부터시작해서 인덱스 5번째 4번째 3번재 2번째 1번째 순으로 복사
    //1 2 3 4 5 6 1 2 3 4 5 6
    let cloneSlide = slide[i].cloneNode(true);
    //6 5 4 3 2 1순으로 복사해서 붙여야함 1번앞에
    cloneSlide.classList.add("clone");
    //a.prepend(b) a요소앞에 b를 추가 기존li 랑 위에서 클론태그 합한게 a인듯
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPos();

  setTimeout(function () {
    slides.classList.add("animated");
  }, 100);

  //slides.classList.add("animated");이것만 적으면 이동하는게 보임
  //-1150으로 바뀌는과정 이동하는게 보이면 안되니까 다 배치후에 작동해야함 그래서 settimeout씀
  //100이면 0.1초이다
  //초기위치잡는함수  setInitialPos 복사본 원본 복사본 원본이 중간에와야함
  //slideCount가 5라서 5번 li는 4번이라 -1함
  //slides전체 넓이가 복붙한 전체 넓이가돼야함
  //사진 200 마진 30 인데 총 15개니까 230 * 15한다음 제일마지막 마진 30빼야함
}

function updateWidth() {
  let currentSlides = document.querySelectorAll(".slides li");
  //새롭게 합쳐진(복사본포함) 전체 슬라이드를 담음
  let newSlideCount = currentSlides.length;
  //전체길이는 18가된다

  let newWidth = (slideWidth + slideMargin) * newSlideCount + "px";
  //전체 넓이
  slides.style.width = newWidth;
}

//슬라이드 기준이 왼쪽으로 이동해서 중간에 와야함
//left값은 슬라이드 이동하는 용도로쓰고
//트랜스폼 트랜스레이트로 x축으로 왼쪽으로 마이너스 얼마나 가야할지 계산
function setInitialPos() {
  let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  //초기값 길이 6개만큼 넓이 -6이동시켜야 원본이 중간에옴
  //초기값 원래 6개있었으니 slidecount를 곱함
  //-를해야 음수로 왼쪽으로 이동
  //slides{transform:translateX(-1150px);}
  //css방식이면 이런식
  slides.style.transform = "translateX(" + initialTranslateValue + "px)";
  // `translate(${변수}px)`랑 똑같음

  //slides 처음 시작값 설정
  //이거리가 1150이였음 -1150찍힘
  //쓰는부분 이해가 잘안감
  //ul값
}

nextBtn.addEventListener("click", function () {
  moveSlide(currentIdx + 1);
});

prevBtn.addEventListener("click", function () {
  moveSlide(currentIdx - 1);
});

//자동슬라이드는 셋인터벌로 자동으로 moveslide에 넘겨줘야함

//clearInterval(timer);
//기존에 빈값으로하면 cleartimeout할때 변수값이 숫자로바껴서
//타입을 콕집어서 undefined로함

let timer = undefined;
//숫자로 나오니까 undefined로 아예지정
//마우스가 바깥으로 나가면 동작하고 안에잇으면 안하고하게 하려고함
function autoSlide() {
  if (timer == undefined) {
    timer = setInterval(function () {
      moveSlide(currentIdx + 1);
    }, 3000);
    //3초씩자동이동
  }
}
autoSlide();
//자동으로 움직임

function stopSlide() {
  clearInterval(timer);

  timer = undefined;
  //다시 undefined로 지정해줘야 오류가없음
}
slides.addEventListener("mouseenter", function () {
  stopSlide();
});
//마우스가 들어오면 작동멈춤
slides.addEventListener("mouseleave", function () {
  autoSlide();
});
//마우스가 나가면 다시 작동
prevBtn.addEventListener("mouseenter", function () {
  stopSlide();
});
nextBtn.addEventListener("mouseenter", function () {
  stopSlide();
});

//마우스가 들어오면 작동멈춤
prevBtn.addEventListener("mouseleave", function () {
  autoSlide();
});
nextBtn.addEventListener("mouseleave", function () {
  autoSlide();
});
//마우스가 나가면 다시 작동

//하나씩이동은 left값이 -230
//전체가 이동한다
function moveSlide(num) {
  slides.style.left = -num * (slideWidth + slideMargin) + "px";
  //만약 한번눌러서 1들어오면 -1*(610)px만큼 이동
  currentIdx = num;
  // console.log(currentIdx);
  //한번실행됐으니 currentidx값을 0에서 1로바꿔줘야함 이동했으니

  //   0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5,
  //  -6,-5,-4,-3,-2,-1, 0, 1, 2, 3, 4, 5, 6 << currentIdx

  if (currentIdx == slideCount || currentIdx == -slideCount) {
    //6 ==6로 같을때가(next누를때) 마지막일때(6에서 1로바뀔때) 눈속임으로 처음으로 보내야함
    // 또는 왼쪽으로(prev누를때)가서 currentIdx가 -6일때 처음
    setTimeout(function () {
      slides.classList.remove("animated");
      slides.style.left = "0px";
      currentIdx = 0;
    }, 500);
    //계속클릭하면 remove로 animated 바뀌는 과정을 지워서 안보임
    //다시 animated를 시간지난뒤 다시넣어줘야함
    setTimeout(function () {
      slides.classList.add("animated");
    }, 600);

    //값을 처음으로가기위해 초기화시킴
    //slides.classList.remove("animated");
    // slides.style.left = "0px";
    // currentIdx = 0;
    //위에 세줄작업은 0.5초가 지난뒤에해야함
    //안그럼 이동 하는것도 안보이고 초기화가됨
    //몰래 중간 1번으로 바꿔놈
  }
}

//사용자 몰래 ul의 left값을 다시 0으로바꿔야 마지막 안끊김
//currentIdx 가 5라면

// ----------------------------------------------------슬라이드 2
let slides2 = document.querySelector(".slides2");
//ul태그 class갖고옴 전체
let slide2 = document.querySelectorAll(".slides2 li");

//각각 가져옴 슬라이드 li
let currentIdx2 = 0;
//슬라이드위치파악
let slideCount2 = slide2.length;
//슬라이드 본원래길이가 6임

let slideWidth2 = 600;
//사진 넓이 600똑같이
let slideMargin2 = 10;
//마진 10똑같이
let prevBtn2 = document.querySelector(".prev2");
let nextBtn2 = document.querySelector(".next2");
//버튼 불러옴

makeClone2();
//클론부르는함수

function makeClone2() {
  for (let i = 0; i < slideCount2; i++) {
    //길이 6면 배열은 0부터 1 2 3 4 5임
    //a.cloneNode()-> a요소를 그대로복사 acloneNode(true)->a의 자식요소까지 복사
    let cloneSlide2 = slide2[i].cloneNode(true);
    //자식까지 복사 전체 li복사해서 cloneSlide에넣는다
    cloneSlide2.classList.add("clone2");
    //clone이라는 클래스를 추가함
    //a.appendChild(b) a요소 기존에 내용 뒤에 b를 추가한다
    //1 2 3 4 5 6순으로복사해서 6뒤에 그대로붙임
    slides2.appendChild(cloneSlide2);
    // 1 2 3 4 5 6   clone 1 2 3 4 5 6
    //기존 1~6 클론 1~6
  }
  for (let i = slideCount2 - 1; i >= 0; i--) {
    //5부터시작해서 인덱스 5번째 4번째 3번재 2번째 1번째 순으로 복사
    //1 2 3 4 5 6 1 2 3 4 5 6
    let cloneSlide2 = slide2[i].cloneNode(true);
    //6 5 4 3 2 1순으로 복사해서 붙여야함 1번앞에
    cloneSlide2.classList.add("clone2");
    //a.prepend(b) a요소앞에 b를 추가 기존li 랑 위에서 클론태그 합한게 a인듯
    slides2.prepend(cloneSlide2);
  }
  updateWidth2();
  setInitialPos2();

  setTimeout(function () {
    slides2.classList.add("animated2");
  }, 100);
  //slides.classList.add("animated");이것만 적으면 이동하는게 보임
  //-1150으로 바뀌는과정 이동하는게 보이면 안되니까 다 배치후에 작동해야함 그래서 settimeout씀
  //100이면 0.1초이다
  //초기위치잡는함수  setInitialPos 복사본 원본 복사본 원본이 중간에와야함
  //slideCount가 5라서 5번 li는 4번이라 -1함
  //slides전체 넓이가 복붙한 전체 넓이가돼야함
  //사진 200 마진 30 인데 총 15개니까 230 * 15한다음 제일마지막 마진 30빼야함
}

function updateWidth2() {
  let currentSlides2 = document.querySelectorAll(".slides li");
  //새롭게 합쳐진(복사본포함) 전체 슬라이드를 담음
  let newSlideCount2 = currentSlides2.length;
  //전체길이는 18가된다

  let newWidth2 = (slideWidth2 + slideMargin2) * newSlideCount2 + "px";
  //전체 넓이
  slides2.style.width = newWidth2;
}

//슬라이드 기준이 왼쪽으로 이동해서 중간에 와야함
//left값은 슬라이드 이동하는 용도로쓰고
//트랜스폼 트랜스레이트로 x축으로 왼쪽으로 마이너스 얼마나 가야할지 계산
function setInitialPos2() {
  let initialTranslateValue2 = -(slideWidth2 + slideMargin2) * slideCount2;
  //초기값 길이 6개만큼 넓이 -6이동시켜야 원본이 중간에옴
  //초기값 원래 6개있었으니 slidecount를 곱함
  //-를해야 음수로 왼쪽으로 이동
  //slides{transform:translateX(-1150px);}
  //css방식이면 이런식
  slides2.style.transform = "translateX(" + initialTranslateValue2 + "px)";
  // `translate(${변수}px)`랑 똑같음

  //slides 처음 시작값 설정
  //이거리가 1150이였음 -1150찍힘
  //쓰는부분 이해가 잘안감
  //ul값
}

nextBtn2.addEventListener("click", function () {
  moveSlide2(currentIdx2 + 1);
});

prevBtn2.addEventListener("click", function () {
  moveSlide2(currentIdx2 - 1);
});

//자동슬라이드는 셋인터벌로 자동으로 moveslide에 넘겨줘야함

//clearInterval(timer);
//기존에 빈값으로하면 cleartimeout할때 변수값이 숫자로바껴서
//타입을 콕집어서 undefined로함

let timer2 = undefined;
//숫자로 나오니까 undefined로 아예지정
//마우스가 바깥으로 나가면 동작하고 안에잇으면 안하고하게 하려고함
function autoSlide2() {
  if (timer2 == undefined) {
    timer2 = setInterval(function () {
      moveSlide2(currentIdx2 + 1);
    }, 3000);
    //3초씩자동이동
  }
}
autoSlide2();
//자동으로 움직임

function stopSlide2() {
  clearInterval(timer2);

  timer2 = undefined;
  //다시 undefined로 지정해줘야 오류가없음
}
slides2.addEventListener("mouseenter", function () {
  stopSlide2();
});
//마우스가 들어오면 작동멈춤
slides2.addEventListener("mouseleave", function () {
  autoSlide2();
});
//마우스가 나가면 다시 작동
prevBtn2.addEventListener("mouseenter", function () {
  stopSlide2();
});
nextBtn2.addEventListener("mouseenter", function () {
  stopSlide2();
});

//마우스가 들어오면 작동멈춤
prevBtn2.addEventListener("mouseleave", function () {
  autoSlide2();
});
nextBtn2.addEventListener("mouseleave", function () {
  autoSlide2();
});
//마우스가 나가면 다시 작동

//하나씩이동은 left값이 -230
//전체가 이동한다
function moveSlide2(num) {
  slides2.style.left = -num * (slideWidth2 + slideMargin2) + "px";
  //만약 한번눌러서 1들어오면 -1*(610)px만큼 이동
  currentIdx2 = num;
  //한번실행됐으니 currentidx값을 0에서 1로바꿔줘야함 이동했으니

  // console.log(currentIdx, slideCount);

  if (currentIdx2 == slideCount2 || currentIdx2 == -slideCount2) {
    //6 ==6로 같을때가(next누를때) 마지막일때(6에서 1로바뀔때) 눈속임으로 처음으로 보내야함
    // 또는 왼쪽으로(prev누를때)가서 currentIdx가 -6일때 처음
    setTimeout(function () {
      slides2.classList.remove("animated2");
      slides2.style.left = "0px";
      currentIdx2 = 0;
    }, 500);
    //계속클릭하면 remove로 animated 바뀌는 과정을 지워서 안보임
    //다시 animated를 시간지난뒤 다시넣어줘야함
    setTimeout(function () {
      slides2.classList.add("animated2");
    }, 600);

    //값을 처음으로가기위해 초기화시킴
    //slides.classList.remove("animated");
    // slides.style.left = "0px";
    // currentIdx = 0;
    //위에 세줄작업은 0.5초가 지난뒤에해야함
    //안그럼 이동 하는것도 안보이고 초기화가됨
    //몰래 중간 1번으로 바꿔놈
  }
}

//사용자 몰래 ul의 left값을 다시 0으로바꿔야 마지막 안끊김
//currentIdx 가 5라면
