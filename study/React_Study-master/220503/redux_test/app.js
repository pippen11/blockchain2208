const redux = require('redux')
const { createStore, combineReducers } = redux
// Hook의 useReducer와 같이 상태를 만들어주는 것

// console.log(redux)
/*
    Object
    createStore: function
    applyMiddleware: function
    combineReducers: function
*/

const initialState = {
    name: 'ingoo', 
    megaCoffee: 0,
    user: {
        userid: 'web7722',
        username: 'ingooJJang'
    },
    board: {
        list: [{idx: 0, content: 'hi', date: '2022-05-03'}]
    },
    category: {
        mainCg: [
            {
                idx: 0,
                name: 'board',
                subCg: [
                    {
                        idx: 0,
                        name: 'notice'
                    },
                    {
                        idx: 1,
                        name: 'freeboard'
                    }
                ]
            }
        ]
    }
}

// 전역상태로 관리할 정보들
// 회원정보, 게시판 정보, 카테고리 정보 등등

const CHANGE_NAME = 'change_name'
const MEGECOFFEE_UP = 'megaCoffee_up'
const SETUP = 'setup'
const ORDER = 'order'
const CHANGE_ID = 'change_userid'
const ADD_LIST = 'add_list'
// const ADD_MAIN_CG = 'add_main_cg'
const ADD_SUB_CG = 'add_sub_cg'

// action을 return 하는 함수
const change_name = () => ({type: CHANGE_NAME})
// console.log( change_name() )
const megaCoffee_up = () => ({type: MEGECOFFEE_UP})
const setup = () => ({type: SETUP})
const order = (payload) => ({type: ORDER, payload})
const changeID = (payload) => ({type: CHANGE_ID, payload})
const addList = (payload) => ({type: ADD_LIST, payload})
// const addMainCg = (payload) => ({type: ADD_MAIN_CG, payload})
const addSubCg = (payload) => ({type: ADD_SUB_CG, payload})


// reducer : 객체를 return 해주는 함수
// dispatch를 통해 호출된 reducer 함수를 이용해 상태를 바꿔준다.
// reducer 함수가 return되면 상태가 바뀐다. 
// return 값이 새로운 상태가 된다.
const reducer = (state=initialState, action) => {
    // state = {name: 'ingoo'} , action = {type: 'change_name'}

    switch (action.type) {
        case CHANGE_NAME :
            return {
                ...state,
                name: 'ingoo2'
            }
        case MEGECOFFEE_UP :
            return {
                ...state,
                megaCoffee: state.megaCoffee + 1
            }
        case SETUP :
            return {
                ...state,
                name: 'ingoo',
                megaCoffee: 0
            }
        case ORDER :
            return {
                ...state,
                name: action.payload.name,
                megaCoffee: action.payload.num
            }
        case CHANGE_ID :
            return {
                ...state,
                user: {...state.user, userid: action.payload}
            }
        case ADD_LIST :
            const {board: {list}} = state
            const newList = [...list, action.payload]
            return {
                ...state,
                board: {list: newList}
            }
        case ADD_SUB_CG :
            const {category: {mainCg: [{subCg}]}} = state
            const newSubCg = [...subCg, action.payload]
            return {
                ...state,
                category: {mainCg: [{subCg: newSubCg}]}
            }
        default :
            // 초기 상태값
            return state
    }
}

const store = createStore(reducer)
// const [state, dispatch] = useReducer(reducer, initialState)
// store에는 state와 dispatch가 존재
// creatStore의 인자값으로 reducer를 넣어주면서 실행할 때 reducer 함수가 실행되고 초기 상태값을 return 한다.

// console.log(store)
/*
    dispatch
    subscribe
    getState
*/

console.log( store.getState() )
// store에 있는 상태를 가져온다.

store.dispatch( change_name() )  
// dispatch를 호출하면 reducer 함수가 호출된다. 
// dispatch의 인자값으로 들어간 action 값을 reducer 함수의 두번째 인자값으로 받을 수 있다.

console.log( store.getState() )
// dispatch가 호출된 후 store에서 상태를 가져왔기 때문에 상태가 변경된 것을 확인할 수 있다.

store.dispatch( megaCoffee_up() )

console.log( store.getState() )

// subscribe() : 뭔가 실행될 때마다 실행되는 함수

const log = (cb) => () => {
    const state = store.getState()
    const megaCoffee = cb(state)
    console.log('subscribe : ', megaCoffee)
}

store.subscribe( log(state => state.megaCoffee) )  // 인자값으로 콜백함수를 받는다.
// store.subscribe()를 이용해 등록을 한 것.
// store에 log라는 함수의 이벤트를 등록한 것이라고 보면 된다.
// dispatch가 호출되고 reducer 함수가 실행된 이후 subscribe 함수의 인자값으로 들어간 함수가 실행된다.
// reducer 실행 이후 subscribe로 등록된 함수가 실행.

store.dispatch( megaCoffee_up() )
store.dispatch( megaCoffee_up() )
store.dispatch( megaCoffee_up() )

// reset
// 상태를 원래대로 만들고 싶다.
/*
    {
        name: 'ingoo',
        megaCoffee: 0
    }
*/
console.log( store.getState() )
store.dispatch( setup() )
console.log( store.getState() )

// order
// 인자값을 받아서 상태를 가변적으로 바꾸고 싶을 때 
// => action 객체에 payload를 넣어서 사용
store.dispatch( order({num: 7, name: 'ingooJJang'}) )
store.dispatch( changeID('bitkunst') )
store.dispatch( addList({idx: 1, content: 'hi1', date: '2022-05-03'}) )
store.dispatch( addSubCg({idx: 2, name: 'QnA'}) )
console.log( store.getState() )
console.log( store.getState().board.list )
console.log( store.getState().category.mainCg[0].subCg )


/* ************************************************************** */

const { user, USER_ADD } = require('./reducers/user')
const { board, BOARD_ADD } = require('./reducers/board')
const category = require('./reducers/category')

// const user = (state, action) => {
//     return {
//         userid: 'web7722',
//         username: 'ingoo'
//     }
// }

// const board = (state, action) => {
//     return {
//         list: [{idx: 0, content: 'hi', date: '2022-05-03'}]
//     }
// }

// const category = (state, action) => {
//     return {
//         mainCg: [
//             {
//                 idx: 0,
//                 name: 'board',
//                 subCg: [{idx: 0, name: 'notice'}, {idx: 1, name: 'freeboard'}]
//             }
//         ]
//     }
// }

// combineReducers에 들어가는 함수 하나하나가 reducer이다.
const rootReducer = combineReducers({
    user,
    board,
    category
})

const store2 = createStore(rootReducer)

// dispatch 함수를 호출하면 모든 reducer가 실행된다.
store2.dispatch(USER_ADD('web8822'))
console.log( 'State : ', store2.getState() )

store2.dispatch(BOARD_ADD({idx: 1, content: 'hi1', date: '2022-05-03'}))

console.log( 'Board State : ', store2.getState().board.list )