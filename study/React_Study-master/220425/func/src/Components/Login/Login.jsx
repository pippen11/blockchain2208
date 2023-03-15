import React, {useEffect, useState} from 'react'

const Login = () => {

    const [values, setValues] = useState({email: '', password: ''})
    const [submit, setSubmit] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const handleChange = e => {
        // console.log(e.target.name, e.target.value)

        // key를 변수로 설정하는 javascript 문법
        const {name, value} = e.target
        setValues({
            ...values,  // {email: '', password: ''}
            [name]: value
        })
    }

    const logout = _ => {
        // 요청
        setIsLogin(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmit(true)

        // axios
        setTimeout(()=>{
            setSubmit(false)
            const result = true  // const [result] = await axios.post()
            // login 성공? 실패?
            if (result === true) {
                // 로그인 성공에 대한 상태
                setIsLogin(true)
                alert(`
                    이메일 : ${values.email}
                    패스워드 : ${values.password}
                `)
            } else {
                // 로그인 실패에 대한 상태
                setIsLogin(false)
            }

        }, 1000)
    }

    useEffect(()=>{
        console.log('hello login!')
    }, [isLogin])  // isLogin의 상태가 바뀔 때마다 useEffect() 함수가 실행됨

    return(
        <form onSubmit={handleSubmit}>
            <ul>
                <li>
                    <label>이메일</label>
                    <input type='email' name='email' onChange={handleChange} />
                    <br />
                    {
                        // 삼항연산자
                        // 조건 ? true : false
                        // true 일 때만 조건을 걸고 싶다면 (else 부분 제외)
                        true && <div>true일 때만 보여라~</div>
                    }
                </li>
                <li>
                    <label>패스워드</label>
                    <input type='passwordl' name='password' onChange={handleChange} />
                </li>
                <li>
                    <input type='submit' value='전송' disabled={submit} />
                </li>

                {isLogin ? <button onClick={logout}>로그아웃</button> : '로그인 안되었음'}
            </ul>
        </form>
    )
}

export default Login;