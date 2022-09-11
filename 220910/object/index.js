let coworkers = {
  programmer: "mok",
  designer: "leezche",
};
//객체에는 데이터나 함수 숫자 문자나 다담을수있다
coworkers["data schientist"] = "taco";
coworkers.bookkeeper = "dufu";

console.log("programmer:" + coworkers.programmer);

for (let key in coworkers) {
  console.log(key + ":" + coworkers[key]);
}

console.log("구분");

coworkers.showAll = function () {
  for (let key in this) {
    console.log(key + ":" + this[key]);
  }
};

coworkers.showAll();
//fuction chowAll(){} 이거랑 위에꺼랑 똑같은 표현이다.
//겍체에 소속된 함수를 메소드라고 부름 method
//객체에 소속된 변수 bookkeeper programmer등을 변수라하지않고 프로퍼티라고 부른다.
// 객체는 프로퍼티와 프로퍼티를 구분할때 , 를 찍어야한다.
