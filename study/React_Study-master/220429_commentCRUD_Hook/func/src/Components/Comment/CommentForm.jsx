import React, { useContext, useState, useRef } from 'react'
import Store from './Store/Context.jsx'
import { CREATE_COMMENT } from './Store/reducer.js'

/*  
    Issue.
    전역상태를 어떻게 가져올 것인가,,
        1. useContext
        2. useContext 인자값으로 createContext()로 만든 변수를 넣어준다.
    handleSubmit
        dispatch를 사용하기 위함,
        상태를 바꾸겠다.
    useRef
        React에서 DOM 조작을 할 수 있는 개념
        React 내장 Hook.
*/

const CommentForm = () => {

    const [content, setContent] = useState('')

    const { state, dispatch } = useContext(Store)
    const handleSubmit = e => {
        e.preventDefault()
        // 전역 상태에 데이터를 넣어야 한다.

        // dispatch를 이용해 reducer함수 실행
        // 객체 형태로 인자값을 넣어준다.
        // reducer -> {type: CREATE_COMMENT, payload: {userid: 'web7722', content: 'hi', date: '2022-04-29'}}
        dispatch({ type: CREATE_COMMENT, payload: {userid: 'web7722', content, date: '2022-04-29'} })
        // payload의 content를 input에 있는 정보로 바꿔줘야 한다.
        setContent('')
        // console.log(input.current)
        
        // input.current로 DOM을 가져온다.
        input.current.focus()
    }

    const handleChange = e => {
        const {value} = e.target
        setContent(value)
        // console.log(input)
    }

    // useRef는 랜더가 끝난 시점에 완성된 HTML을 담는 공간
    const input = useRef()  // {current: undefined}

    return (
        <li>
            <form onSubmit={handleSubmit}>
                <input ref={input} type='text' value={content} onChange={handleChange} />
                <input type='submit' value='댓글작성' />
            </form>
            {/* HTML이 아닌 JavaScript 객체이다. DOM 조작 불가능 => useRef 사용 */}
            {/*
                JSX => Object
                Object가 HTML이 되는 시점에 useRef()가 발동
                엘리먼트 속성 ref : React에서 쓸 수 있는 props
            */}
        </li>
    )
}

export default CommentForm;