let coin = 1000;

if (coin >= 100) {
  coin -= 100;
} else {
  let gameover = prompt("게임종료");
}

// document.getElementById("start").onclick = () => {
//   console.log(document.getElementById("title-box2").value);
// };

// coin = document.getElementById("title-box2").innerHTML;

let p01 = document.getElementById("title-box2");

function start() {
  p01.innerText = coin;
}

function rockimg() {
  document.getElementById("img2").style.display = "none";
  document.getElementById("img3").style.display = "none";

  const comSel = parseInt(Math.random() * 3);

  // console.log(comSel);

  let rock = 0;

  let scissors = 1;

  let paper = 2;

  //   let p02 = document.getElementById("thirdbar");

  if (comSel == rock) {
    console.log("바위");
    // let p02 = document.querySelector("thirdbar");
  } else if (comSel == scissors) {
    console.log("가위");
  } else {
    console.log("보");
  }

  if (comSel == 0) {
    document.getElementById("fourth-item1").style.display = "none";
    document.getElementById("fourth-item3").style.display = "none";
  } else if (comSel == 1) {
    document.getElementById("fourth-item2").style.display = "none";
    document.getElementById("fourth-item3").style.display = "none";
  } else {
    document.getElementById("fourth-item1").style.display = "none";
    document.getElementById("fourth-item2").style.display = "none";

    // classList.toggle("third");
  }
  if (comSel == 1) {
    let p02 = document.getElementById("fifth-item5");
    let comSel2 = parseInt(Math.random() * 10);

    p02.innerText = comSel2;
    document.getElementById("fifth-item0").style.display = "none";
    document.getElementById("fifth-item1").style.display = "none";
    document.getElementById("fifth-item2").style.display = "none";
    document.getElementById("fifth-item3").style.display = "none";
    document.getElementById("fifth-item4").style.display = "none";
    document.getElementById("fifth-item6").style.display = "none";
    document.getElementById("fifth-item7").style.display = "none";
    document.getElementById("fifth-item8").style.display = "none";
    document.getElementById("fifth-item9").style.display = "none";

    p01.innerText += comSel2 * 100;
  }
}

let scissorsimg = function () {
  document.getElementById("img1").style.display = "none";
  document.getElementById("img3").style.display = "none";

  const comSel = parseInt(Math.random() * 3);

  // console.log(comSel);

  let rock = 0;

  let scissors = 1;

  let paper = 2;

  //   let p02 = document.getElementById("thirdbar");

  if (comSel == rock) {
    console.log("바위");
    // let p02 = document.querySelector("thirdbar");
  } else if (comSel == scissors) {
    console.log("가위");
  } else {
    console.log("보");
  }

  if (comSel == 0) {
    document.getElementById("fourth-item1").style.display = "none";
    document.getElementById("fourth-item2").style.display = "none";
  } else if (comSel == 1) {
    document.getElementById("fourth-item1").style.display = "none";
    document.getElementById("fourth-item3").style.display = "none";
  } else {
    document.getElementById("fourth-item2").style.display = "none";
    document.getElementById("fourth-item3").style.display = "none";
  }
  if (comSel == 2) {
    let p02 = document.getElementById("fifth-item5");
    let comSel2 = parseInt(Math.random() * 10);
    p02.innerText = comSel2;
    document.getElementById("fifth-item0").style.display = "none";
    document.getElementById("fifth-item1").style.display = "none";
    document.getElementById("fifth-item2").style.display = "none";
    document.getElementById("fifth-item3").style.display = "none";
    document.getElementById("fifth-item4").style.display = "none";
    document.getElementById("fifth-item6").style.display = "none";
    document.getElementById("fifth-item7").style.display = "none";
    document.getElementById("fifth-item8").style.display = "none";
    document.getElementById("fifth-item9").style.display = "none";
  }
  p01.innerText += comSel2 * 100;
};

let paperimg = () => {
  document.getElementById("img1").style.display = "none";
  document.getElementById("img2").style.display = "none";

  const comSel = parseInt(Math.random() * 3);

  // console.log(comSel);

  let rock = 0;

  let scissors = 1;

  let paper = 2;

  //   let p02 = document.getElementById("thirdbar");

  if (comSel == rock) {
    console.log("바위");
    // let p02 = document.querySelector("thirdbar");
  } else if (comSel == scissors) {
    console.log("가위");
  } else {
    console.log("보");
  }

  if (comSel == 0) {
    document.getElementById("fourth-item2").style.display = "none";
    document.getElementById("fourth-item3").style.display = "none";
  } else if (comSel == 1) {
    document.getElementById("fourth-item1").style.display = "none";
    document.getElementById("fourth-item2").style.display = "none";
  } else {
    document.getElementById("fourth-item1").style.display = "none";
    document.getElementById("fourth-item3").style.display = "none";
  }
  if (comSel == 0) {
    let p02 = document.getElementById("fifth-item5");
    let comSel2 = parseInt(Math.random() * 10);
    p02.innerText = comSel2;
    document.getElementById("fifth-item0").style.display = "none";
    document.getElementById("fifth-item1").style.display = "none";
    document.getElementById("fifth-item2").style.display = "none";
    document.getElementById("fifth-item3").style.display = "none";
    document.getElementById("fifth-item4").style.display = "none";
    document.getElementById("fifth-item6").style.display = "none";
    document.getElementById("fifth-item7").style.display = "none";
    document.getElementById("fifth-item8").style.display = "none";
    document.getElementById("fifth-item9").style.display = "none";
  }
};
