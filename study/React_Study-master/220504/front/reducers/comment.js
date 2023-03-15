const initialState = {
    list: []
}

const ADD_REQUEST = 'COMMENT/ADD_REQUEST'
const ADD_SUCCESS = 'COMMENT/ADD_SUCCESS'
const ADD_FAIL = 'COMMENT/ADD_FAIL'

const comment = (state = initialState, action) => {
    switch (action.type) {
        case "ADD" :
            return {
                ...state
            }
        default :
            return state
    }
}

module.exports = {
    comment
}