import React, {Component} from 'react'

class CommentForm extends Component {

    state = {
        value: ''
    }

    handleChange = (e) => {
        const {value} = {...e.target}
        this.setState({
            ...this.state,
            value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const obj = {userid: 'bitkunst', content: this.state.value, date: '2022-04-22'}
        this.props.addList(obj)

        this.setState({
            ...this.state,
            value: ''
        })
    }

    render() {
        return(
            <li className='comment-form'>
                <form onSubmit={this.handleSubmit}>
                    <span className='ps_box'>
                        <input 
                            type='text' 
                            className='int'
                            placeholder='댓글을 입력해주세요.'
                            onChange={this.handleChange}
                            value={this.state.value}
                        />
                    </span>
                    <input type='submit' value='등록' className='btn' />
                </form>
            </li>
        )
    }
}

export default CommentForm;