/*
 * some 함수는 인자값에 number만 넣는다.
 * 무저건 5를찾는 함수이다.
 * 만약
 * 맞을경우는 5가 맞습니다! 라는 내용을 console.log를 찍고
 * 틀릴경우 ${인자값} 출력이후 false도 반환하고싶다.
 */

function some(num: number): Failable<string, string> {
    if (num !== 5) return { isError: true, error: `${num} 이 아닙니다.` }
    return { isError: false, value: `잘 맞추셨습니다.` }
}

const result = some(5)

const msg = result.isError ? result.error : result.value
console.log(msg)
