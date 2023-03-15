# SWAP

ETH -> ERC20
ERC20 -> ETH
ERC20 -> ERC20

## allowance

## approve

## transferFrom

Token 만들 때, 쉽게 만드는 방법.
<br>
오픈제펠린 > Ethereum 재단에서 관리하는 오픈소스
<br>
토큰을 만들 때 인터페이스가 규격화되어 있기 때문에 이미 만들어져 있는 것을 가져다 쓰는 방향.
<br>
<br>

```sh
$ cd truffle
$ truffle init
$ npm init -y
```

```sh
$ npm install openzeppelin-solidity
```

**디렉토리 경로**

node_modules/openzeppelin-solidity/contracts/token/ERC20/
<br>
ERC20.sol
<br>
IERC20.sol
<br>

```sh
$ truffle migration
```

CA : 0x02c10b047Aa97dC79F278c3F377cD98336c0B226
<br>

CA[1] : Contract A
<br>

CA[2] : Contract B
<br>
<br>
Contract A <--> Contract B 상호작용
<br>
컨트랙트를 두 개 배포해서 서로간의 상호작용
<br>
<br>

Smart Contract : this
<br>
msg.sender
<br>
allowance
<br>
approve
<br>
transferFrom
<br>
