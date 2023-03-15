let arr = [1, 2, 3]

// 첫번째 인자값으로는 인덱스값
// 두번째 인자값으로는 첫번째 인자값으로 받은 인덱스에서부터 몇개를 삭제할 것인가
console.log(arr)

let arr2 = [...arr]

let index = arr.indexOf(1)
arr2.splice(index, 1)
console.log(arr2)