const initialState = {
    number: 0
}

const UP = 'COUNTER/UP'
const DOWN = 'COUNTER/DOWN'

// {type: COUNTER/UP}
// 객체를 만들어주는 함수도 제작
// actions
export const up = () => ({type: UP})
export const down = () => ({type: DOWN})

// state 매개변수에 default값이 필수
const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case UP :
            return {
                ...state,
                number: state.number + 1
            }
        case DOWN :
            return {
                ...state,
                number: state.number - 1
            }
        default :
            return state
    }
}

export default rootReducer;