const React = require('react')
const { Component } = React


// import React, { Component } from 'react'
// import 와 require의 차이점
// 내부적으로 돌아가는 방식은 다를 수 있으나 목적은 같다.
// require <- nodejs 등장과 함께 먼저 등장 (nodejs 환경에서만 사용가능)
// import <- ES6 등장과 함께 나중에 나옴 (브라우저 환경에서도 사용 가능)

class App extends Component {
    state = {
        value: 'Hello React!!'
    }

    render() {
        return(
            <>
                {this.state.value}        
            </>
        )
    }
}

module.exports = App