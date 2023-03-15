import React, {Component} from 'react'

class CommentList extends Component {

    state = {
        value: '',
        update: null
    }

    deleteClick = key => _ => {
        const {updateList, list} = this.props

        const newList = [...list].filter((_,k) => {
            return key !== k
        })

        updateList(newList)
    }

    updateKeyDown = k => e => {
        if (e.key !== 'Enter') return

        const {updateList, list} = this.props

        const newList = [...list]
        newList[k].content = this.state.value
        this.setState({
            ...this.state,
            update: null
        })
        
        updateList(list)
    }

    updateChange = (e) => {
        const {value} ={...e.target}
        this.setState({
            ...this.state,
            value
        })
    }
 
    handleClick = k => e => {
        this.setState({
            ...this.state,
            value: e.target.innerHTML,
            update: k
        })    
    }

    items = () => {
        return(
            this.props.list.map((v,k) => {
                return(
                    <ul className='comment-row' key={k}>
                        <li className='comment-id'>{v.userid}</li>
                        <li className='comment-content'>
                            {
                                this.state.update === k
                                ? <input 
                                    type='text'
                                    value={this.state.value}
                                    onChange={this.updateChange}
                                    onKeyDown={this.updateKeyDown(k)}
                                    className='comment-update-input'
                                />
                                : (
                                    <>
                                        <span onClick={this.handleClick(k)}>{v.content}</span>
                                        <span className='comment-delete-btn' onClick={this.deleteClick(k)}> X </span>
                                    </>
                                )
                            }
                        </li>
                        <li className='comment-date'>{v.date}</li>
                    </ul>
                )
            })
        )
    }

    render() {
        return(
            <li>
                {this.items()}
            </li>
        )
    }
}

export default CommentList;