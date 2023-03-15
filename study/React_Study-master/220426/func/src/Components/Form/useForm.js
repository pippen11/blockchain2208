import React, {useState, useEffect} from 'react'

// input 박스 상태
// submit 실행내용
// 폼체크

// defaultValue
/* 
    defaultValue = {
        userid: '',
        password: ''
    }

    // key값과 props명과 일치해야 한다. 
    input: {
        userid: {
            value: defaultValue.userid,
            onChange
        },
        password: {
            value: defaultValue.password,
            onChange
        }
    }
*/
const useForm = (defaultValue, onSubmit, validate) => {
    const [values, setValues] = useState(defaultValue)
    const [submit, setSubmit] = useState(false)
    const [errors, setErrors] = useState({})

    const onChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    // side effect : useEffect
    const handleSubmit = e => {
        e.preventDefault()
        setSubmit(true)
        setErrors(validate(values))  // validate 함수를 이용해 폼체크
    }

    useEffect(()=>{
        // useEffect 함수의 콜백함수에서는 async 사용불가
        // 콜백함수 안에서 async 함수를 만들어서 호출하는 방식으로 사용
        const init = async () => {
            if (submit) {
                if (Object.keys(errors).length === 0) {
                    // 성공
                    console.log('성공~')
                    onSubmit(values)
                }
                setSubmit(false)
            }
        }

        init()
    },[errors])

    return {
        ...Object.keys(defaultValue).reduce((acc,v)=>{
            acc[v] = {
                value: values[v],
                onChange
            }
            return acc
        }, {}),
        handleSubmit,
        errors,
        submit
    }
}

export default useForm;