import Button from '../../components/common/button.jsx'
import Responsive from '../../components/common/responsive.jsx'
import { useSelector, useDispatch } from 'react-redux'
// 전역에 있는 상태 가져와서 사용하기

import { up, down } from '../../reducers/index.js'

const Counter = () => {

    const counter = useSelector( (state)=>{
        // state 매개변수가 redux에 있는 모든 상태를 반환해준다.
        // 전역 상태에 있는 state를 가져와서 counter 변수에 담은 것
        return state
    } )

    const dispatch = useDispatch()

    const onUp = () => {
        dispatch(up())
    }

    const onDown = () => {
        dispatch(down())
    }

    return (
        <>
            <Responsive>
                <h3>Counter : {counter.number}</h3>
                <button onClick={onUp} >+1</button>
                <button onClick={onDown}>-1</button>
            </Responsive>
        </>
    )
}

export default Counter;