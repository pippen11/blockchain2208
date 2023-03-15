
let a = [1, 2, 3] // a 배열 중에서 원소가 2인 값만 가져와서 출력하고 싶습니다.
let filtered = a.filter(v => v === 2)
console.log(filtered)

// user.forEach()
// // for문과 같다
// 배열은 반복할 일이 많은데 그때마다 for문을 작성하는 것은 비효율적이다.
// 그래서 나온 것이 forEach() 메소드
// 배열에서 사용 가능한 메소드이다.

// forEach()  :  인자값으로 콜백함수를 받는다.
// 배열을 반복할 때마다 콜백함수를 실행, 
// 이 때 배열의 원소들을 콜백함수의 인자값으로 전달
// forEach() 메소드는 리턴값이 없다.
a.forEach(v => console.log(v))
a.forEach(v => {
    if (v === 2) {
        console.log(v)
    }
})

// filter <- forEach 와 똑같은 방식으로 진행됨
// 배열을 반복하는데 항상 똑같은 행위가 많더라..
// 배열중에서 값을 찾는 행위
// 배열 안에서 데이터를 뽑는 기능만을 구현한 것이 filter() 메소드
// filter() 메소드는 리턴값이 있다.
// filter() 는 불리언 값을 리턴한다.
function aa(value) {
    if (value == 1 || value == 2) {
        return true
    } else {
        return false
    }
}

// 데이터를 걸러내는 작업을 할 때만 사용하는게 filter()입니다.
// 값을 걸러내는 것만 가능할 뿐 값의 변경은 불가능하다.
let arr = a.filter(aa) 
// 배열을 반환하는데 [true 값에 대한 원소만 반환합니다.]
console.log(arr)


// filter가 값을 걸러내는 거라면 map은 모든 원소를 변경할 때 사용한다.
// 모든 원소의 내용을 바꿀 때 사용
// forEach()와 같은 방식으로 진행된다.
// map() 메소드는 리턴값이 존재
function bb(value) {
    return value + 1
}
let arr2 = a.map(bb)
// map() 메소드 역시 filter와 마찬가지로 배열을 반환해준다.
console.log(arr2)


// 값을 걸러낸 후 변경하고 싶다면 filter와 map을 같이 사용해야 한다.
function aaa(value) {
    return value%2 == 0
}

function bbb(value) {
    return value*2
}

let result = a.filter(aaa)
              .map(bbb)
console.log(result)

let rst = a.filter(v => v%2==0).map(v => v*2)
console.log(rst)

// reduce
let a1 = [1, 2, 3]
// filter -> 내용을 뽑아오기 위해서
// map -> 모든 원소의 내용을 변경하기 위해서
// reduce ?

let result1 = 0;
for(let i=0; i<a.length; i++) {
    result1 += a[i]
}
console.log(result1)
// 위와 같은 코드를 짤 때 reduce() 메소드를 사용한다.
// filter와 map 은 반환값이 전부 배열이다.
// 전역변수에 내용을 넣거나 데이터타입이 변하는 경우,,
// reduce() 는 전역변수를 세팅할 수 있다.

// reduce는 기본적으로 인자값이 
// acc => previousValue
// value => currentValue
// a1.reduce(previousValue, currentValue, currentIndex, data)
// 이전값, 현재값, 현재인덱스값, 초기데이터값

// 반복 , 배열의 갯수가 총 3개면 2번만 반복함. length-1
function aa1(이전값, 현재값, 현재인덱스값, 초기데이터값) {
    console.log(이전값)
    console.log(현재값)
    return 1  // 두번째 반복부터는 return값을 "이전값"에 넣어준다.
}
a1.reduce(aa1)
// 이러한 구조의 반복을 활용하면 무궁무진하게 많은 것들을 만들 수 있다.
// reduce를 사용하는 사장 대표적인 사례가 모든 원소의 값을 더할 때이다.

console.log('------------------')
function aa2(이전값, 현재값, 현재인덱스값, 초기데이터값) {
    console.log(이전값)
    console.log(현재값)
    return 이전값 + 현재값  // 두번째 반복부터는 return값을 "이전값"에 넣어준다.
}
a1.reduce(aa2)

console.log('------------------')
// reduce가 최종적으로 반환하는 리턴값은 "이전값"이다.
function aa3(이전값, 현재값, 현재인덱스값, 초기데이터값) {
    return 이전값 + 현재값  // 두번째 반복부터는 return값을 "이전값"에 넣어준다.
}
console.log(a1.reduce(aa3, 0))

// reduce는 콜백을 제외한 인자값도 들어갈 수 있다. 초기이전값
// 초기값이 없을 경우 첫번째 원소를 이전값에 넣고 반복을 돌리기 때문에 lengh-1번 반복
// 초기값이 있을 경우 이전값에 초기값이 들어가기 때문에 length 만큼 반복을 돈다
console.log('-------------------')
function aa4(이전값, 현재값, 현재인덱스값, 초기데이터값) {
    이전값['name'+현재값] = 현재값
    return 이전값  // 두번째 반복부터는 return값을 "이전값"에 넣어준다.
}
console.log(a1.reduce(aa4, {}))

console.log('-------------------')
// 객체 안에서 속성값에 [] 배열처럼 감싸버리면 코드를 실행해버립니다.
let name = 'ingoo'
let num = 1
let obj = {
    [name + num]: 0
}
console.log(obj)
