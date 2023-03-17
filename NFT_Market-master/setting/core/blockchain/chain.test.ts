import { Chain } from './chain'

describe('Chain 함수체크', () => {
    let node: Chain = new Chain()
    let node2: Chain = new Chain()
    const length = 12

    beforeEach(() => {
        // node = new Chain()
        // node2 = new Chain()
    })

    it('addBlock 함수 체크', () => {
        for (let i = 1; i <= length; i++) {
            node.addBlock([`Block #${i}`])
        }

        expect(node.getLength()).toEqual(13)
    })

    it('isValidChain 함수 체크', () => {
        const isVaildChain = node.isValidChain(node.getChain())
        expect(isVaildChain.isError).toBe(false)
    })

    it('replaceChain 함수 체크', () => {
        const replace = node2.replaceChain(node.getChain())

        expect(replace.isError).toBe(false)
    })
})
