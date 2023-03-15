import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { up, down } from '../reducers/counter.js'

const Counter = () => {
    const dispatch = useDispatch()
    const counter = useSelector( (state) => state.counter )

    const onUp = useCallback(()=>{ dispatch(up('카운터 업')) }, [dispatch])
    const onDown = useCallback(()=>{ dispatch(down()) }, [dispatch])


    return (
        <>
            <h1>Counter : {counter.number}</h1>
            <p></p>
            {
                counter.loading
                ? '로딩중 입니다.'
                : <>
                    <button onClick={onUp}>+1</button>
                    <button onClick={onDown}>-1</button>
                </>
            }

        </>
    )
}

export default Counter;