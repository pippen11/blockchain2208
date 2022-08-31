let exercise = prompt("오늘 운동어디? 상체or하체");

switch (exercise) {
  case "하체":
    let a = prompt("하체 중에할것은?스쿼트or런지or레그프레스or레그익스텐션");
    if (a == "스쿼트") {
      a = prompt("스쿼트 중량은 얼마나?");
    } else if (a == "런지") {
      a = prompt("런지 중량은 얼마나?");
    } else if (a == "레그프레스") {
      a = prompt("레스프레스 중량은 얼마나?");
    } else if (a == "레그익스텐션") {
      a = prompt("레그익스텐션 중량은 얼마나?");
    } else {
      console.log("잘못");
    }
    break;
  case "상체":
    console.log("상체운동중 어디부위?");
    let b = prompt("상체운동중 어디?");
}
