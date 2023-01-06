## jest를 사용해보자(postman안쓰고 검사가용이

-jest는 TDD 개발에 용이하고 -테스트 코드를 작성할수 있다. -페이스북에서 만든 테스트 프레임워크이다.

-개발용으로만 설치 할꺼임

- --save-dev붙여서
  -npm i --save-dev jest

-설치 했으면
package.json에가서 설치가 잘되었는지 확인하고 -테스트파일 만들어놓고 근데 js파일이 아니라 test.js파일로 만들어주자 -테스트 코드를 사용하는 파일이라고 명시한것.

"scripts": {
"test": "jest merkle.test.js"
},

"scripts": {
"test": "jest 테스트진행할 파일 경로"
},

이렇게 바꿔줌

하고 -npm test를 써보자
