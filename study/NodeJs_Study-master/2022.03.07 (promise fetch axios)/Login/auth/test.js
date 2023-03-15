const fn = (num) => {
    // 함수 안에 비동기 코드가 들어갈 경우
    setTimeout(()=>{
        return num + 1
    }, 0)
}

console.log(fn(1))
// output : undefined


const pr = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(1)
    }, 0)
})

pr.then((data) => {
    console.log(data+1)
})
// output : 2

async function test() {
    const data = await pr
    console.log(data)
}
test()
// output : 1

