import { Link } from "react-router-dom"
import AuthLayout, { Footer } from "../Components/auth/AuthLayout"
import { AuthInputBox } from "../Components/form/inputs"
import { StyledButton } from "../Components/form/buttons"
import useForm from '../Hook/useForm.jsx'
import { validate } from '../utils/validate/login.js'
import { useSelector, useDispatch } from 'react-redux'
// store에 저장된 전역 상태에 접근하기 위한 내장 Hook
import { user_login_request } from '../reducers/user.js'

const Login = () => {

    const dispatch = useDispatch()

    // 폼에 대한 상태, errors에 대한 상태, submit에 대한 상태, handleSubmit
    // useForm <- 인자값 3개
    // 1. initialState
    // 2. submit 함수 내용
    // 3. 폼 체크 함수
    const initialState = { email: '', password: '' }
    const onSubmit = (payload) => {
        // user_login_request({name: 'ingoo'})
        // { type: 'USER/LOGIN_REQUEST', name: 'ingoo' }
        dispatch( user_login_request({...payload}) )
    }
    const { 
        email, 
        password,
        handleSubmit,
        errors,
        submit
    } = useForm(initialState, onSubmit, validate)
    // console.log(useForm(initialState, onSubmit, validate))

    return (
        <>
            <AuthLayout>
                <form onSubmit={handleSubmit}>
                    <h3>로그인</h3>
                    <AuthInputBox type='text' name='email' {...email} placeholder="아이디를 입력해주세요." />
                    { errors.email && <span>{errors.email}</span> }
                    <br />
                    <AuthInputBox type='password' name='password' {...password} placeholder="패스워드를 입력해주세요." />
                    { errors.password && <span>{errors.password}</span> }
                    <br />
                    <StyledButton fullWidth type="submit" disabled={submit} >로그인</StyledButton>
                </form>
                <Footer >
                    <Link to="/register">회원가입</Link>
                </Footer>
            </AuthLayout>
        </>
    )
}

export default Login