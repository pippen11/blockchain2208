import React, { useState } from 'react'

// 함수형 컴포넌트에는 원래 상태를 만들지 못했는데 
// Hook을 이용해서 가능해졌다.
// Hook -> useXXXX
// useState 같은 매서드를 사용
// React.useXXXX

// Hook의 장점
// 어떠한 함수든 함수 안에서 상태를 만들 수 있다.
// 커스텀 Hook을 만들 때는 함수명 앞에 use를 붙여줘야 한다.
const useInput = () => {

    const [value, setValue] = useState('')
    const onChange = e => {
        setValue(e.target.value)
    }
    return {
        value,
        onChange
    }
}

const Form = () => {

    // const [values, setValues] = useState({userid: '', password: ''})
    // const [userid, setUserid] = useState('')
    // const [password, setPassword] = useState('')

    const id = useInput()
    const pw = useInput()

    // 결과물을 배열에 담아서 준다. return 값이 배열
    // [ useState의 인자값(초기값) , ()=>{ } ]    
    // 배열의 두번째 값인 함수를 사용해서 상태값을 변경할 수 있다.
    // 상태값을 변경하는 함수는 비동기적으로 실행된다.

    // 클래스 컴포넌트는 상태가 변경되었을 때 render() 메소드 안에 있는 코드들만 실행된다.
    // 하지만 함수 컴포넌트는 상태가 변경되었을 때 함수 안에 있는 모든 코드들이 실행된다.

    const handleSubmit = e => {
        e.preventDefault()

    }

    // const changeUserid = e => {
    //     const {value} = e.target
    //     setUserid(value)
    // }

    // const changePassword = e => {
    //     const {value} = e.target
    //     setPassword(value)
    // }

    // const handleChange = e => {
    //     const {value, name} = e.target
    //     setValues({
    //         ...values,
    //         [name]: value  // 변수가 key로 들어가게 된다.
    //     })
    // }

    // let obj = {
    //     value: userid,
    //     onChange: changeUserid
    // }

    return(
        <form onSubmit={handleSubmit}>
            {/* userid 상태와 password 상태값을 alert로 띄우고 싶다. */}
            <h2>회원가입</h2>
            <ul>
                <li>
                    <label htmlFor='userid'>아이디</label>
                    <input 
                        type='text' 
                        name='userid' 
                        {...id}
                    />
                    {/* onChange 일어날 때마다 상태를 최신화로 바꾸고 싶다 */}
                    {/* <input /> -> Object */}
                    {/* 
                        {
                            type: 'input',
                            props: {
                                type: 'text',
                                name: 'userid',
                                onChange: () => {}
                                value: ''
                            }
                        }
                        이러한 객체를 html로 변환해준다.
                    */}
                </li>
                <li>
                    <label htmlFor='password'>패스워드</label>
                    <input 
                        type='password' 
                        name='password' 
                        {...pw}
                    />
                    {/* onChange 일어날 때마다 상태를 최신화로 바꾸고 싶다 */}
                </li>
                <li>
                    <input type='submit' value='가입' />
                </li>
            </ul>
        </form>
    )
}

export default Form