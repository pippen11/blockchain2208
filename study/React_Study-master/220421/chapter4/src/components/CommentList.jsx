import React, {Component} from 'react'

class CommentList extends Component {

    state = {
        value: '',
        update: null
    }

    /* 
        CommentList에서 상태를 만들었다면,,
        data를 뿌리는 것은 엄청 쉽다.

        하지만 CommentForm과 같이 생각을 해봐야한다.

        부모 컴포넌트인 Comment 컴포넌트에서 상태를 만들줘야 한다.
        현재는 children을 사용하고 있기 때문에 props를 전달해야 하는 이슈가 있어서 최상위 컴포넌트인 App에서 상태를 만들어 주었다.
    */

    // 1. span 클릭시 안에 들어가 있는 내용 뽑아오기.
        // span onclick 시 event 매개변수에서 e.target.innerHTML (클릭시 내용 정보 가져오기)
        // 클릭했을 시 CommentList의 정보를 상태에 저장한다.

    handleClick = k => e => {
        console.log(e.target.innerHTML, k)
        this.setState({
            ...this.state,
            value: e.target.innerHTML,
            update: k
        })

    }

    // handleClick = (k) => {
    //     const eventClick = e => {
    //         console.log(k)
    //         console.log(e)
    //     }

    //     return eventClick
    // }

    updateChange = e => {
        const {value} = {...e.target}
        // axios

        this.setState({
            ...this.state,
            value
        })
    }

    updateKeyDown = k => e => {
        console.log(e.key)
        if (e.key !== 'Enter') return

        const { updateList, list } = this.props
        // list
        const newList = [...list]
        newList[k].content = this.state.value
        this.setState({
            ...this.state,
            update: null
        })

        updateList(list)
    }

    deleteClick = key => {
        console.log(key)
        const { updateList, list } = this.props
        // axios

        const newList = [...list].filter( (v,k) => {
            return key !== k
        } )

        updateList(newList)
    }

    item = () => { 
        return (
            this.props.list.map( (v,k) => {
                return (
                    <ul className='comment-row' key={k}>
                        <li className='comment-id'>{v.userid}</li>
                        <li className='comment-content'>
                            {
                                this.state.update === k
                                ? <input 
                                    type='text' 
                                    value={this.state.value}
                                    onChange={this.updateChange}
                                    onKeyDown={ this.updateKeyDown(k) }
                                    placeholder='댓글을 입력해주세요'
                                    className='comment-update-input'                    
                                />
                                : (
                                    <>
                                    <span onClick={ this.handleClick(k) }>{v.content}</span>
                                    <span className='comment-delete-btn' onClick={ () => this.deleteClick(k) }> X </span>
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
                {this.item()}
            </li>
        )
    }
}

export default CommentList;