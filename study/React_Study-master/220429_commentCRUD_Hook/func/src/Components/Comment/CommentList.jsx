import React, { useContext, useState, useRef, useEffect } from 'react'
import Store from './Store/Context.jsx'
import { UPDATE_COMMENT } from './Store/reducer.js'
import './assets/comment.css'

/*
Read
    1. 상태 가져오기 - Context에 있는 상태 가져오기
        // 1. useContext
        // 2. Store
    2. 가져온 상태를 이용해 JSX 상태로 만든 배열로 완성
*/

/*
Update
    1. 수정할 수 있는 화면 만들기
        // key값을 활용해서 클릭한 요소 가져오기.
        // 전역 변수에 기본값을 null값으로 한 다음
        // 클릭했을 때 null값을 key값으로 바꿔준다.
    2. 바뀐 input 박스를 원상복귀 하기.
        // input 엘리먼트에 onKeyDown 이벤트 걸어주기.
        // Enter를 눌렀을 때, input 내용을 null로 바꾼다.

*/

const CommentList = () => {

    const {state: {commentItems}, dispatch} = useContext(Store)
    const [input, setInput] = useState(null)

    const handleClick = k => e => {
        setInput(k)
        console.log(focus)
    }

    useEffect(()=>{
        if (input !== null) {
            console.log(focus.current)
            focus.current.focus()
        }
    }, [input])

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            setInput(null)
            // console.log(input, e.target.value)

            // {type: UPDATE_COMMENT, payload: {index: input, content: e.target.value}}
            dispatch({type: UPDATE_COMMENT, payload: {idx: input, content: e.target.value}})
        }

    }

    const focus = useRef()

    const getList = () => {
        return commentItems.map((v,k) => {
            return (
                <ul key={k} className='comment-list'>
                    <li>{v.userid}</li>
                    <li onClick={handleClick(k)}>
                        {
                            input === k
                            ? <input 
                                type='text'
                                ref={focus}
                                defaultValue={v.content}
                                onKeyDown={handleKeyDown}
                            />
                            : v.content
                        }
                    </li>
                    <li>{v.date}</li>
                </ul>
            )
        })
    }

    /*
        JSX -> Object : babel이 JSX를 해석해서 object로 바꿔준다.
        React가 Object를 HTML로 만들어준다.
        [ <li>1</li>, <li>2</li>, <li>3</li> ]
        {
            type: 'li',
            props: {
                children: [
                    {
                        type: 'li',
                        props: {
                            key: '1',
                            children: '1'
                        }
                    },
                    {
                        type: 'li',
                        props: {
                            key: '2',
                            children: '2'
                        }
                    },
                    {
                        type: 'li',
                        props: {
                            key: '3',
                            children: '3'
                        }
                    },
                ]
            }
        }
    */

    return (
        <li>
            {getList()}
        </li>
    )
}

export default CommentList;