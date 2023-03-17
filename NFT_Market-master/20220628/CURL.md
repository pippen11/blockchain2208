curl

curl -X POST -H "content-type:application/json" --data '{name:"ingoo"}' http://localhost:3000

Request
POST
application/json
{
"id":1337, // 선택
"jsonrpc":"2.0" // 필수
"method":"eth_accounts" // 필수
"params":[]
}

curl -X POST \
 -H "Content-type: application/json" \
 --data '{ "jsonrpc":"2.0","method":"eth_accounts","params":[] }' \
 http://localhost:8545

curl -X POST \
 -H "Content-type: application/json" \
 --data '{ "jsonrpc":"2.0","method":"eth_getBalance","params":["0x4AD8f61e6A0917f3CAcB10f34FAD7041280EBB93","latest"] }' \
 http://localhost:8545

evm_snapshot []

evm_revert ["0x1"]

evm_mine ["123123123"]

http
https://ethereum.github.io/execution-apis/api-documentation/
core
getBlance
