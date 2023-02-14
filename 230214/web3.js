const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

console.log(Web3);
//ƒ (){var e=this;i.packageInit(this,arguments),this.version=n,this.utils=f,this.eth=new o(this),this.shh=new u(this),this.bzz=new c(this);var t=this.setProvider;this.setProvider=function(r,n){return t.a…
// Web3라는 클래스로나옴

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"));
// 가나슈 포트번호 8545
// const etherElem = document.getElementById("transfer");

console.log(web3.eth);

/////////////////////

// const txpool = await request({
//   data: {
//     id: 1337,
//     jsonrpc: "2.0",
//     method: "txpool_content",
//     params: [],
//   },
// });
// console.log(txpool);
// console.log(web3.eth.txpool);
// web3.eth.txpool.content();
/////////////

// then방법
// web3.eth
//   .getAccounts()
//   .then((accounts) =>
//     accounts.forEach((account, idx) =>
//       web3.eth
//         .getBalance(account)
//         .then((balance) =>
//           console.log(`${idx} ${account} (${web3.utils.fromWei(balance)} ETH)`)
//         )
//     )
//   );

//async방법

const test = async () => {
  const accounts = await web3.eth.getAccounts();
  // console.log(web3.eth.getAccounts()); //Promise {<pending>} 이렇게그냥쓰면 promise로나와서 async await나 then등으로써야한다
  // console.log(accounts);  배열로 연결된 계정도 나온다

  for (let i = 0; i < accounts.length; ++i) {
    const balanceWei = await web3.eth.getBalance(accounts[i]);
    // getBalance()매개변수 자리안에 계정 순서대로 넣어줌
    // const balance = web3.utils.fromWei(balanceWei, "GWei");

    const balance = web3.utils.fromWei(balanceWei);
    // fromWei 매개변수자리에 아무것도 없으면 알아서 eth로 바꿔줌
    // utils는 여러가지 편의 메서드들을 갖고있다. 제공한다.
    // fromWei는 Wei 단위의 금액을 다른 단위로 바꿔준다
    // - 2번째 매개변수로 변환할 단위를 설정한다. 기본값은 ether다

    // console.log("(" + i + ")" + accounts[i] + " (" + balance + " Wei)");
    console.log("(" + i + ")" + accounts[i] + " (" + balance + " Eth)");
  }
  // id 1337이맞나?
  document.getElementById("send").onclick = async () => {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "personal_unlockAccount",
        params: [accounts[0], "1234567891"],
      },
    });
    const transaction = await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: web3.utils.toWei("1"),
    });
    // console.log(web3.utils.toWei("1"));
    // Submitted transaction
    // hash=0x60318b85be9e3047e5756d8f0949d57aea9e7c6fa24b68bc3d341e13fec188b9
    //from=0x36d141119AEc36cA3b38e5Dd6fd23FAC511aD5b5 nonce=6
    //recipient=0xF9fDF98D4A437aAb5ecbb62739755Fc47E634216 value=1,000,000,000,000,000,000
    // console.log(transaction);
    //이것도 안뜸 그냥 보낼때 서버에서만 나옴

    const transaction1 = await web3.eth.getTransaction(
      transaction.transactionHash
      // transacion.trasacionHash는무엇?
    );
    console.log(transaction1);
    //이거안뜨는게 맞나? 갑자기뜰때가 있던데 어떨때 뜸?
  };
  const transaction = await web3.eth.getTransaction(
    "0x6be0ebcc9b9482e016432cc491448e48fb50a3deabb837f66a33ca580cc044d4"
  );
  // 여기에 뜨는 트랜잭션으로 바꿔줌
  console.log(transaction);

  // blockHash: null;
  //null로 뜨는이유?
  // blockNumber: null;
  // null로 뜨는이유? 나중에 blocknumber랑 blockhash값 채굴후 생기는이유? 계속 blocknumber 48로남아있는이유?
  // chainId: "0x3c";
  // 체인아이디 십진수로 60임
  // from: "0x36d141119AEc36cA3b38e5Dd6fd23FAC511aD5b5";
  // gas: 21000;
  // gasPrice: "1000000000";
  // hash: "0x6be0ebcc9b9482e016432cc491448e48fb50a3deabb837f66a33ca580cc044d4";
  // input: "0x";
  // nonce: 10;
  // 보낸사람이 시도한 횟수 블록채굴후에도 계속 올라감?
  // r: "0x3c176fcc58b4f3a3833e892ab20d70896a20aa4e8e19bf2fc1abf9a940571cc7";
  // s: "0x5813e3495ac270d4d14e064603012d1f57d546c4e6e81ff3acaddd34016ac49d";
  // to: "0xF9fDF98D4A437aAb5ecbb62739755Fc47E634216";
  // transactionIndex: null;
  // 블록채굴하는순간 10번보냈으면 그 블록에 index 9로 들어간다
  // type: 0;
  // v: "0x9b";
  // value: "1000000000000000000";

  //   blockHash: "0x92bf930b00b52d317a3ab18f4a6aa484ebe9c27bb5870ce2126e28da6f90027f";
  // - 트랜잭션이 포함된 블록의 hash
  //   blockNumber: 2;
  // - 트랜잭션이 포함된 블록의 높이
  //   from: "0x586eDE4B460f30c440a54097c95923Ff7092bef7";
  //   gas: 90000;
  //   gasPrice: "20000000000";
  //   hash: "0x442250c3889dec1413a3fd1d8b37958f8b59617a0b250f016c8a7a5f185f51c7";
  //   input: "0x";
  //   nonce: 1;
  //   - 블록에서는 nonce가 난이도 문제를 풀기 위해 시도한 횟수
  //   - 티건 트랜잭션의 nonce -> 보낸 사람이 보낸 트랜잭션의 ㅏ개수
  //   r: "0xdd6882b3ce898f3595c662e8a5d04099fbb60ef96b7e4d2b2b16a262db5042c6";
  //   s: "0x63cf0bdba1a1e7d8adeb91d5ef3363d3b756b7599104f8b9588e6e45b9d37287";
  //   to: "0x2DAaeaeb5f7f462a8ab2722Cef2750955d7aa1af";
  //   transactionIndex: 0;
  //  블록내에서 몇번째 트랜잭션이냐
  //   v: "0x25";
  //   - rsv 전부 서명 관련 데이터이다
  //   - 우리가 sendTransaction 할때 서명 한적이 있나? 자동으로 서명한다
  //   - 어떤 걸 기준으로 서명할까? << unlock 할때 서명을 허가한다.
  //   -  메타마스크에서 보낼 때도 자동으로 서명한다. << 정확히는 우리가 서명을 허가한다<< 보낼때 내용 확인 클릭시 (unlock은 로그인할때 됨)<
  //
  //
  //   value: "1000000000000000000";

  document.getElementById("stop").onclick = async function () {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_stop",
      },
    });
  };

  document.getElementById("start").onclick = async () => {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_setEtherbase",
        params: [accounts[0]],
      },
    });
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_start",
      },
    });
  };
};

test();
