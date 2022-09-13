const comSel = parseInt(Math.random() * 99 + 1);
// parseInt()
// 컴퓨터 선택완료
let playerSel;
let count = 0;
let max = 100;
let min = 0;
let updown = "";
const maxCount = parseInt(prompt("몇번만에 맞출래? 숫자로만"));
do {
  playerSel = prompt(`${updown}\n숫자를 선택해주세요.
컴퓨터가 선택한 숫자를 멈추시면됩니다.\n최소 : ${min} / 최대 : ${max}
 /남은횟수 : ${maxCount - count}`);
  // 텍스트 안에 변수를 넣을때 달라로 감싸준다 \n은 스페이스랑 같다
  // prmpt는 string, parseInt 정수형으로 바꿔줌으로 number

  // 카운트를 플레이어가 입력햇을때 하나씩 증가시킨다.
  playerSel = parseInt(playerSel);
  if (min > playerSel || max < playerSel) {
    // 최소와 최대 사이에 값만 확인하기ㅏ 위해 최소미만과 최대초과를 먼저 처리한다.
    console.log("제외된 숫자들이다.");

    //   텍스트형에서 숫자형으로 바꿔줌 재정의함
  } else if (playerSel === comSel) {
    console.log(`${count}맞추셨네요 , 축하합니다`);
    break;
  } else if (playerSel > comSel) {
    // 플레이어가 선택한 숫자가 컴퓨터가 선택한 숫자보다 크다.
    max = playerSel;
    // max가 현재 플레이어가 선택한 숫자가 된다.
    console.log("up!");
    updown = "up";
    count++;
    // 정상적인 숫자를 입력했을때만 카운트를 늘리도록up ,down일때 카운트를 추가한다.
  } else if (playerSel < comSel) {
    min = playerSel;
    console.log("DoWn!");
    updown = "down";
    count++;
    // 정상적인 숫자를 입력했을때만 카운트를 늘리도록 up, down일때 카운트를 추가한다.
  } else {
    console.log("숫자만! 입력해라!");
    updown = "숫자만 입력해라";
  }
} while (playerSel !== comSel && count < maxCount);
if (count >= maxCount) {
  consol.log("w제한 횟수를 초과했네요 ㅋㅋ");
}

// 컴퓨터가 숫자선택후 플레이어가 선택하는것은 계속 반복되야한다.
// 언제까지? 플레이어가 컴퓨터의 숫자를 맞출때까지.
