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
