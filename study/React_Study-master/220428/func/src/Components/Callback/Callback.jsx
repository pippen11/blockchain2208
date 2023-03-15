import { useCallback, useState, useMemo } from 'react'

// useCallback 과 useMemo는 최적화의 문제

// useCallback은 함수를 담고 싶을 때 사용
// useMemo는 변수를 담고 싶을 때 사용

const Callback = () => {
    const [hi, setHi] = useState(0)
    const [bye, setBye] = useState(0)

    // const hiClick = () => {
    //     console.log('hi')
    //     setHi(hi+1)  // 상태가 변경되면 리랜더링
    // }

    // useEffect와 똑같이 사용
    // 메모리에 넣는다.
    // 컴포넌트가 많을 때 쓸데없는 리랜더링을 막는다.
    const hiClick = useCallback(()=>{
        console.log('hi')
        setHi(hi+1)
    }, [hi])
    // hi의 상태를 추적
    // hi의 상태값이 변할 때만 heap에 적재된다.
    // hi의 상태값이 변하지 않는다면 heap에 적재되지 않는다. (코드를 실행하지 않는다.)
    // 두번째 인자값이 []라면 최초 실행되었을 때 메모이제이션을 한다. componentDidMount() 시점
    
    // const byeClick = () => {
    //     console.log('bye')
    //     setBye(bye+1)
    // }

    const byeClick = useCallback(() => {
        console.log('bye')
        setBye(bye+1)
    }, [bye])
    // bye의 상태가 변할 때만 heap에 적재된다.
    // bye의 상태값이 변하지 않는다면 heap에 적재되지 않는다.

    const print = () => {
        console.log('call')
    }

    print()

    // const result = 10
    const result = useMemo(() => 10, [])

    return (
        <>
            {hi}
            {bye}
            <button onClick={hiClick}>Hi</button>
            <button onClick={byeClick}>Bye</button>
        </>
    )
}

export default Callback;