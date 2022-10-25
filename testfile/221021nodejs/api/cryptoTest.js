const crypto = require("crypto-js");

console.log(crypto.SHA256("sdklfjlsdkfjlsdkf").toString());
// sha256을 제일많이씀 숫자로 쓰면 길어서 tostring으로 변환
// 다른것보다 중복이 적고 적당한 길이여서 가장많이씀

console.log(crypto.MD5("sdkfjskldfjlsdfj").toString());
// a47c1272c0cb8c8ca9c659e0b0bb3408
console.log(crypto.SHA1("sdfsdfsdf").toString());
// b5cc17d3a35877ca8b76f0b2e07497039c250696

console.log(crypto.SHA512("1").toString());

console.log(crypto.RIPEMD160("sdfdsf123").toString());

////여기까지 단방향

const tempAES = crypto.AES.encrypt("sklalksdfkjl", "key").toString();
//encypt 암호화 AES 대칭키 암호화
//key는 아무거나 넣어도됨 변수  , 키는 알려지면 안된다 -> key는 db에넣어서 보안을함

console.log(tempAES);

console.log(crypto.AES.decrypt(tempAES, "key").toString(crypto.enc.Utf8));
//decrypt는 복호화 tostring뒤에 써놓은건 우리가 볼수있게 적어놓은거 utf8에 모든 언어가 다들어가있다
//위에서 암호화한것을 다시 풀어서 sklalksdfkjl로나옴

//양방향 암호화

// 암호화 << 이론만 간단하게 용어정도?
// 입력한 데이터를 다른 사람이 알수 없도록 변환한다
// 1234 => 암호화를 통해서 => asekuhrbveablkreasbrvrlkuseabrv123
// 복호화 : 암호화된 데이터를 원상 복구한다.
// asekuhrbveablkreasbrvrlkuseabrv123 => 복호화 => 1234
// 사용자가 입력한 데이터를 알 수 있어야 할까?
//   알면 안되는 것들도 있다. => 단방향 / 양방향 암호화
// 단방향은 암호화만 가능하다. => 복호화가 불가능하다.
// Hashing : 일종의 배열? 객체?
// 암호화된 중복되지 않는 키를 사용하여 데이터를 저장한다.
// [0 ,1, 2, 3, 4, 5] << 내가 원하는 위치값
// [easrv, sevr , sevrs ,vesr ,sve ,btars]<< 입력된 데이터
// 중복이 최대한 되지 말아야한다.
// SHA256(가장 많이 쓰인다.), RIPEMD160
// 양방향은 복호화가 가능하다.
// 대칭키 : 암호화와 복호화가 같은 키로 변환된다.
// 키가 하나다
// AED , DES, SEED
// 비대칭키: 암호화와 복호화가 다른 키로 변환된다.
// 퍼블릭 , 프라이빗 키로 나뉜다
// RSA, ECC
// <<테스트 해보려면 openSsl 등을 사용해야한다. << 알아서 찾아라
