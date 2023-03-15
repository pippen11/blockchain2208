import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'

async function upAPI(payload) {
    console.log(payload)

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(true)
        }, 1000)
    })
}

async function downAPI(payload) {
    console.log(payload)
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(true)
        }, 1000)
    })
}

function* counterDown(action) {
    try {
        const result = yield call(downAPI, action.payload)

        yield put({
            type: 'COUNTER/DOWN_SUCCESS'
        })
    } catch (err) {

        yield put({
            type: 'COUNTER/DOWN_FAILURE'
        })
    }
}

function* counterUp(action) {
    try {
        const result = yield call(upAPI, action.payload)

        yield put({
            type: 'COUNTER/UP_SUCCESS'
        })

    } catch (err) {

        yield put({
            type: 'COUNTER/UP_FAILURE'
        })
    }
}

export default function* watchCounter() {
    yield takeLatest('COUNTER/UP_REQUEST', counterUp)
    yield takeLatest('COUNTER/DOWN_REQUEST', counterDown)
}