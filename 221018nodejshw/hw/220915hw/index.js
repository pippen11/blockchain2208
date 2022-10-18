let coin = 1000;

if (coin >= 100) {
  coin -= 100;
}
// 이게 여기있을이유가 없음 start눌렀을때로 들어가야함
// } else {
//   lver = prompt("게임종et gameo료");
// }

let rock = 0;

let scissors = 1;

let paper = 2;

// document.getElementById("start").onclick = () => {
//   console.log(document.getElementById("title-box2").value);
// };

// coin = document.getElementById("title-box2").innerHTML;

let p01 = document.getElementById("title-box2");

function start() {
  p01.innerText = coin;
}

function rockimg() {
  document.getElementById("img2").style.opacity = "0";
  document.getElementById("img3").style.opacity = "0";

  const comSel = parseInt(Math.random() * 3);

  // console.log(comSel);

  //   let p02 = document.getElementById("thirdbar");
  // document.querySelector(".third");

  if (comSel == rock) {
    document.querySelector(".third").style.animationDuration = "0s";
    document.querySelector(".third").style.backgroundImage = "url(1.gif)";
  } else if (comSel == scissors) {
    document.querySelector(".third").style.animationDuration = "0s";
    document.querySelector(".third").style.backgroundImage = "url(2.gif)";
  } else {
    document.querySelector(".third").style.animationDuration = "0s";
    document.querySelector(".third").style.backgroundImage = "url(3.gif)";
  }

  if (comSel == 0) {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  } else if (comSel == 1) {
    document.getElementById("fourth-item2").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  } else {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item2").style.opacity = "0";

    // classList.toggle("third");
  }
  if (comSel == 1) {
    let p02 = document.getElementById("fifth-item5");
    let comSel2 = parseInt(Math.random() * 10);

    p02.innerHTML = comSel2;
    document.getElementById("fifth-item0").style.opacity = "0";
    document.getElementById("fifth-item1").style.opacity = "0";
    document.getElementById("fifth-item2").style.opacity = "0";
    document.getElementById("fifth-item3").style.opacity = "0";
    document.getElementById("fifth-item4").style.opacity = "0";
    document.getElementById("fifth-item6").style.opacity = "0";
    document.getElementById("fifth-item7").style.opacity = "0";
    document.getElementById("fifth-item8").style.opacity = "0";
    document.getElementById("fifth-item9").style.opacity = "0";

    coin += comSel2 * 100;
    p01.innerText = coin;
  }
}

let scissorsimg = function () {
  document.getElementById("img1").style.opacity = "0";
  document.getElementById("img3").style.opacity = "0";

  const comSel = parseInt(Math.random() * 3);

  // console.log(comSel);

  //   let p02 = document.getElementById("thirdbar");

  if (comSel == rock) {
    document.querySelector(".third").style.animationDuration = "0s";
    document.querySelector(".third").style.backgroundImage = "url(1.gif)";
    // let p02 = document.querySelector("thirdbar");
  } else if (comSel == scissors) {
    document.querySelector(".third").style.animationDuration = "0s";
    document.querySelector(".third").style.backgroundImage = "url(2.gif)";
  } else {
    document.querySelector(".third").style.animationDuration = "0s";
    document.querySelector(".third").style.backgroundImage = "url(3.gif)";
  }

  if (comSel == 0) {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item2").style.opacity = "0";
  } else if (comSel == 1) {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  } else {
    document.getElementById("fourth-item2").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  }
  if (comSel == 2) {
    let p02 = document.getElementById("fifth-item5");
    let comSel2 = parseInt(Math.random() * 10);
    console.log(typeof comSel2);
    p02.innerText = comSel2;
    document.getElementById("fifth-item0").style.opacity = "0";
    document.getElementById("fifth-item1").style.opacity = "0";
    document.getElementById("fifth-item2").style.opacity = "0";
    document.getElementById("fifth-item3").style.opacity = "0";
    document.getElementById("fifth-item4").style.opacity = "0";
    document.getElementById("fifth-item6").style.opacity = "0";
    document.getElementById("fifth-item7").style.opacity = "0";
    document.getElementById("fifth-item8").style.opacity = "0";
    document.getElementById("fifth-item9").style.opacity = "0";

    coin += comSel2 * 100;
    p01.innerText = coin;
  }
};

let paperimg = () => {
  document.getElementById("img1").style.opacity = "0";
  document.getElementById("img2").style.opacity = "0";

  const comSel = parseInt(Math.random() * 3);

  // console.log(comSel);

  //   let p02 = document.getElementById("thirdbar");

  if (comSel == rock) {
    document.querySelector(".third").style.animationDuration = "0s";
    document.querySelector(".third").style.backgroundImage = "url(1.gif)";
    // let p02 = document.querySelector("thirdbar");
  } else if (comSel == scissors) {
    document.querySelector(".third").style.animationDuration = "0s";
    document.querySelector(".third").style.backgroundImage = "url(2.gif)";
  } else {
    document.querySelector(".third").style.animationDuration = "0s";
    document.querySelector(".third").style.backgroundImage = "url(3.gif)";
  }

  if (comSel == 0) {
    document.getElementById("fourth-item2").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  } else if (comSel == 1) {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item2").style.opacity = "0";
  } else {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  }
  if (comSel == 0) {
    let p02 = document.getElementById("fifth-item5");
    let comSel2 = parseInt(Math.random() * 10);
    p02.innerText = comSel2;
    document.getElementById("fifth-item0").style.opacity = "0";
    document.getElementById("fifth-item1").style.opacity = "0";
    document.getElementById("fifth-item2").style.opacity = "0";
    document.getElementById("fifth-item3").style.opacity = "0";
    document.getElementById("fifth-item4").style.opacity = "0";
    document.getElementById("fifth-item6").style.opacity = "0";
    document.getElementById("fifth-item7").style.opacity = "0";
    document.getElementById("fifth-item8").style.opacity = "0";
    document.getElementById("fifth-item9").style.opacity = "0";

    coin += comSel2 * 100;
    p01.innerText = coin;
  }
};
