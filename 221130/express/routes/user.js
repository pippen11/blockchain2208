import { Router } from "express";
import crypto from "crypto-js";

const router = Router();

//서버에 저장하는 데이터
const userArr = [];
const user = {};

//axios.post로 보낸 req.body를 받음
router.post("/regist", (req, res) => {
  if (!userArr.find((item) => item.userId == req.body.userId))
    userArr.push(req.body);
  //처음엔 아이디없으니 빈배열에넣어줌
  //아이디없으면 푸쉬
  res.end();
});

router.post("/login", (req, res) => {
  const tempUser = userArr.find((item) => item.userId == req.body.userId);
  //req.body와 item.userId가 같을때만 찾아서 tempUser에넣는다

  if (
    //이부분 잘모르겠음
    tempUser &&
    tempUser.userPw == req.body.userPw &&
    //번호
    !user[tempUser.userId]
    //다른곳에서 로그인돼있는지 체크 어딘가에도없다(로그인안했던사람임)
  ) {
    user[tempUser.userId] = crypto
      //키값은 userId가됨
      .SHA256(tempUser.userId)
      .toString(crypto.enc.Base64);
    //enc.Base64는 하나의 방법?
    //유저아이디 암호화
    //쿠키를 만듬
    res.cookie("user", user[tempUser.userId], {
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });
    //쿠키에 저장
    setTimeout(() => {
      user[tempUser.userId] = undefined;
    }, 10 * 60 * 1000);
    //10분후 쿠키 초기화해줘라
    res.send({ ...tempUser, userPw: undefined });

    //패스워드 안뜨게 하려고 일부러 undefined뜨게함
    //유저정보를 다시 보내줌 pw빈값으로
  } else res.send({ text: "아이디가 없습니다" });
  //만약 다 아니면 아이디없다라고 보냄
});

router.post("/logout", (req, res) => {
  res.clearCookie("user");
  //쿠키에 추가한거 user를 삭제
  user[req.body.userId] = undefined;
  //암호화해서 저장해논것을 undefined로 없애줌
  res.end();
});

//체크는 유저확인위해 유저받자
//포스트맨에서 확인하려고 넣어줌
router.get("/check", (req, res) => {
  res.send({ userArr, user });
  //객체로 보내주는이유?
  // res.end();
  //체크통해서 정상적으로 들어왔나 확인함 암호화된 문자열이 들어가게된다
});

export default router;
