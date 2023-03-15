import React from 'react'
import CommentForm from './CommentForm.jsx'
import CommentList from './CommentList.jsx'

const CommentLayout = () => {
    return (
        <ul>
            <CommentForm />
            <CommentList />
        </ul>
    )
}

export default CommentLayout