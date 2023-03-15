const arr = [true, false, true, false]

let idx = []

const newArr = arr.forEach((v, k)=>{
    if (v === true) {
        idx.push(k)
    }
})

console.log(idx)