function solution(num1, num2) {
  let answer = parseInt((num1 / num2) * 1000);
  //1. number->string
  //2. 10진수 추론을위해 string앞 2글자가 ox나 oX인지 비교
  console.log("MF(-1.1)", Math.floor(-1.1));
  //이게 수학적으로 소수점버리는거
  console.log("parseInt(-1.1)", parseInt(-1.1));
  return;
}

solution(1, 2);

//분수의 덧셈 혼자풀어보기
// function solution(denum1, num1, denum2, num2) {
//   let answer = [];
//   const denum = denum + num2 + denum2 * num1;
//   const num = num1 * num2;

//   let minNumber; // 변수 밖에다 선언
//   if (denum < num) {
//     minNumber = denum;
//   } else {
//     minNumber = num;
//   }
//   return answer;
// }
// while (true) {
//   if (denum % minNumber === 0) {
//     if (num % minNumber === 0) {
//       return [decum / minNumber, num / minNumber];
//     }
//   }
//   minNumber = minNumber - 1;
// }

//while계속 돌다가 return만나면 나감
//이런식으로 이중 if문적고 배열로 내보내기가능

// 1.분모덧셈, 2.분자분모의 최대공약수로 나눔, 3. 분자분모중 작은수 찾음 4. 작은수를 분자분모로 나눔 5.둘다 나누어떨어지면 그나눈수가 최대공약수 ,6 안나누어떨어지면 작은수1 줄이고 2-2로돌아감
// 나누어떨어지는거 나머지가 0
//=== ,!== , > ,>= , < ,<= ->결과값이 true or false로 보여야함
//if(true/false){
// true일때 실행
//}

//함수안에서 return을 만나는순간 끝난다

//

// // 배열두개만들기
// let count = 0;
// while (count < 10) {
//   console.log(count);
//   answer.push(numbers[count]*2)
//   count += 1;
// }

// for (let count = 0; count < 10; count += 1) {
//   console.log(count);
// }
// answer.push(numbers[0] * 2);
// answer.push(numbers[1] * 2);
// answer.push(numbers[2] * 2);
// answer.push(numbers[3] * 2);
// answer.push(numbers[4] * 2);
// answer.push(numbers[5] * 2);
// answer.push(numbers[6] * 2);
// answer.push(numbers[7] * 2);
// answer.push(numbers[8] * 2);
// answer.push(numbers[9] * 2);

//코드실행순서보기
// array = [9, -1, 0];
// function solution(array) {
//   let minNumber = 1000;
//   if (minNumber > array[0]) {
//     minNumber = array[0];
//     console.log(minNumber);
//   }
//   if (minNumber > array[1]) {
//     minNumber = array[1];
//     console.log(minNumber);
//   }
//   if (minNumber > array[2]) {
//     minNumber = array[2];
//     console.log(minNumber);
//   }
// }
// solution(array);

//중앙값구하기 메서드안쓰고 짜보기
// let minNumber = 1000;

// let cnt = 0;
// while (cnt < array.length) {
//   if (minNumber > array[cnt]) {
//     minNumber = array[cnt];
//   }
//   cnt = cnt + 1;
// }
