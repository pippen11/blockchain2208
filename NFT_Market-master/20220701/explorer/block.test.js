const Web3 = require('web3')

describe('Block', () => {
    let web3

    it('web3 연결 테스트', async () => {
        web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9000'))

        const block_number = await web3.eth.getBlockNumber()
        console.log(block_number)

        for (let i = 1; i <= block_number; i++) {
            const block = await web3.eth.getBlock(i, true)
            // console.log(block)
            for (let j = 0; j < block.transactions.length; j++) {
                // console.log(block.transactions[j])
            }
        }

        console.log(await web3.eth.getBlock(239, true))
        // 0x780b714ebbeaba20984570048b00ef275421d11d9a68f0492e4c13bc5a084ba0
        // 0x003c3fb03ad69acb0a60d89d323903705d87524e856b54f7aec5f35f7bdda5e2
    })

    // getTransactionRecipt()
    // getTransaction()

    it('getTransaction', async () => {
        const tx = await web3.eth.getTransaction('0x003c3fb03ad69acb0a60d89d323903705d87524e856b54f7aec5f35f7bdda5e2')
        console.log('tx : ', tx)
    })
    it('getTrasnactionRecipt', async () => {
        const tx = await web3.eth.getTransactionReceipt(
            '0x003c3fb03ad69acb0a60d89d323903705d87524e856b54f7aec5f35f7bdda5e2',
        )
        console.log('tx Recipt : ', tx)
    })
})
