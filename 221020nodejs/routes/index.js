import { Router } from "express";

const router = Router();
const todoList = [];

router
  .route("/list")
  // /api/list + '/' 슬래쉬만쳐서 앞에꺼랑 추가하는것 /api/list기준
  .get((req, res) => {
    res.send({
      list: todoList,
    });
  })
  .post((req, res) => {
    todoList.push({ text: req.body["name"], time: req.body.time });
    res.end();
  });

//   .put((req, res) => {
//     //수정
//   })
//   .delete((req, res) => {
//     //삭제
//   });

export default router;
//module.exports=router

//라우터쓰는이유가 다른거 끌고와서 코드관리하려고 쓴다 로그인 로그아웃등 다른거랑 구별해서 쓰려고
