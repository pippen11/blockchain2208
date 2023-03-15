import React, {Component} from 'react'
import '../assets/comment.css'

class Comment extends Component {
    render() {
        return(
            <ul className='comment'>
                {this.props.children}
            </ul>
        )
    }
}

export default Comment;