const nowAccountElem = document.getElementById("now-account");
const balanceElem = document.getElementById("balance");
const toElem = document.getElementById("to");
const etherElem = document.getElementById("ether");

console.log(window.ethereum);
// 메타마스크쪽에서 지원하는것 ->확장프로그램 사용중에만 proxy가뜨고 사용안함이면 undefined뜸

if (window.ethereum) {
  const isConnected = window.ethereum.isConnected();
  console.log("javascript 읽자 마자 isConnected:", isConnected);
  // 이때는 false 연결이 안됐으니

  const getBalance = async (accounts) => {
    nowAccountElem.innerHTML = accounts[0];
    // 계정만 스트링으로 뽑으려고 [0]번째로
    // console.log(accounts);

    const balance = await ethereum.request({
      method: "eth_getBalance",
      // params: ["0xa0DCDCa54abEF11b1586189b86b20eeF7895F09f"],
      params: accounts,
    });
    console.log(parseInt(balance, 16) / Math.pow(10, 18));
    balanceElem.innerHTML = parseInt(balance, 16) / Math.pow(10, 18);
  };

  ethereum.on("connect", async (connectInfo) => {
    //매개변수 connectInfo 대체적으로 이렇게쓴다 다른거써도됨
    console.log(connectInfo);
    console.log(parseInt(connectInfo.chainId));

    const isConnected = window.ethereum.isConnected();
    console.log("connect 후 isConnected :", isConnected);
    // 이때는 연결이 됐을테니 true가 든다

    try {
      const accounts = await ethereum.request({
        // method:"eth_accounts" << 결과는 아래와 같으나 지금은 아래로 이름이 변경됐다
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      //   nowAccountElem.innerHTML = accounts[0];

      //   const balance = await ethereum.request({
      //     method: "eth_getBalance",
      //     // params: ["0xa0DCDCa54abEF11b1586189b86b20eeF7895F09f"],
      //     params: accounts,
      //   });
      //   console.log(parseInt(balance, 16) / Math.pow(10, 18));
      //   balanceElem.innerHTML = parseInt(balance, 16) / Math.pow(10, 18);
      await getBalance(accounts);
    } catch (error) {
      console.log(error);
    }
  });
  // request로 요청보냄 그럼 응답이있다.

  ethereum.on("accountsChanged", async (accounts) => {
    console.log(accounts);

    //     nowAccountElem.innerHTML = accounts[0];

    //     const balance = await ethereum.request({
    //       method: "eth_getBalance",
    //       // params: ["0xa0DCDCa54abEF11b1586189b86b20eeF7895F09f"],
    //       params: accounts,
    //     });
    //     console.log(parseInt(balance, 16) / Math.pow(10, 18));
    //     // 계정바꾸면 계정주소뜸
    //     balanceElem.innerHTML = parseInt(balance, 16) / Math.pow(10, 18);
    //   });

    // 메타마스크에서 연결되지않음(상태)를 연결로 바꿔야함 사이트와연결
    await getBalance(accounts);
    // 위에 주석 코드  위에랑 중복돼서 함수로하나로 통일시켜서 호출
  });
  ethereum.on("chainChanged", (chainId) => {
    console.log(parseInt(chainId));
    // ex)가나슈에서 메인넷으로 바꿧을때 뜬다
  });

  document.getElementById("sendTransaction").onclick = () => {
    const from = nowAccountElem.innerHTML;
    const to = toElem.value;
    const value = "0x" + (+etherElem.value * Math.pow(10, 18)).toString(16);
    // 넘버도 스트링으로들어와서 +로 숫자로 바꿈
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from,
            to,
            value,
          },
        ],
      })
      .then((result) => {
        console.log(result);
        // 트랜잭션의 해시
        getBalance([from]);
        // 잔액 뜨게해주려고 지갑 변경하면 뜬다
        // params배열로 보내야해서 배열로 감싸서 보냄 getBalance에서 배열로보냄
      })

      .catch((err) => {
        console.log(err);
      });
  };
}
