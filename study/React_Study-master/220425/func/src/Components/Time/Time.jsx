import React, {useEffect, useState} from 'react'

const Time = () => {

    const [list, setList] = useState([])
    const [flag,setFlag] = useState(true)

    
    // let i = 0
    // setInterval(()=>{
        // setList([
        //     ...list,
        //     lists[i]
        // ])
        // i++
    //     console.log(list)
    // }, 1000)
    console.log('asdfasdfasdf')

    // useEffect(()=>{
    

    //     const init = () => {
    //         setFlag(false)
    //         let i = 0;
    //         setInterval(()=>{
    //             setList(v=>[...v,lists[i]])
    //             i++
    //         },1000)
    //     }

    //     if (flag) init()


    //     console.log(`aa : hello world!`)
    // })

    useEffect(()=>{
        const lists = [
            {user: 'ingoo'},
            {user: 'ingoo2'},
            {user: 'ingoo3'},
            {user: 'ingoo4'},
            {user: 'ingoo5'},
        ]

        let i = 0;
        setInterval(()=>{
            setList(v=>[...v,lists[i]])
            i++

        },1000)

        
    },[]) // === componentDidMount



    return(
        <div>

        </div>
    )   
}

export default Time;