// //코테 1번 짝수 홀수
function solution() {
  if (num % 2 == 0) {
    return "Even";
  } else {
    return "Odd";
  }
}

// Even 스트링과 변수랑 확실하게 하기

//코테 2번 평균구하기
// let num = a;

// -10000 <= a <= 10000;

// console.log(num);

// // let arr = [num];

// // 1 <= arr.length <= 100;

// // console.log();

// // function solution(arr) {
// //   // arr=/arr.length return;
// // }

// let arr = [5, 10];

// let sum = 0;

// arr.forEach((item) => {
//   sum += item;
// });

// console.log(sum);
// let sum = 0;
// for (let i = 0; i < arr.length; i++) {
//   sum += arr[i];
// }
// return sum / arr.length;
// arr = [1, 2, 3, 4];
// let sum = 0;
// arr.forEach((item) => {
//   sum += item;
// });
// console.log(sum / arr.length);

// function solution(arr) {
//   let sum = 0;
//   arr.forEach((item) => {
//     sum += item;
//   });
//   return sum / arr.length;
// }

//for문 forEach문 익숙하지않은거랑 새로운변수 선언하나해서 넣는거생각해야함

//코테 1번은 삼항연산자로 한줄로끝남
//코테 2번

function solution(arr) {
  return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
}
//이전값 현재값 ,0 초기값?

[1, 2, 3, 4];

prev + curr;
0 + 1;
1 + 2;
3 + 3;

//3번

function solution(n) {
  let answer = 1;
  for (let i = 1; i < n / 2; ++i) if (!(n % 1)) answer += i + n / i;
  return answer - 1;
}

//n 4일때 문제가있다 n=4 i=1=>1+4 i=2=>2+2

//4

function solution(n) {
  // let nStr=n.toString();
  // let nArr=nStr.split('');
  // let result=nArr.reduce((prev,curr)=>prev+ +curr,0);
  //밑에랑 똑같은말임

  return n
    .toString()
    .split("")
    .reduce((prev, curr) => prev + +curr, 0);
}

//5번 자연수 뒤집어 배열로 만들기

function solution(n) {
  return n
    .toString()
    .split("")
    .map((_, index, arr) => {
      //_ : 값을 쓰지않을때 통상적으로 사용한다 < 우리는 배열내의 아이템은 사용하지않는다.
      // map, forEach의 경우 value, index, array순으로 매개변수를 받아올수있다
      return +arr[arr.length - 1 - index];
    });
}

function solution(n) {
  return n
    .toString()
    .split("")
    .reverse()
    .map((item) => +item);
}

//정수 제곱근 판별

function solution(n) {
  let answer = parseInt(Math.sqrt(n));
  //sqrt는 루트
  //4=>2, 0=>3 5~8=>2.xxx=>2
  if (n === Math.pow(answer, 2)) return Math.pow(answer + 1, 2);
  //pow는 제곱
  return -1;
}

//다른 풀이
//let answer = parseInt(Math.sqrt(n));
//if(!(answer%1))return Math.pow(answer+1,2)
//return -1;
