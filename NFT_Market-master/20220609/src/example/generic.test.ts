import { SHA256 } from 'crypto-js'
import { Output, Input } from './generic'

describe('Class Output 검증', () => {
    let output: Output
    let input: Input

    it('Output 인스턴스 생성 확인', () => {
        output = new Output('7722', 10)
        console.log(output)
    })

    it('Input 인스턴스 생성 확인', () => {
        input = new Input(output)
        console.log(input)
    })

    it('txToString() 구현', () => {
        //txToString(data):string
        function txToString<T>(_data: T) {
            const result = Object.entries(_data)
            const a = result.map((v) => {
                return v.join('')
            })
            return a.join('')
        }

        const inputResult = txToString<Input>(input)
        console.log(inputResult)

        const outputResult = txToString<Output>(output)
        console.log(outputResult)

        SHA256(inputResult + outputResult).toString()
    })
})

/*
    // Input  <T>
    // Output 
    
*/
