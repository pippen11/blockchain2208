
let cookieText = 'name=123; name2=123; name3=1234; name4=12345; name5=2'
// console.log(cookieText)

let cookieArr = cookieText.split(';')
// console.log(cookieArr)


// let cookie = cookieText.split(';').map(v=>v.trim())
let newCookieArr = []
for (let i=0; i<cookieArr.length; i++) {
    newCookieArr.push(cookieArr[i].trim())
}
// console.log(newCookieArr)

let cookie = {}
for (let i=0; i<newCookieArr.length; i++) {
    let item = newCookieArr[i].split('=')
    // console.log(item)
    let key = item[0]
    let value = item[1]
    let obj = { [key]: value }  // [key] : 안에 있는 key를 변수로 인식하게끔 하기위한 문법
    // console.log(obj)  

    cookie = {
        ...cookie,  // 이전 값
        ...obj  // 추가할 값
    }
}
// string -> array -> array -> object


// console.log(cookie)
// console.log(cookie.name)
// console.log(cookie.name2)
// console.log(cookie.name3)
// console.log(cookie.name4)
// console.log(cookie.name5)

// 숏코딩
let cookie2 = cookieText.split(';')
                .map(v=>v.trim())
                .map(v=>v.split('='))
                .reduce( (acc, [k,v])=>{
                    acc[k] = v;
                    return acc
                }, {})
// console.log(cookie2)


// cookie-parser 함수
function cookieParser(cookieText) {
    
    let cookieArr = cookieText.split(';')
    let newCookieArr = []
    for (let i=0; i<cookieArr.length; i++) {
        newCookieArr.push(cookieArr[i].trim())
    }

    let cookie = {}
    for (let i=0; i<newCookieArr.length; i++) {
        let item = newCookieArr[i].split('=')
        let key = item[0]
        let value = item[1]
        let obj = { [key]: value }

        cookie = {
            ...cookie,  // 이전 값
            ...obj  // 추가할 값
        }
    }

    return cookie

}

module.exports = {
    cookieParser
}