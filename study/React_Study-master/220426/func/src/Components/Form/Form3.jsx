import React, { useState, useEffect } from 'react'

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

// 폼체크
const validate = (input) => {
    const {userid, password} = input
    const errors = {}

    if (!userid) {
        errors.userid = "이메일이 입력되지 않았습니다."
    } else if ( !/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userid) ) {
        // 정규표현식
        // ^ : 시작하겠다는 의미
        // $ : 끝나겠다는 의미
        // 이메일 정규식 : !/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userid)
        // test() 메소드 안의 인자값이 정규식에 합당한지 검사 : return값은 true, false 
        errors.userid = "입력된 이메일이 유효하지 않습니다."
    }

    if (!password) {
        errors.password = "비밀번호가 입력되지 않았습니다."
    } else if (password.length < 8) {
        errors.password = "8자 이상의 패스워드를 사용해야 합니다."
    }

    return errors
}


const Form = () => {

    const id = useInput()
    const pw = useInput()
    const [submit, setSubmit] = useState(false)
    const [errors, setErrors] = useState({})
    // errors = {} 객체에 내용이 비어있으면 정상
    // errors = {userid: '아이디 글자수를 최소 8자 이상으로 해줘'}
    // errors = {password: '패스워드를 8자 이상으로 해줘'}

    const handleSubmit = e => {
        e.preventDefault()
        // 상태 바꿔주기.
        setSubmit(true)

        // id.value
        // pw.value

        const input = {
            userid: id.value,
            password: pw.value
        }

        // validate(input)  // dataType Object

        // let obj = {}
        // if (id.value.length < 8) {
        //     obj.userid = '아이디 글자수를 최소 8자 이상으로 해줘'
        // }

        // if (pw.value.length < 8) {
        //     obj.password = '패스워드를 8자 이상으로 해줘'
        // }

        setErrors(validate(input))
    }

    // componentDidMount
    // componentDidUpdate
    // useEffect <- 생명주기와 비슷한 기능을 한다.
    // setTimeout처럼 백그라운드에 들어간다는 정도로 생각하자.
    // return 값이 완료되고 나서 최초 1회 실행
    // 정환한 명칭은 SideEffect  <- 해당 코드가 사이드에서 돌아간다.
    // 해당 코드를 사이드로 보낸 후 모든 코드가 실행 완료된 다음에 실행
    useEffect(()=>{
        // 조건문을 걸어서 시점을 잡는다.
        // if (id.value !== '') {
        //     console.log('componentDidUpdate')
        // } else {
        //     console.log('componentDidMount')
        // }
        if (submit) {
            console.log('회원가입 시켜줘잉~')
            console.log(Object.keys(errors))
            // Object.keys(errors) => ['userid', 'password'] 
            if (Object.keys(errors).length === 0) {
                alert('회원가입 성공~')
                // axios
            }

            setTimeout(()=>{
                setSubmit(false)
            }, 1000)

        }
    },[submit, errors])  // Mount일 때도 실행되고 Update 때도 실행된다. => 조건문을 이용해 시점을 잡아준다.

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
                    { errors.userid && <span>{errors.userid}</span> }
                </li>
                <li>
                    <label htmlFor='password'>패스워드</label>
                    <input 
                        type='password' 
                        name='password' 
                        {...pw}
                    />
                    { errors.password && <span>{errors.password}</span> }
                </li>
                <li>
                    <input type='submit' value='가입' disabled={submit} />
                </li>
            </ul>
        </form>
    )
}

export default Form