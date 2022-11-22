const loginPageElem = document.getElementById("loginPage");
const authorLoginPageElem = document.getElementById("authorLoginPage");

classList.contains("on") ? false : true;

authorLoginPageElem.onclick = () => {
  userId.value = userPw.value = "";
  authorLoginContainer.style.display = "block";
  loginContainer.style.display = "none";
  loginBtnElem.classList.remove("on");
};

function valueCheck() {
  if (userId.value && userPw.value) {
    loginBtnElem.classList.add("on");
  } else {
    loginBtnElem.classList.remove("on");
  }
 
}
if (loginData.data.status == 200) {
  // 로그인후메인으로 보내준다.
  location.href = "http://localhost:8080/v3/MainHome/";
  alert("일반회원 로그인 완료.");
} else if (loginData.data.status == 401) {
  alert("존재하지 않는 아이디입니다.");
} else if (loginData.data.status == 402) {
  alert("비밀번호가 일치하지 않습니다.");
} else {
  alert("로그인 실패");
}

function nameCheck(ua, name) {
  // const nameCheck = /^[가-힣a-zA-Z0-9]/gi;
  const nameCheck = /^[가-힣a-zA-Z]/gi;

  if (ua == "user") {
    if (!name) {
      nameLessMsg.style.display = "block";
      userNameElem.parentElement.classList.add("on");
    } else {
      nameLessMsg.style.display = "none";
      userNameElem.parentElement.classList.remove("on");
    }
    if (!nameCheck.test(name)) {
      nameMsg.style.display = "block";
      userNameElem.parentElement.classList.add("on");
    } else {
      nameMsg.style.display = "none";
      userNameElem.parentElement.classList.remove("on");
    }
    if (!name) {
      nameMsg.style.display = "none";
      userNameElem.parentElement.classList.add("on");
    }
    valueCheck();


    // 부모의 contains("on") 클래스 있는지 없는지 확인해 있으면 false, 없으면 true
    return userNameElem.parentElement.classList.contains("on") ? false : true;
  } else if (ua == "author") {
    if (!name) {
      authorNameLessMsg.style.display = "block";
      authorNameElem.parentElement.classList.add("on");
    } else {
      authorNameLessMsg.style.display = "none";
      authorNameElem.parentElement.classList.remove("on");
    }
    if (!nameCheck.test(name)) {
      authorNameMsg.style.display = "block";
      authorNameElem.parentElement.classList.add("on");
    } else {
      authorNameMsg.style.display = "none";
      authorNameElem.parentElement.classList.remove("on");
    }
    if (!name) {
      authorNameMsg.style.display = "none";
      authorNameElem.parentElement.classList.add("on");
    }

    userNameElem.addEventListener("focusout", (e) => {
      nameCheck("user", userNameElem.value);
    });
    authorNameElem.addEventListener("focusout", (e) => {
      nameCheck("author", authorNameElem.value);
    });


    
// 일반 회원가입 확인 함수 ok
function joinCheck() {
  const n = nameCheck("user", userNameElem.value);
  const i = idCheck("user", userIdElem.value);
  const m = mailCheck("user", userEmailElem.value);
  const p = pwCheck("user", userPwElem.value);
  const p2 = pwCheck2("user", userPwCheckElem.value);
  const b = birthCheck("user", userBirthdayElem.value);

  return n && i && m && p && p2 && b ? 1 : 0;
}

let temp = location.href.split("?");
// 페이지에 도착하면 정보를 불러오는 함수 구현과 실행

firstBannerTitle.innerText = category[temp[1]];
secondBannerTitle.innerText = category[temp[1]] + " 전체보기";
thirdBannerTitle.innerText = "신규" + category[temp[1]];
fourthBannerTitle.innerText = category[temp[1]] + " 인기 도서";
  


async function newbooks() {
  const data = await axios.post("/v3/category/booklist/bookAdd", {
    category: category[temp[1]],
  });
  console.log(data);
  for (let i = 0; i < data.data.length; i++) {
    const temp_item = document.createElement("div");
    temp_item.classList.add("item");
    const temp_img_box = document.createElement("div");
    temp_img_box.classList.add("img_box");
    const temp_book_info = document.createElement("div");
    temp_book_info.classList.add("book_info");
    temp_item.append(temp_img_box);
    temp_item.append(temp_book_info);
    const img = document.createElement("img");
    console.log(data.data[i].book_img);
    img.src = "http://localhost:8080/uploads/" + data.data[i].book_img;
    temp_img_box.append(img);
    const temp_book_title = document.createElement("div");
    temp_book_title.classList.add("book_title");
    temp_book_title.innerText = data.data[i].title;
    const temp_author_info = document.createElement("div");
    temp_author_info.classList.add("author_info");
    temp_book_info.append(temp_book_title);
    temp_book_info.append(temp_author_info);
    temp_author_info.innerText = data.data[i].introduce;
    document.getElementById("new_books").append(temp_item);

//폼태그 이미지 올리는법?
    document.getElementById("fileadd").onsubmit = async (e) => {
      e.preventDefault();
    
      const { book_img, title, title_sub, introduce, publisher } = e.target;
      let formData = new FormData();
    
      formData.append("book_img", book_img.files[0]);
    
      formData.append("title", title.value);
      formData.append("title_sub", title_sub.value);
      formData.append("introduce", introduce.value);
      formData.append("category", getValue());
      formData.append("publisher", publisher.value);
      const data = await axios.post("/v3/boodAdd/upload", formData);
      location.href = "/v3/myLibrary";
    };
    