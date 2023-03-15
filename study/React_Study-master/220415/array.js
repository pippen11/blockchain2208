const arr = [1, 2, 3]
const newArr = arr.concat([4, 5, 6])
console.log('concat : ', newArr)

const newArr2 = arr.push([4, 5, 6])
console.log('push return : ', newArr2)
console.log('push : ', arr)

console.log('******************************************************************')

// slice() 메소드는 시작부터 끝까지의 복사본을 새로운 배열 객체로 반환한다. 즉, 원본 배열은 수정되지 않는다.
const sArr = [1, 2, 3, 4, 5]
const new_sArr = sArr.slice(1, 3)
console.log('new slice : ', new_sArr)
console.log('sArr : ', sArr)

// splice() 메소드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다. 이 메소드는 원본 배열 자체를 수정한다.
// 반환값: 제거한 요소를 담은 배열.
const spArr = [1, 2, 3, 4, 5]
const new_spArr = spArr.splice(1, 3)
console.log('new splice : ', new_spArr)
console.log('spArr : ', spArr)

console.log('*******************************************************************')

const mapArr = [1, 2, 3, 4, 5]
mapArr.map((v,k) => {
    v*2
    console.log('value : ', v)
    console.log('key : ', k)
})

