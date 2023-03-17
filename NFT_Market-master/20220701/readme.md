# Geth

작업할 디렉토리를 하나 생성해주세요
datadir 로 사용할 예정
mkidr `node`

geth --datadir node account new

genesis.json

go-ethereum
make all

설치된 go-ethereum
make all

/build/bin geth 말고 ...

geth
`puppeth` - 설정파일 도와주는 아이

source ~/.bash_profile
source ~/.profile

puppeth

geth --datadir node init "./ingoo\_/ingoo.json"

geth --datadir node --http --http.addr "0.0.0.0" --http.port 9000 --http.corsdomain "_" --http.api "admin,eth,debug,miner,net,txpool,personal,web3" --syncmode full --networkid 7722 --port 30300 --allow-insecure-unlock --ws --ws.addr "0.0.0.0" --ws.port 9005 --ws.origins "_" --ws.api "miner,eth,net,web3"

geth.ipc // web3

geth attach http://127.0.0.1:9000

personal.newAccount('1234')
// 0x9dda233298da86c61f8fe8ae10ee9159f01ce020
// 0xc26f1f532eacfd4dbc6f8a1609da91d00ea86c4d
eth.getBalance('0x9dda233298da86c61f8fe8ae10ee9159f01ce020') // wei

eth.coinbase
eth.getBalance(eth.coinbase)

personal.sendTransaction({from:eth.coinbase, to:'0x9dda233298da86c61f8fe8ae10ee9159f01ce020',value:web3.toWei(10,"ether")},"1234")

personal.sendTransaction(
{
from:eth.coinbase,
to:'0x9dda233298da86c61f8fe8ae10ee9159f01ce020',
value:web3.toWei(10,"ether")
},
"1234"
)

eth.getBalance(eth.coinbase)
eth.getBalance('0x9dda233298da86c61f8fe8ae10ee9159f01ce020')

txpool

miner.start(4)
