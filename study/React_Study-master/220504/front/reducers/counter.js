const initialState = {
    number: 0,
}

const counter = (state = initialState, action) => {
    switch (action.type) {
        case "UP" :
            return {
                ...state,
            }
        default :
            return state
    }
}

module.exports = {
    counter,
    
}