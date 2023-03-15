const initialState = {
    userid: 'web7722',
    username: 'ingoo'
}

const ADD = 'USER/ADD'
const USER_ADD = (payload) => ({type: ADD, payload})

const user = (state=initialState, action) => {
    // console.log(action)

    switch (action.type) {
        case ADD :
            return {
                ...state,
                userid: action.payload
            }
        default :
            return state
    }
}

module.exports = {
    user,
    USER_ADD
}