// Es6 이전<< javascript의 버전
// class가 대표적인 ES6 , import export등이있다
console.log("로그 남기기");
//console: javascript가 갖고있는 객체-> 내장객체
console.log(global);
//global(브라우저의 window)->전역객체 , js파일에서 변수를 초기화하면 그 js파일내에서만 사용이 가능한데 전역으로 쓰고 싶으면 global의 프로퍼티로 추가해라
// Node.js에 DOM 있을까?
// HTML 파일의 구조를 저장한 객체-> DOM, document
// Node.js HTMl 구조가 있나?-> 없음 -> document가 없다
// window-> 브라우저의 정보를 갖고잇는  객체
//Nodw.js가 브라우저를 쓴다?-> 안쓴다
//window 객체가 없다. -> 대신하는 객체가 global이다

// 파일로 들어가서 node index.js로 실행 터미널창에서
console.warn("경고");
// 경고 출력
console.dir({ data: "구조 출력" });
//dir은 구조보는것
console.log({ data: "구조 출력" });
//구조에 대해서 출력
// 브라우저 쪽에서 사용함if(process.env.NODE_ENV==="production")
// <div>어쩌구 저쩌구 </div> << console.log()
// Element  대한 정보 , console.dir
console.time("시간 측정");
// 시간 확인? 출력? 에대한 시작점
console.timeLog("시간 측정");
// 시간 확인에 대한 중간점
console.timeEnd("시간 측정");
// 시간 확인 완료
//시간 측정 똑같이 써야함 안에 스트링

console.assert(true, "참");
//참일때는 냅두고 거짓일때만 출력
console.assert(false, "거짓");
// 거짓일때 출력한다.

console.count("몇번?");
console.count("몇번?");
console.count("몇번?");
//몇번인지셈
console.countReset("몇번?");
//리셋시킴
console.count("몇번?");
console.table({ name: "표", data: "출력" });
//표로나옴
console.error("에러 출력");

// let a = 12;
global.a = 12;
