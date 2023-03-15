import React, { Component } from 'react'
import Comment from './components/Comment.jsx'
import CommentForm from './components/CommentForm.jsx'
import CommentList from './components/CommentList.jsx'

class App extends Component {

    state = {
        list: []
    }

    // 생명주기 함수
    componentDidMount() {  // 최초실행.
        console.log('마운트~')
        // 상태 변경
        this.setState({  // 데이터가 바뀌면 상태가 바뀐다. 데이터는 상태.
            ...this.state,
            list: [ 
                {userid: 'web7722', content: '안녕22', date: '2022-04-21'},
                {userid: 'web7722', content: '안녕22', date: '2022-04-21'},
                {userid: 'web7722', content: '안녕22', date: '2022-04-21'}
            ]
        })
    }

    addList = (obj) => {
        this.setState({
            ...this.state,
            list: [...this.state.list, obj]
        })
    }

    updateList = list => {
        this.setState({
            ...this.state,
            list
        })
    }


    render() {

        const { list } = this.state
        console.log('hello App Component')
        return(
            <>
                {gogo()}
                <Comment>
                    <CommentForm addList={this.addList} />
                    <CommentList list={list} updateList={this.updateList} />
                </Comment>
            </>
        )
    }
}

function gogo() {
    console.log('랜더 gogo')
}

export default App;