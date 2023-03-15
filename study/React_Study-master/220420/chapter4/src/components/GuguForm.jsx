import React, {Component} from 'react'

class GuguForm extends Component {
    render() {
        return(
            <>
                <h2>몇 단 할꺼니?</h2>
                <form onSubmit={this.props.onSubmit}>
                    <input type="number" name="gugu" placeholder="숫자를 입력하세요" />
                    <input type='submit' value='조회' />
                </form>
            </>
        )
    }
}

export default GuguForm;