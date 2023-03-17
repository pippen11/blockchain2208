const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:9005'))

web3.eth.subscribe('newBlockHeaders', (error, result) => {
    if (!error) {
        console.log(result)
    }
})
