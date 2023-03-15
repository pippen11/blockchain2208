// 정규 표현식 : /pattern/flags
// 정규식은 대소문자를 구분한다.
// 정규표현식 패턴 안에 공백, 탭, 개행(Enter)도 적용된다.
// 패턴에 특수문자를 넣을 시 \ 를 이용

const re = /world/
const source = 'Hello world Hello world'

// 있는지 없는지 검사
const result = re.test(source)  // return 값이 true, false
console.log(result)

// 최초로 등장하는 index값 반환
const getIdx = source.search(/world/)
console.log(getIdx)

// 'world'를 'ingoo'로 replace
// 첫번째 'world'만 replace
const replace1 = source.replace(/world/, 'ingoo')
console.log(replace1)

// 모든 'world'를 'ingoo'로 replace
const replace2 = source.replace(/world/g, 'ingoo')
console.log(replace2)


const start = /^who/  // 줄(line)의 시작에서 일치
const end = /who$/  // 줄(line)의 끝에서 일치
const find = /^who$/
const text = 'who is who'

const result2 = text.replace(start, 'ingoo')
console.log(result2)

const result3 = text.replace(end, 'ingoo')
console.log(result3)

const result4 = text.replace(find, 'ingoo')
console.log(result4)

// . 은 임의의 한 문자와 일치
const random = text.replace(/./, 'ingoo')
console.log(random)

// /[ohw]/ : 대괄호는 한 문자를 의미 == o 또는 h 또는 w
// 대괄호가 없는 /ohw/ 는 ohw 단어를 의미
const letter = text.replace(/[ohw]/g, '@')
console.log(letter)

// ^가 대괄호 안에 있을 때는 not의 의미
const notInit = /[^who]/g
const source2 = 'who 0 is 0 who'
const result5 = source2.replace(notInit, '@')
console.log(result5)

// + : 계속 찾아나가겠다는 의미
const emailChk = /^[a-zA-Z0-9-_]+@[\w]+\.[\w]{2,4}$/g
const email = 'web-7722@gmail.com'
const eChecked = emailChk.test(email)
console.log(eChecked)

const mobileChk = /^[\d]{3}-[\d]{4}-[\d]{4}$/g
const mobile = '010-1234-1234'
const mChecked = mobileChk.test(mobile)
console.log(mChecked)