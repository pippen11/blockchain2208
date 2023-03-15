// React = require('react')
// const { Component } = React

import React, { Component } from 'react'

// css 파일을 하나 만들고 import 해서 해당 디렉토리에 있는 파일을 가져오면 된다.
import './assets/app.css'
import './assets/bpp.css'

// import가 되어있기 때문에 webpack에서 번들을 진행한다.
// 클래스명이 겹치기 않게끔 고유한 이름으로 해싱된다.
import styles from './assets/App.module.css'
import styless from './assets/test.module.css'

// 컴포넌트를 만들 때 애초에 css가 적용된 컴포넌트를 만드는 방법
import styled from 'styled-components'

import GuguClass from './components/GuguClass.jsx'

// css가 적용된 상태로 컴포넌트를 만드는 것.
const Button = styled.button`
    background: #000;
    border: none;
    color: #fff;
    padding: 7px 14px;
    cursor: pointer;
`

// Button 컴포넌트의 내용을 그대로 가져와서 새로운 내용을 추가한 다음 덮어씌우는 것도 가능
const HoverButton = styled(Button)`
    background: #007bff;
    :hover {
        background: #0069d9;
    }
`

const display = (props) => {
    let flag
    if (props.background === '#333') flag = 'none'
    return flag
}

const ActiveButton = styled(Button)`
    background: ${ (props) => props.background };
    display: ${ display };
`

class App extends Component {

    state = {
        value: 'Hello React!!'
    }

    clickHandler = () => {
        alert('hi')
    }

    render() {
        return(
            <>
                <div className='color'>{this.state.value}</div>
                <div className={styles.color}>여기는 App module css</div>
                <div className={styless.color}>여기는 Test module css</div>
                <div>
                    <Button>하잉</Button>
                    <HoverButton>두번하잉</HoverButton>
                    <ActiveButton background='#334' onClick={this.clickHandler}>세번하잉</ActiveButton>
                </div>
                *********************{this.state.value}**********************
                <div>
                    <GuguClass />
                </div>
            </>
        )
    }
}

// module.exports = App
export default App;