import React, {Component} from 'react'

class CommentForm extends Component {

    state = {
        value: ''
    }

    handleChange = e => {
        const { value } = { ...e.target }
        this.setState({
            value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state.value)
        // axios가 발동
        // 결과물을 받을 때 상태를 바꾸면 된다.
        // then 콜백함수 안에서 상태를 바꾸면 된다.
        const obj = {userid: 'web7722', content: this.state.value, date: '2022-04-21'}

        this.props.addList(obj)
        this.setState({
            value: ''
        })
        // Submit 버튼을 눌렀을 때 input 박스에 있는 내용을 가져올 수 있게끔 처리
        // App 컴포넌트에 있는 list라는 값을 push 해줘야하는 상황.
            // App 컴포넌트에서 상태를 바꿀 수 있는 함수를 만든다.
            // App 컴포넌트에서 상태를 바꿀 수 있는 함수를, CommentForm 컴포넌트에게 props로 전달
            // handleSubmit 함수가 호출되었을 때 props로 전달받은 함수를 실행시킨다.
            // props로 전달받은 함수에는 CommetForm에서 받은 상태 value값을 인자값으로 넣어준다.
            // 마지막으로 CommentForm에 있는 value 상태값을 빈 문자열 ''로 바꾼다.
            
    }

    render() {
        return(
            <li className='comment-form'>
                <form onSubmit={this.handleSubmit}>
                    <span className='ps_box'>
                        <input 
                            type='text' 
                            className='int'
                            placeholder='댓글을 입력해주세요'
                            onChange={this.handleChange}
                            value={this.state.value}
                        />
                    </span>
                    <input type='submit' value='등록' className='btn'></input>
                </form>
            </li>
        )
    }
}

export default CommentForm;