// 객체가 뭐냐? {}로 묶인 키와 값으로 이루어진 변수(상자)?
const obj = {
  // obj =객체
  a: 1,
  // a가 키고 1이값이다
  // 키의 정식 명칭은 프로퍼티(property)다

  b: function () // b와 c는 함수 => 메서드(method)
  {
    console.log("b");
  },
  c: () => {
    return "c";
  },
};

const arr = ["김선주", "최원겸", "염예나", "정재훈", "김성진"];
// 배열도 객체야.
// arr.push()
// push 메서드를 호출
console.log(arr.length);
// 배열의 길이를 나타내는 프로퍼티
let tempReturn = arr.indexOf(3);
// 3넣으면 3번째있으니까 2가나옴 0 , 1 , 2
// 배열에 있는 아이템을 찾아서 그위치를 알려준다 즉 위치를 리턴해준다 indexof
// 없으면 -1, 첫번째 있으면 0 을 반환해준다. 리턴해준다.
tempReturn = arr.find((item) => {
  console.log("item" + item);
  return item == 3;
});
// 둘다 똑같은말임
tempReturn = arr.find(function (item) {
  console.log("item" + item);
  return item == 3;
});
// 순서를 찾는게아니라 그대로 3을 찾음
// find 검색할때 사용할 코드
//  코드의 반환값이 true가 나오는 함수를 넣어준다.
// find의 반환값(return하는값) 은 아이템의 순서가아닌 아이템 그자체다.
// find 메서드는 매개변수로 함수를 전달한다.
// 매개변수에 해당하는 함수의 매개변수(item) 은 배열의 각 아이ㅏ템을 적용한다
// find 함수는 배열의 각 아이템을 순서대로 매개변수 함수에 전달하여 리턴값을 확인한다.
// 매개변수 함수에게서 받은 리턴값이 true면 해당 아이템을 리턴하고 find함
// 종료한다.
//
const tempFind = (item) => {
  // item = arr[0] << item =1
  return item === 3;
  // item이 3이랑 같으면 true를 리턴하고 아니면 false를 리턴한다.
};

const arrFind = function () {
  for (let i = 0; i < arr.length; i++) {
    console.log(`i : ${i}`);
    console.log(`arr : $`);
    // i는 0부터 arr 길이까지 하나씩 증가하면서 반복한다.
    if (tempFind(arr[i])) return arr[1];
    // tempFind함수를 호출하고 매개변수로 arr의 i번째의 아이템을 전달한다.
    // tempFind함수가 true를 리턴(반환)하면 arr의 i번째 아이템을 리턴(반환)한다.
  }
};
console.log(tempReturn);

tempReturn = arr.find((item) => {
  return item[0] === "김";
});
// find는 매개변수함수가 true인 아이템들중 첫번째의 배열내에서 몇번째인지 리턴해준다
console.log(tempReturn);

tempReturn = arr.findIndex((item) => {
  return item[0] === "김";
});
console.log(tempReturn);

tempReturn = arr.filter((item) => {
  return item[0] === "김";
});
// find는 하나만 filter은 다가져옴
// item 0이 첫번째 자리가 김인걸 찾는다
// filter는 매개변수함수가 true인 아이템들을 배열로 리턴해준다.
console.log(tempReturn);

tempReturn = arr.map((item) => {
  return item + "오늘 출석함";
  return item[0] === "김";
});
console.log(tempReturn);

arr.forEach(function (item) {
  console.log("forEach :" + item);
});
for (let i = 0; i < arr.length; i++) console.log(arr[i]);

arr.reverse();
// 순서 거꾸로

console.log(arr);

console.log(arr.join(" / "));
// 배열을 문자열로 바꿔줍니다. 매개변수로 아이템 사이에 넣을 문자를 입력합니다. //원하는거 중간중간 넣어줄수있따
console.log(arr.toString()); // 문자로열로 바꿈(거의 모든 객체에 포함되어있음)

console.log(arr.slice(1, 3)); //배열의 1부터 3까지 자르는걸 자르는함수 slice임
// [1 ,2, 3] 이라고 했을때 1앞이 0이고 각 , 마다 숫자가 늘어난다고 생각하면 편함
// [0김선주, 1최원겸, 2김성진, 3염예나, 4정재훈5]<< 1에서 시작하고 3에서 끝난다.
// 1최원겸,2김성진,3이런 배열을 리턴한다
console.log(arr.slice(1, -1));
// consol.log(arr.slice(-1,1)); 순서가 꼬이면 안된다
// -은 뒤에서부터 확인합니다. 즉 5가 0이고 4가 -

// arr.splice(1, 3) 1부터 3개를 짜른다. 단 , arr을 수정해버린다

console.log(arr.sort());
// sort 메서드는 정렬을 해준다(오름차순)

console.log(arr.sort().reverse()); //내림차순으로 정렬해준다.

console.log(
  arr.sort((curr, next) => {
    if (curr > next) return 1;
    else if (curr < next) return 1;
    else return 0;
    // sort 메서드는 정렬을 해주는 메서드입니다.
    // 1, 0, -1 로 정렬방식을 선택합니다
    // 현재가 큰것을 1로 주고 다음 것이 큰것을 -1로주면 오름차순으로 정렬된다.
  })
);
console.log(
  arr.sort((curr, next) => {
    if (curr > next) return -1;
    else if (curr < next) return 1;
    else return 0;
    // 위와 반대조건시 내림차순이다})
  })
);

// forEach 메서드는 아이템을 하나씩 함수에게 매개변수로 전달해 함수를 호출한다.
// 아래의 for문과 같다.

// map은 매개변수함수의 return값들을 배열로 리턴해준다
// const tempArr =[{
//     name:"정재훈",
//     age: 30,
//     area: "대치동"
// },
// {
//     name:"염예나",
//     age: 22,
//     area: "하남"
// },
// {
//     name:"김성진",
//     age: 30,
//     area: "대치동"
// }]

const tempArr = [
  { name: "정재훈", age: 30, area: "대치동" },
  { name: "염예나", age: 22, area: "하남" },
  { name: "김성진", age: 27, area: "성남" },
];

console.log(tempArr.find((item) => item.area === "하남"));
console.log(tempArr.findIndex((item) => item.area === "하남"));
console.log(tempArr.filter((item) => item.area === "하남"));
console.log(tempArr.map((item) => item.area === "하남"));

// 수정하며 내용을 확인해 보세요.
// 재훈 정규
