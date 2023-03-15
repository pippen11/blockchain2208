# tsconfig.json
```json
{
    "include": ["src"],
    "compilerOptions": {
        "outDir": "build",
        "target": "es6",
        "lib": ["ES6", "DOM"],
        "strict": true,
        "esModuleInterop": true,
        "module": "CommonJS"
    }
}
```
- "include" : 배열 안에 자바스크립트로 컴파일 하고 싶은 모든 디렉토리를 넣어준다.
- "compilerOptions" : 컴파일 옵션
    - "outDir" : 자바스크립트 파일이 생성될 디렉토리
    - "target" : 타입스크립트를 어떤 버전의 자바스크립트 파일로 컴파일하고 싶은지 정할 수 있다.
    - "lib" : 정의 파일이 목표로 하는 런타임 환경을 알려준다. 컴파일된 자바스크립트 파일이 어디에서 동작할지를 알려준다는 뜻.
    - "lib": ["ES6", "DOM"] -> ES6를 지원하는 서버와 DOM(브라우저 환경)에서 코드를 실행시키겠다는 의미.
    - "esModuleInterop" : CommonJS 모듈을 ES6 모듈 코드베이스로 가져오려고 할 때 문제가 발생한다. "esModuleInterop": true 로 설정할 경우 ES6 모듈 사양을 준수하여 CommonJS 모듈을 가져올 수 있게 된다.

<br>
<br>

# ts-node
```shell
npm install -D ts-node
```
ts-node를 사용하면 build 없이 타입스크립트를 실행할 수 있게 된다. production 레벨에서 사용하는 패키지가 아닌, 개발 환경에서만 사용하는 패키지이다. build 없이 빠르게 새로고침하고 싶을 때 사용.
<br>
ts-node가 컴파일 할 필요없이 타입스크립트 코드를 대신 실행해준다.
<br>
```json
"scripts": {
    "build": "tsc",
    "dev": "nodemon --exec ts-node src/index.ts",
    "start": "node build/index.js"
},
```
<br>
<br>

# 타입스크립트로 작성되지 않은 패키지 import 하기
타입스크립트로 작성되지 않은 패키지를 import 할 때 타입 정의를 일일이 다 적고 싶지 않은 경우 아래와 같은 방법을 사용한다.
<br>
```shell
npm install -D @types/node
```
nodejs를 위한 타입을 전부 설치해준다. 해당 패키지를 설치함으로써 타입스크립트에게 node 안에 있는 타입 정의를 전부 알려주게 된다.
<br>
<br>

```shell
npm install express
npm install -D @types/express
```
express 패키지에 대한 타입 정의를 설치해준다.

<br>
<br>


# BlockChain
블록체인은 말 그대로 여러개의 블록이 사슬처럼 묶인 것이다. 블록 안에는 데이터가 들어있고 (블록체인으로 보호하고 싶은 데이터) 이 블록은 다른 블록에 묶여있다. (사슬처럼 연결되어 있는 것) 그리고 그 연결고리는 해쉬값이다.


