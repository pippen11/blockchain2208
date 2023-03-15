import React, {useState} from 'react'

const Counter = () => {
    const [count, setCount] = useState(0)

    return(
        <div>
            <p>You clicked {count} times</p>
            <button onClick={ ()=>{ setCount((prev) => prev+1) } }>
                {
                    // setCount('asdf')
                    // count = 'asdf'
                    // count = count + 1
                    // 상태를 바꾸기 이전의 값을 가져오고 싶은 경우 : 콜백함수 사용
                    // 콜백의 첫번째 매개변수에는 현재 상태값을 받는다.
                }
                Click me
            </button>
        </div>
    )
}

export default Counter;