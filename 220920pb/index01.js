let coin = 1000;

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
  if (coin >= 100) {
    coin -= 100;
  }
  p01.innerText = coin;

  [...document.getElementsByClassName("secondbar")[0].children].forEach(
    (elem) => {
      elem.style.opacity = "1";
    }
  );
  // document.getElementById("img1").style.opacity = "1";
  // document.getElementById("img2").style.opacity = "1";
  // document.getElementById("img3").style.opacity = "1";

  document.querySelector(".third").style.animationDuration = "1s";
  document.querySelector(".third").style.backgroundImage = "";

  [...document.getElementsByClassName("fourthbar")[0].children].forEach(
    (elem) => {
      elem.style.opacity = "";
    }
  );
  [...document.getElementsByClassName("fifthbar")[0].children].forEach(
    (elem) => {
      elem.style.opacity = "";
    }
  );
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

  if (comSel == rock) {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  } else if (comSel == scissors) {
    document.getElementById("fourth-item2").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  } else {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item2").style.opacity = "0";

    // classList.add("third")
    //third라는 클래스에 스타일을 지정해줌
  }
  if (comSel == scissors) {
    // let p02 = document.getElementById("fifth-item5");
    let comSel2 = parseInt(Math.random() * 10);
    console.log(comSel2);

    // p02.innerHTML = comSel2;
    [...document.getElementsByClassName("fifthbar")[0].children].forEach(
      (elem) => {
        elem.style.opacity = "0";
      }
    );
    // document.getElementById("fifth-item0").style.opacity = "0";
    // document.getElementById("fifth-item1").style.opacity = "0";
    // document.getElementById("fifth-item2").style.opacity = "0";
    // document.getElementById("fifth-item3").style.opacity = "0";
    // document.getElementById("fifth-item4").style.opacity = "0";
    // document.getElementById("fifth-item5").style.opacity = "0";
    // document.getElementById("fifth-item6").style.opacity = "0";
    // document.getElementById("fifth-item7").style.opacity = "0";
    // document.getElementById("fifth-item8").style.opacity = "0";
    // document.getElementById("fifth-item9").style.opacity = "0";
    document.getElementById(`fifth-item${comSel2}`).style.opacity = "1";

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

  if (comSel == rock) {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item2").style.opacity = "0";
  } else if (comSel == scissors) {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  } else {
    document.getElementById("fourth-item2").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  }
  if (comSel == paper) {
    // let p02 = document.getElementById("fifth-item5");
    let comSel2 = parseInt(Math.random() * 10);
    console.log(comSel2);

    // p02.innerHTML = comSel2;
    // document.getElementById("fifth-item0").style.opacity = "0";
    // document.getElementById("fifth-item1").style.opacity = "0";
    // document.getElementById("fifth-item2").style.opacity = "0";
    // document.getElementById("fifth-item3").style.opacity = "0";
    // document.getElementById("fifth-item4").style.opacity = "0";
    // document.getElementById("fifth-item5").style.opacity = "0";
    // document.getElementById("fifth-item6").style.opacity = "0";
    // document.getElementById("fifth-item7").style.opacity = "0";
    // document.getElementById("fifth-item8").style.opacity = "0";
    // document.getElementById("fifth-item9").style.opacity = "0";
    [...document.getElementsByClassName("fifthbar")[0].children].forEach(
      (elem) => {
        elem.style.opacity = "";
      }
    );
    document.getElementById(`fifth-item${comSel2}`).style.opacity = "1";

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

  if (comSel == rock) {
    document.getElementById("fourth-item2").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  } else if (comSel == scissors) {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item2").style.opacity = "0";
  } else {
    document.getElementById("fourth-item1").style.opacity = "0";
    document.getElementById("fourth-item3").style.opacity = "0";
  }
  if (comSel == rock) {
    // let p02 = document.getElementById("fifth-item5");
    let comSel2 = parseInt(Math.random() * 10);
    console.log(comSel2);

    // p02.innerHTML = comSel2;
    // document.getElementById("fifth-item0").style.opacity = "0";
    // document.getElementById("fifth-item1").style.opacity = "0";
    // document.getElementById("fifth-item2").style.opacity = "0";
    // document.getElementById("fifth-item3").style.opacity = "0";
    // document.getElementById("fifth-item4").style.opacity = "0";
    // document.getElementById("fifth-item5").style.opacity = "0";
    // document.getElementById("fifth-item6").style.opacity = "0";
    // document.getElementById("fifth-item7").style.opacity = "0";
    // document.getElementById("fifth-item8").style.opacity = "0";
    // document.getElementById("fifth-item9").style.opacity = "0";
    [...document.getElementsByClassName("fifthbar")[0].children].forEach(
      (elem) => {
        elem.style.opacity = "";
      }
    );
    document.getElementById(`fifth-item${comSel2}`).style.opacity = "1";

    coin += comSel2 * 100;
    p01.innerText = coin;
  }
};
