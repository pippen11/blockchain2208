// 오버로드(이름은같은데 다른기능을 하는 함수 , 자바스크립트는 안된다), 오버라이드 << 라이브 클래스개념( 덮어쓰기)
class Parent {
  console(data) {
    console.log("Parent", data);
  }
  console(data1, data2) {
    this.console.log(data1, "은 data1이고", data2, "는 data2이다");
  }
}
// const temp={a:1}
// const temp2={...temp,a:2}
// 2로 덮어쓴다
// 위에 console을 밑에 껄로 덮어쓴다
// 원래 매개변수 하나받으면 하나만받을수잇다
// 자바스크립트는 오버로딩이안되고
// 덮어쓰는건 오버라이딩 오버로딩은 매개변수 갯수에 따라 다른함수 다른언어는 따로논다
// 자바스크립트는 오버로딩안되고 덮어쓴다

class Child extends Parent {
  console(data) {
    this.console.log("Child", data);
  }
  //console을 주석처리 하면 부모의 console을 가져다 사용한다.
  //console을 주석처리 하지 않으면 "오버라이딩!" 이 되어서 함수가 변경된다. overRide
  // 덮어쓴다
}

const parent = new Parent();
parent.console("재혁아");
const child = new Child();
child.console("뭐나올까?");
child.console("재혁아", "진짜로 뭐나올까?");

const wtf = (...data) => {
  data.forEach((item) => console.log(item));
};
wtf(1, 2, 3, 4, "sad", "wee", "fsdaf");
