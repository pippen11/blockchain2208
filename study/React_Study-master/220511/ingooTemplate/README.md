# Next Project 설정

mkdir next_front && cd next_front
npm init -y
npm install react react-dom next

**package.json**
```json
"scripts":{
    "dev":"next dev",
    "build":"next build",
    "start":"next start"
}
```

기본 실행 해보기

mkidr pages 

**index.jsx** 
```javascript
const Index = () => {
    return (
        <div>
            Hello Next
        </div>
    )
}

export default Index
```

```sh
npm run dev
```

## 라우팅 개념 익히기,
기본라우팅 
폴더
동적라우팅


## Styled-Component
> https://github.com/vercel/next.js/tree/canary/examples/with-styled-components-babel
보고 참고했음.

```
npm install styled-components
```

```
```

**pages/_document.jsx**
```javascript
import Document, {
    Html,
    Head,
    Main,
    NextScript,
  } from 'next/document';
  import { ServerStyleSheet } from "styled-components";
  
  export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
      const sheet = new ServerStyleSheet();
      const originalRenderPage = ctx.renderPage;
  
      try {
        // sheet을 사용해 정의된 모든 스타일을 수집
        ctx.renderPage = () =>
          originalRenderPage({
            enhanceApp: (App) => (props) =>
              sheet.collectStyles(<App {...props} />),
          });
  
        // Documents의 initial props
        const initialProps = await Document.getInitialProps(ctx);
  
        // props와 styles를 반환
        return {
          ...initialProps,
          styles: (
            <>
              {initialProps.styles}
              {sheet.getStyleElement()}
            </>
          ),
        };
      } finally {
        sheet.seal();
      }
    }
    render(){
      return(
        <Html>
        <Head>
        <link 
            rel="preconnect"
            href="https://fonts.googleapis.com" 
        />
        <link 
            rel="preconnect" 
            href="https://fonts.gstatic.com" 
            crossOrigin="true"
        />
        <link 
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" 
            rel="stylesheet" 
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
      )
    }
  }
```

**page/_app.jsx**
```javascript
import React from 'react'
const App = ({ Component, pageProps }) => {
    return (
        <>
            <Component {...pageProps} /> 
        </>
    )
}

export default App
```


## Desgin

```
npm install antd styled-components @ant-design/icons
```