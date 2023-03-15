// Promise는 객체(Object)

// promise 객체는 인자값으로 콜백함수를 받는다.
// 콜백함수의 인자값으로는 resolve와 reject가 들어간다.
const pr = new Promise((resolve, reject)=>{  // 매개변수 2개, resolve = 성공, reject = 실패
    // ...code
    // 끝나는 시점을 resolve 함수에다가 내용을 넣는다. 인자값으로.
    // 끝나는 시점을 혹시 에러가 났니? reject 함수에다가 실패에 대한 내용을 적습니다.
    resolve(1) 
})

// pr로부터 1이라는 값을 꺼내올려면 어떻게 해야하나요?
// resolve() 함수 안에 있는 값들은 then이라는 메소드 안에 담긴다.

pr.then((data)=>{
    console.log(data)
})

const fn = (num) => {
    // code 안에서.. 비동기 코드가 들어갈 경우...
    setTimeout(()=>{
        return num + 1
    },0)
}
console.log(fn(1))
// 함수 안에서 비동기 코드가 들어갈 경우
// 함수를 호출해서 비동기의 결과물을 얻을 수가 없다.
// 이를 해결하기 위해 나온게 promise 
// promise 객체 안에는 return이 없다.

const pr2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(1)
    }, 0)
})

pr2.then((data)=>{
    console.log(data+1)
})
// promise 객체는 resolve의 내용을 then의 속성값으로 담아놓았다.

// promise는 백그라운드에 들어가는 코드를 컨트롤하기 위한 객체이다.


function ajax() {
    const data = JSON.stringify({userid: 'admin'})
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/idcheck', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(data)

    let result

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            try {
                result = xhr.response
            } catch (err) {

            }
        }
    }
    return result
}
console.log(ajax())



// promise
const ajax2 = new Promise((resolve, reject) => {
    const data = JSON.stringify({userid: 'admin'})
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/idcheck', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(data)

    let result

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            try {
                // 성공
                resolve(xhr.response)
            } catch (err) {
                // 실패
                reject('실패함...')
            }
        }
    }
})

ajax2.then(data=>{
    console.log(data)
})

// let response

function test() {
    let response
    ajax2.then(data=>{
        console.log(data)
        response = data
    })
    return response
}
console.log('res : ', test())



// async가 붙은 함수는 프로미스 객체를 return 한다. 
// return의 결과값은 resolve가 된다.

