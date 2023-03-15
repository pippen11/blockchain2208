const arr = [1, 2, 3, 4, 5]

// arr 배열 안에서 3을 찾고 싶은 경우가 있다.
// 1, 2, 3, 4, 5에서 2의 배수값이 있는지 없는지 찾고 싶을 때,,


arr.some(v => v%2)
// callback 으로 처리가 된다.
// return 값은 무조건 bool type
// forEach : return 값 없다.
// filter : return 값 array
// map : return 값 array
// some : return 값 boolean

const result = arr.some(v => v === 6)
console.log(result)

arr.some(v => {
    // 값이 있는지 && 첫번째 값과 두번째 값이 같은지 && 첫번째 값과 세번째 값이 같은지 // true 
    return
})