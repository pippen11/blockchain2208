const ulElem = document.getElementsByTagName("ul")[0];
//이파일 전체해석
document.forms.test1.onsubmit = function (e) {
  e.preventDefault();
  axios.post("/board/add", { value: e.target.test.value }).then(({}) => {
    location.reload();
  });
};
