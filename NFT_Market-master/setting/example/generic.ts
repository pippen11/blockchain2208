/*
function log(data:string){
    console.log(data)
}

log('aaa')
log({a:'helloworld!'})
*/

import SHA256 from 'crypto-js/sha256'

class Output {
    [address: string]: number

    constructor(_address: string, _amount: number) {
        this[_address] = _amount
    }
}

class Input {
    public signature: string

    constructor(_output: Output) {
        this.signature = Input.sum(_output)
    }

    static sum(_output: Output): string {
        const [values] = Object.entries(_output)
        return values.join('')
    }
}

const output: Output[] = []
output.push(new Output('ingoo', 1000), new Output('web7722', 2000))
console.log(output)

const input: Input[] = []
input.push(new Input(output[0]))

console.log(output, input)

function txToString<T>(_data: T[]): string {
    return _data.reduce((acc: string, item: T) => {
        const [[key, value]] = Object.entries(item)
        acc += key + value.toString()
        return acc
    }, '')
}

function tx<T>(_data: T): string {
    const [[key, value]] = Object.entries(_data)
    return key + value
}

console.log(SHA256(txToString(output) + txToString(input)).toString())
