const posts = [
    {id: 1, category: "frontend", title: "All About That Sass"},
    {id: 2, category: "backend", title: "Beam me up, Scotty: Apache Beam tips"},
    {id: 3, category: "frontend", title: "Sanitizing HTML: Going antibactirial on XSS attacks"}
]

const acc = Object.keys(posts[0])
// console.log(acc)

const data = posts.reduce((acc,v)=>{
    return [...acc, Object.values(v)]
}, [acc])
// console.log(data)

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const mapReduce = arr.reduce((acc,v)=>{
    // acc.push(v*2)
    let newArr = [...acc, v*2]
    return newArr
},[])
console.log(mapReduce)

const filterReduce = arr.reduce((acc,v)=>{
    let newArr = [...acc]
    if (v%2 == 0) {
        newArr.push(v)
    }
    return newArr
},[])
console.log(filterReduce)

const obj = ['userid', 'userpw', 'name']
const result = obj.reduce((acc,v,idx)=>{
    acc[v] = idx
    return acc
}, {})
console.log(result)
