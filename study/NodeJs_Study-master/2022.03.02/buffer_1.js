// 컴퓨터는 손가락이 몇개일까요?? 2개 -> 모든 데이터를 0과 1로 표현한다. 전압이 있을때는 1, 없을 때는 0
// A라는 값은 어떻게 표현이 될까? A라는 값은 몇 바이트인가요? -> 1바이트 
// 1바이트는 8비트, 
// 8비트는 256가지의 데이터를 표현가능
// a~zA~Z ... 0~9 -> 아스키코드
// 1니블은 4비트, 8비트는 2니블, 
// 4비트는 16가지의 데이터를 표현가능, 1니블을 16진수로 표현가능
// 1바이트의 내용을 2니블, 16진수 두자리로 표현가능
// ingoo를 16진수로 표현한다면? -> 69 6e 67 6f 6f

const name = 'ingoo'
const buf = Buffer.from(name)
// ingoo 라는 텍스트를 저장하기 위해 5byte를 사용하고 있고 
// 실제로 컴퓨터가 저장을 한 형태를 담는 공간을 buffer라고 볼 수 있다. 
// 컴퓨터가 저장하는 형태를 16진수로 표현하는 것을 buffer라고 한다. (28분)
console.log(typeof(buf))
console.log(buf)
// Chrome V8 엔진으로 빌드된 javascript 런타임
// javascript로 컴퓨터를 조작하고 싶어서 나온 것이 Node.js
// 데이터라는 텍스트, 이미지들을 관리할 수 있어야 한다. 
// byte, bit 이런 것들을 컨트롤 할 수 있어야 합니다.
// 컨트롤 하기 위해서 buffer라는 것을 사용하는 것이다.
// 브라우저에서 사용하는 javascript에는 buffer가 없다.

// 인코딩
// 무슨무슨 진수로 변환하는 행위
// 첫번째 인자값은 내가 버퍼로 값을 변환할 값들
// 두번째 인자값은 내가 
// 64진수까지 변환 가능
const base64 = Buffer.from(name, 'base64')
console.log(base64)

// 디코딩 
// 원래의 값으로 복귀하는 행위
console.log(buf.toString()) 


// string은 utf-8 형태로,,,(41분)
// 글자셋 (character-set)
// 일반적으로 사용하는 string 데이터는 utf-8이라는 내용으로 데이터를 메모리에 저장
const a = '10'
console.log( Buffer.from(a) )
console.log( Buffer.from(a, 'utf-8') )







