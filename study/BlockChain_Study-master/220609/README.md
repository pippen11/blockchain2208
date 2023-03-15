# TypeScript

```shell
npm init

npm install -D typescript ts-node @types/node
```

<br>
타입스크립트에는 기본적으로 런타임이 없다.
JavaScript의 경우 브라우저 혹은 Node.js 환경에서 해석된다.
<br>
하지만 TypeScript의 경우 JavaScript로 컴파일을 한 후 브라우저/Node.js 환경에서 실행될 수 있도록 해야한다.
<br>
마치 React에서 webpack을 통해 JavaScript로 번들링 한 다음 브라우저에서 실행될 수 있도록 하는 것과 비슷.
<br>
JavaScript의 경우, 대입연산자를 보고 변수의 타입을 유추한다.
<br>
TypeScript는 변수 뒤에 타입을 지정해 놓고 사용해야 한다.
<br>
<br>

```shell
npx tsc index.ts
```

해당 명령어를 통해 TypeScript로 작성된 파일을 JavaScript로 컴파일 한 다음 JavaScript 파일을 실행시켜야 한다.
<br>
<br>

```shell
npx ts-node index.ts
```

ts-node라는 TypeScript 실행기를 사용해서 개발 환경에서 TypeScript로 작성된 파일을 실행시켜 볼 수 있다.
<br>
<br>

TypeScript에도 버전이라는 것이 존재한다.
<br>
tsconfig.json 파일을 통해 TypeScript의 설정을 조작할 수 있다.
<br>
React에서의 webpack.config.json 과 같이 설정값을 조작할 수 있는 파일이다.

```json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "esModuleInterop": true,
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "strict": true,
        "baseUrl": ".",
        "paths": {
            "@core/*": ["src/core/*"]
        }
    }
}
```

```shell
npx tsc --build
```

-   outDir : 빌드한 파일을 담을 디렉토리 지정.
-   paths : baseUrl을 기준으로 절대경로를 설정해서 경로에 별칭 사용 가능.
    -   @core/ 라는 별칭은 /src 디렉토리 안에 있는 /core 디렉토리 안의 모든 파일
-   esModuleInterop : CommonJS 방식으로 내보낸 모듈을 ES 모듈 방식의 import로 가져올 수 있게 해준다.

```
┌ [프로젝트 디렉토리]
├ /src
├─ /core
├── index.ts
├── /utils
├─── utils.ts

```

**index.ts**

```typescript
import { a } from '@core/utils/utils';
console.log(a);
```

**utils.ts**

```typescript
export const a = 10;
```

```shell
npm install -D tsconfig-paths
```

ts-node에서 tsconfig.json 파일의 paths 속성을 해석하게 해주는 라이브러리

```shell
npx ts-node -r tsconfig-paths/register [파일명]
```

ts-node에서 tsconfig.json 에서 설정한 paths를 읽어서 실행해주는 명령어.
<br>
React 프로젝트에서 경로에 별칭을 사용하고 싶은 경우 webpack.config.ts 파일 역시 수정 작업을 거쳐야 한다.
<br>
<br>

# TypeScript에서 외부 모듈 사용하기

유명한 라이브러리의 경우 아래와 같이 type 정의 파일 설치 가능.
타입으로 선언된 라이브러리를 설치.

```shell
npm i --save-dev @types/express
```

```shell
npm install hex-to-binary
```

타입으로 선언된 라이브러리가 없을 경우,
<br>
@types 디렉토리 안에 라이브러리명으로 폴더 생성
<br>
해당 폴더 안에 index.d.ts 파일 생성
<br>
declare를 사용해 interface 역시 전역으로 설정 가능.
<br>
declare로 선언된 것은 import 문 없이 전역에서 사용 가능.

```typescript
declare module 'hex-to-binary';

declare interface IBlock {}
```

<br>
추가로 tsconfig.json 파일 안에서 설정을 잡아줘야 한다. Typescript가 타입 체크를 하기 위해 어떤 파일들을 바라보아야 하는지 알려줘야 한다.

```json
{
    "typeRoots": ["./node_modules/@types", "./@types"],
    "paths": {
        "*": ["@types/*"]
    }
}
```

<br>

```shell
npm install crypto-js
npm i --save-dev @types/crypto-js
```

<br>

# TypeScript interface

interface를 사용해서 객체 안에 들어갈 속성들의 타입을 지정해 줄 수 있다.
<br>
interface에 맞게 객체 형태를 만들어 줘야 한다.
<br>
interface : TypeScript에서 객체의 타입을 지정하는 방식
<br>
<br>

# TypeScript generic

어떠한 함수를 사용할 때 인자값으로 여러가지 데이터타입이 오는 경우가 있다.
<br>
이때 제네릭을 사용해서 타입을 지정해가면서 사용할 수 있다.
<br>
제네릭 : 타입을 변수로 뺐다고 생각하면 된다.

```typescript
function log<T>(n: T) {
    // code block
    console.log('result : ', n);
}
```

<br>

# 테스트 코드

OOP : 작은 것부터 만들면서 큰 것 만들기
<br>
단점, 테스트가 힘들다.

<br>
테스트 코드를 작성하는 프레임워크를 설치
<br>
javascript -> jest
<br>
typescript -> jest

```shell
npm install -D ts-jest @types/jest babel-core
npm install -D @babel/preset-typescript @babel/preset-env
```

**babel.config.js**

```javascript
module.exports = {
    presets: [
        [
            'babel/preset-env',
            {
                targets: { node: 'current' },
            },
        ],
        '@babel/preset-typescript',
    ],
};
```

**jest.config.ts**

jest 프레임워크를 어떻게 사용할 것인지에 대한 내용.
<br>
testMatch : 테스트 코드를 실행할 파일명
verbose : 테스트 코드가 돌아갔을 때 터미널 창 예쁘게.

```typescript
import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['<rootDir>/**/*.test.(js|ts)'],
    moduleNameMapper: {
        // 별칭 사용시
    },
    testEnvironment: 'node',
    verbose: true,
    preset: 'ts-jest',
};

export default config;
```

<br>
npx jest 명령어 입력시 test 코드를 찾아서 실행시켜준다.
