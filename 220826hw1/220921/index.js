const studentsList = [];

function createStudent(name, age, area, mbti, bloodType) {
  studentsList.push({ name, area, age, mbti, bloodType });
}

createStudent("김성진", 27, "성남", "INTP", "B");
createStudent("염예나", 22, "하남", "ENFP", "B");
createStudent("정재훈", 30, "강남", "ENTP", "B");
createStudent("김재일", 29, "용인", "ENFP", "AB");
createStudent("이가원", 27, "광진", "ISFP", "O");

console.log(studentsList);

const headList = [
  { type: "number", name: "번호" },
  { type: "name", name: "이름" },
  { type: "age", name: "나이" },
  { type: "area", name: "거주지" },
  { type: "mbti", name: "MBTI" },
  { type: "bloodType", name: "혈액형" },
];

const tableHeaderElem = document.getElementById("table-header");
headList.forEach((item) => {
  tableHeaderElem.innerHTML += "<th>" + item.name + "</th>";
});

const studentListElem = document.getElementById("data-list");

studentsList.forEach((item, index) => {
  let tempStr = "<tr>";
  //   초기화를 해줘야 forEach문 다돌아갔을때 tr이 추가됨
  headList.forEach((headItem) => {
    if (headItem.type === "number") tempStr += `<th>${index + 1}</th>`;
    //숫자 1부터 뜨게하기위해서 index+1로 적어줌 0부터시작이니까
    else tempStr += `<td>${item[headItem.type]}</td>`;
    //number다음부터 갖고와서 찍어준다.,
  });
  tempStr += "</tr>";
  studentListElem.innerHTML += tempStr;
});
