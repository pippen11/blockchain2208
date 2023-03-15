# front

프론트에서 메타마스크 연결하기
<br>
메타마스크가 설치된 브라우저의 콘솔창에 window.ethereum 을 입력하면 하나의 객체를 확인할 수 있다.
<br>
메타마스크가 ethereum이라는 객체를 만들어서 window 객체 안에 넣어준 것.
<br>
window.ethereum 객체의 존재 여부로 프론트에서는 메타마스크의 존재 여부를 확인할 수 있다.
<br>
<br>

# 메타마스크 연결 커스텀 훅

리액트에서 window 객체에 접근하기 위해서는 모든 랜더가 완료되었을 때 하는 것이 효과적이다.
<br>
프론트 쪽에서 메타마스크에 연결과 관련된 http 요청을 보낸다. (promise 객체로 반환)
<br>
<br>

# web3

web3를 사용해서 메타마스크에 요청을 보낸다.
<br>
window.eth를 web3 안에 넣어서 요청을 보내는 방식으로 구현
<br>
요청을 보낼 수 있는 내용을 상태로 담아놓고 사용하자
<br>
(메타마스크 정보를 web3 라이브러리에 맵핑)
<br>
<br>

# 가나쉬 chainId 지정

```shell
npx ganache-cli --chainId 1234
```

**_genesis 블록 + chainId 값까지 같아야만 같은 네트워크라 할 수 있다._**

<br>
<br>

# CRA에서 webpack 설정하기

```shell
npm install react-app-rewired

npm install customize-cra
```

```json
{
    "scripts": {
        "start": "react-app-rewired start"
    }
}
```

config-override.js 파일 생성
<br>
config-override 파일을 먼저 읽고 나서 실행
<br>

```js
// config-override.js

const { override } = require('customize-cra');

module.exports = override((config) => {
    config.resolve = {
        fallback: {
            ...config.resolve.fallback,
            https: require.resolve('https-browserify'),
        },
    };
    return config;
});
```
