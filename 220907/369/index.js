const three = function () {
  const count = prompt("3!6!9! 3!6!9! 몇까지? ");
  // map을 사용할까? %를 주로 사용할까?
  for (let i = 1; i < count + 1; i++) {
    if (
      i.toString().includes("3") ||
      i.toString().includes("6") ||
      i.toString().includes("9")
    ) {
      // let number = i.tostring();}
      let number = `${i}`;
      //i를 문자열(string)으로 변환해준다
      let text = "";
      // 짝을 입력해서 출력하기위해 text를 빈 문자열로 초기화한다
      for (let j = 0; j < number.length; ++j) {
        if (!(parseInt(number[j]) % 3) && number[j] != "0") {
          text += "짝!";
          //각 숫자 자리가 3의 배수인지 확인하고 0이 아닌지 확인하여
          //출력할 text문자열에 "짝!"를 추가한다.
        }
      }
      console.log(text);
    } else {
      console.log(i);
    }
  }
};

////전공자 방법
const three1 = function () {
  const count = parSeInt(prompt(`3!6!9! 3!6!9!! 몇까지???`));

  for (let i = 0; i < count + 1; i++) {
    let numbers = `${i}`;
    if (numbers.match(/[3,6,9]/)) {
      console.log(
        i +
          numbers
            .split("")
            .map((item) => (!(parseInt(item) % 3) && item != "0" ? "짝 !" : ""))
            .join("")
      );
    } else console.log(i);
  }
};
