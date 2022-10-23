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
  // getList();
};
// form 안에 있는 button은 기본적으로 form의 submit을 실행

// const tempData = [
//   [
//     { title: "arvserv1", text: "9baresrsearvstb" },
//     { title: "arvserv2", text: "8baresrsearvstb" },
//     { title: "arvserv3", text: "7baresrsearvstb" },
//     { title: "arvserv4", text: "6baresrsearvstb" },
//     { title: "arvserv5", text: "5baresrsearvstb" },
//   ],
//   [
//     { title: "arvserv6", text: "4baresrsearvstb" },
//     { title: "arvserv7", text: "3baresrsearvstb" },
//     { title: "arvserv8", text: "2baresrsearvstb" },
//     { title: "arvserv9", text: "1baresrsearvstb" },
//   ],
// ];

let maxCount = 2;
let count = 0;

const pageElem = document.getElementById("page");
const listElem = document.getElementById("list");

async function getList() {
  try {
    const data = await axios.get("/api/board?count=" + count);
    pageElem.innerHTML = "";
    maxCount = data.data.maxCount;
    for (let i = 0; i < maxCount; ++i) {
      const tempLi = document.createElement("li");
      tempLi.innerText = i + 1;
      tempLi.onclick = function (e) {};
    }
  } catch {}
}
