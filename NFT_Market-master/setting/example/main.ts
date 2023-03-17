import hexToBinary from 'hex-to-binary'
import SHA256 from 'crypto-js/sha256'

function hexToBinary2(_hex: string): string {
    let ret: string = ''
    const lookupTable: any = {
        '0': '0000',
        '1': '0001',
        '2': '0010',
        '3': '0011',
        '4': '0100',
        '5': '0101',
        '6': '0110',
        '7': '0111',
        '8': '1000',
        '9': '1001',
        a: '1010',
        b: '1011',
        c: '1100',
        d: '1101',
        e: '1110',
        f: '1111',
    }

    for (let i: number = 0; i < _hex.length; i++) {
        const point = _hex[i]
        if (lookupTable[point]) {
            ret += lookupTable[point]
        }
    }

    return ret
}

const hash: string = SHA256('ingoo').toString() // 16진수
const binary = hexToBinary(hash)
const binary2 = hexToBinary2(hash)

console.log(binary === binary2)
