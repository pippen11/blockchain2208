

// // 숫자 선택(2개)를 선택<< 2개의 숫자를 저장해야한다<<
// // 플레이어가 선택한 숫자를 기억해야하기때문에
// let firstNum;
// let secondNum;
// let count = 0;
// // count가 뭐냐? 몇번 클릭했는지 ? 즉 클릭한 횟수
// // 카운트를 쓰느냐? 안쓰느냐?
// // 안쓰면 firstNum가 비어있는지<< 정의가 되지않았는지<< undefined( 정의가 되지않은 변수의값 ) || null
// function numSel() {
//   if (clickcount == 0) {
//     // console.log(clickcount);
//     firstNum = 7;
//   } else if (clickcount == 1) {
//     // console.log("clickcount");
//     // console.log(clickcount);
//     secondNum = 7;
//   } else {
//   }
//   clickcount++; // 클릭했을때 클릭한 횟수증가
// }

// function numSel1() {
//   if (clickcount == 0) {
//     firstNum = 8;
//   } else if (!clickcount == 1) {
//     secondNum = 8;
//   } else {
//   }
//   clickcount++;
// }

// // function numSel() {
// //  clickcount++;   /* 클릭했을때 클릭한 횟수 증가 */
// //  if (clickcount == 1){}
// //       console.log(clickcount);
// //       firstNum = 7;
// //     } else if (clickcount == 2) {
// //       // console.log("clickcount");
// //       // console.log(clickcount);
// //       secoundNum = 7;
// //     } else {
// //       console.log(clickcount);
// //     }
// //
// //     firstNum = 7;
// //

// ; function numSel(num) {
// ;   // let num; 위에 (num)과 같다.
// ;   // 함수 스코프({})안에서만 사용된다.
// ;   // 함수 밖에서 선언된 전역변수, 지역변수등 "이름이 같은 다른변수"와 다른변수다.
// ;   //  밖에서 num = 1; 했어도 안에서는 undefined가 뜰수있따<< 호출시 () 안이 비어있다
// ;   // 이후 htML 11번줄(7번넘셀있는거)에서 () 안에 7을 넣음으로써 "num=7"로 정의한다.
// ;   clickcount++;
// ;   if (clickcount == 1) {
// ;     // console.log(clickcount);
// ;     firstNum = num;
// ;   } else if (clickcount == 2) {
// ;     // console.log("clickcount");
// ;     // console.log(clickcount);
// ;     secondNum = num;
// ;   }
// ;   // 클릭했을때 클릭한 횟수증가
// ; }
// ; // 이게 완성본 ,숙제는 싹다여태한거 뭐면 뭐라고 딱나오게 정리

// ; function calculate(order) {
// ;   // order는 위에 num과 마찬가지로 매개변수
// ;   if (clickcount < 2) return;
// ;   //   clickcount가 2미만일때, 즉 0이거나 1일때, 다른말로 숫자 클릭을 2번이상 하지 않았을때
// ;   // 즉 숫자가 2개가 아닐때 return 사용해서 함수를 멈춘다.

// ;   switch (order) {
// ;     case "+":
// ;       alert(firstNum + secondNum);
// ;       break;
// ;     case "%":
// ;       alert(firstNum % secondNum);
// ;       break;

// ;     default:
// ;       break;
// ;   }
// ; }

// ; // 카운트를 증가시키는 코드(clickcount++)이 위에있기때문에 1이증가한상태로 확인함 그래서 1일때한번확인 clickcount위에있으면

// ; function check() {
// ;   // check 함수를 이용해서 현재 저장된 숫자들(변수)를 확인

// ;   console.log(firstNum);
// ;   console.log(secondNum);
// ; }





let firstNum;
let secondNum;
let count = 0;

function numSel() {
  if (clickcount == 0) {
    
    firstNum = 7;
  } else if (clickcount == 1) {
    
    secondNum = 7;
  } else {
  }
  clickcount++; 
}

function numSel1() {
  if (clickcount == 0) {

    firstNum = 8;
  } else if (!clickcount == 1) {

    secondNum = 8;
  } else {
  }
  clickcount++;
}



; function numSel(num) {

;   clickcount++;
;   if (clickcount == 1) {
;     
;     firstNum = num;
;   } else if (clickcount == 2) {
;    
;     secondNum = num;
;   }
;  
; }
; /

; function calculate(order) {
;   
;   if (clickcount < 2) return;
;   

;   switch (order) {
;     case "+":
;       alert(firstNum + secondNum);
;       break;
;     case "%":
;       alert(firstNum % secondNum);
;       break;

;     default:
;       break;
;   }
; }

;

; function check() {
;   console.log(firstNum);
;   console.log(secondNum);
; }
