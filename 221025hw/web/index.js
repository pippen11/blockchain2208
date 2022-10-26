document.getElementById("join-btn").onclick = async function (e) {
  e.preventDefault();
  //onclick같은건 페이지가 새로고침이됨 그래서 이벤트발생막음 ()안적으면 메서드가아님
  const data = await axios.post("/api/user/regist", {
    id: document.forms["main-form"].id.value,
    pw: document.forms["main-form"].pw.value,
    name: document.forms["main-form"].name.value,
  });
  document.forms["main-form"].id.value =
    document.forms["main-form"].pw.value =
    document.forms["main-form"].name.value =
      "";
  //html쪽에서 보이는것 초기화
  document.getElementById("sign-out-btn").style.display = "none";

  console.log(data.data);
};

document.getElementById("sign-in-btn").onclick = async function (e) {
  e.preventDefault();
  const data = await axios.post("/api/user/login", {
    id: document.forms["main-form"].id.value,
    pw: document.forms["main-form"].pw.value,
  });
  document.forms["main-form"].id.value =
    document.forms["main-form"].pw.value =
    document.forms["main-form"].name.value =
      "";
  console.log(data.data);

  // console.log(document.cookie);
  // //쿠키 jwt로바꾼 데이터값 불러옴
  // console.log(document.cookie.split("="));
  // //그 불러운 데이터를 =기준으로 나눔
  // console.log(document.cookie.split("=")[1]);
  // // =기준으로 나눈값에서 첫번째 payload:data값을 가져옴
  // console.log(document.cookie.split("=")[1].split("."));
  // //데이터값 가져온것에서 .으로 나눔
  // console.log(document.cookie.split("=")[1].split(".")[1]);
  // // .으로 나눈것중에서 첫번째값을 가져옴
  // console.log(window.atob(document.cookie.split("=")[1].split(".")[1]));
  // //값을 가져온것중에 window.atob로 다시 디코딩을한다
  // console.log(
  //   JSON.parse(window.atob(document.cookie.split("=")[1].split(".")[1]))
  //   //디코딩을 한다음 스트링 그값을 객체화로바꾼다
  // );
  // console.log(
  //   JSON.parse(window.atob(document.cookie.split("=")[1].split(".")[1])).name
  //   //그바꾼것중에 이름만 가져옴
  // );

  const tempName = JSON.parse(
    window.atob(document.cookie.split("=")[1].split(".")[1])
  ).name;

  console.log(tempName);

  if (tempName) {
    document.getElementById("user-name").innerText = tempName + "님 어서오세요";
    document.getElementById("sign-out-btn").style.display = "inline";
    document.getElementById("sign-in-btn").style.display = "none";
    document.getElementById("join-btn").style.display = "none";
  }
};

document.getElementById("sign-out-btn").onclick = async function (e) {
  e.preventDefault();
  document.getElementById("sign-in-btn").style.display = "inline";
  document.getElementById("join-btn").style.display = "inline";
  document.getElementById("user-name").innerText = "";
};
