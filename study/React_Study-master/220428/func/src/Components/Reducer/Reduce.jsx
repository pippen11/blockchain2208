import React, { useReducer } from 'react'

const reducer = (state, action) => {
    // 상태 변경 코드들을 reducer()라는 함수 안에서 관리하겠다.
    console.log(state, action)
    console.log(action.type)

    switch (action.type) {
        case 'CHANGE_ID' :
            return {
                ...state,
                user: {
                    ...state.user,
                    userid: 'ingoo2'
                }
            }
        case 'CHANGE_NAME' :
            return {
                ...state,
                user: {
                    ...state.user,
                    username: action.payload
                }
            }
        case 'ADD_LIST' :
            return {
                ...state,
                notice: [
                    ...state.notice,
                    {idx: 1, subject: 'asdf', content: 'asdf', date: '2022-04-28'}
                ]
            }
    }

    return state
    // reducer 함수는 반드시 return 값이 존재해야 한다. 
    // return값으로 상태를 변경해준다.
    // return된 객체가 새로운 상태가 된다.
}

const initialState = {
    user: {
        userid: '',
        username: '',
        userlevel: ''
    },
    notice: [
        {idx: 0, subject: 'asdf', content: 'asdf', date: '2022-04-28'}
    ]
}

const Reduce = () => {

    const [state, dispatch] = useReducer(reducer, initialState)  
    // state, dispatch, reducer의 삼각관계
    // initialState의 값이 state의 기본값이 된다.
    // console.log(state)
    // useReducer의 목적은 상태 바꾸는 코드를 하나의 함수에 몰아넣기 위함
        // dispatch의 목적은 상태를 바꾸기 위함
        // dispatch를 실행하면 reducer가 실행되는 것.
        // dispatch가 reducer의 첫번째 인자값으로 state를 넣어준다.
        // dispatch의 첫번째 인자값이 reducer의 두번째 인자값으로 들어간다.
    // dispatch는 reducer를 실행시키고 reducer는 상태값을 변경한 후 return

    // 상태가 하나다.
    // 상태를 바꾸는 함수도 하나다
    // Context와 아주 잘 어울린다.

    const handleClick = () => {
        dispatch({type: 'CHANGE_ID'})
    }

    const handleClick2 = () => {
        dispatch({type: 'CHANGE_NAME', payload: 'ingoo'})
    }

    const addList = () => {
        dispatch({type: 'ADD_LIST'})
    }

    return (
        <>
            <button onClick={handleClick}>아이디바꾸기</button>
            <button onClick={handleClick2}>이름바꾸기</button>
            <button onClick={addList}>리스트추가</button>
            <p></p>
            {JSON.stringify(state)}
        </>
    )
}

/*
    useReducer를 사용하는 목적,
    상태 바꾸는 코드를 한 공간에 몰아넣고 싶어서

    상태를 만들 수 있는 메소드가 useReducer
    useReducer를 사용하면 상태를 만들고 변경할 수 있다.

    useReducer의 역할 : 상태를 만들고 상태를 변경할 수 있는 함수를 제공해준다.
    const [state, dispatch] = useReducer(함수, 기본값)
    const [state, dispatch] = useReducer(reducer, initialState)
    dispatch를 쓰면 reducer 함수가 실행된다.

    const [value, setValue] = useState(0)
*/

export default Reduce;