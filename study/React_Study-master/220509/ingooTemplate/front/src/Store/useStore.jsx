import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga' // redux -> object createSagaMiddleware()
import rootSaga from '../sagas'

import { persistStore } from 'redux-persist'
// persist 전용 store를 만들기 위한 것
import { PersistGate } from 'redux-persist/integration/react'
// persist와 관련된 정보를 전역에서 관리하기 위해 Provider와 같은 것을 만들어 준 것.

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
const enhancer = process.env.NODE_ENV === 'production'
? compose(applyMiddleware(...middleware)) // 배포모드
: composeWithDevTools(applyMiddleware(...middleware)) // 개발모드 

const store = createStore(rootReducer,enhancer) // rootReducer , enhancer
sagaMiddleware.run(rootSaga) // sagas/index.js

const persistor = persistStore(store)  // persist 전용 store

// npm install redux-saga
// npm install axios

const Store = ({children}) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default Store