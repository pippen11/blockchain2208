//개인키를 만들어보자
//개인키 랜덤으로 계속만듬 회원가입 계속하는거라 생각하면됨
import cryptoJS from "crypto-js";
const privatekey: string = cryptoJS.lib.WordArray.random(32).toString();
// random의 매개변수로 몇 byte를 사용할것인지 전달한다
// 64자가 나와야하기 때문에 32byte를 사용한다
console.log(privatekey); //7cebd2c98e33f277a12e189dcf8f36e4c2d9155da8cc38a23d271f4b266a47a3개인키임
console.log(privatekey.length);
// 0~F => F를 2진수로 바꾸면? 1111 => 4bit -> 총 64자 -> 64 * 4 ->256bit
// 1 byte = 8bits => 256 bits  = 32 bytes
// 외우면됨 이해하거나

//쉽게 느낄수 있는 node.js 기본 모듈 암호화
// import crypto from "crypto";
// // 위에 crypto-js쓴 라이브러리랑 같은거임
// const modulekey = crypto.randomBytes(32).toString("hex");
// console.log(modulekey);
// console.log(modulekey.length);
// 계속 crypto-js 라이브러리를 써왔으니 계속쓰자

// Double-and-Add 알고리즘을 사용하는 이유
// console.log(Math.pow(2, 256)); // 1.157920892373162e+77 =>1.157920892373162 * (10 ^ 77)

// 나타내기 힘든 수 표기
//1.157920892373162e-77=> 1.157920892373162 / (10 ^ 77)
// consolelog(1 / Math.pow(2, 256))
