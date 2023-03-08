```bah
cd 230308
mkdir back
cd back
npm init -y
npm i truffle
npm i -d prettier-plugin-solidity
npx truffle init
npx truffle console
web3.eth.getCoinbase()
web3.eth.getBalance("0x8e59511e100f7233356359097B955Ff62a9BBd14")
cd ..
yarn create react-app front
cd front
yarn add web3
```

# 스마트 컨트렉트의 거래

- CA : Contract Address, 계정 즉 지갑 주소중하나, 이더를 갖고있을수 있다.

- function의 payable 옵션
- payable 이름 그대로 거래 가능하도록 해준다.
- CA 주소로 해당 컨트랙트의 Balance(잔액)을 확인할수있다.

```solidity
  function sellBread() public payable {
    breads[msg.sender] -= 1;
    payable(msg.sender).transfer(10 ** 18);
  }
  // msg.sender, 즉 트랜잭션을 보낸 지갑 계정에 Ether를 보낸다.
```

- 빵가격 정의 , 컨트랙트 등록자는 수정가능
- 구매하는빵 개수에따라 자동으로 사용되는 Ether정의
- 구매할때와 판매할때 가격 변동 => 구매보다 판매할때 무조건 싸야함<< 남은돈은 스마트컨트랙트
