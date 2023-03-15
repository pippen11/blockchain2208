import React, {Component} from 'react'
import GuguForm from './GuguForm.jsx'
import GuguList from './GuguList.jsx'



class GuguClass extends Component {

    state = {
        value: null
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.gugu.value === '') return 
        this.setState({
            ...this.state,
            value: parseInt(e.target.gugu.value)
        })

        e.target.gugu.value = ''
    }

    render() {
        return(
            <>
                <GuguForm 
                    onSubmit={this.handleSubmit}
                />
                <GuguList 
                    value={this.state.value}
                />
            </>
        )
    }
}

export default GuguClass;