# CSS 적용하기
style-loader : 인라인 형태로 css 적용 가능 라이브러리
<br>
css-loader : className으로 css 적용 가능 라이브러리
<br>
주의 : 두개 같이 설치하면 오류 발생. 같이 사용하기 위해서는 추가로 설정해줘야 함.
<br>
<br>
webpack <- nodejs 환경에서 실행됨. CSS 처리에는 추가적인 설정이 필요.
<br>
webpack은 파일을 가져와서 번들하는 것. CSS 파일도 import가 된다면 번들해주면 되지 않을까?
```
    npm install -D mini-css-extract-plugin css-loader
```

<br>
리액트에서 css를 적용할 수 있는 3가지 방법
<br>
<br>


## 1. css 파일을 import 하는 방법
css 파일을 하나 만들고 import 해서 해당 디렉토리에 있는 파일을 가져오면 된다.
<br>
그리고 index.html 파일에서 link 엘리먼트로 번들한 css 파일을 가져온다.
<br>
단점 : 클래스명이 같을 경우 css가 꼬일 가능성이 있다.
<br>

## 2. module.css 만드는 방법
파일명.module.css 형식으로 css파일 생성
<br>
클래스명이 고유한 값으로 암호화되기 때문에 클래스명이 겹칠 일이 없다.
<br>


## 3. styled-components 만드는 방법
컴포넌트를 만들 때 css가 들어간 컴포넌트를 만드는 방법
```
    npm install styled-components
```

변수를 설정하는 방식으로 적용
<br>
const 변수명 = styled.엘리먼트명.\`css 내용\`
<br>
장점 : 컴포넌트 내에서 바로 CSS를 작업한 내용을 만들 수 있다.
<br>
css에서 변수에 따라 값이 바뀌는 기능도 가능하다.
<br>
컴포넌트 형식으로 만들어졌기 때문에 props 전달 가능.
<br>
${ javascript 문법 작성 }

<br>

# GuguClass 만들기
input 박스에 단을 입력하면 해당 구구단이 리스트 형태로 나타나게끔 하기.