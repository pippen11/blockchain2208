const router = require("express").Router();
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const userlist = {};
//{asdf: '2134'}

router.post("/regist", (req, res) => {
  // const tempJWT = jwt.sign({ name: "test" }, "sdkfjksdfj", {
  //   algorithm: "HS256",
  //   expiresIn: "10m",
  //   issuer: "jkh",
  // }); // jwt 생성
  // //아까 만든거 세줄이면 끝난다?
  // console.log(tempJWT);
  // const tempData = jwt.verify(tempJWT, "sdkfjksdfj"); //jwt 파싱
  // console.log(tempData);
  // // const cookie_name = "cookie_name",
  // //   cookie_data = "now testing";
  // // 이렇게 적어도된다 변수에 저장해서 갖고옴
  // res.cookie("cookie_name", "now testing", {
  //   expires: new Date(Date.now() + 30 * 1000),
  //   //시간으로 쿠키제어 쿠키:임시데이터저장 아이디 로그아웃시키게
  //   //쿠키는 임시 데이터를 브라우저에 저장한다
  //   //크롬에서 로그인한거, 쿠키에 남아있겠지?>> 파이어폭스에서 연동될까?
  //   //>> 안된다 << 왜? 데이터 저장 공간이 다르다, 즉 쿠키 저장한 파일이 다르다.

  //   //쿠키 생성한걸 30초후에 삭제 application cookie에서 확인가능
  //   //단위가 ms다 ,1ms = 0.001s -> 1000ms =1s
  //   //10*50*1000<< 1000->1s*60->1m*10 -> 10분 시간지나면 지가 알아서 사라진다
  //   //30초로 수정
  // });
  //응답으로 쿠키 추가
  console.log(req.body);
  //   console.log(userlist);
  if (!userlist[req.body.id]) {
    //값이없으면
    // userlist[req.body.id] = crypto.SHA256(req.body.pw).toString();
    /////
    // if (!userlist[req.body.id]) {
    //   userlist[req.body.id] = {
    //     pw: req.body.pw,
    //     name: req.body.name,
    //   };

    //userlist{req.body.id:req.body.pw} 이렇게 쓰면 초기화됨
    //객체에서 대괄호는 키가온다
    //대괄호안에는 변수를 넣어서 키를 찾을수있다 입력받은 id 키에 값으로 pw값으넣는다
    //userlist['asdf]='2134' 스트링을 들어가짐
    //object=>userlist.asdf<<userlist={asdf:'2134}
    //key는 변수 값은 변수내에 데이터
    userlist[req.body.id] = {
      name: req.body.name,
      pw: crypto.SHA256(req.body.pw).toString(),
    };
    console.log(userlist);
    res.send({ status: 200, data: "regist", userlist });
  } else {
    res.send({ status: 402, data: "exist id", userlist });
  }
});

router.post("/login", (req, res) => {
  console.log(req.cookies.cookie_name);
  //요청을 통해 받은 쿠키
  console.log(req.body);
  console.log(userlist);
  if (userlist[req.body.id]?.pw === crypto.SHA256(req.body.pw).toString()) {
    //?는 앞에있는게 객체인지아닌지 확인한다(객체아니면 터지기때문에 객체면 그안에서 pw를 찾는다)
    res.cookie(
      "log_jwt",
      jwt.sign({ name: userlist[req.body.id].name }, "block7testing", {
        algorithm: "HS256",
        //방식 암호화가 아님
        expiresIn: "10m",
        issuer: "jkh",
      })
      //브라우저에 쿠키에 jwt토큰으로 값을 보냄
    );
    res.send({ status: 200, data: "login", userlist });
  } else {
    res.send({ status: 401, data: "wrong password", userlist });
  }
});

module.exports = router;

// const name = "";
// const email = "";
// const phoneNumber = "";
// const address = "";
// const id = "";
// const pw = "";

// const userInfo = {
//   name: "a",
//   emial: "b",
//   phoneNumber: "c",
//   address: "d",
//   id: "e",
//   pw: "f",
//   jkh: "h",
// };
// userInfo.gender = "g";

// const userInput = "jkh";
// userInfo[userInput] = "h";
//이렇게쓰면 위에 값으로 저장됨 대괄호안에 키값

//user list[req.body.id]={pw: req.body.pw}
