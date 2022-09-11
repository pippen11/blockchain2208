const str = "abcDeFgHIklmn";

console.log(str.indexOf("D"));
// 매개변수로 전달된 텍스트가 어디있나? << 시작 위치를 찾는다.
console.log(str.indexOf("cD"));
console.log(str.indexOf("cDY"));
// 전달된 텍스트가 내용에 없을시 -1을 리턴(반환)한다
// 위치찾는게 끝이다

console.log(str.length); //길이

console.log(str.slice(0, 2));
// 0 a 1 b 2 c 3 d 4 e 5 f 6 g 7 h 8 i 9 j 10 k 11 l 12 m 13 n 14
// 짜르기 , 1에서 시작해서 3에서 끝난다. >> bc출력

console.log(str.split(/D/));
// 매개변수로 전달된 정규표현식(어렵다?)을 기준으로 짜른다.
// 정규 표현식은 후에 하루왠종일 해야한다
console.log(str.split("")); //하나 하나 다분해한다

console.log(str.replace(/D/, "a"));
// 1번째 매개변수로 정규표현식을 전달하고, 두번째 매개변수로 바꾸고 싶은 내용을 텍스트를 전달한다

console.log(str.toLowerCase()); // 전부 소문자로
console.log(str.toUpperCase()); // 전부 대문자로

console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
