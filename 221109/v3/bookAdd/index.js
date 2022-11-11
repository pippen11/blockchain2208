const saveBtn = document.getElementById("save");

const preview = document.getElementById("preview");

const book_img = document.getElementById("book_img");

document.getElementById("fileadd").onsubmit = async (e) => {
  //폼태그 아이디
  e.preventDefault();

  const { book_img, title, title_sub, introduce, publisher } = e.target;
  //구조 분해할당 각각 아이디
  let formData = new FormData();
  // 이렇게 쓰는방식 이다 new FormData로 정해져있음

  formData.append("book_img", book_img.files[0]);
  //append가 클래스에 추가하는게아니라 폼태그에서 키와 값으로 값을 클라이언트에서 서버로보내는방식
  formData.append("title", title.value);
  formData.append("title_sub", title_sub.value);
  formData.append("introduce", introduce.value);
  formData.append("category", getValue());
  formData.append("publisher", publisher.value);
  const data = await axios.post("/v3/boodAdd/upload", formData);
  console.log(data);
};

function getValue() {
  const category = document.getElementById("category");
  return category.options[category.selectedIndex].value;
}
//셀렉션 카테고리 값 가져오는 방식

//그냥 이렇게쓰는방식임 화면에 파일을 띄워준다?
function setImg(input) {
  if (input.files && input.files[0]) {
    let readImg = new FileReader();

    readImg.onload = (e) => {
      preview.setAttribute("src", e.target.result);
      preview.style.width = "200px";
      preview.style.height = "250px";
    };
    readImg.readAsDataURL(input.files[0]);
  }
}

//이미지파일자리에 변화일어날때 함수실행
book_img.addEventListener("change", (e) => {
  setImg(e.target);
});
