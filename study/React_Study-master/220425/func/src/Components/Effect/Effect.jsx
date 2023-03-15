import React, {useState, useEffect} from 'react'

const Effect = () => {

    const [count, setCount] = useState(0)

    // class 컴포넌트에서 배웠던 것 : State, Props, Life Cycle
    // useEffect : Hooks에서 Life Cycle처럼 해줄 수 있는 것.
    // useEffect  // 이팩트
        // class component에서 생명주기
        // componentDidMount
        // componentDidUpdate
        // componentWillUnmount
    // Hooks에서는 useEffect 만으로 위의 세가지를 처리하는 게 가능.
    // 조건문을 사용해서 처리.

    // 인자값을 총 2개 받는다.
    /*
        첫번째 인자값은 함수, 두번째 인자값은 배열
        1. callback 함수  (필수)
        2. deps <= array  (선택)

        ()=>{ }, []
    */
    useEffect(()=>{
        document.title = 'hello React'
        console.log('hello effect')

        return () => {
            console.log('나 종료됨!!')
        }  // return 값의 기능은 componentWillUnmount()

    }, [count])  // 빈 배열을 넣었을 때는 componentDidMount()와 같은 역할을 한다.
    // 배열 안에 props 혹은 상태값을 넣어준다.
    // 상태가 바뀔 때마다 인지하고 useEffect() 함수를 실행해준다. <= componentDidUpdate()

    /*
        로그인 버튼 만들기
    */

    return(
        <div>
            <p>You clicked {count} times</p>
            <button onClick={ ()=>{ setCount((prev) => prev+1) } }>
                Click me
            </button>
        </div>
    )
}

export default Effect;

