geth --datadir node init genesis.json

\\.\pipe\geth.ipc

geth --datadir node --bootnodes 'enode://c862ac63c2fc829b10a0fdda86de328c29da08132cb921066990e4449321595883fe95b3f76a34015c47a6b2e52b5859a202df4b1143318fd22488106cdbd1f5@192.168.0.244:0?discport=30301' --syncmode full

geth attach \\.\pipe\geth.ipc

geth --datadir node --ipcpath "~/.Ethereum/geth.ipc"

geth --datadir node --nodiscover

계정이필요함.

personal.newAccount()

0x72831722c0bd0db98807c3e190d6665db28dbc38
0xfcdde46fe26c739a9ab8d55fe53a0ddac899bf74

eth.accounts

eth.coinbase

personal.newAccounts()

miner.setEtherbase(eth.accounts[1])

eth.coinbase

miner.start(1)
miner.stop()

toWei
web3.fromWei(eth.getBalance(eth.coinbase),'ether')

admin.addPeer('enode://2fce9bfee267cc9590b3ce1a0ab061a5ed4199439ea9c016541af2efa33da01e2770bf205acfd5dd379e3a332a881cb602a935b218ffcb44b75a81b1f312f8fe@14.7.171.220:30303?discport=0
')

boot key
c8ca9dd75e504031c2d887533b67de5089ac09a7ec417af9913ccef72d1c3d61

admin.addPeer('enode://c862ac63c2fc829b10a0fdda86de328c29da08132cb921066990e4449321595883fe95b3f76a34015c47a6b2e52b5859a202df4b1143318fd22488106cdbd1f5@192.168.0.244:0?discport=30301')

"enode://2fce9bfee267cc9590b3ce1a0ab061a5ed4199439ea9c016541af2efa33da01e2770bf205acfd5dd379e3a332a881cb602a935b218ffcb44b75a81b1f312f8fe@14.7.171.220:30303"

enode://5b76a9700fce5a786a97aca44de1b525a84196ad196b09a33f1d6ed8601116b045bd91d9934110022e84f921d01ff3fb8eb436e79942bc1da78685cc6aaa4418@14.7.171.220:30303

enode://5b76a9700fce5a786a97aca44de1b525a84196ad196b09a33f1d6ed8601116b045bd91d9934110022e84f921d01ff3fb8eb436e79942bc1da78685cc6aaa4418@106.101.3.40:30303?discport=41604

admin.addPeer('enode://5b76a9700fce5a786a97aca44de1b525a84196ad196b09a33f1d6ed8601116b045bd91d9934110022e84f921d01ff3fb8eb436e79942bc1da78685cc6aaa4418@106.101.3.40:30303?discport=41604')

admin.addPeer('enode://5b76a9700fce5a786a97aca44de1b525a84196ad196b09a33f1d6ed8601116b045bd91d9934110022e84f921d01ff3fb8eb436e79942bc1da78685cc6aaa4418@14.7.171.220:30303')

geth --datadir node --nodiscover

geth --nodiscover --identity "etherPrivate" --datadir node --rpc --rpcaddr "0.0.0.0" --rpcport 9000 --rpccorsdomain "\*" --networkid 7722 --rpcapi "admin,db,eth,net,web3,debug,miner,shh,txpool,personal" --allow-insecure-unlock

geth --datadir node --networkid 7722

enode://2fce9bfee267cc9590b3ce1a0ab061a5ed4199439ea9c016541af2efa33da01e2770bf205acfd5dd379e3a332a881cb602a935b218ffcb44b75a81b1f312f8fe@14.7.171.220:30303

geth --datadir node2 network
geth --datadir node --networkid 7722 --http --http.addr "0.0.0.0"
geth --datadir node2 --networkid 7722 --port 30302 --http -http.host "0.0.0.0"

geth --networkid 7722 --port 30304 --allow-insecure-unlock --maxpeers 0 --datadir node --http --http.addr "0.0.0.0" --http.port 9000 --http.corsdomain "\*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --ipcpath "./node/geth.ipc" --bootnodes 'enode://c862ac63c2fc829b10a0fdda86de328c29da08132cb921066990e4449321595883fe95b3f76a34015c47a6b2e52b5859a202df4b1143318fd22488106cdbd1f5@192.168.0.224:0?discport=30301' --syncmode 'full'

geth --networkid 7722 --port 30305 --allow-insecure-unlock --maxpeers 0 --datadir node2 --http --http.addr "0.0.0.0" --http.port 9001 --http.corsdomain "\*" --http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --ipcpath "./node2/geth.ipc" --bootnodes 'enode://c862ac63c2fc829b10a0fdda86de328c29da08132cb921066990e4449321595883fe95b3f76a34015c47a6b2e52b5859a202df4b1143318fd22488106cdbd1f5@192.168.0.224:0?discport=30301' --syncmode 'full'

0xf644f39378698089f566163d1da80af572916ab7

bootnode -nodekey boot.key -verbosity 9 --nat extip:192.168.0.224:30301
