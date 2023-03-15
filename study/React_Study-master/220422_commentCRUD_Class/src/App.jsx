import React, {Component} from 'react' 
import Comment from './components/Comment.jsx'
import CommentForm from './components/CommentForm.jsx'
import CommentList from './components/CommentList.jsx'

class App extends Component {

    state = {
        list: []
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            list: [
                {userid: 'bitkunst', content: '안녕1', date: '2022-04-22'},
                {userid: 'bitkunst', content: '안녕2', date: '2022-04-22'}
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
        const {list} = this.state

        return(
            <Comment>
                <CommentForm addList={this.addList} />
                <CommentList list={list} updateList={this.updateList} />
            </Comment>
        )
    }
}

export default App;