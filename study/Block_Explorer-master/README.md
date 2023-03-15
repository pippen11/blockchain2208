# Block Explorer

<br>

**geth 실행**

```shell
$ geth --datadir privateNetwork --ws --ws.addr "0.0.0.0" --ws.port 9005 --ws.origins "*" --ws.api "admin,miner,txpool,web3,personal,eth,net" --syncmode full --networkid 7777
```

**Js 콘솔**

```shell
$ geth attach ws://127.0.0.1:9005
```

<br>

**coinbase 계정**

4def76b3681465c2887e6db02dd56b7d330a7fb2

**another 계정**

aef28d9c27d445485329fcbcf0a5111a389029c8

<br>

**send Transaction**

```shell
personal.sendTransaction({from: eth.coinbase, to: 'aef28d9c27d445485329fcbcf0a5111a389029c8', value: web3.toWei(1, 'ether')}, '1234')
```

```shell
personal.sendTransaction({from: 'aef28d9c27d445485329fcbcf0a5111a389029c8', to: eth.coinbase, value: web3.toWei(1, 'ether')}, '1234')
```

<br>

**wei -> eth**

```shell
web3.fromWei(eth.getBalance(eth.coinbase), 'ether')
```
