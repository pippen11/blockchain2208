// 230112 n의배수구하기 5시 2분
// let n = 3;
// let numlist = [4, 5, 6, 7, 8, 9, 10, 11, 12];

// if (numlist % n == 0) {
//   console.log(numlist % n);
// }
// let my_string = "BCBdbe";
// let letter = "B";
// let answer = [];
// answer.push(my_string);
// answer.split("");
// console.log(answer);

// for (let i = 0; i < my_string.length; i++) {}

// 9시 44분 삼각형 완성조건 10시

// let sides = [3, 6, 2];
// sides.sort((a, b) => a - b);
// console.log(sides);
// if (sides[2] < sides[0] + sides[1]) {
//   console.log("1");
// } else {
//   console.log("2");
// }

// 특정문자 제거하기 10시
// let letter = "B";
// let my_string = "BCBdbe";
// const arr = my_string.split("");
// let temp = [];
// function test() {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] == letter) {
//       continue;
//     }
//     temp.push(arr[i]);
//   }

//   return temp;
// }
// test();
// let length = temp.length;
// console.log(length);
// string = "";
// let sum = string + temp;
// while (sum.length !== 1) {
//   let result = sum.replace(",", "");

//   console.log(result);
// }

// // 8시 30 분 짝수는 싫어요
// let n = 15;
// let array = [];
// for (let i = 1; i < n + 1; i++) {
//   if (i % 2 != 0) {
//     array.push(i);
//   }
// }
// console.log(array);

// 8시 39분 문자 반복 출력하기

// let my_string = "hello";
// let n = 3;

// let string = my_string.repeat(n);
// let test = string.split("");
// test.sort((b, a) => b - a);
// console.log(test);

// let array = [];
// array.push(string);
// let test = array.split("");

// console.log(test);

// let my_string = "hello";
// let n = 3;
// let sum = my_string.split("");
// // console.log(sum);

// for (let i = 0; i < sum.length; i++) {
//   let tum = sum[i] + sum[i] + sum[i];
//   console.log(tum);
// }

// 11시 15분 중앙값 구하기
// let array = [1, 2, 7, 10, 11];
// let array2 = [9, -1, 0];
// // 3->2 5->3 7->4 9->5

// let sort = array.sort((a, b) => a - b);
// console.log(sort[parseInt(sort.length / 2)]);

//11시 48분 배열의 유사도

// let s1 = ["a", "b", "c"];

// let s2 = ["com", "b", "d", "p", "c"];

// let lengths = s2.length + s1.length;
// let sumone = "";
// function s1Func(s1) {
//   for (let i = 0; i < lengths; i++) {
//     if (s1[i] !== undefined) {
//       let test = s1[i];
//       //   console.log(test);
//       return test;
//     }
//   }
// }
// let s2Func = () => {
//   for (let i = 0; i < lengths; i++) {
//     if (s2[i] !== undefined) {
//       let test1 = s2[i];
//       // console.log(test1);
//     }
//   }
// };
// s1Func(s1);
// console.log(s1Func(s1));

// 12시 25분 순서쌍의 개수

// 1시 40분 문자열안에 문자열
// let str1 = "ab6CDE443fgh22iJKlmn1o";
// let str2 = "6Cf";

// if (str1.includes(str2)) {
//   console.log("1");
// } else {
//   console.log("2");
// }

// console.log(str1.split(str2));

// 2시 26분 제곱수 판별하기

//2시 35분 개미군단
// let hp = 23;
// let hp2 = 24;
// let hp3 = 999;

// let one = 5;
// let two = 3;
// let three = 1;

// let first = parseInt(hp / one);

// // console.log(first);

// let second = parseInt(hp % one);

// let third = parseInt(second / two);

// // console.log(third);

// let firth = parseInt(second % two);

// console.log(firth);

// let fifth = parseInt(firth / three);

// console.log(fifth);

// console.log(third);

// function solution(hp) {
//   let one = 5;
//   let two = 3;
//   let three = 1;
//   let first = parseInt(hp / one);
//   let second = parseInt(hp % one);

//   let third = parseInt(second / two);
//   let firth = parseInt(second % two);
//   let fifth = parseInt(firth / three);
//   let sum = first + third + fifth;
//   return sum;
// }
// function solution(hp) {
//   return Math.floor(hp / 5) + Math.floor((hp % 5) / 3) + ((hp % 5) % 3);
// }

// console.log(solution(999));

// 4시 40분 숨어있는 숫자의 덧셈

// let my_string = "aAb1B2cC34oOp";

// // let test = my_string.split("");
// let array = [];
// let testone = my_string.match(/\d+/g);
// let test = testone.join("");
// console.log(test);
// let test2 = test.split(",");
// let count = 0;
// test2.forEach((item) => {
//   count += item;
// });
// console.log(count);

// //6시 56분 모음제거
// let my_string = "nice to meet you";
// let alpa = "a,e,i,o,u";
// let alpas = alpa.split("");
// let test = my_string.split("");

// if(alpas[i]==test[i]){
//   array.
// }

// function solution(numbers, direction) {
//   var answer = [];
//   let cnt = 0;
//   while (cnt <= numbers.length) {
//     console.log(cnt);
//     console.log(numbers);
//     if (direction == "right") {
//       numbers[numbers.length - 1] = numbers[0];
//       numbers[cnt] = numbers[cnt + 1];
//     }
//     cnt = cnt + 1;
//   }
//   return answer;
// }

// console.log(solution([1, 2, 3], "right"));
// const a = [];
// a[100] = 1;
// console.log(a.length);
// console.log(a);

// function solution(age) {
//   var answer = "";
//   let cnt = 0;
//   answer = answer + age;
//   let test = answer.split("");
//   for (let i = 0; i < test.length; i++) {
//     if (test[i] == cnt + 1) {
//       test[i] = "c";
//     }
//     cnt++;
//     console.log(test);
//   }
//   return answer;
// }

// console.log(solution(23));

//5시 23분 최댓값만들기 5시 39분
// 오름차순으로 정렬한다
// 0보다작은수가 두개일때 작은수 두개를곱함
// 0보다 작은수가 한개일때 큰수 두개를 곱함
// 0보다 다큰수일때 큰수 두개를 곱함

// numbers = [1, 2, -3, 4, -5];
// numbers.sort((a, b) => a - b);
// console.log(numbers);
// let cnt=0
// while(cnt<=numbers.length){
// if(numbers[cnt]<0)
//     cnt=cnt+1
// }

//5시 40분 약수구하기
// let n = 24;
// let answer = [];
// for (let i = 1; i <= n / 2; i++) {
//   if (n % i == 0) {
//     answer.push(i);
//   }
// }
// answer.push(n);
// console.log(answer);
// [].conta

//7시45분 숫자 찾기
// let num = 29183;
// let k = 1;
// let count = 0;
// let test = num.toString();

// let kk = k.toString();

// for (let i = 0; i < test.length; i++) {
//   if (test[i] == kk) {
//     console.log(i + 1);
//   }
// }

// let order = 3;
// let test = order.toString();
// let count = 0;

// for (let i = 0; i < test.length; i++) {
//   if (test[i] == "3" || test[i] == "6" || test[i] == "9") {
//     count++;
//   }
// }
// console.log(count);

//1.각 수로 쪼갬

// 8시 28분 문자열 정렬하기(2)

// let my_string = "Python";

// let test = my_string.toLowerCase();

// let testtwo = [...test];

// console.log(testtwo);

// let testone = testtwo.sort();

// console.log(testone.join(""));

console.log(solution(23));
