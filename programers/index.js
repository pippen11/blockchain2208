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

// console.log(solution(23));

// function solution(chicken) {
//   let answer = 0;

//   return answer;
// }
// let cp = 0;
// chicken = 1081;
// let answer = 0;

// let a = chicken / 10;
// let b = a / 10;
// let c = b / 10;
// let d = c / 10;
// let e = d / 10;
// let f = e / 10;
// // let g = f / 10;

// answer = Math.floor(a + b + c);

// console.log(answer);

// let box = [10, 8, 6];

// let n = 3;
// let sum = 1;
// for (let i = 0; i < box.length; i++) {
//   let test = Math.floor(box[i] / n);
//   sum *= test;
// }
// console.log(sum);

//10시 5분
// let my_string = "p2o4i8gj2";

// let test = [...my_string];
// let array = [];
// // console.log(test);

// // console.log(Number(test[0]));

// for (let i = 0; i < test.length; i++) {
//   let sum = Number(test[i]);
//   //   console.log(sum);
//   if (!isNaN(sum)) {
//     array.push(sum);
//   }
// }
// let last = array.sort((a, b) => a - b);
// console.log(last);

//8시 29분
// numbers = [4, 455, 6, 4, -1, 45, 6];

// direction = "right";
// direction = "right";

// numbers.unshift(numbers.pop());

// if (direction == "right") {
//   let test = numbers.pop(numbers[numbers.length - 1]);
//   numbers.unshift(test);
//   console.log(numbers);
// } else {
//   let a = numbers.shift(numbers[0]);
//   numbers.push(a);
//   console.log(numbers);
// }

// console.log(test);
// for (let i = 0; i < numbers.length; i++) {
//   if (direction == "right") {
//   }
// }

//11시 2분
// let age = 999;

// let a = age.toString();

// let answer = "";

// for (let i = 0; i < a.length; i++) {
//   if (a[i] == "0") {
//     let first = (a[i] = "a");
//     answer += first;
//   }
//   if (a[i] == "1") {
//     let second = (a[i] = "b");
//     answer += second;
//   }

//   if (a[i] == "2") {
//     let test = (a[i] = "c");
//     answer += test;
//   }
//   if (a[i] == "3") {
//     let testone = (a[i] = "d");
//     answer += testone;
//   }
//   if (a[i] == "4") {
//     let testtwo = (a[i] = "e");
//     answer += testtwo;
//   }
//   if (a[i] == "5") {
//     let tsthree = (a[i] = "f");
//     answer += tsthree;
//   }

//   if (a[i] == "6") {
//     let tsfour = (a[i] = "g");
//     answer += tsfour;
//   }
//   if (a[i] == "7") {
//     let tsfive = (a[i] = "h");
//     answer += tsfive;
//   }
//   if (a[i] == "8") {
//     let tssix = (a[i] = "i");
//     answer += tssix;
//   }
//   if (a[i] == "9") {
//     let tsfive = (a[i] = "j");
//     answer += tsfive;
//   }
// }

// let age = 100;

// let a = age
//   .toString()
//   .split("")
//   .map((v) => "abcdefghij"[v])
//   .join("");

// console.log(a);

// return age
//   .toString()
//   .split("")
//   .map((v) => "abcdefghij"[v])
//   .join("");

//12시 3분

// let n = 7;
// let answer = 0;
// for (let i = 1; i <= n; i++) {
//   if ((6 * i) % n == 0) {
//     answer += i;
//     break;
//   }
// }
// console.log(answer);

// let piece = 6

// while(true) {
//     if (piece % n === 0) {
//         break
//     }
//     piece += 6
// }

// return piece / 6

// let numbers = [-10, -20, -30, -5, -5, -20, -5];

// let a = numbers.sort((a, b) => b - a);
// let count = 0;
// let cp = 0;
// let cnt = 0;
// let cptwo = 0;

// console.log(a);

// for (let i = 0; i < a.length; i++) {
//   if (a[i] > 0) {
//     cnt++;
//   }
//   if (cnt >= 2) {
//     let testone = a[0] * a[1];
//     cptwo += testone;
//     break;
//   }
// }
// for (let i = 0; i < a.length; i++) {
//   if (a[i] < 0) {
//     count++;
//   }

//   if (count >= 2) {
//     let test = a[a.length - 1] * a[a.length - 2];
//     cp += test;
//     break;
//   }
// }
// if (cptwo > cp) {
//   console.log(cptwo);
// }
// if (cp > cptwo) {
//   console.log(cp);
// }
// console.log(cptwo);
// console.log(count);
// for (let i = 0; i < a.length; i++) {
//   //   console.log(a[i]);
//   if (a[i] < 0 ) {
//     let test = a[i] * a[i + 1];
//     console.log(test);
//     break;
//   }
// }

// let numbers = [1, 2, -3, 4, -5];
// let answer = [];
// for (let i = 0; i < numbers.length - 1; i++) {
//   for (let j = i + 1; j < numbers.length; j++) {
//     answer.push(numbers[i] * numbers[j]);
//   }
// }
// console.log(answer);
// // console.log(test);
// let max = Math.max(...answer);

// console.log(max);

// function solution(numbers) {
//     var answer = [];
//     for(let i = 0; i < numbers.length - 1; i++){
//         for(let j = i + 1; j < numbers.length; j++){
//             answer.push(numbers[i] * numbers[j]);
//         }
//     }
//     return Math.max(...answer);
// }

// function solution(numbers) {
//     numbers.sort((a, b) => a - b);
//     return Math.max(numbers[0]*numbers[1], numbers[numbers.length-1]*numbers[numbers.length-2]);
// }

//2시 56분
// let my_string = "hello";

// let num1 = 1;
// let num2 = 2;

// let array = [...my_string];
// // console.log(array);
// let answer = "";
// let sum = array.splice(num1, 1, array[num2]);
// array.splice(num2, 1, sum);
// // console.log(array);
// for (let i = 0; i < array.length; i++) {
//   let test = array[i];
//   answer += test;
// }
// console.log(answer);
// // let sum = array.push(test);
// // console.log(sum);
// // console.log(test);

// function solution(my_string, num1, num2) {
//     my_string = my_string.split('');
//     [my_string[num1], my_string[num2]] = [my_string[num2], my_string[num1]];
//     return my_string.join('');
// }

// // 4시 4분
// let morse = {
//   ".-": "a",
//   "-...": "b",
//   "-.-.": "c",
//   "-..": "d",
//   ".": "e",
//   "..-.": "f",
//   "--.": "g",
//   "....": "h",
//   "..": "i",
//   ".---": "j",
//   "-.-": "k",
//   ".-..": "l",
//   "--": "m",
//   "-.": "n",
//   "---": "o",
//   ".--.": "p",
//   "--.-": "q",
//   ".-.": "r",
//   "...": "s",
//   "-": "t",
//   "..-": "u",
//   "...-": "v",
//   ".--": "w",
//   "-..-": "x",
//   "-.--": "y",
//   "--..": "z",
// };
// console.log(morse["-..-"]);
// // console.log(morse[".-"]);
// // let keys = Object.keys(morse);
// // let value = Object.values(morse);
// let ent = Object.entries(morse);
// // // let testlast = ent.join("");
// // // console.log(testlast);

// // // console.log(keys.length);
// // // console.log(keys[0]);
// // // console.log(keys);

// let letter = ".... . .-.. .-.. ---";

// // let test = letter.split(" ");
// // // console.log(test);
// // // console.log(keys);
// // let answer = "";

// // // console.log(test);
// // // console.log(test[0]);

// // for (let i = 0; i < keys.length; i++) {}

// let test = letter.split(" ");

// let b = test.map((a) => morse[a]);
// let c = b.join("");
// console.log(c);

// letter.split(" ").map(a => morse[a]).join("")

// let letter = ".... . .-.. .-.. ---";

// let a = letter.split(" ");
// console.log(a.reduce((prev, curr) => prev + morse[curr], ""));

// return letter.split(' ').reduce((prev, curr) => prev + morse[curr], '')
//뭔말인지공부

///7시 15분

// let cipher = "dfjardstddetckdaccccdegk";

// let code = 4;

// let text = [...cipher];
// let number = 0;
// let answer = "";

// for (let i = 1; i <= text.length; i++) {
//   let A = code * i;
//   //   console.log(A);
//   text.filter((item, index) => {
//     // console.log(index + 1);
//     if (index + 1 == A) {
//       answer += text[A - 1];
//     }
//   });
// }
// console.log(answer);

// var answer = "";
// for (let i = code - 1; i < cipher.length; i = i + code) {
//   console.log(cipher[i]);
//   //   answer += cipher[i];
// }

//8시 54분

// let my_string = "We are the world";
// let array = my_string.split("");

// let set = new Set(array);
// let setmaster = [...set];
// let test = setmaster.join("");
// console.log(test);

// console.log([...new Set(my_string)].join(""));
// console.log(array.indexOf(array[1]));
// let answer = array
//   .filter((item, index) => {
// return array.indexOf(item) === index;
// console.log(array.indexOf(item));
//이거 질문하기
// console.log(index);
//   })
//   .join("");

// console.log(answer);
// array.filter((item, index) => {

// });
// let test = array.map((item, index) => {

// });
// console.log(test);

// for (let i = 0; i < array.length; i++) {}

// 9시 35분

// let n = 3628800;
// let m = 7;

// console.log(7 * 6 * 5 * 4 * 3 * 2 * 1);

// for(let i=1;i<=10;i++){

// }

// 9시 46분

// let before = "allpe";

// let after = "apple";

// let beforetext = [...before];
// let aftertext = after.split("");

// let sortone = beforetext.sort();
// let sorttwo = aftertext.sort();
// let joinone = sortone.join("");
// let jointwo = sorttwo.join("");
// console.log(joinone);
// console.log(jointwo);
// if (joinone == jointwo) {
//   console.log(1);
// } else {
//   console.log(0);
// }
// let text = beforetext.reverse();
// let texttwo = text.join("");
// console.log(texttwo);
// if (texttwo == after) {
//   console.log(1);
// } else {
//   console.log(0);
// }

//10시 13분
// let num_list = [100, 95, 2, 4, 5, 6, 18, 33, 948];

// let n = 3;

// let answer = [[]];

// let array = [];
// let temparray = [];
// // console.log(num_list.length / n);
// let test = num_list.slice(0, 2);
// let testone = num_list.slice(2, 4);
// let testtwo = num_list.slice(4, 6);
// let testthree = num_list.slice(6, 8);
// // console.log(test);
// // console.log(testone);
// // console.log(testtwo);
// // console.log(testthree);

// // array.push(test, testone, testtwo, testthree);
// // console.log(array);

// for (let i = 1; i < num_list.length; i++) {
//   let sum = num_list.slice(n * i - n, n * i);

//   array.push(sum);
// }
// // console.log(array);
// // let arr = array.filter((item) => {
// //   return item;
// // });
// console.log(array);
// for (let i = 0; i < array.length / n; i++) {
//   temparray.push(array[i]);
// }
// console.log(temparray);
// let num_lists = [100, 95, 2, 4, 5, 6, 18, 33, 948];

// let ns = 3;

// let test1 = num_lists.slice(0, 3);
// let testone1 = num_lists.slice(3, 6);
// let testtwo1 = num_lists.slice(6, 9);
// let testthree1 = num_lists.slice(9, 12);
// // console.log(test1);
// // console.log(testone1);
// // console.log(testtwo1);
// // console.log(testthree1);
// array.push(test1, testone1, testtwo1);
// // console.log(array);

// // console.log(num_lists.length / ns);
// let num_list = [1, 2, 3, 4, 5, 6, 7, 8];
// let n = 2;
// console.log(num_list.splice(0, n));
// console.log(num_list);

// var answer = [];
// while (num_list.length) {
//   //   console.log("1");
//   //   answer.push(num_list.splice(0, n));
// }

// return answer;

// 7시 31분
// let array = [10, 12, 11, 9];

// let n = 13;

// let answer = [];
// let sum = [];

// array.sort((a, b) => a - b);

// for (let i = 0; i < array.length; i++) {
//   let test = Math.abs(n - array[i]);
//   answer.push(test);
// }
// // console.log(answer);
// let test = [...answer];
// let testone = answer.sort((a, b) => a - b);
// // console.log(testone);
// // console.log(test);
// // console.log(testone[0]);
// for (let i = 0; i < answer.length; i++) {
//   if (test[i] == testone[0]) {
//     sum.push(array[i]);
//   }
// }
// console.log(sum[0]);

// 10분+

// let i = 10;
// let j = 50;
// let k = 5;
// let m = k.toString();
// // console.log(m);
// let array = [];
// let cnt = 0;
// for (let k = i; k <= j; k++) {
//   let test = k.toString();
//   console.log(test);
//   let sum = test.split("");
//   //   console.log(sum);
//   array.push(...sum);
// }

// for (let i = 0; i < array.length; i++) {
//   if (m == array[i]) {
//     cnt++;
//   }
// }
// console.log(cnt);

//11시 51분

// let emergency = [3, 76, 24];
// let arraytemp = [...emergency];
// let answer = [];
// let cnt = 0;
// let ct = 0;
// let test = new Array(emergency.length);
// // console.log(test);
// while (cnt < emergency.length) {
//   answer.push({ value: emergency[cnt], idx: cnt });
//   cnt = cnt + 1;
// }

// // console.log(answer);
// answer.sort((a, b) => b.value - a.value);
// // console.log(answer[0].value);
// // console.log(emergency);
// // console.log(answer);

// while (ct < answer.length) {
//   let sum = answer[ct];
//   console.log(sum.idx);

//   test[sum.idx] = ct + 1;

//   //   console.log(sum);
//   //   console.log(emergency[ct]);
//   //   if (emergency[ct] == answer[ct].value) {
//   //   }
//   ct = ct + 1;
// }
// console.log(test);

// // console.log(emergency);

// // let answer = "";
// // for (let i = 1; i <= emergency.length; i++) {
// //   //     if(emergency[i-1])
// //   //   emergency[i - 1] = i;
// //   console.log(emergency[i - 1]);
// //   const result = arraytemp.filter((item, index, source) => {

// //   });
// //   console.log(result);
// // }
// // // //   console.log(emergency);

// let sorted = [...emergency].sort((a, b) => b - a);

// // // console.log(emergency.map((v) => sorted.indexOf(v) + 1));
// console.log(emergency.map((v) => sorted.indexOf(v) + 1));
// console.log(
//   emergency.map((item) => {
//     return sorted.indexOf(item) + 1;
//   })
// );

// 3시 10분

// let a = "hello";
// let b = a.split("");
// let answer = [];

// let c = b.map((v) => a.indexOf(v) == a.lastIndexOf(v));
// // console.log(c);

// for (let i = 0; i < b.length; i++) {
//   if (c[i] == true) {
//     answer.push(b[i]);
//   }
// }
// let test = answer.sort().join("");
// console.log(test);

// 4시 38분

// let my_string = "aAb1B2cC34oOp";

// let A = my_string.split("");
// // let B = parseInt(A);
// // console.log(B);
// let array = [];
// for (let i = 0; i < A.length; i++) {
//   let test = Number(A[i]);
//   array.push(test);
// }
// let testone = array.join("");
// let sum = testone.split(NaN);
// console.log(sum);
// let answer = 0;
// for (let i = 0; i < sum.length; i++) {
//   let num = Number(sum[i]);
//   answer += num;
// }
// console.log(answer);

// function solution(my_string) {
//   return my_string.split(/\D+/).reduce((acc, cur) => acc + Number(cur), 0);
// }

// function solution(my_string) {
//   return my_string.toLowerCase().replace(/[a-z]/g, " ").split(" ").map((v) => v*1).reduce((a,b) => a+b)
// }

// function solution(my_string) {
//   const nums = my_string
//   .match(/[0-9]+/g)

// return nums ?  nums.map(num => +num).reduce((a, c) => a + c, 0) : 0

// }

//5시 33분
// let bin1 = "1001";
// let bin2 = "1111";
// let cnt = 0;

// // let ary = new Array(bin1.length + bin2.length + 1);
// let ary = [];
// // console.log(bin1[1]);
// // console.log(ary);

// for (let i = 0; i < bin1.length; i++) {
//   let test = parseInt(bin1[i]) + parseInt(bin2[i]);

//   ary.push(test);
// }
// // console.log(ary);
// for (let i = 0; i < ary.length; i++) {
//   if (ary[i] == 1) {
//     ary[i] = 0;
//   }
//   if (ary[i] >= 2) {
//     ary[i] = 0;
//     ary.unshift(1);
//   }
// }
// console.log(ary);

// let a = parseInt(bin2, 2) + parseInt(bin1, 2);
// console.log(a.toString(2));

//6시 27분

// let array = [7, 77, 17];

// let string = "7";
// let cnt = 0;
// let a = array.join("");

// for (let i = 0; i < a.length; i++) {
//   if (a[i] == string) {
//     cnt++;
//   }
// }
// console.log(cnt);

// let a = array.join("").split("7").length - 1;

// console.log(a);

//8시 18분
// let index = 0;

// let numbers = [1, 2, 3, 4, 5, 6];

// let k = 5;

// for (let i = 0; i < k; i++) {
//   index += 2;
//   // console.log(index);
//   if (index > numbers.length) {
//     index -= numbers.length;
//   }
// }
// console.log(numbers[index - 2]);

// return numbers[(--k*2)%numbers.length];

// 8시 54분
// let one = 12;
// let two = 17;
// let three = 420;
// let array = [];

// for (let i = 1; i <= one; i++) {
//   if (one % i == 0) {
//     array.push(i);
//   }
// }

// for (let i = 0; i <= one; i++) {
//   if (array[i] % i == 0) {
//     console.log(i);
//   }
// }

// 9시 33분

// let numbers = "onefourzerosixsevenzero";
// let obj = {
//   zero: 0,
//   one: 1,
//   two: 2,
//   three: 3,
//   four: 4,
//   five: 5,
//   six: 6,
//   seven: 7,
//   eight: 8,
//   nine: 9,
// };
// let A = numbers.replace(
//   /zero|one|two|three|four|five|six|seven|eight|nine/g,
//   (item) => {
//     return obj[item];
//   }
// );

// let array = numbers.split(",");

// console.log(array);

////////////////////////////////////////////

// function solution(numbers) {
//     const number = ["zero","one","two","three", "four", "five", "six", "seven", "eight", "nine"]
//     for(let i = 0 ; i<number.length; i++){
//         numbers = numbers.split(number[i]).join(i)
//     }
//     return +numbers
// }

/////////////////////////////////////////////////////////////////////////////////////////

// return Number(numbers.replaceAll('zero', '0').replaceAll('one', '1').replaceAll('two', '2').replaceAll('three', '3').replaceAll('four', '4').replaceAll('five', '5').replaceAll('six', '6').replaceAll('seven', '7').replaceAll('eight', '8').replaceAll('nine', '9'));
// }

////////////////////////////////////////////////////////////////////////////

// function solution(numbers) {
//   numbers = numbers.replace(/one/g, 1);
//   numbers = numbers.replace(/two/g, 2);
//   numbers = numbers.replace(/three/g, 3);
//   numbers = numbers.replace(/four/g, 4);
//   numbers = numbers.replace(/five/g, 5);
//   numbers = numbers.replace(/six/g, 6);
//   numbers = numbers.replace(/seven/g, 7);
//   numbers = numbers.replace(/eight/g, 8);
//   numbers = numbers.replace(/nine/g, 9);
//   numbers = numbers.replace(/zero/g, 0);
//   return numbers*1
// }

/////////////////////////////////////////////////
// function solution(numbers) {
//   let numStr = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];

//   numStr.forEach((str, idx) => {
//       numbers = numbers.replaceAll(str, idx);
//   });
//   return Number(numbers);
// }

// 10시 35분
// let my_str = "abcdef123";
// let n = 3;

// let array = my_str.slice(0, 6);
// let test = my_str.slice(6, 12);
// let testone = my_str.slice(12, 18);

// console.log(array);
// console.log(test);
// console.log(testone);
// let ary = [];
// let tempary = [];
// let text = "";
// for (let i = 0; i <= my_str.length; i++) {
//   let temp = my_str.slice(n * i, n * (i + 1));
//   let a = temp.split(",");
//   if (a[0] !== "") {
//     let b = a.join("");
//     tempary.push(b);
//   }
// }
// console.log(tempary);

///////////////////////////
// function solution(my_str, n) {
//   return my_str.match(new RegExp(`.{1,${n}}`, "g"));
// }

///////////////////////////////////////////
// function solution(my_str, n) {
//     let res = [];
//     for (let i = 0; i < my_str.length; i+=n) res.push(my_str.slice(i, i+n));
//     return res;
// }

///////////////////////////////////////////////////////
// function solution(my_str, n) {
//   var answer = [];
//   for(let i=0; i < my_str.length; i+=n) {
//       answer.push(my_str.substr(i, n));
//   }
//   return answer;
// }

/////////////////////////////////
// 6시 53분

// let my_string = "123 + 14 - 111 + 1000";

// let a = my_string.split("");
// // console.log(a);
// let sum = "";
// for (let i = 0; i < a.length; i++) {
//   //   console.log(a[i]);
//   if (a[i] !== " ") {
//     sum += a[i];
//   }
// }
// let pluss = (num) => {
//   cnt = 1;
//   while (cnt <= num) {
//     cnt++;
//   }
// };

// let minuss = (num) => {
//   return "-";
// };

// let string = "";
// let plus = 0;
// let minus = 0;
// let num = 0;

// for (let i = 0; i < sum.length; i++) {

//   if (sum[i] == "+") {
//     plus++;
//   } else if (sum[i] == "-") {
//     minus++;
//   }
// }

// let A = sum.replaceAll("+", ",");
// let B = A.replaceAll("-", ",");
// let C = B.split(",");

// for (let i = 0; i < C.length; i++) {
//     num = Number(C[i]);
//     for(let j=0;j<C.lencth;j++){

//     }
// }

// console.log(plus);
// console.log(string);
// let test = sum;

// let b = test.split("+");
// let c = test.split("-");
// console.log(c);

//////////////////////////////////
// let my_string = "3 + 4 - 10";

// let test = my_string.split(" ");

// // console.log(test);

// // console.log(typeof test[0]);
// let a = 0;

// let ans = Number(test[0]);
// // console.log(ans);

// test.forEach((item, index) => {
//   if (item === "+") {
//     ans += Number(test[index + 1]);
//   }
//   if (item === "-") {
//     ans -= Number(test[index + 1]);
//   }
// });
// console.log(ans);

//10시 16분+20분

// let s = "-1 -2 -3 Z";

// let S = s.split(" ");

// let firstnum = 0;
// let minusnum = 0;
// // console.log(firstnum);
// // console.log(S);

// S.forEach((item, index) => {
//   if (item !== "Z") {
//     firstnum += Number(item);
//   }

//   if (item === "Z") {
//     firstnum -= Number(S[index - 1]);
//   }
// });
// // console.log(minusnum);
// console.log(firstnum);

//10시 36분 외계어사전
// filter find match include indexof?

let spell = ["z", "d", "x"];
let dic = ["def", "dww", "dzx", "loveaw"];
// div.map((item, index) => {
//   //   console.log(spell[index]);
//   //   console.log(spell);
//   let a = item.split("");

//   //   console.log(a);
//   console.log(a.filter((item) => item.includes(spell[index])));
// });

// let a = spell.sort();
// let b = a.join("");
// let count = 0;

// dic.map((item, index) => {
//   let a = item.split("");
//   let c = a.sort();

//   let d = c.join("");

//   if (b === d) {
//     count++;
//     return console.log(1);
//   }
// });
// // console.log(count);
// if (count == 0) {
//   console.log(2);
// }

// 12시 19분

let sides = [3, 6];

// let side = sides.sort((a, b) => a - b);
// // console.log(side);
// let n = 0;
// let count = 0;

// // console.log(test);
// // if()

// for (let i = 1; i <= side[1]; i++) {
//   if (side[1] < i + side[0]) {
//     count++;
//   }
// }

// for (let i = side[1]; i <= 1000; i++) {
//   if (i < side[0] + side[1]) {
//     n++;
//   }
// }
// let test = count + n - 1;
// console.log(test);

// function solution(sides) {
//     return Math.min(...sides)*2-1
// }

// function solution(sides) {

//     sides.sort((a,b) => b - a);

//     return sides[1] + sides[1] -1;
// }

// const findExtras = (widths) => {
//     let [min, max] = [Math.min(...widths), Math.max(...widths)];
//     let answerSet = new Set();
//     // max가 가장 긴 변인 경우
//     /*
//     0 < x
//     min + x > max
//     x < max
//     */
//     for(let i = 1; i < max; i++) {
//         if(i > max-min) {
//             answerSet.add(i);
//         }
//     }
//     // newbie가 가장 긴 변인 경우
//     /*
//     x >= max
//     x < min+max
//     */
//     for(let i = max; i < min+max; i++) {
//         answerSet.add(i);
//     }
//     return answerSet.size;
// }
// function solution(sides) {
//     return findExtras(sides);
// }

// 2시 58분

// let obj = { up: [0, 1], down: [0, -1], left: [-1, 0], right: [1, 0] };
// let keyinput = ["left", "left", "left", "right"];
// let board = [3, 3];
// let boardd = Math.ceil(board[0] / 2);
// let boardf = Math.ceil(board[1] / 2);
// // console.log(boardd);
// // console.log(boardf);
// // for (let i = 0; i < board.length; i++) {
// //   let boardtest=board[i]/2
// // }

// let set = [0, 0];
// let cnt = 0;
// let count = 0;
// let array = [];

// keyinput.map((item, index) => {
//   cnt += obj[item][0];
//   count += obj[item][1];
// });
// console.log(cnt);
// console.log(count);
// let ceilone = Math.ceil(cnt);
// let ceiltwo = Math.abs(ceilone);
// let ceilthree = Math.ceil(count);
// let ceilfour = Math.abs(ceilthree);
// if (boardd <= ceiltwo) {
//   if (cnt > 0) {
//     cnt--;
//   }
//   if (cnt < 0) {
//     cnt++;
//   }
// }

// if (boardf <= ceilfour) {
//   if (count > 0) {
//     count--;
//   }
//   if (count < 0) {
//     count++;
//   }
// }

// array.push(cnt, count);

// console.log(array);
// // console.log(count);

// // let test = [0, 2];
// // let testone = obj.down;

// 4시 26분
// let dot = [
//   [x1, y1],
//   [x2, y2],
//   [x3, y3],
//   [x4, y4],
// ];

// console.log(dot);
// let dots = [
//   [1, 1],
//   [2, 1],
//   [2, 2],
//   [1, 2],
// ];

// let dotstwo = [
//   [-1, -1],
//   [1, 1],
//   [1, -1],
//   [-1, 1],
// ];

// let n = 12345;
// // console.log(typeof n);
// let a = n.toString();

// let b = a.split("");
// // console.log(b);
// let array = [];
// let c = b.reverse();
// for (let i = 0; i < c.length; i++) {
//   let test = Number(c[i]);
//   array.push(test);
// }
// console.log(array);

// let n = 121;
// let a = 1;
// let test = Math.pow(1, 121);
// console.log(test);

// let dots = [
//   [1, 1],
//   [2, 1],
//   [2, 2],
//   [1, 2],
// ];
// let answer=0

// // console.log(dots.length);
// for (let i = 0; i < dots.length; i++) {
//   dots[i][0]);
// }

let id_pw = ["meosseugi", "1234"];

let db = [
  ["rardss", "123"],
  ["yyoom", "1234"],
  ["meosseugi", "1234"],
];

// console.log(db[0][0]);
// console.log(db[0][1]);
// console.log(db[1][0]);
// console.log(db[1][1]);
// console.log(db[2][0]);
// console.log(db[2][1]);

// console.log(id_pw[0]);

// console.log(id_pw[1]);
// let cnt = 0;

// for (let i = 0; i < db.length; i++) {
//   if (id_pw[0] == db[i][0] && id_pw[1] == db[i][1]) {
//     console.log("login");
//     cnt++;
//   }
//   if (id_pw[0] == db[i][0] && id_pw[1] !== db[i][1]) {
//     console.log("wrong pw");
//     cnt++;
//   }
// }

// if (cnt == 0) {
//   console.log("fail");
// }

// const [id, pw] = id_pw;

// const map = new Map(db);
// console.log(map);
// console.log(map.get(id));
// return map.has(id) ? (map.get(id) === pw ? "login" : "wrong pw") : "fail";

// console.log(db.filter((item) => item[0] === id_pw[0]));
// function solution(id_pw, db) {
//     db = db.filter(v=>v[0]===id_pw[0]);

//     if (!db.length) return 'fail';

//     for (let d of db) if (d[1] === id_pw[1]) return 'login';

//     return 'wrong pw';
// }

// function solution(id_pw, db) {
//     const [ userId, userPw ] = id_pw;
//     for (const [ dbId, dbPw ] of db) {
//         if (userId === dbId && userPw === dbPw) return "login";
//         else if (userId === dbId && userPw !== dbPw) return "wrong pw";
//     }
//     return "fail";
// }

//9시 57분

// let A = "hello";

// let test = ["ohell", "lohel", "llohe", "elloh", "hello"];

// let B = "ohell";

// // console.log(A.replace(A[0], A[A.length - 1]));
// let a = A.split("");
// // console.log(a);

// // a.splice(0, 1, a[a.length - 1]);

// // console.log(a);
// // let array = new Array(A.length);
// let array = [];

// let cnt = 0;

// array.push(A[A.length - 1]);
// for (let i = 0; i < A.length - 1; i++) {
//   array.push(A[i]);
// }

// console.log(array);
// let score = [
//   [80, 70],
//   [70, 80],
//   [30, 50],
//   [90, 100],
//   [100, 90],
//   [100, 100],
//   [10, 30],
// ];
// let array = [];
// let b = [];
// // console.log((score[0][0] + score[0][1]) / 2);
// for (let i = 0; i < score.length; i++) {
//   array.push((score[i][0] + score[i][1]) / 2);
// }
// // console.log(array);
// let test = { ...array };
// // console.log(test[1]);

// let a = array.sort((a, b) => b - a);
// console.log(a);

// for (let i = 0; i < a.length; i++) {
//   console.log(a[i]);
// }

// for (let i = 0; i < a.length; i++) {
//   for (let j = 0; j < a.length; j++) {
//     if (a[i] == test[j]) {
//       a[i] = j + 1;
//     }
//   }

//   b.push(a[i]);
// }
// console.log(b);

// console.log((80 + 70) / 2);
// console.log((90 + 50) / 2);

//1시 33분

// let numlist = [1, 2, 3, 4, 5, 6];

// let n = 4;
// let array = [];
// for (let i = 0; i < numlist.length; i++) {
//   array.push(n - numlist[i]);
// }
// console.log(array);

//2시 5분

// let n = 3;

// for (let i = 1; i <= 100; i++) {
//   if (n == 3) {
//     n += 1;
//   }
//   if (n < 3) {
//     n;
//   }
// }
// console.log(n);

// let polynomial = "3x + 7 + 2x + x";

// let test = polynomial.split(" ");
// console.log(test);
// let string = "x";
// let array = [];
// let cnt = "0";
// for (let i = 0; i < test.length; i++) {
//   if (test[i].indexOf(string) !== -1) {
//     cnt++;
//   }
// }
// console.log(cnt);

// 3시

// let array = [1, 1, 1, 1, 2, 2, 2, 3, 4, 100, 100, 100, 100, 100];
// let temp = [];
// let cnt = 0;

// let temparray = array.sort((a, b) => a - b);
// // console.log(temparray);
// // let a = array.filter((item, index) => index);
// // console.log(a);
// if (temparray.length == 1) console.log(array[0]);

// for (let i = 0; i < temparray.length; i++) {
//   if (temparray[i] == temparray[i + 1]) {
//     temp.push(temparray[i]);
//   }
// }

// for (let i = 0; i < temp.length; i++) {
//   if (temp[i] == temp[i + 1]) {
//     // console.log(temp[i]);

//   }
//   if (temp[i] !== temp[i + 1]) {
//     cnt++;
//     // break;
//   }
// }

//

// let n = 3;

// let a = Math.sqrt(n);
// if (a % 1 == 0) {
//   console.log(Math.pow(a + 1, 2));
// } else console.log(-1);

// console.log(3 ** 2);

// let s = "pPooyoY";

// let a = s.toLowerCase();
// let b = a.split("");
// let c = b.filter((item) => item === "p");
// let d = b.filter((item) => item === "y");

// if (c.length == d.length) {
//   console.log(true);
// } else console.log(false);

// let s = "pPoooyY";

// return s.toUpperCase().split("P").length === s.toUpperCase().split("Y").length;

// function solution(s){

//     return [...s.toLowerCase()].reduce((acc, cur) => {
//         if(cur ==='p') return acc + 1;
//         else if(cur ==='y') return acc - 1;
//         return acc;
//     }, 0) ? false : true;
// }

// 6시 37분

// let x = -4;
// let n = 2;
// // console.log(x + x);
// let answer = 0;
// let array = [];

// for (let i = 0; i < n; i++) {
//   answer += x;
//   array.push(answer);
// }
// console.log(array);

// function solution(x, n) {
//     return Array(n).fill(x).map((v, i) => (i + 1) * v)
// }

// let str = "-1234";

// console.log(Number(str));

// console.log(str / 1);

// function strToInt(str){
//     return str/1
//     }

// console.log(+str);

// let n = 118372;
// let a = n
//   .toString()
//   .split("")
//   .sort((a, b) => b - a)
//   .join("");

// console.log(Number(a));

// function solution(n) {
//     const newN = n + "";
//     const newArr = newN
//       .split("")
//       .sort()
//       .reverse()
//       .join("");

//     return +newArr;
//   }

// let arr = 11;

// let a = arr.toString();

// let b = a.split("");

// let array = [];
// let answer = 0;

// for (let i = 0; i < b.length; i++) {
//   array.push(Number(b[i]));
// }
// let c = array;
// // console.log(c);
// for (let i = 0; i < array.length; i++) {
//   answer += c[i];
// }
// if (arr % answer == 0) {
//   console.log("true");
// } else console.log("false");

// function solution(x) {
//     let num = x;
//     let sum = 0;
//     do {
//         sum += x%10;
//         x = Math.floor(x/10);
//     } while (x>0);

//     return !(num%sum);
// }

// function Harshad(n){
//     var result ;
//     //함수를 완성하세요
//       var ori_n = n;
//     var sum =0;
//     while(n){
//       sum += n%10;
//       n /= 10;
//       n = Math.floor(n);
//     }
//     if(ori_n%sum == 0)
//       result = true;
//     else
//       result = false;
//     return result;
//   }

// let n = 10;

// for (let i = 1; i <= n; i++) {
//   if (n % i == 1) {
//     return i
//     break;
//   }
// }

// let a = 3;
// let b = 3;

// // console.log(typeof a);
// let array = [];
// let answer = 0;
// if (a > b) {
//   for (let i = b; i <= a; i++) {
//     answer += i;
//   }
// } else if (a < b)
//   for (let i = a; i <= b; i++) {
//     answer += i;
//   }
// else if (a == b) {
//   console.log(a);
// }

// console.log(answer);

// let a = 3;
// let b = 5;

// console.log(Math.max(a, b));
// function adder(a, b) {
//   var result = 0;

//   return ((a + b) * (Math.abs(b - a) + 1)) / 2;
// }

// function adder(a, b, s = 0) {
//   for (var i = Math.min(a, b); i <= Math.max(a, b); i++) s += i;
//   return s;
// }

// let c = b.filter((item) => item === "p");
// let seoul = ["Jane", "Kim", "teeelll"];
// // c;
// // let a = [];
// for (let i = 0; i < seoul.length; i++) {
//   if (seoul[i] === "Kim") {
//     console.log(`김서방은 ${i}에 있다`);
//   }
// }
// console.log(a);

// console.log(idx);

// let array = [];

// let arr = [1, 5, 6];

// let divisor = 10;

// // for (let i = 0; i < arr.length; i++) {
// //   if (arr[i] % divisor == 0) {
// //     array.push(arr[i]);
// //   }
// // }
// // let a = array.sort((a, b) => a - b);
// // console.log(a);
// // if (a.length == 0) {
// //   console.log([-1]);
// // }

// // let a = arr.filter((item, index) => item % divisor == 0);
// // console.log(a.length == 0 ? [-1] : a.sort((a, b) => a - b));

// let answer = [];

// arr.map((item) => {
//   return item % divisor === 0 && answer.push(item);
// });
// console.log(answer.length ? answer.sort((a, b) => a - b) : [-1]);

// 10시 22분

// let phone_number = "02771232324";
// // console.log(phone_number.length);

// let a = phone_number.split("");
// // let b = a.splice(0, phone_number.length - 4, "*");
// // console.log(b);
// // console.log(a);
// for (let i = 0; i < a.length; i++) {
//   if (a.length !== 4) a[i] = "*";
//   if (i == a.length - 5) {
//     break;
//   }
// }
// let b = a.join("");
// console.log(b);

// console.log(phone_number.replace(/\d(?=\d{4})/g, "*"));

// var result = "*".repeat(phone_number.length - 4) + phone_number.slice(-4);

// let a = [...phone_number].fill("*", 2, phone_number.length - 4);
// console.log(a);

// let arr = [4, 2, 1, 3];

// let a = [...arr];

//Math.min() 으로풀어보기
// let a = arr.sort((a, b) => b - a);
// console.log(arr);
// a.splice(a.length - 1, 1);
// console.log(a);
// if (a.length !== 0) console.log(a);
// console.log(arr.length);
// if (a.length == 0) console.log([-1]);

// let arr = [4, 3, 2, 3, 0, 1];
// let arr1 = [10];

// if (arr1.length == 1) {
//   console.log([-1]);
// }
// // let a = arr.join("");

// let a = Math.min(...arr);

// let b = arr.filter((item, index) => item !== a);

// console.log(b);

// let absolutes = [1, 2, 3];

// signs = [false, false, true];
// answer = 0;
// for (let i = 0; i < absolutes.length; i++) {
//   if (signs[i] == true) {
//     answer += absolutes[i];
//   }
//   if (signs[i] == false) {
//     answer -= absolutes[i];
//   }
// }
// console.log(answer);

// let numbers = [5, 8, 4, 0, 6, 7, 9];
// let numbersone = [5, 8, 4, 0, 6, 7, 9];
// let a = numbers.sort((a, b) => a - b);

// // console.log(a);
// let answer = 0;
// for (let i = 0; i <= 9; i++) {
//   if (a.indexOf(i) == -1) {
//     answer += i;
//   }
// }

// console.log(answer);

// let s = "abcdfgh";
// let d = "qwe";

// // console.log(s[s.length - 3]);
// let a = s.split("");

// // console.log(a.splice(, 2));

// // console.log(s);
// if (s.length % 2 == 0) {
//   console.log(
//     s.slice(Math.floor(s.length / 2) - 1, Math.floor(s.length / 2) + 1)
//   );
// }
// if (s.length % 2 !== 0) {
//   console.log(s.slice(Math.floor(s.length / 2), Math.floor(s.length / 2) + 1));
//   // console.log(a);
// }
// console.log(s.length);

// let su = "수";
// let bak = "박";
// let answer = "";
// let n = 4;
// for (let i = 1; i <= n; i++) {
//   if (i % 2 !== 0) {
//     answer += su;
//   }
//   if (i % 2 == 0) {
//     answer += bak;
//   }
// }
// console.log(answer);

// let a = [-1, 0, 1];
// let b = [1, 0, -1];
// let array = 0;
// for (let i = 0; i < a.length; i++) {
//   array += a[i] * b[i];
// }

// console.log(array);

// let s = "Zbcdefg";
// let n = "gfedcbZ";

// let a = s.split("");
// console.log(a);

// let s = "Zbcdefg";
// let n = "gfedcbZ";

// let a = s.split("");

// // console.log(a);
// let b = a.sort();
// let c = b.reverse();
// let d = c.join("");
// console.log(d);

////////////////////////////
// let arr = [4, 3, 2, 1];

// // console.log(arr.splice(arr.indexOf(Math.min(...arr)), 1));

// // arr.splice(arr.indexOf(Math.min(...arr)), 1);
// // if (arr.length < 1) return [-1];
// // return arr;

// ////////////////

// const min = Math.min(...arr);
// // return arr.length !== 1 ? arr.filter((i) => i !== min) : [-1];

// console.log();

//////////////////////////////////
// absolutes = [4, 7, 12];
// signs = [true, false, true];

////////////////////////////////////////

// console.log(
//   absolutes.reduce((acc, val, i) => acc + val * (signs[i] ? 1 : -1), 0)
// );

// console.log(absolutes.reduce((acc, val, i) => signs[i]));

// let answer = 0;
// absolutes.forEach((v, i) => {
//   if (signs[i]) {
//     answer += v;
//   } else {
//     answer -= v;
//   }
// });
// return answer;

// let a = absolutes.forEach((item, index) => {
//   return item;
// });

// console.log(a);

///////////////////////////////
// function solution(absolutes, signs) {
//     let answer = 0;
//     for (let i = 0; i < absolutes.length; i++) {
//         signs[i] ? answer += absolutes[i] : answer -= absolutes[i]
//     }
//     return answer;
// }

// let numbers = [1, 2, 3, 4, 6, 7, 8, 0];

// console.log(numbers.reduce((cur, acc) => cur+acc, 0));

// function solution(numbers) {
//     let answer = 0;

//     for(let i = 0; i <= 9; i++) {
//         if(!numbers.includes(i)) answer += i;
//     }

//     return answer;
// }

///////////////////////////////////////////////
// let s = "abcde";

// s.slice(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);

// let n = 3;
// const waterMelon = (n) => {
//   return "수박".repeat(n / 2) + (n % 2 === 1 ? "수" : "");
// };

// const waterMelon = n => "수박".repeat(n).slice(0,n);

// let a = [1, 2, 3, 4];
// let b = [-3, -1, 0, 2];

// console.log(a.reduce((cur, acc, i) => (cur += a[i] * b[i]), 0));

// console.log(
//   s
//     .split("")
//     .sort((a, b) => (a < b ? 1 : -1))
//     .join("")
// );

// console.log(b.sort((a, b) => (a < b ? 1 : -1)));

// let left = 13;
// let right = 17;
// // let array = [];
// let count = 0;
// let temp = [];

// for (let i = left; i <= right; i++) {
//   let tempcount = 0;
//   let isodd = false;
//   for (let j = 1; j <= Math.sqrt(i); j++) {
//     if (Math.pow(j, 2) == i) {
//       tempcount += j;
//       isodd = true;
//       console.log(tempcount, "홀수경우");
//       continue;
//     }
//     if (i % j == 0) {
//       tempcount += j + i / j;
//       console.log(tempcount, i, j, i / j);
//     }
//   }
//   if (!isodd) {
//     count += tempcount;
//   } else count -= tempcount;
// }
// console.log(count);

// console.log(temp);
// let test = [];
// // console.log(array);
// for (let i = 0; i < array.length; i++) {
//   if (array[i] == 1 && i !== 0) {
//     test.push(count);
//     count = 0;
//   }
//   count++;
// }
// let ct = 0;
// test.push(count);
// // console.log(test);
// for (let i = 0; i < temp.length; i++) {
//   let b = Number(temp[i]);

//   if (test[i] % 2 == 0) {
//     ct += b;
//   }
//   if (test[i] % 2 !== 0) {
//     ct -= b;
//   }
//   // console.log(b);
//   // if (test[i] % 2 == 0) {
//   // }
// }
// // console.log(ct);

// let s = "5f1234";
// let regex = /[a-zA-Z]/;

// let a = s.match(regex);
// if (a == null && (s.length == 4 || s.length == 6)) {
//   console.log(true);
// } else console.log(false);

// const len = s.length;
// if (len !== 4 || len !== 6) {
//   return false;
// }

// const parseNum = Number(s);
// console.log(parseNum);

// if (parseNum !== NaN) return true;
// else return false;

// let price = 3;
// let money = 20;
// let count = 4;
// let lastprice = 0;
// let answer = 0;

// for (let i = 1; i <= count; i++) {
//   lastprice += price * i;
// }
// if (money > lastprice) {
//   console.log(0);
// } else answer = lastprice - money;

// console.log(answer);
/////////////////////////////////

// let arr1 = [
//   [1, 2],
//   [2, 3],
// ];
// let arr2 = [
//   [3, 4],
//   [5, 6],
// ];
// let sum = [];
// let first = [];
// let second = [];
// for (let i = 0; i < arr1.length; i++) {
//   console.log(arr1[i][i]);
//   // console.log(arr1[i][i]);
//   // console.log(arr1[i][1] + arr2[i][1]);
// }
// // console.log(first);
// // console.log(second);

// let arr = [1, 1, 3, 3, 0, 1, 1];
// let b = arr.slice(0);
// console.log(b);

// let test = arr.splice(1, 1);
// console.log(arr);
// console.log(test);
// let b = [];
// let c;
// let v;
// for (let i = 0; i < arr.length; i++) {
//   // console.log(arr[i] == arr[i + 1]);
//   if ((arr[i] == arr[i + 1]) == true) {
//     // console.log(arr[i]);
//     if (!b.includes(arr[i])) {
//       b.push(arr[i]);
//     }
//   }
// }
// // console.log(b);

// for (let i = 0; i < arr.length; i++) {
//   if (b[i] == undefined && arr.includes(b[i]) == false) {
//     b.push(arr[i]);
//   }
//   // console.log(arr.includes(b[i]));
// }

// console.log(b);

// let b = arr.filter((item, index) => {
//   return item !== arr[index + 1];
//   // console.log(arr[index + 1]);
// });

// console.log(b);

// function solution(arr) {
//   var answer = [arr[0]];

//   for (let i = 1; i < arr.length; i++) {
//     if (answer[answer.length - 1] !== arr[i]) {
//       answer.push(arr[i]);
//     }
//   }

//   return answer;
// }

// function solution(arr){
//   var answer = [];
//   for(var i = 0; i < arr.length; i++){
//       if(arr[i] !== arr[i + 1]){
//          answer.push(arr[i]);
//       }
//   }
//   return answer;
// }

// let n = 45;
// for (let i = 0; i < n; i++) {
//   if(n%3==0)
//   }

// let s = "try hello world";
// console.log(s[14])/;
// let s = "  tRy hello  WORLD    ";

// let a = s.split("");
// // console.log(a);
// let b;
// // console.log(a[2]);
// for (let i = 0; i < a.length; i++) {
//   console.log(a[i]);
//   if(a[i!==""]){

//   }
//   // if (a[i] !== "") {
//   // a.splice(0, i);
//   // break;
// }
// // }
// // console.log(a);
// let n = 45;
// for (let i = 1; i < n; i++) {
//   if (n / i == 0) console.log(i);
// }

// let d = [2, 2, 3, 3];

// budget = 10;

// d.sort((a, b) => a - b);

// // // console.log(d);
// let answer = 0;
// let count = 0;
// // console.log(d);
// d.forEach((item, index) => {
//   answer += item;
//   if (answer <= budget) {
//     answer++;
//   }
// });
// console.log(answer);
// console.log(answer);
// // for (let i = 0; i < d.length; i++) {
// //   answer += d[i];
// //   if (answer > budget) break;
// //   count++;
// // }
// // console.log(count);

// function solution(d, budget) {
//   let answer = 0;
//   let money = 0;
//   d.sort((a,b) => a-b).forEach(function(val){
//       money += val;
//       if(money <= budget){
//           answer++;
//       }

//   })
//   return answer;
// }

// let s = "a B z";

// // s.replace();

// // console.log(s);
// let legexp = /^[a-zA-Z]*$/;

// s.replace(legexp, "d");

// console.log(s);

// let sizes = [
//   [60, 50],
//   [30, 70],
//   [60, 30],
//   [80, 40],
// ];
// let sum = [];
// for (let i = 0; i < sizes.length; i++) {
//   sum.push(sizes[i][0] * sizes[i][1]);
// }

// let number = [-3, -2, -1, 0, 1, 2, 3];
// let count = 0;

// let a = number.map((item, index) => {
//   return number[index] + number[index + 1] + number[index + 2];
// });
// console.log(a);

// let givecola = 3;

// let takecola = 2;

// let havecola = 10;

// let freecola = 0;

// let free = 0;

// let sum = 0;

// let freeone = 0;
// while (havecola >= givecola) {
//   free = (havecola / givecola) * takecola;
//   freeone = havecola % givecola;
//   sum += free;
//   sum += freeone;
//   havecola = free + freeone;
// }
// console.log(sum);

// free = Math.floor(havecola / givecola) * takecola;

// console.log(free);

// freeone = havecola % givecola;
// // sum += free;
// console.log(freeone);

// havecola = free + freeone;

// console.log(havecola);
// free = Math.floor(havecola / givecola);
// console.log(free);
// sum += free;

// havecola = havecola - givecola * free + free;

// console.log(havecola);

// free = Math.floor(havecola / givecola);

// console.log(free);
// sum += free;

// havecola = havecola - givecola * free + free;

// console.log(havecola);
// console.log(sum);
// console.log(sum);

// console.log(free);
// console.log(sum);

// do {
//   free += Math.floor(sum / givecola);

//   sum = sum - givecola * free + free;
// } while (Math.floor(sum / givecola) !== 0);

// console.log(free);

// sum = sum - givecola * free + free;
// console.log(free);

// console.log(sumone);

// s = "-1 -1";
// console.log(s);
// let a = s.split(" ");
// let b;
// let array = [];
// let test = "";
// // console.log(a);
// a.forEach((item, index) => {
//   if (item !== " ") {
//     b = Number(item);
//     array.push(b);
//   }
// });
// // console.log(array);

// array.sort((a, b) => a - b);
// // console.log(array);

// for (let i = 0; i < array.length; i++) {
//   test += `${array[i]} ${array[array.length - 1]}`;
//   break;
// }
// console.log(test);
// array.forEach((item, index) => {
//   test += `${array[index]} ${array[array.length - 1]}`;
// });
// console.log(test);
// let a = Number(s);
// console.log(a);
// console.log(array);
// let c = array.join(" ");
// console.log(c);
// console.log(Number(c));

// const arr = s.split(" ");

// let a = Math.min(...arr) + " " + Math.max(...arr);
// console.log(a);

// var arr = s.split(" ");
// arr.sort((a, b) => a - b);
// console.log(arr);
// var answer = arr[0] + " " + arr[arr.length - 1];

// console.log(answer);

// let s = "gpeople unFollowed me";
// // let b;

// // for (let i = 0; i < s.length; i++) {
// //   console.log(s[0]);
// // }
// // console.log(s);
// let ar = s.split("");

// // console.log(ar[0].toUpperCase());
// array = "";
// // let b;
// for (let i = 0; i < ar.length; i++) {
//   array += ar[0].toUpperCase();

//   // console.log(ar);
// }
// console.log(array);
// // console.log(b);
// // ar.forEach((item, index) => {
// //   console.log(item);
// // });

// let s = "3people unFollowed me";

// let a = s.split(" ");
// // console.log(a);
// let t = [];
// let b = [];
// for (let i = 0; i < a.length; i++) {
//   a[i].split(0, 1);
//   t.push(a[i][0].toUpperCase());
// }
// console.log(b);

// balls = 5;
// share = 3;
// let test = 1;
// let testone = 1;
// let testtwo = 1;

// for (let i = 1; i <= balls; i++) {
//   test *= i;
// }
// // console.log(test);

// for (let i = 1; i <= balls - share; i++) {
//   testone *= i;
// }
// console.log(testone);

// for (let i = 1; i <= share; i++) {
//   testtwo *= i;
// }
// console.log(testtwo);

// console.log(test / (testone * testtwo));

// let s = "3people unFollowed me";
// // let t;

// let a = s.split(" ");
// // console.log(a);

// console.log(a[0][0].toUpperCase());
// // console.log(a[1][0].toUpperCase());
// // console.log(a[2][0].toUpperCase());

// // a.splice(1, 2);
// // a.splice(1, 1);
// // console.log(a);
// for (let i = 0; i < s.length; i++) {}
// // console.log(t);
// let n = 2;
// let n2 = 2;
// let n3 = 3;
// let n4 = 4;
// let n5 = 5;
// let n6 = 6;
// let n7 = 7;
// let n8 = 8;
// let n9 = 9;
// // let n10 = 10;
// let test = 1;
// let testone = 0;
// for (let i = 1; i <= n; i++) {
//   test *= i;
//   if (test > n) {
//     testone += i - 1;
//     break;
//   }
//   // console.log(test);
// }
// console.log(testone);

// let i = 1;
// let f = 1;
// while (f * i < n) f *= ++i;
// console.log(i);

// let n = 17;
// let two = 2;
// let three = 3;
// let five = 5;
// let seven = 7;
// let sum = [];
// for (let i = 1; i <= 1; i++) {
//   if (n % seven == 0) {
//     sum.push(seven);
//   }
//   if (n % five == 0) {
//     sum.push(five);
//   }
//   if (n % three == 0) {
//     sum.push(three);
//   }
//   if (n % two == 0) {
//     sum.push(two);
//   } else sum.push(n);
// }
// console.log(sum.sort((a, b) => a - b));

// console.log(Math.sqrt(n));
// let alpa = {
//   1: a,
//   2: b,
//   3: c,
//   4: d,
//   5: e,
//   6: f,
//   7: g,
//   8: h,
//   9: i,
//   10: j,
//   11: k,
//   12: l,
//   13: m,
//   14: n,
//   15: o,
//   16: p,
//   q: 17,
//   r: 18,
//   s: 19,
//   t: 20,
//   u: 21,
//   v: 22,
//   w: 23,
//   x: 24,
//   y: 25,
//   z: 26,
// };

// console.log(alpa.[1]);
// let s = "aukks";
// let skip = "wbqd";
// let index = 5;

// let test = s.replace(s[0], alpa[1]);
// console.log(test);
// for (let i = 0; i < s.length; i++) {}

// let n = 12;
// for (let i = 2; i < n; i++) {
//   if (n % i == 0) {
//     for (let j = 1; j < n; j++) {
//       if (i % j == 0) {
//         if (j == 1 && j == i) {
//           console.log(j);
//         }
//       }
//     }
//   }
// }

// let s = "3people unFollowed me";
// let test = s.toLowerCase();
// // console.log(test);

// let a = test.split(" ");
// // console.log(a);
// let b;
// let c;
// let d = "";
// let e = [];
// // console.log(a);
// // console.log(a[2]);
// for (let i = 0; i < a.length; i++) {
//   if (a[i][0]) {
//     b = a[i][0].toUpperCase();
//   }

//   c = a[i].replace(a[i][0], b);
//   // console.log(c);
//   e.push(c);
// }
// console.log(e.join(" "));
// //   e.push(c);
// // }
// // console.log(e.join(" "));
// // for (let i = 0; i < e.length; i++) {
// // e.shift();
// // }

// // console.log(e);

// // console.log(0.1 + 0.2);

// let A = [1, 4, 2];
// let B = [5, 4, 4];
// let sum = 0;
// let test = A.map((item, index) => {
//   console.log(item * B[index]);
// });
// console.log(test);

// let s = "(())()(())";
// let plus = 0;
// let minus = 0;
// let count = 0;
// let test = s.split("");

// for (let i = 0; i < test.length; i++) {
//   if (s[0] == ")" || s[s.length - 1] == "(") {
//     console.log(false);
//     count++;
//     break;
//   }
//   if (test[i] == "(") {
//     plus++;
//   } else {
//     minus++;
//   }
//   if (plus !== minus && test[i] == ")" && test[i + 1] == "(") {
//     console.log(false);
//     break;
//   }
// }
// if (minus == plus && count == 0) console.log(true);
