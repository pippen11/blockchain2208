const root = document.getElementById("root");
const firstBannerTitle = document.getElementById("firstBannerTitle");
const secondBannerTitle = document.getElementById("secondBannerTitle");
const thirdBannerTitle = document.getElementById("thirdBannerTitle");
const fourthBannerTitle = document.getElementById("fourthBannerTitle");

const category = [
  "경제경영",
  "소설",
  "에세이",
  "자기 계발",
  "IT",
  "외국어",
  "라이프스타일",
  "인문",
  "철학",
  "사회",
  "과학",
  "역사",
  "여행",
  "종교",
  "판타지,무협",
  "로맨스 BL",
];

console.log(category);

let temp = location.href.split("?");

console.log(temp);
