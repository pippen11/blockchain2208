const Web3 = require('web3')
const ethTx = require('ethereumjs-tx').Transaction

describe('web3 테스트코드', () => {
    let web3
    let accounts

    let sender
    let received

    it('web3 연결테스트', () => {
        web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
    })

    // 최신블럭의 number 가져오기
    it('Latest Block 높이 가져오기', async () => {
        const latestBlock = await web3.eth.getBlockNumber()
    })

    it('전체 accounts 가져오기', async () => {
        accounts = await web3.eth.getAccounts()
        sender = accounts[0]
        received = accounts[1]
        console.log(accounts)
    })

    it('첫번째 계정 밸런스 가져오기', async () => {
        const balance = await web3.eth.getBalance(accounts[0])
        console.log(balance) // wei 단위로 ehter 를 표현했다.
        console.log('ETH : ', balance / 10 ** 18)

        // 이더리움의 단위 ETH 10 ** 18
    })

    it('ETH 단위 변경해보기', () => {
        // eth
        // gwei
        // wei
        console.log(web3.utils.toWei('1', 'gwei'))
        console.log(web3.utils.toWei('1', 'ether'))
    })

    it('트랜잭션 횟수 구해오기', async () => {
        const txCount = await web3.eth.getTransactionCount(sender)
        console.log(txCount) // 0 -> hex

        console.log(web3.utils.toHex(txCount))
    })

    it('트랜잭션 실행하기', async () => {
        const txCount = await web3.eth.getTransactionCount(sender)
        const privateKey = Buffer.from('1eff9e05b6a3c66cc5803464c59e8e44607f59440615bdb4705e7e2049e59075', 'hex')
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            from: sender,
            to: received,
            value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
            // 10 ** 18 -> toHex
            gasLimit: web3.utils.toHex(6721975), // 아반떼 연료통이 55L
            gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')), // 1L 당 = 2,000
            data: web3.utils.toHex(''),
        }
        const tx = new ethTx(txObject)
        tx.sign(privateKey)
        console.log(tx)
        const serializedTx = tx.serialize()
        const TransactionObject = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        console.log(TransactionObject)
    })

    it('Balance 확인', async () => {
        const Senderbalance = await web3.eth.getBalance(sender)
        const Receivedbalance = await web3.eth.getBalance(received)

        console.log('sender balance : ', Senderbalance / 10 ** 18)
        console.log('Received balance : ', Receivedbalance / 10 ** 18)
    })

    it('가스 사용량 확인하기', async () => {
        // 가스사용량 21004
        // 21000 + 4
        // 가스사용량 21004 // 아반떼에 기름을 얼마나 넣을거니? 10L
        // 가스가격 1 = 1gwei // 1L = 2000
        // 가스최대치 6721975 // 아반떼 총 넣을수있는 기름통 크기가 55L
        // 1 Transaction 당 얼마의 값이 나가는지
        // 1 - total_price (총사용가스량 * 가스가격) == 수수료값만
    })
})
