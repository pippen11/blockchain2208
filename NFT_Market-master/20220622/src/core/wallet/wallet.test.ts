import { randomBytes, sign } from 'crypto'
import { SHA256 } from 'crypto-js'
import elliptic from 'elliptic'

const ec = new elliptic.ec('secp256k1')
// elliptic
// 저알고리즘을 결과를 리턴해주는 라이브러리가 있지않을까 ?

// 비트코인
// 이더리움
describe('지갑이해하기', () => {
    let privKey: string, pubKey: string
    let signature: elliptic.ec.Signature
    it('비밀키 (privKey', () => {
        privKey = randomBytes(32).toString('hex')
        console.log(privKey.length)
    })

    it('공개키 생성하기', () => {
        const keyPair = ec.keyFromPrivate(privKey)
        pubKey = keyPair.getPublic().encode('hex', true)

        console.log(pubKey)
    })

    it('디지털 서명', () => {
        // 서명을 만들떄 필요한값
        // 개인키, 해쉬값 (transaction hash)
        const keyPair = ec.keyFromPrivate(privKey)
        const hash = SHA256('ingoo').toString()

        signature = keyPair.sign(hash, 'hex')
    })

    it('검증 (verify)', () => {
        // 서명, hash, 공개키
        const hash = SHA256('ingoo').toString()
        const pubKey2 = '03a5e787d62eb4a04af33cf2b76b70f8224ed623e4d41ce8f81cd1452c38a95f2c'
        const verify = ec.verify(hash, signature, ec.keyFromPublic(pubKey2, 'hex'))
        console.log(verify)
    })

    it('계정만들기', () => {
        const buffer = Buffer.from(pubKey)
        const address = buffer.slice(24).toString()
        console.log(address.length)
    })
})

// npx jest ./src/core/wallet
