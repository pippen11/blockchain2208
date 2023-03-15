# create-react-app
npx create-react-app [디렉토리명]
<br>
npm run start 로 실행하기
<br>
<br>

# Setting
npx create-react-app [디렉토리명]
<br>
webpack, babel, react, react-dom 등등 기본적인 세팅이 되어있다.
<br>
<br>

# Function Component
- hook

```javascript
// 클래스형 컴포넌트
class App extends React.Component { }

// 함수형 컴포넌트
function App() { }

const App = () => { }

// 기존 함수형 컴포넌트의 단점
// 상태를 만들 수 없었다.
// 생명주기를 할 수 없었다.
// 이러한 것들을 함수형 컴포넌트 안에서도 사용할 수 있게끔 만들어진 함수 모음이 Hooks

```
함수 모음이 Hooks.
<br>
use <-- 붙은 거,,
<br>
useState, useReducer, useContext, useCallback, useMap, useEffect
<br>
단, 똑같이 치환되지는 않는다.
<br>
기본적으로 함수형 컴포넌트 안에서만 작동된다. 비슷하게 구현은 되지만 똑같지는 않다.
<br>

```javascript
function a() {
    console.log('hello world')
}

a()

// 함수형 컴포넌트 사용방식
function A() {
    return <div>Hello world</div>
}

<A />
```

class 문법 -> 객체를 만드는 것.
```jsx
class App extends React.Component {
    render() {
        return(
            <span className='color'>
                <button className='btn'>버튼1</button>
                <button className='btn'>버튼2</button>
            </span>
        )
    }
}

// JSX -> JSX는 결국 JavaScript (babel을 통해서 가능)
// return 부분이 만들어 주는 것은 아래의 객체들
{
    type: 'span',
    props: {
        className: 'color',
        children: [
            {
                type: 'button',
                props: {
                    className: 'btn'
                }
            },
            {
                type: 'button',
                props: {
                    className: 'btn'
                }
            }
        ]
    }
}
// 객체를 통해서 리액트가 알아서 만들어 주는 것

// 함수 호출 방식
<Form>
    <Input />
</Form>

function Form(callback) {
    callback()
}

function Input() {

}

Form(Input)  // 이러한 호출 방식은 Form 함수가 먼저 실행되고 Input 함수가 다음에 실행된다.

// React에서는 Input이 먼저 실행되고 Form이 실행되어야 한다.
// 따라서 기존의 함수 호출 방식이 아닌, <Form />, <Input /> 같은 방식으로 호출

// Component를 만든다는 것은 리액트가 이해할 수 있는 Object를 만드는 것.

```

그래서 함수도 된다.
<br>
return 부분에 원하는 객체 형태를 만들어 주면 함수 형태로도 Component를 만들 수 있다.
<br>
하지만 상태, 생명주기 등등이 안됐다.
<br>
그래서 등장한 게 Hooks
<br>
<br>
this 바인딩 이슈 해소, 생산성, 코드가독성 측면에서 함수형 컴포넌트가 많이 사용됨.


- src
  - Components
    - State
      - State.jsx  (useState)
    - Effect
      - effect.jsx  (useEffect)
    - Context
    - Reducer
    - Callback
    - Memo
    - Form
      - Join
