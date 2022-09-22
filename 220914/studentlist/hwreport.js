// const headList = [
//   { type: "number", name: "번호" },
//   { type: "name", name: "이름" },
//   { type: "age", name: "나이" },
//   { type: "area", name: "거주지" },
//   { type: "mbti", name: "MBTi" },
//   { type: "bloodType", name: "혈액형" },
// ];

// const studentsList = [];

// function createStudent(name, age, area, mbti, bloodType) {
//   studentsList.push({
//     name,
//     age,
//     area,
//     mbti,
//     bloodType,
//   });
//   //위에 () name값 그대로 밑에 들어간다.
//   //name: name 이렇게 적어도 같은내용이다. 변수명을 데이터에 넣으면 객체내 매칭된다.
//   //객체 정의시 객체내에 다른 변수만을 넣으면 변수명과 변수의 값을 키와 값에 입력한다.
//   //name 매개변수에 정의된 값을 객체의 name키의 대한 값으로 정의한다.
//   //간단 예제
//   let temp = 100;
//   const tempObj = {
//     temp,
//     // temp : temp, 같은내용이다.
//   };
//   console.log(tempObj);
// }

// createStudent("김성진", 27, "성남", "INTP", "B");

// createStudent("염예나", 22, "하남", "ENFP", "B");

// createStudent("정재훈", 30, "강남", "ENTP", "B");

// createStudent("이가원", 27, "광진", "ISFP", "O");

// createStudent("김재일", 29, "용인", "ENFP", "AB");

// console.log(studentsList);

// const tableHeaderElem = document.getElementById("table-header");
// //id명을 기준으로 태그를 가져온다 여기서는 tr태그

// headList.forEach((item) => {
//   tableHeaderElem.innerHTMl += "<th>" + item.name + "</th>";
// });
// //item.name이 번호 이름 등
// //headlist의 대가로 안의 있는 콤마기준으로 아이템을 끊는다 아이템 자체가 이름이다.
// //for each 쓰는이유:각 아이템들 하나하나 가져다가 쓰려고한다 반복

// const studentListElem = document.getElementById("data-list");

// studentsList.forEach((item, index) => {
//   let tempStr = "<tr>"; // << 임시로 쓸 string을 초기화한다. tr을 적은것
//   //html에 tr넣으니까 td넣어도 지가 알아서 tr태그 다넣어서 한줄씩 출력이된다
//   //여는 tr넣는다-> 알아서 tr로 닫음
//   headList.forEach((headItem) => {
//     if (headItem.type === "number") tempStr += "<th>${index + 1}</th>";
//     else tempStr += "<td>$item[headItem.type]}</td>";
//   });
//   tempStr += "</tr>";

//   studentListElem.innerHTML += tempStr;
// });

const headList = [
  { type: "number", name: "번호" },
  { type: "name", name: "이름" },
  { type: "age", name: "나이" },
  { type: "area", name: "거주지" },
  { type: "mbti", name: "MBTI" },
  { type: "bloodType", name: "혈액형" },
];

const studentsList = [];

function createStudent(name, age, area, mbti, bloodType) {
  studentsList.push({
    name,
    area,
    age,
    mbti,
    bloodType,
  });
}

// 객체 정의 시 객체 내에 다른 변수만을 넣으면 변수명과 변수의 값을 키와 값에 입력한다.
// name 매개변수에 정의된 값을 객체의 name 키에 대한 값으로 정의한다.
// 간단 예제
//   let temp = 100;
//   const tempObj = {
//     temp,
//     // temp : temp, << 24번 줄과 같다.
//   };
//   console.log(tempObj);
// }

createStudent("김성진", 27, "성남", "INTP", "B");
createStudent("염예나", 22, "하남", "ENFP", "B");
createStudent("정재훈", 30, "강남", "ENTP", "B");
createStudent("김재일", 29, "용인", "ENFP", "AB");
createStudent("이가원", 27, "광진", "ISFP", "O");

console.log(studentsList);

const tableHeaderElem = document.getElementById("table-header");
headList.forEach((item) => {
  tableHeaderElem.innerHTML += "<th>" + item.name + "</th>";
});

const studentListElem = document.getElementById("data-list");

studentsList.forEach((item, index) => {
  let tempStr = "<tr>";
  //   초기화를 해줘야 forEach문 다돌아갔을때 tr이 추가됨
  console.log(tempStr);
  headList.forEach((headItem) => {
    if (headItem.type === "number") tempStr += `<th>${index + 1}</th>`;
    //숫자 1부터 뜨게하기위해서 index+1로 적어줌 0부터시작이니까
    else tempStr += `<td>${item[headItem.type]}</td>`;
    //number다음부터 갖고와서 찍어준다.,
    console.log(tempStr);
  });
  tempStr += "</tr>";

  console.log(tempStr);
  studentListElem.innerHTML += tempStr;
  console.log(studentListElem.innerHTML);
});

// 팀장급 : 아래 코드분석 feat.정현
// let count = 0;
// studentListElem.innerHTML = studentsList.reduce((next, curr) => {
//   return (
//     next +
//     `<tr>${headList.reduce((headNext, headCurr) => {
//       if (headCurr.type === "number") return headNext + `<th>${++count}</th>`;
//       else return headNext + `<td>${curr[headCurr.type]}</td>`;
//     }, "")}</tr>`
//   );
// }, "")
