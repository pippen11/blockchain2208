const router = require("express").Router();

router.get("/", (req, res) => {
  //앞에 /api/board
  //응답을 보내는 메서드, 목록과 페이징, 지금 몇번째 페이지이고
  //총 몇페이지인지
  // axios.get('/api/board')

  res.send(req.route + "get으로 받았다");
  //{data: '[object Object]get으로 받았다', status: 200, statusText: 'OK', headers: le, config: {…}, …}
  // 웹사이트에 이런식으로 나옴
});

router.post("/add", (req, res) => {
  //추가하는 메서드
  //게시판에 글 추가
  //axios.post('/api/board/add')
  res.send(req.route + "post로 받았다.");
});

module.exports = router;
