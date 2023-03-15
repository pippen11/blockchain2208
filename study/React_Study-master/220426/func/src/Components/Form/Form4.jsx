import React, { useState, useEffect } from 'react'
import useForm from './useForm.js'
import validate from './validate.js'
import '../../assets/form.css'

// 커스텀 Hook 만들기
// input 박스 , submit 커스텀 Hook 제작

// 커스텀 Hook 만든 파일 하나 -> useForm.jsx
// 폼체크 파일 하나 -> validate.js

const request = async (items) => {
    // alert('안녕하세요')
    // 요청의 코드는 비동기코드
    // axios
    // join -> input의 상태를 전부 다 알아야 한다. 
    const result = await new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(items)
        }, 1000)
    })

    alert(JSON.stringify(result))
}

const Form = () => {

    const {
        userid, 
        password, 
        errors, 
        submit, 
        handleSubmit
    } = useForm({userid:'', password:''}, request, validate)    
    // Form 컴포넌트에서만 사용할게 아니라
    // Join
    // write
    // comment 등등에서 사용 가능하게끔

    // handleSubmit이 발동되었을 때
    // 요청이라는 것을 해야한다.
    // handleSubmit이 발동되었을 때 실행되는 함수를 인자값으로 넘긴다.

    /*
        password: {value: '', onChange},
        userid: {value: '', onChange},
        errors: {},
        submit: boolean,
        handleSubmit: f()
    */

    return(
        <form onSubmit={handleSubmit}>
            <h2>회원가입</h2>
            <ul>
                <li>
                    <label htmlFor='userid'>아이디</label>
                    <input 
                        type='text' 
                        name='userid'
                        {...userid}
                    />
                    {errors.userid && <span className={errors.userid && 'error'}>{errors.userid}</span>}
                </li>
                <li>
                    <label htmlFor='password'>패스워드</label>
                    <input 
                        type='password' 
                        name='password' 
                        {...password}
                    />
                    {errors.password && <span className={errors.password && 'error'}>{errors.password}</span>}
                </li>
                <li>
                    <input type='submit' value='가입' disabled={submit} />
                </li>
            </ul>
        </form>
    )
}

export default Form