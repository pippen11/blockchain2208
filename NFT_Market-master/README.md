# Next / Typescript

npx create-next-app@latest --typescript front

## chakra-ui

http://chakra-ui.com

npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6

http://localhost:3000
http://localhost:3000/board
http://localhost:3000/list

pages/index.tsx
pages/board.tsx
pages/list.tsx

\_app.tsx 실행 먼저. 그뒤는 라우터에 따라.

## window.ethereum

**next-enc.d.ts**

```typescript
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}
```

npm install @metamask/providers
