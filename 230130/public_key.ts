//npm i elliptic
// -타원 곡선 알고리즘 사용하는 암호화 라이브러리
// npm i -D @types/elliptic
// -typescript 사용하니까 타입도 불러오자
//ts-node public_key 각 파일이름에 맞게써서 실행
import cryptoJS from "crypto-js";
import elliptic from "elliptic";

const privatekey: string = cryptoJS.lib.WordArray.random(32)
  .toString()
  .toUpperCase();

//개인키와 공개키가 다른걸로 복호화하면 비대칭 암호화
// 개인키 공개키가 같으면 대칭암호화
// 개인키 라이브러리 써서 만듬
//카드가 공개키
//개인키는 본인만있다

// 개인키를 암호화한게 서명
// console.log(privatekey);
//toUpperCase 해야 머클은 대문자로 계산하니까 이렇게해줌

const ec: elliptic.ec = new elliptic.ec("secp256k1");
// 타원 곡선을 생성한다
// ec에 전달하는 매개변수 "secp256k1"은 elliptic에서 제공하는 사전 설정 중 하나이다.

// - 사전 설정으로는 secp256k1, p192, p224 등등이 있다.
// - 그럼 왜 secp256k1 설정을 사용하는가? => 비트코인과 이더리움에서 사용하는 설정이다. => y^2= x^3 +7, G="02....."" 이함수형식씀

const keyPair: elliptic.ec.KeyPair = ec.keyFromPrivate(privatekey);
// 뒤에 인코딩형식을 필수는아님hex등
// 개인키를 사용해서 키페어를 생성한다.
// - 즉 공개키를 생성한다.
// 두개를 짝지어둔다
// keyFromPrivate(개인키) << 개인키를 사용하여 키페어(개인키 + 공개키)를 생성한다

const publickey: string = keyPair.getPublic().encode("hex", true).toUpperCase();
// 생성된 키페어에서 공개키를 가져온다
//getPublic() <<키페어에서 공개키를 가져온다.
// endcode(인코딩형식, true)<< 암호문을 저장하기 위해 객체 형식으로 되어있는 데이터를 문자열로(hex) 로 변환한다.
console.log("privateKey:", privatekey);
console.log("privateKey.length:", privatekey.length);
// 이건 64자리
console.log("publickey :", publickey);
console.log("publickey.length :", publickey.length);
// 공개키는 개인지갑주소이다.
// 타원곡선에서 공개키는 찾은 점의 좌표이다.=> x,y 두 수로 이루어져 있다.
// 공개키는 문자열로 나타낼 시 "x" + "y" => `${x}${y}` << 두 좌표를 문자로써 연결한 문자열(string) 이다.
// x, y는 256 bits의 크기를 가진다. => 공개키는 512bits의 크기를 가진다.=> 128자가 나와야한다( 64자 * 2)
// 128자는 너무 길어서 압축을 하게 된다 => x의 값은 그대로 가져오고 y값은 짝수일때는 "02" , 홀수일때는 "03"을 사용하게된다 => 02XXXXXX || 03XXXXX가 나오게된다
//026f2a57d21154b6f806ceb3c1b9081b0edf407d1d657eca986ca1e376c8c6ca80
//02 / 6f2a57d21154b6f806ceb3c1b9081b0edf407d1d657eca986ca1e376c8c6ca80 =>y는 짝수고(02) x는 6f2a57d21154b6f806ceb3c1b9081b0edf407d1d657eca986ca1e376c8c6ca80
// 타원 곡선 알고리즘을 사용해서 공개키를 구했을때 => x , y 좌표가 공개키로 정의된다 => x , y를 모두 표기하면 128자(512 bits)의 길이를 갖게된다=> 너무 길어서 64자로 줄인다(x만 사용한다) => y를 버릴수가 없어서 홀수와 짝수로 나누어 간단하게 추가한다( 짝수 : 02, 홀수 : 03) y에 대한 값은 앞에 붙인다
// => 02XXXXXX || 03XXXXXX 128자까지 필요없고 64자만 있으면돼서 x만사용 -> 64자 y를 버리면안되니까 홀수일때 "03" 짝수면 "02"써서 x앞에 붙이겠다(주고받을때 데이터용량아낄려고)
// 02는 y축 나머지 x축 그래서 66자리 예를들어 G 2G 3G 4G이렇게 가면서 4번만에 찾으면 4가 개인키 4G자체가 공개키임 그 공개키(개인지갑주소)는 x,y축이여서 66자
// y가 짝수일때 02를 앞에 추가하고 홀수일때 03을 앞에 추가한다. => x + y축을 같이쓸경우에 128자 일까? y를 안줄이면 앞에 04를 붙임 즉 130자가됨(520 bits/65 bytes)
//046f2a57d21154b6f806ceb3c1b9081b0edf407d1d657eca986ca1e376c8c6ca800367de38c8a3e30f0d1ca9ebe3f8c4ef0087c718faa616cb980fe291a5b7dd2ee8 총 130자
//publickey가 66자리인이유는 타원곡선의 특성때문이다

const data: string = "checking data";
const hash: string = cryptoJS.SHA256(data).toString().toUpperCase();
// 서명에쓸 데이터를 만들고있다(hash)
// 전송할 데이터(입력된 값 : checking data ), Hash로 암호화 해두자
// hash로 암호화한걸 개인키로만든 keypair(개인키+공개키)로 암호화한게 서명
console.log("hash :", hash);
console.log("hash.length : ", hash.length);

const signature: elliptic.ec.Signature = keyPair.sign(hash, "hex");
// 여기서 hash값 keypair를 사용해서 암호화한게 signature임
// sign(데이터, 인코딩형식) << 키페어를 사용애서 서명을 만든다.
console.log(signature);

// 위에서 만든 서명을 확인하자
const verify: boolean = ec.verify(
  hash,
  signature,
  //(금고) 서명 눌럿을때 signature와 트랜젝션에서 가져오는 hash값을 비교한다 같아야함 hash값이 같아서
  // signature안에 keypair를 사용해서 hash를 암호화하기때문에 안에 hash가 있음
  // 그걸 공개키로 keypair를 만든걸로 복호화해서 트젝날릴때의 hash와 비교
  ec.keyFromPublic(publickey, "hex")
  // 도구(카드키) 공개키를 사용해서 keypair를 만들어서 signature을 복호화하는것
);
// 복호화해서 트랜젝션날릴때의 hash값이랑 signature의 hash값을 비교
// signature우리가 복호화 할 애 ,공개키를 기준으로 keypair를 만든다 ec.keyFromPublic(publickey, "hex"));는 keypair를 새로만들어라 그걸이용해서 복호화
console.log("verify :", verify);
// 정상적으로 복호화되어 hash가 확인된다면 true가 반환된다.(return)
// verify(데이터,서명,키페어) << 서명을 키페어를 사용해서 복호화 해서 데이터와 비교한다. 같은 데이터라면 true가 반환된다.
//  keyFromPublic(공개키, ?인코딩형식(써도되고 안써도됨)) <<공개키를 사용하여 키페어를 생성한다

const newPrivateKey: string = cryptoJS.lib.WordArray.random(32)
  .toString()
  .toUpperCase();

const newKeyPair = ec.keyFromPrivate(newPrivateKey);

const newPublicKey = newKeyPair.getPublic().encode("hex", true).toUpperCase();

const newVeryify = ec.verify(
  hash,
  signature,
  ec.keyFromPublic(newPublicKey, "hex")
  //공개키로 가져온 키페어가 가 달라서 false
);
console.log("newVerify :", newVeryify);
//공개키로 가져온 키페어가 가 달라서 false
//새로운 공개키로 확인했기 때문에 false가 반환
// keyFromPublic에서 'hex' 없으면 터진다.
// -hash, 즉 (=데이터)와 signature(=서명), 즉 서명 과 publicKey(=공개키)가 정확히 일치 하지않는다 => 상대가 보낸것인지 확신할수없다.
// 해킹일수도있다

//0xb18fBAd70a07D4CAB5510e2f87Fae20eE22cF2b4  가 개인키 개인지갑
//  앞에 0x는 16진수라는 표시이다. ox뒤에있는게 실제지갑주소

// const mywallet = "b18fBAd70a07D4CAB5510e2f87Fae20eE22cF2b4";
// console.log(mywallet.length);

const myWallet = publickey.slice(26);
console.log(myWallet.length);
// 공개키 66자를 -> 앞에서부터 26자 자름

// 개인키-random으로뽑음 privatekey
// 키페어(keyPair)(개인키+공개키) -개인키 사용하여(타원곡선돌려서) 생성
// 공개키-keypair에서 뽑음
// 해쉬-sha256 값 뽑음
// 서명- 키페어를 사용하여 hash값 넣어서 생성

// 인증은 hash값이랑 서명이랑 공개키로 만든 키페어 생성하여 비교

// 개인키로 만든 키페어를 사용하여 hash값을 암호화한 signature의 hash값과 signature복호화한 hash값 비교
// 공개키넣은 키페어를 만들어서 비교
