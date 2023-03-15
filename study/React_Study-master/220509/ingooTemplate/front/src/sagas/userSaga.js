import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { user_login_request } from '../reducers/user.js'

async function loginAPI(payload) {
    const result =  await axios.post('http://localhost:3500/user/login', payload)
    const { token } = result.data
    console.log(token)
    const response = await axios.post('http://localhost:3500/user/me', null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}

function* login(action) {
    console.log(action)
    // axios 관련 코드
    try {   
        const result = yield call(loginAPI, action.payload)
        console.log(result.data)
        // axios 성공
        yield put({
            type: 'USER/LOGIN_SUCCESS',
            payload: result.data
        })
    } catch (err) {
        // axios 실패
        yield put({
            type: 'USER/LOGIN_FAILURE',
            payload: err.response.data
        })
    }
}

export default function* watchUser() {
    // LOGIN/USER_REQUEST 라는 action을 추적
    // action값이 추적되면 실행시킬 함수를 두번째 인자값으로 전달
    // side effects로 실행시킬 함수는 generator 함수
    yield takeLatest(user_login_request.toString(), login)
    
}