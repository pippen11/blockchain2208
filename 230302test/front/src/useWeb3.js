import { useState, useEffect } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    (async () => {
      if (!window.ethereum) return;

      //   console.log(window.ethereum);

      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      //   console.log(address);
      // 위에이것만해도 메타마스크 연결되게됨
      //메타마스크에서 계정 가져오기(230213메타마스크 수업한거 참고)
      // ["0x1b983c7cd106be1940a34168fc326fcd1303fe93"]
      // 위에 이런식으로 나오기때문에 구조분해할당으로 주소값만 뽑는다

      setAccount(address);
      //   console.log(account);

      const _web3 = new Web3(window.ethereum);
      //   console.log(_web3);
      // _web3는 여러 함수들이 나온다 (eth등 web3의 메서드를 쓸수있게됨)
      setWeb3(_web3);
    })();
  });

  return [web3, account];
};

export default useWeb3;
