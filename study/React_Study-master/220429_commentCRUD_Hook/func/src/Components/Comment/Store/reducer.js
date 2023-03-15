export const GET_COMMENT = 'GET_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

const reducer = (state, action) => {
    // action값은 객체 형태로 받는다. {type: '', payload: ''}
    const { type, payload } = action
    switch (type) {
        case GET_COMMENT :
            return {
                ...state,
            }
        case CREATE_COMMENT :
            // payload를 이용해 상태 변경
            return {
                ...state,
                commentItems: [...state.commentItems, payload]
            }
        case UPDATE_COMMENT :
            const {idx, content} = payload
            const commentItems = [...state.commentItems]
            commentItems[idx].content = content
            return {
                ...state,
                commentItems
            }
        default :
            return state
    }
}

export default reducer
// import reducer from '...'

// export const reducer = () => { }
// import { reducer } from '...'