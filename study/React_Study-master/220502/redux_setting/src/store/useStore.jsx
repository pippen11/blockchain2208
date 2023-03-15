// import { createContext } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../reducers/index.js'
import { composeWithDevTools } from 'redux-devtools-extension'

// const Store = createContext() // Store라는 component 생성
// <Store.Provider> 형태로 사용

const store = createStore(rootReducer, composeWithDevTools())  // Component X 
// 변수를 담을 수 있는 공간을 만들어준 것일 뿐
// 인자값으로 reducer 함수를 넣어준다.
// 브라우저의 devTools를 통해 redux를 확인할 수 있게 하기 위해 composeWithDevTools()를 인자값으로 넣어준다.

const Store = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
// <Store.Provider value={{state}}> </Store.Provider>

export default Store;