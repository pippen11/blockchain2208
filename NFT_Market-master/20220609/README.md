# TypeScript

```
npm init -y
npm install -D typescript ts-node @types/node
```

tsc index.ts
아니! 너무 귀찮아! 번들/빌드

ts-node 파일
npx ts-node 파일명

tsconfig.json
index.js -> webpack.config.js -> /dist/app.js

```json
{
  "compilerOptions": {
    "outDir": "./dist/"
  }
}
```

npx tsc --build

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "baseUrl": ".",
    "paths": {
      "@core/*": ["src/core/*"]
    }
  }
}
```

npm install -D @types/node

```
┌ [프로젝트]
├ /src
├─ /core
├── index.ts
├─ utils.ts
```

**index.ts**

```typescript
import { a } from '@core/utils/utils.ts'
```

**utils.ts**

```typescript
export const a = 10
```

```sh
$ npm install -D tsconfig-paths
```

npx ts-node -r tsconfig-paths/register [파일명]

타입스크립트 하면서 개빡치는경우

`외부라이브러리 가져올때`

```
npm install -D eslint prettier eslint-plugin-prettier eslint-config-prettier
```

.eslintrc
.prettierrc

**.eslintrc**

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

**.prettierrc**

```json
{
  "printWidth": 120,
  "tabWdith": 4,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": false
}
```

OOP

모든것은 객체로 이뤄져있다.

자동차를 만들꺼야. code로 .

자동차 를 어떻게 생긴지알아.
어떠한 기능을 하는지 알아.

조그만한 기능들 쪼개여 .

바퀴
핸들
엔진
트렁크
문
범퍼

..

작은것부터 만들면서 큰거를 만들기.

테스트 힘들어요 ,
테스트 코드를 작성하는 프레임워크를 설치를할려고함.

javascript -> jest
typescript -> jest

```sh
$ npm install -D ts-jest @types/jest babel-core
$ npm install -D @babel/preset-typescript @babel/preset-env
```

**babel.config.js**

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
      },
    ],
    '@babel/preset-typescript',
  ],
}
```

**jest.config.ts**

```ts
import type { Config } from '@jest/types'
const config: Config.InitialOptions = {

}
```
