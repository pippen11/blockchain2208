//jwt : JsonwebToken
// JSON은 일종의 데이터 형식
// forms['dataName'] == forms.dataName
// forms.?[dataName] forms?.dataName
// jwt: 웹에서 사용하는 JSON 형식의 토큰(짧은 데이터)
//로그인할때 쓰는데 JWT를 이해하기위한 코드임
const crypto = require("crypto-js");

//json형식으로 안바꾸면 암호화가안되서 jwt가 그런것

const tempHeader = JSON.stringify({ name: "block7", alg: "HS256" });
//밑에 HmacSHA256이랑 맞춰줘야함
//암호화를한다
//stringify: 객체를 JSON형식으로 변환
// parse: JSON 형식을 객체로 변환
// alg : 어떠한 알고리즘을 사용할것인가 << 암호화한다
// HS256(default), HS384 , HS512 , RS256 등등
const base64Header = Buffer.from(tempHeader).toString("base64url");
// JWT는 base64url 형식의 포멧을 사용한다
// base64가 뭘까? 데이터의 포멧중하나 ASCII코드를 기준으로 데이터를 저장하는 포멧이다
const JWTHeader = base64Header.replaceAll("=", "");
//위는 header를 완성했다.

const tempPayload = JSON.stringify({ maker: "tester", expiresIn: "10m" });
//언제끝낼거냐 10분이다 세션이 종료되는시점 예를들어 메이플에서 로그인언제했는지 입력이되있고 web토큰을 받아서 알수있다
const base64Payload = Buffer.from(tempPayload).toString("base64url");
const JWTPayload = base64Payload.replaceAll("=", "");
//=을 없애는이유가 그렇게 쓴다
//위는 payload를 완성했따.

const tempSignature = crypto
  .HmacSHA256(JWTHeader + "." + JWTPayload, "key")
  .toString(crypto.enc.Base64url)
  .replaceAll("=", "");

const jwt = `${JWTHeader}.${JWTPayload}.${tempSignature}`;
console.log(jwt);

//json web token은 'header.payload.signature' 로 이루어져있다
//header: JWT의 검증을 위한 데이터가 저장된다
// payload: JWT가 갖고있는 데이터이다. << 우리가 저장하고 싶은 데이터 ,주고받아야할 데이터 , 로그인 후의 그사람의닉네임, 어떠한 암호화된 토큰등
// 로그인했으면 그사람이 로그인한 데이터를 알아야한다 그런 jwt?
// signature: 암호화된 서명이다 . << 검증에 사용한다.  jwt랑 아까쓴거랑 같은거다 jwt.io에서 확인가능
//key랑 verify signature에서 확인 key는 암호화된 데이터의 비밀번호라고 생각
