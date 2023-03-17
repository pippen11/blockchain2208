import { Chain } from '@core/blockchain/chain'
import { Wallet } from '@core/wallet/wallet'

describe('Chain 함수체크', () => {
    let node: Chain = new Chain() // [GENESIS]

    it('getChain() 함수 체크', () => {
        // console.log(node.getChian())
    })

    it('getLength() 함수 체크', () => {
        // console.log(node.getLength())
    })

    it('getLatestBlock() 함수 체크', () => {
        // console.log(node.getLatestBlock())
    })

    it('addBlock 함수체크', () => {
        // for (let i = 1; i <= 10; i++) {
        //     // 현높이가 2 블럭을가지고오고 , 3블럭을 만들때
        //     node.miningBlock('1d2395f79ba164d2ab2235835b42248fd618b1ff')
        // }
        node.miningBlock('1d2395f79ba164d2ab2235835b42248fd618b1ff')
        node.miningBlock('1d2395f79ba164d2ab2235835b42248fd618b1ff')
        node.miningBlock('1d2395f79ba164d2ab2235835b42248fd618b1ff')
        node.miningBlock('b38f474c08e92cdaf8adc058ae6eddb294b6ca60')
        node.miningBlock('b38f474c08e92cdaf8adc058ae6eddb294b6ca60')
        node.miningBlock('b38f474c08e92cdaf8adc058ae6eddb294b6ca60')
        // console.log(node.getChain())
        console.log(node.getUnspentTxOuts())
        // console.log(node.getLatestBlock().data[0].txIns)
        console.log(
            'b38f474c08e92cdaf8adc058ae6eddb294b6ca60 총금액 : ',
            Wallet.getBalacne('b38f474c08e92cdaf8adc058ae6eddb294b6ca60', node.getUnspentTxOuts()),
        )
    })
})
