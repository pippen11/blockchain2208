function shuffle(arr, count) {
  if (!arr?.length || typeof arr != "object") {
    //?는 length있는지 없는지 체크

    alert("배!열!만!");
    return "이상한 거 넣지 말고 배열만 넣으라고!";
  }
  for (let i = 0; i < count; i++) {
    const first = parseInt(Math.random() * arr.length);
    const second = parseInt(Math.random() * arr.length);
    const temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
  }
  return arr;
}
//first배열 temp안에 넣고 second배열 first안에넣고 temp배열 second안에넣음
