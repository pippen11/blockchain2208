const initialState = {
    list: [{idx: 0, content: 'hi', date: '2022-05-03'}],
    value: ''
}

const ADD = 'BOARD/ADD'
// payload : {idx: 0, content: 'hi', date: '2022-05-03'}
const BOARD_ADD = (payload) => ({type: ADD, payload})

const board = (state=initialState, action) => {
    // console.log(action)
    const {type, payload} = action
    switch (type) {
        case ADD :
            return {
                ...state,
                list: [...state.list, payload]
            }
        default :
            return state
    }
}

module.exports = {
    board,
    BOARD_ADD
}