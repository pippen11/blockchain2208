// function fibo(n) {
//     if (n==1) return 1
//     if (n==2) return 1

//     return fibo(n-1) + fibo(n-2)
// }

// console.log( fibo(6) )
// n값이 2 또는 1이 될 때까지 계속해서 함수가 돌아가는 구조이다.
// 비효율적 <= 콜스택에 엄청나게 많은 함수들이 쌓이게 된다.
// 반복되는 부분은 함수를 호출해서 쓰지 않고 변수에 저장해 두었다가 꺼내쓰는 방식으로 계산할 수 있다.

// 한번 계산했던 결과는 메모리에 저장해 놓으 후
// 같은 결과를 얻고 싶을 때 가져다 쓰는 기법이 메모이제이션 기법
let memo = {}
function fibo(n) {
    let result;

    if (n in memo) {
        result = memo[n]
    } else {
        if (n == 1 || n == 2) {
            result = 1
        } else {
            result = fibo(n-1) + fibo(n-2)
        }

        memo[n] = result
    }

    return result
}

console.log( fibo(100) )