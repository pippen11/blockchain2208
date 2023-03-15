import { createContext } from 'react'

export const initialState = {
    commentItems: [],
    loading: false,  // submit
    errors: null
}

const Store = createContext()

// ES6 모듈
export default Store
// export const a = 10  // {a: 10} , 객체형태로 내보낸다.

// NodeJS 모듈
// module.exports = Store
