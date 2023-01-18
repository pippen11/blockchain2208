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

function solution(age) {
  var answer = "";
  let cnt = 0;
  answer = answer + age;
  let test = answer.split("");
  for (let i = 0; i < test.length; i++) {
    if (test[i] == cnt + 1) {
      test[i] = "c";
    }
    cnt++;
    console.log(test);
  }
  return answer;
}

console.log(solution(23));
