import React, {useState} from 'react'

// Hooks를 넣을 때 기본 조건
// 함수 선언하고 return 상단에만 넣을 수 있다.

const State = () => {  // 함수 자체가 클래스 컴포넌트의 render()와 같은 역할
    /*
        const state = useState(0)
        const count = state[0]
        const setCount = state[1]
    */

    // const [count, setCount] = useState(0) 
    // return 값이 배열 
    // return [초기값, 함수]
    // useState()의 인자값이 초기값으로 들어간다.
    // 상태를 관리하는 함수의 인자값을 이용해 상태를 변경한다.

    // 함수형에서 상태를 만들 때는 변수를 하나하나 설정해서 해야한다.
    // 상태를 변경하는 함수 역시 상태마다 각각 만들어줘야 한다.
    // 클래스 컴포넌트처럼 객체 하나로 관리하는 게 아니라 내용을 분할해서 변수로 관리한다.

    const [value, setValue] = useState('ingoo')
    console.log('render~')
    // const [list, setList] = useState([ {userid: 'web7722', content: 'hi'} ])

    const handleClick = () => {
        setValue('hello world!!')  // 상태가 바뀐다.
        // 상태가 바뀌면 State 안에 있는 모든 코드들이 다시 실행
    }

    return(
        // 함수형은 this를 안 써도 된다.
        // return 값에 JSX 문법을 사용하지만 사실은 객체.
        <div>
            <button onClick={handleClick}>버튼</button>
            {value} <br />
        </div>
    )
}

export default State;