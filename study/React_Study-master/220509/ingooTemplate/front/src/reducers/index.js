import { combineReducers } from "redux";
import { createAction, handleActions } from 'redux-actions'
import { persistReducer } from 'redux-persist'
// reducer가 실행될 때 persist도 묶어서 사용.
import storage from 'redux-persist/lib/storage'
// localStorage를 사용하기 위함.
import counter from './counter'
import user from './user.js'

// config
// localStorage의 key, value
const persistConfig = {
    key: 'user',
    storage,
    whitelist: ['user']  // store의 내용중 user reducer만 localStorage에 저장하겠다는 의미.
}
// persist가 store에 있는 user reducer만을 localStorage에 저장.
// localStorage에 있던 값을 store 안의 user reducer의 initialState 값으로 넣어준다.

// whitelist
/*
    {
        counter: {

        },
        user: {

        }
    }
*/

const rootReducer = combineReducers({
    counter,
    user
})

export default persistReducer(persistConfig, rootReducer)
// rootReducer와 persist를 묶어서 사용
// persist와 관련된 reducer를 만들어준 것


// const initialState = {
//     number:0
// }

// const UP = 'COUNTER/UP'
// const DOWN = 'COUNTER/DOWN'

// export const up = createAction(UP)
// export const down = createAction(DOWN)

// const rootReducer = handleActions({
//         [UP]: (state, action) => ({ number: state.number+1 }),
//         [DOWN]: (state, action) => ({ number: state.number-1 })
//     },
//     initialState
// )

// rootReducer의 최초 실행 시점은?? => useStore.jsx에서 store가 만들어질 때
// render가 되기 전에 리듀서가 실행된다.
// check
    // rootReducer를 실행할 때, 실행한 브라우저의 localStorage 내용 안에 내가 설정한 변수로 저장한 값이 있는지를 체크
    // 저장한 값이 없다면 값을 만들어주고  <-  user에 있는 기본 상태값을 넣어준다.
    // 저장한 값이 있다면 localStorage에 있는 내용을 가지고 상태를 바꿔준다.
    // localStorage는 기본적으로 dataType string만 저장 가능.
// localStorage.setItem('key', 'value')  :  localStorage에 값 저장하기
// localStorage.getItem('key')  :  localStorage에서 값 가져오기

// const persistKey = 'user'
// const storageState = localStorage.getItem(persistKey)  // persistKey에 해당하는 값이 없다면 null값

// if (storageState) {
//     JSON.parse( localStorage.getItem(persistKey) )  // string -> json, 상태값에 넣어준다.
// } else {
//     localStorage.setItem(persistKey, JSON.stringify( user() ))
// }


