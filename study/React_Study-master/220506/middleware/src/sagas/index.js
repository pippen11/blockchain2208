import { all } from 'redux-saga/effects'
import watchCounter from './counterSaga.js'


export default function* rootSaga() {
    yield all([
        watchCounter()
    ])
}