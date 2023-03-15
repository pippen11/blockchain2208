# Next / TypeScript

```sh
$ npx create-next-app@latest --typescript front
```

<br>
http://localhost:3000 -> pages/index.tsx
http://localhost:3000/board -> pages/board.tsx
<br>
url과 pages 디렉토리 안의 파일이 매칭됨.
<br>
pages/_app.tsx 가 먼저 실행되고 index.tsx가 실행되는 구조
<br>
<br>

## chakra-ui

```
https://chakra-ui.com
```

```sh
$ cd front
$ npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
```

\_app.tsx 에서 ChakraProvider로 감싸기
<br>
<br>

## window.ethereum

```sh
$ npm install @metamask/providers
```

<br>

## next-env.d.ts

```typescript
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}
```
