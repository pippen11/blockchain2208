const defaultValue = {
    userid: 'web7722',
    password: '1234'
}

// input: {
//     userid: {
//         value: defaultValue.userid,
//         onChange
//     },
//     password: {
//         value: defaultValue.password,
//         onChange
//     }
// }

/*
    {
        userid: {},
        password: {}
    }
*/

// 1. defaultValue 객체에서 key만 가져오기 
// Object.keys() 메소드 사용 : key값만 뽑아와서 배열에 담아준다.
console.log(Object.keys(defaultValue))  // ['userid', 'password']

const input = {}
const keys = Object.keys(defaultValue)
for (let i=0; i<keys.length; i++) {
    // console.log(keys[i])
    input[keys[i]] = {
        value: defaultValue[keys[i]]
    }
}
console.log(input)

// reduce array 함수
// 매개변수 2개
// 1. 콜백
    // 콜백함수 안의 매개변수 2개
    // 1. 이전값 (누적)
    // 2. 현재값
// 2. 초기값  // 초기값을 넣어주지 않으면 최초의 acc값이 null
// keys.reduce((acc, v)=>{
//     console.log(acc, v)
//     return v+'1'
// })

// return 값이 다음번 순회의 acc값으로 들어간다.
// reduce 함수의 반환값이 acc에 할당, acc는 순회중 유지 => 최종적으로 하나의 값을 return

const result = keys.reduce((acc, v)=>{  // ['userid', 'password']
    console.log(acc, v)
    acc[v] = { value: defaultValue[v] }
    return acc
}, {})
console.log(result)

const str = keys.reduce((acc, v)=>{
    return acc+v
}, '')
console.log(str)

const number = [1,2,3 ,4,5,6,7,8,9,10].reduce((acc,v)=>{
    return acc+v
    // 1. acc: 0, v: 1
    // 2. acc: 1, v: 2
    // 3. acc: 3, v: 3
}, 0)
console.log(number)

const posts = [
    {id: 1, category: "frontend", title: "All About That Sass"},
    {id: 2, category: "backend", title: "Beam me up, Scotty: Apache Beam tips"},
    {id: 3, category: "frontend", title: "Sanitizing HTML: Going antibactirial on XSS attacks"}
]


const data = posts.reduce( (acc,v) => [ ...acc, Object.values(v) ], [ Object.keys(posts[0]) ])
console.log(data)
