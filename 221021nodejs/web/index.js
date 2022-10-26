document.getElementById("menu-btn").onclick = function (e) {
  document.getElementById("user-input-container").classList.toggle("on");
};
// const a = document.getElementById("board-title");
//1 정보입력
document.getElementById("board-add").onsubmit = async function (e) {
  e.preventDefault();
  if (!e.target["board-title"].value) {
    e.target["board-title"].focus();
    return;
  }
  if (!e.target["board-text"].value) {
    e.target["board-text"].focus();
    return;
  }
  //값이 없을때 포커스 해줌
  //   console.log(e.target["board-title"].value);
  //   console.log(e.target["board-text"].value);
  try {
    const data = await axios.post("/api/board/add", {
      //서버로감
      title: e.target["board-title"].value,
      text: e.target["board-text"].value,
      uptime: Date.now(),
    });
    console.log(data);
    if (data.data.status == 200) {
      e.target["board-title"].value = e.target["board-text"].value = "";
    }
  } catch (err) {
    console.error(err);
  }
  getList();
};
// form 안에 있는 button은 기본적으로 form의 submit을 실행

const tempData = [
  [
    { title: "arvserv1", text: "9baresrsearvstb" },
    { title: "arvserv2", text: "8baresrsearvstb" },
    { title: "arvserv3", text: "7baresrsearvstb" },
    { title: "arvserv4", text: "6baresrsearvstb" },
    { title: "arvserv5", text: "5baresrsearvstb" },
  ],
  [
    { title: "arvserv6", text: "4baresrsearvstb" },
    { title: "arvserv7", text: "3baresrsearvstb" },
    { title: "arvserv8", text: "2baresrsearvstb" },
    { title: "arvserv9", text: "1baresrsearvstb" },
  ],
];

let maxCount = 2; // 총 페이지 수
let count = 0; // 현재 페이지

const pageElem = document.getElementById("page");
const listElem = document.getElementById("list");

//3 페이지표시
async function getList() {
  try {
    const data = await axios.get("/api/board?count=" + count);
    // count = 0 => /api/board?count=0
    // console.log(data.data.maxCount);

    pageElem.innerHTML = "";
    maxCount = data.data.maxCount;
    for (let i = 0; i < maxCount; ++i) {
      const tempLi = document.createElement("li");
      tempLi.innerText = i + 1;
      tempLi.onclick = function (e) {
        count = i;
        pageElem.getElementsByClassName("now")[0].classList.remove("now");
        tempLi.classList.add("now");
        getList();
      };
      if (count === i) {
        tempLi.classList.add("now");
      }
      pageElem.append(tempLi);
    }

    listElem.innerHTML = "";

    data.data.list.forEach((data, index) => {
      // tempData[count].forEach((data) => {
      const tempLi = document.createElement("li");
      const tempTitle = document.createElement("div");
      const tempH3 = document.createElement("h3");
      const tempImg = document.createElement("img");
      const tempText = document.createElement("div");
      const tempP = document.createElement("p");
      const tempTextarea = document.createElement("textarea");
      const tempBtnBox = document.createElement("div");
      const tempDelBtn = document.createElement("img");
      const tempEditBtn = document.createElement("img");
      const tempCancelBtn = document.createElement("img");

      tempTitle.classList.add("title");
      tempTitle.onclick = function (e) {
        tempText.classList.toggle("on");
        tempImg.classList.toggle("on");
        tempText.classList.remove("edit");
      };
      tempText.classList.add("text");
      tempImg.src = "./imgs/angle-up-solid.svg";
      tempImg.alt = "list-item-btn";
      tempH3.innerText = data.title;
      tempP.innerText = data.text;
      tempTextarea.value = data.text;

      tempBtnBox.classList.add("list-btn-box");
      tempDelBtn.src = "./imgs/ban-solid.svg";
      tempDelBtn.alt = "delete-btn";
      tempDelBtn.classList.add("delete");

      // 클릭했을때 삭제
      tempDelBtn.onclick = async function (e) {
        try {
          const data = await axios.post("/api/board/delete", {
            count,
            num: index,
          });
          getList();
          console.log(data.data);
        } catch (err) {
          console.log(err);
        }
      };

      // 수정이미지 클릭했을때
      tempEditBtn.src = "./imgs/plus-solid.svg";
      tempEditBtn.alt = "edit-btn";
      tempEditBtn.onclick = async function (e) {
        if (tempText.classList.contains("edit")) {
          try {
            const data = await axios.post("/api/board/update", {
              count,
              num: index,
              text: tempTextarea.value,
              time: Date.now(),
            });
            getList();
            console.log(data.data);
          } catch (err) {
            console.log(err);
          }
        } else {
          tempTextarea.value = data.text;
          tempText.classList.add("edit");
        }
      };
      //////
      // 수정버튼 누른상태에서 취소이미지 눌렀을때
      tempCancelBtn.src = "./imgs/xmark-solid.svg";
      tempCancelBtn.alt = "cancel-btn";
      tempCancelBtn.classList.add("cancel");
      tempCancelBtn.onclick = function (e) {
        tempText.classList.remove("edit");
      };

      tempBtnBox.append(tempEditBtn);
      tempBtnBox.append(tempDelBtn);
      tempBtnBox.append(tempCancelBtn);

      tempTitle.append(tempH3);
      tempTitle.append(tempImg);
      tempText.append(tempP);
      tempText.append(tempTextarea);
      tempText.append(tempBtnBox);
      tempLi.append(tempTitle);
      tempLi.append(tempText);
      listElem.append(tempLi);
    });
  } catch (err) {
    console.error(err);
  }
}
getList();

document.getElementById("sign-in").onclick = async function (e) {
  e.preventDefault();
  console.log(document.forms["user-info"].id.value);
  const data = await axios.post("/api/user/login", {
    id: document.forms["user-info"].id.value,
    pw: document.forms["user-info"].pw.value,
  });
  console.log(data.data);

  // const temp = Buffer.from(
  //   document.cooke.split("=")[1].split(".")[1],
  //   "base64url"
  // ).toString();
  // console.log(temp);
  // console.log(document.cookie);
  // console.log(documnet.cookie.split("="));
  // console.log(documnet.cookie.split("=")[1]);
  // console.log(documnet.cookie.split("=")[1].split("."));
  // console.log(documnet.cookie.split("=")[1].split(".")[1]);
  // console.log(window.atob(documnet.cookie.split("=")[1].split(".")[1]));
  // console.log(
  //   JSON.parse(window.atob(documnet.cookie.split("=")[1].split(".")[1]))
  // );
  // console.log(
  //   JSON.parse(window.atob(documnet.cookie.split("=")[1].split(".")[1])).name
  // );

  const tempName = JSON.parse(
    window.atob(document.cookie.split("=")[1].split(".")[1])
  ).name;

  console.log(tempName);
  if (tempName) {
    document.getElementById("user-name").innerText = tempName + "님 어서오세요";
    //밑코드는 다른거사라지고 로그인했을때 로그아웃버튼이뜬다
    [...document.getElementsByClassName("btn-box")].forEach((elem) => {
      elem.classList.toggle("on");
    });
    //getElementsByclassName은 그클래스명을 몇개든 다가져옴
    // btn-box 클래스 를 가져와서 배열로만들고 포이치 돌려서
    //on class를 껏다켰다씀 로그인 로그아웃 로그인하면 없어지고 로그아웃생기고등
    [...document.getElementsByClassName("sign-input")].forEach((elem) => {
      elem.classList.toggle("on");
    });
  }
  document.forms["user-info"].id.value =
    document.forms["user-info"].pw.value =
    document.forms["user-info"].name.value =
      "";
  //JSON.parse로 객체화 시킴
};

document.getElementById("sign-up").onclick = async function (e) {
  e.preventDefault();
  const data = await axios.post("/api/user/regist", {
    id: document.forms["user-info"].id.value,
    pw: document.forms["user-info"].pw.value,
    name: document.forms["user-info"].name.value,
  });
  console.log(data.data);

  document.forms["user-info"].id.value =
    document.forms["user-info"].pw.value =
    document.forms["user-info"].name.value =
      "";
};

document.getElementById("sign-out").onclick = async function (e) {
  e.preventDefault();

  document.getElementById("user-name").innerText = "";
  //밑코드는 다른거사라지고 로그인했을때 로그아웃버튼이뜬다
  [...document.getElementsByClassName("btn-box")].forEach((elem) => {
    elem.classList.toggle("on");
  });

  [...document.getElementsByClassName("sign-input")].forEach((elem) => {
    elem.classList.toggle("on");
  });
};

// axios.post("/api/board/add").then((data) => {
//   console.log(data);
// });
