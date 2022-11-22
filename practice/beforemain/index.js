let join_btn = document.getElementById("joinbtn");
let main = document.getElementById("mainwindow");
let second = document.getElementById("secondwindow");
let idElement = document.getElementById("id");
let pwElement = document.getElementById("pw");
let log_btn = document.getElementById("loginbtn");

let name_join = document.getElementById("name_join");
let id_join = document.getElementById("id_join");

let pw_join = document.getElementById("pw_join");

let email_join = document.getElementById("email_join");
let birth_join = document.getElementById("birth_join");

let real_join_btn = document.getElementById("real_join_btn");
let userImg = document.getElementById("userImg");

join_btn.onclick = () => {
  main.style.display = "none";
  second.style.display = "block";
};

log_btn.onclick = async () => {
  log_btn.classList.remove("on");

  const loginData = await axios.post("/v3/login/user", {
    userid: idElement.value,
    pw: pwElement.value,
  });
};

function valueCheck() {
  if (idElement.value && pwElement.value) {
    log_btn.classList.add("on");
  } else {
    log_btn.classList.remove("on");
  }
}

// log_btn.onclick = async () => {
//   if (!idElement.value && pwElement.value) {
//     alert("아이디를 입력하세요");
//   } else if (idElement.value && !pwElement.value) {
//     alert("비밀번호를 입력하세요");
//   } else if (!idElement.value && !pwElement.value) {
//     alert("아이디,비밀번호 입력바람");
//   }
//   console.log(`id:${idElement.value},pw:${pwElement.value}`);
// };

real_join_btn.onclick = async () => {
  const userimg = userImg.value;
  const name = name_join.value;
  const id = id_join.value;
  const pw = pw_join.value;
  const email = email_join.value;
  const birth = birth_join.value;

  let formData = new FormData();

  formData.append("img", userImg.files[0]);
  formData.append("name", name);
  formData.append("id", id);
  formData.append("pw", pw);
  formData.append("email", email);
  formData.append("birth", birth);

  const data = await axios.post("/v3/join/signup", formData);
  console.log(data.data);
  if (data.data.status == 200) {
    alert("회원가입완료");

    // location.href=""
  } else if (data.data.status == 401) {
    alert("이미 있는 아이디");
  }
};
