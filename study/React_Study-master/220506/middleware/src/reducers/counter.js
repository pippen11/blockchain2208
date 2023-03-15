import { createAction, handleActions } from 'redux-actions'

const initialState = {
    number: 0,
    loading: false,
    error: null
}

const UP = 'COUNTER/UP_REQUEST'
const UP_SUCCESS = 'COUNTER/UP_SUCCESS'
const UP_FAILURE = 'COUNTER/UP_FAILURE'
const DOWN = 'COUNTER/DOWN_REQUEST'
const DOWN_SUCCESS = 'COUNTER/DOWN_SUCCESS'
const DOWN_FAILURE = 'COUNTER/DOWN_FAILURE'

export const up = createAction(UP)
export const down = createAction(DOWN)

const counter = handleActions(
    {
        [UP] : (state, action) => ({
            ...state,
            loading: true,
            error: null
        }),
        [UP_SUCCESS] : (state, action) => ({
            ...state,
            loading: false,
            number: state.number + 1
        }),
        [UP_FAILURE] : (state, action) => ({
            ...state,
            loading: false,
            error: '에러 발생'
        }),
        [DOWN] : (state, action) => ({
            ...state,
            loading: true,
            error: null
        }),
        [DOWN_SUCCESS] : (state, action) => ({
            ...state,
            loading: false,
            number: state.number - 1
        }),
        [DOWN_FAILURE] : (state, action) => ({
            ...state,
            loading: false,
            error: '에러 발생'
        })
    }, 
    initialState
)

export default counter;