// import React, { useState, useEffect } from 'react'
import Store, { initialState } from './Store/Context.jsx'
import React, { useReducer, useMemo } from 'react'
import reducer, { GET_COMMENT } from './Store/reducer'
import CommentLayout from './CommentLayout'

// Store.Provider의 value에 state와 dispatch 값을 넣어준다.
const Comment = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const defaultValue = useMemo(()=>({
        state,
        dispatch
    }), [state])

    return (
        <Store.Provider value={ defaultValue }>
            <CommentLayout />
        </Store.Provider>
    )
}

export default Comment;

