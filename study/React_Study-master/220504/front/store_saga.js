const { createStore, compose, applyMiddleware } = require('redux')
const rootReducer = require('./reducers')
const reduxSaga = require('redux-saga')  // 주로 React에서 사용
const { takeEvery, call, put } = require('redux-saga/effects')
// saga/effects 들은 함수 앞에 yield를 붙여서 사용한다.

// takeEvery : 모든 것을 처리
// takeLatest : 마지막 것만 처리

// console.log(reduxSaga)

// CANCEL: [Getter],
// SAGA_LOCATION: [Getter],
// buffers: [Getter],
// detach: [Getter],
// END: [Getter],
// channel: [Getter],
// eventChannel: [Getter],
// isEnd: [Getter],
// multicastChannel: [Getter],
// runSaga: [Getter],
// stdChannel: [Getter],
// default: [Function: sagaMiddlewareFactory]

// require 해서 가져올 때는 위와 같이 객체 형태로 들어간다.
const sagaMiddleware = reduxSaga.default()

// import saga from 'redux-saga'  <- default 값이 들어간다.

function loginAPI(id, pw) {
    return axios.post('http://localhost:4000')
}

function* change(action) {
    const {payload: {id, pw}} = action
    console.log(id, pw)
    // 비동기 코드
    try {
        const result = yield call(loginAPI, id, pw)  
        // loginAPI 함수가 받을 인자값을 순서대로 call 함수의 인자값으로 넣어준다.
        // yield 가 await 기능을 해준다. <- 비동기 처리 가능

        // dispatch를 쓸 수 없기 때문에 put 함수 사용
        // store에 있는 dispatch를 put 함수를 이용해 사용할 수 있다.
        yield put({type: '성공'})

    } catch (err) {
        // 실패
        yield put({type: '실패'})
    }
}

function* rootSaga() {
    // 1. action 상태를 확인하고 싶다.
    // takeEvery : action값이 같을 경우, 특정 함수를 호출해준다.
    // 첫번째 인자값은 type내용, 두번째 인자값은 호출할 함수명, 단 호출할 함수는 generator 함수
    // type 내용이 일치했을 때 두번째 인자값으로 들어간 함수를 호출한다.
    // 그리고 호출하는 콜백 함수에 action값을 전달.
    yield takeEvery('ingoo', change)
}

// sagaMiddleware.run(rootSaga)

const middleware = [sagaMiddleware]
// saga는 dispatch를 실행했을 때 generator함수들을 전부 실행시키는 구조
// sagaMiddleware.run() 의 인자값으로 실행시킬 함수들을 넣어줘야 한다.

// const enhancer = compose(applyMiddleware(...middleware))
const enhancer = process.env.NODE_ENV !== 'production'
? compose(applyMiddleware(...middleware))
: composeWithDevTool(applyMiddleware(...middleware))

const store = createStore(rootReducer, enhancer)
sagaMiddleware.run(rootSaga)

store.dispatch({type: 'ingoo', payload: {id: 'web7722', pw: '1234'}})

