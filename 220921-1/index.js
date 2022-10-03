let children = [...document.getElementById("parent").children]; //<<얘는 배열이라아니라 컬렉션이라고 한다.
//앞에 children은 선언한 변수 children 뒤에는 parent안에 children
//...은 스프레드이다 공부해보기
//forEach를 쓰고싶으면 배열로 변환해야한다
//변환 방법=> [...변환할 변수]

// children.forEach((elem) => {
//   console.log(elem);
// });

// console.log(document.getElementsByClassName("child"));
// //클래스명을 찾아서 Element들을 가져온다.

// children = document.getElementsByClassName("child");

// console.log(children[0]);

// children[0].onclick = () => {
//   alert("온클릭");
// };
// //html에 안넣고 js에 넣어서 온클릭함수를 이렇게 넣을수있다.

// function onClick(num) {
//   console.log(num + "번째 자식을 클릭했어!");
// }

[...children].forEach(function (elem, index) {
// forEach 매개변수함수에 매개변수로 (item, index) 형식으로 받을수있으며
// item은 배열의 아이템 하나하나, index해당 아이템의 인덱스번호(몇번째 아이템인가?)
// forEach는 배열의 아이템을 하나하나 가져와서 매개변수 함수로 전달된 함수에 매개변수로 전달해서 함수로 호출한다.
// foreach돌리고 싶어서 배열로바꾸고싶음 유사배열을 배열로 바꿔줌
// html컬렉션으로 가져와서 유사배열--> 배열이아니고 엘리먼트관련은 유사배열
  elem.onmouseover = () => {
        elem.classList.toggle("hover")};
//   onMouseover같은게 이벤트함수이다.
//   elem.onamouseleave = () => {
//     elem.classList.toggle("hover");
//   };
//   elem.onclick = function () {
//     onClick(index);
//     console.log(elem.innerHTML);
//     // if (elem.classList.contains("on")) {
//     //   //contains 메서드는 매개변수로 전달된 문자열(string)이 클레스에 포함되어있는지를 확인한다

//     //   elem.classList.remove("on");
//     //   //remove메서드는 클래스를 삭제한다.
//     // } else elem.classList.add("on");
//     // //classList는 엘리먼트의 클래스를 관리하는 객체이다.
//     // // add 메서드는 클래스를 추가한다.
//     elem.classList.toggle("on");

//     //toggle 메서드는 클래스가 있으면 없애고 없으면 추가한다.
//     //classList는 프로퍼티 elem객체 안에있는애다
//   };
// });

// // elem은 객체 아이템이다 값

// const tempArr = ["a", "b", "c"];

// //for each
// tempArr.forEach((item, index) => {
//   console.log(item + ":" + index + "번째 아이템");
//   //forEach의 유일한?단점 :멈출수없다. break가 안먹음
// });
// //forEach결과
// //a : 0번째 아이템
// //b : 1번째 아이템
// //c : 2번째 아이템

// for (let index = 0; index < tempArr.length; ++index) {
//   const item = tempArr[index];
//   //forEach에서 사용하는 item이랑 변수 통일하기 위해서 초기화
//   console.log(item + ":" + index + "번째 아이템");
// }

// console.log(document.getElementById("parent").innerHTML);
// //HTML 기준으로 텍스트를 가져온다.(전체태그다)
// console.log(document.getElementById("parent").innerText);
// //HTML 태그 등등을 제외한 텍스트만 가져온다. 안에내용만?

// document.getElementById("btn").onclick = () => {
//   //버튼 클릭시 실행
//   console.log(document.getElementById("BTS").value);
//   //bTS에 입력된값을 로그로 출력한다.
//   document.getElementById("btn").style.backgroundColor = "#ff0000";
// };
