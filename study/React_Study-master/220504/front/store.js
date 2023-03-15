const { createStore, compose, applyMiddleware } = require('redux')
const rootReducer = require('./reducers')

// middleware
// createStore의 두번째 매개변수로 들어가게 된다.
// composeWithDevTools 역시 middleware
// dispatch() -> middleware 실행 -> reducer 호출

// middleware 종류
// Thunk
    // 10줄짜리,,
    // 설정 쉽다.
    // 사용 나쁘지 않다.
    // 잘못 짜면 터진다.
// Saga
    // 설정도 귀찮다
    // 사용도 귀찮다
    // 이슈가 적다.

// 첫번째 값으로 store를 받는다. store - dispatch, getState를 갖고 있다.
// next : 다음으로 넘어갈지 안 넘어갈지 결정하는 메소드
// next의 인자값으로 action을 넣어줘야 reducer에 action이 전달된다. 
const thunk = ({dispatch, getState}) => (next) => (action) => {
    // console.log('action의 타입 : ', typeof action)
    // if (typeof action === 'function') {
    //     // next 안함.
    //     console.log('action값이 함수', action)
    //     return action(dispatch)
    // } else {
    //     // action값이 객체
    //     // next
    //     return next(action)
    // }
    return (
        typeof action === 'function'
        ? action(dispatch)
        : next(action)
    )
}

const middleware = [thunk]
const enhancer = compose(applyMiddleware(...middleware))
const store = createStore(rootReducer, enhancer)


console.log( store.getState() )
store.dispatch({type: 'ingoo'})
store.dispatch({type: 'ingoo'})

// thunk에서는 action값을 함수로 전달하는 것이 가능
// dispatch를 사용할 때 action값이 객체인지 함수인지에 따라 다르게 작동하게끔 할 수 있다. middleware를 통해서,,

// const loginAPI = () => async (dispatch) => {
//     // try
//     // const result = await axios
//     // success -> result.data
//     // dispatch({type: 로그인성공})

//     // catch
//     //   error
//     //   dispatch({type: 로그인실패})
// }

// store.dispatch(loginAPI)

const aa = () => {
    const bb = (dispatch) => {
        console.log(dispatch)
        dispatch({type: '로그인 할래'})
    }

    return bb
}

// 기존에는 component 안에서만 dispatch를 사용할 수 있었다.
// 로직에 대한 코드를 분리해서 작성할 수 있다.
// 다른 파일에서도 dispatch 사용 가능
const loginAPI = () => async (dispatch) => {
    // dispatch({type: '로그인 할래2'})
    // dispatch({})
    dispatch({type: '로그인 시도'})
    try {
        const result = await axios.get(url, {
            withCredentials: true
        })
        // 실행이 된다면
        dispatch({type: '로그인 성공', payload: true})
    } catch (e) {
        dispatch({type: '로그인 실패', payload: false})
    }
}

store.dispatch(loginAPI())