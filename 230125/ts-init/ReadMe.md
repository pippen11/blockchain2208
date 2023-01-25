# tsc

- npm i -g typescript << node.js에 전역설치
  - 이후 npx는 필요없다.
- tsc -init << TypeScript Compiler에 대한 기본 설정 파일을 생성한다(tsconfig.json)생성됨
- tsc 파일명 << 파일을 Javascript로 변환한다. 즉 컴파일한다. (ex : tsc index.ts) 하면 여기서는 index.js test.js파일 생김

- sh는 터미널 shell

```sh
tsx index.ts
```

- tsc << 파일을 Javascript로 변환한다. 즉 , 컴파일한다. 단, tsconfig.json파일의 설정을 기준으로 컴파일한다.
- tsx말고 컴파일을 자바스크립트로 변환할꺼면 tsc로하는게 맞다 -지금당장은 프로젝트내에 있는파일 전부다 컴파일한다.(따로설정도있음)
- 현재 tsconfig 파일 내에 설정이 없음으로 전체 파일 컴파일(변환)

```sh
tsc
```

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

- compilerOptions : Compiler에 적용할 설정들

  - target

    - 어떤 버전의 Javascript로 변환할 것인지 설정
    - es2016 : ES7 문법
    - ES5, ES6, es2022 등등의 문법 사용 가능(target에 ES5넣으면) 화살표함수같은거 없어짐 다른 브라우저같은곳에서 최신문법 안될수도 있어서 옛날버전 쓸수도있음

  - module
  - 내보내기(export, module.exports), 가져오기(import,require)에 있어서 어떤 문법을 사용할 것인지 설정
    -commonJS : ES5 이하 문법(module.exports, require)를 사용하도록 설정

  -esModuleInterop

  - commonJS 방식, 즉 module.exports 방식으로 내보내진 라이브러리, 모듈에 대해서 "import \* as XXXX" 방식을 사용할수있게 해주는 설정

```js
   import \* as React from 'react'
```

    - forceConsistentCasingInFileNames
      - 가져오기 시 대소문자 구분을 확실하게 해준다.

```js
import a from "a.ts";
import A from "A.ts";
```

- strict

  - 정확한 사용을 위해 모든 검사 설정을 활성화

- skipLipCheck
  - .d.ts 파일의 타입 확인을 건너뛴다.

# .d.ts 파일

- 타입 선언 파일이라고 부르며 코드에서 사용할 타입들을 미리 선언해둔다.
- 설정에 따라 선언해둔 타입을 전역에서 사용할 수 있다.
- number, string 등의 사용과 같이 타입을 require, import 없이 타입을 가져와서 사용할 수 있다
