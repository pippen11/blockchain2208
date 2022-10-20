const todoList = document.getElementById("list");
function getList() {
  todoList.innerHTML = "";
  axios.get("/api/list").then((resData) => {
    // console.log(data);
    resData.data.list.forEach((todo) => {
      const tempElem = document.createElement("li");
      tempElem.classList.add("list-group-item");

      tempElem.innerHTML = `${todo.text}/등록시간:${new Date(todo.time)}`;
      todoList.append(tempElem);
    });
  });
}
getList();

//요청을 보냄

document.forms["todoform"].onsubmit = function (e) {
  //form태그들
  //onsubmit은 onclick처럼 작동하는애임 엔터쳤을때
  e.preventDefault(); //기본 이벤트를 막는다.
  // form태그 옆에 action있으면 그페이지로 이동하는데 그걸 막는다
  //원래 form자체가 이름에 변수를 넣어서 보내줌

  axios
    .post("/api/list", {
      name: document.forms["todoform"]["do-name"].value,
      //getElemnetByID("do-name")으로 해도됨
      time: new Date(),
      //date now()
      //html의 id임
      // test: 1,
      // str: "김재일",
    })
    .then((data) => {
      getList();
    });
};
//이건 axios post형식 클라이언트에서 보내줌

//   axios.get(
//     "/api/add?name=" +
//       // add까지가 라우터 ?name부터 끝까지는 쿼리스트링
//       document.forms["todoform"]["do-name"].value +
//       "&str=" +
//       "이가원"
//     //name값은 1 스트링은 이가원 axios에서 서버에 보냄
//   );
// 이건 axios get형식 post랑 get형식이 다르다

//중괄호 안이 바디임
//axios.post(''라우터',서버의 req.body내용이 들어감)
//저 데이터를 보낸다.

//요청을 보내줘야 요청을 받는다
//객체이름을 아무거나 쓸수있다 하지만 todolistpush안에 배열안 이름은 값아야한다

//   getList();

//폼의 원래 이벤트는 사용하지않을거다
//XMLHttpRequest->fetch/ajax->axios
//http모듈-> express
//{}안의 내용이 바디

// axious.delete("/api/list",{
//   삭제
// })
//  .then((data)=>{});
//axios
// .put("/api/list",{
//   수정
// })
// .then((data)=>{});

// 위코드를 적절하게사용
