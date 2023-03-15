import React from 'react'

const Props = ({value, children}) => {
    console.log(value, children)
    // 구조분해할당으로 props 전달
    return(
        <div>
            hello props!!
        </div>
    )
}

export default Props;