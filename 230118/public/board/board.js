const ulElem = document.getElementsByTagName("ul")[0];
axios.get("board/list").then(({ data }) => {
  data.forEach((item) => {
    const tempLi = document.createElement("li");
    tempLi.innerText = item;
    ulElem.append(tempLi);
  });
});

document.forms.test1.onsubmit = function (e) {
  e.preventDefault();
  axios
    .post("board/add", { value: e.target.test.value })
    // axios로 포스트로 보냄
    .then(({ data }) => {
      //받아온데이터로
      ulElem.innerHTML = "";
      //초기화하고
      data.forEach((item) => {
        //forEach로 하나하나보냄
        const tempLi = document.createElement("li");
        tempLi.innerText = item;
        ulElem.append(tempLi);
      });
    });
};
