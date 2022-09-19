const tableHeaderElem = document.getElementById("table-hader");

const headlist = [
  { type: "number", name: "번호" },
  { type: "name", name: "이름" },
  { type: "age", name: "나이" },
  { type: "area", name: "거주지" },
  { type: "mbti", name: "MBTi" },
  { type: "bloodType", name: "혈액형" },
];

headlist.forEach((item) => {
  tableHeaderElem.innerHTML += "<th>" + item.name + "</th>";
});
