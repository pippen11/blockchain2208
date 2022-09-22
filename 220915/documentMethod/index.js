const root = document.getElementById("root");
//id가 root인 엘리먼트를 가져온다. 그리고  root변수에
//초기화 한다.

// root.onload
//onload라는 메서드는 로드가 되었는가? 생성이 될때 되었을때 실행된다.
//즉 . dom에 생성됐을때
root.onwheel = (e) => {
  //마우스 휠에 대한 메서드
  console.log(e.target);
};

document.getElementById("name").onchange = (e) => {
  console.log(e.target.value);
  //e.target은 해당 메서드가 어디서 실행됐는지,
  //onchange은 입력이 완료됐을때 , 즉변화가 완료됐을때
  //포커스가 기준이 될수도 있고 마우스의 위치가 기준이 될수도 있다.
};
//루트위에서 휠을 해야 먹힌다.

document.getElementById("name").oninput = (e) => {
  //입력햇을때 뜨게함 oninput
  console.log(e.target.value);
};

//on 어쩌구 하는 메서드를 쓰는데 그게뭐냐?
// on***은 전부 이벤트 함수라고 부른다.
//즉 , 클릭 , 키다운, 입력등 사용자의 입력에 대해서
//이벤트가 발생했을때 실행된다.

// document.getElementById("name").addEventListener("click", function () {
//   console.log("input을 클릭했어");
// });
//이거랑 밑에꺼랑 같은거인듯

document.getElementById("name").addEventListener("click", (e) => {
  console.log(e.target);
});

for (let i = 0; i < 10; ++i) {
  const tempElem = document.createElement("div");
  //div 엘리먼트를 생성해서 tempElem변수에 초기화한다
  tempElem.innerHTML = i + "번째 Div";
  //tempElem의 내용(innerHTml)을 i번째 Div라고 정의한다

  //   root.append(tempElem);
  //   //root엘리먼트에 tempElem엘리먼트를 마지막 자식으로 추가한다(뒤에서)
  root.prepend(tempElem);
  //root 엘리먼트에 tempElem 엘리먼트를 첫번째자식으로 추가한다.
}

document.getElementById("name").style.backgroundColor = "lightgray";
//html문서에서 style속성을 이용해서 inline형식으로 설정된 스타일과 마찬가지로 적용된다.

console.log(document.getElementById("name").style.border);
//name이 id인 것을 찾아서 style 배경색 lightgray를 넣어줌
