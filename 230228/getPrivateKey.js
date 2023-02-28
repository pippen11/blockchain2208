const keythereum = require("keythereum");
const path = require("path");

const address = "0x246e648805c6698b3f7f8252222ca84a927e4550";
// 0x246e648805c6698b3f7F8252222cA84A927e4550
// 이 address는 newGeth파일에 keystore폴더 가져온거의 지갑주소이다
// address가 16진수라는거 알려주려고 0x를 붙인거다

const keyObj = keythereum.importFromFile(address, __dirname);
//__dirname은 현재폴더
// 파일명이 지갑주소랑 같다
// console.log(keyObj);
// 지갑주소에대한 정보들이 나온다

const privateKey = keythereum.recover("1234", keyObj);
// 첫번째 매개변수에는 비밀번호 넣어야함
//b67b64174be1e58817e5d7392e7fb5b8989e527ac5578e3ed7041574fa2eadc2
console.log("test", privateKey);

console.log(privateKey.toString("hex"));
//b67b64174be1e58817e5d7392e7fb5b8989e527ac5578e3ed7041574fa2eadc2 비공개키를 가져옴
// 앞에 0x 붙이고 0xb67b64174be1e58817e5d7392e7fb5b8989e527ac5578e3ed7041574fa2eadc2로쓰면
// 메타마스크에서 위에적은 지갑주소를 가져올수있다
