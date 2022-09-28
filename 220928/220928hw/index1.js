//약수 더하기 //어떤수로 나눴을때 0 자기자신보다 이하
// function solution(n) {}

let n = 12;

// if (n % a == 0)

// if ()

//  function solution(n) {

// for (let i = 0; i <= n; i++) {
//   if (n % i == 0)

// }
//  }
let sum = 0;
for (let i = 0; i <= n; i++) {
  if (n % i == 0) {
    sum += i;
  }
}
console.log(sum);

//선언 밖에 안에 콘솔로그 안 밖 찍어보고 생각해보기
