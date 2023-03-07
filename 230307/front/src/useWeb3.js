import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [web3, setWeb3] = useState();
  // eth,utils등 여러 함수 쓰려고

  const [account, setAccount] = useState();
  // 계정들

  useEffect(() => {
    if (!window.ethereum) return;
    // 메타마스크가 설치되지 않았으면 끝내라
    (async () => {
      const [_account] = await window.ethereum.request({
        method: "eth_requestAccounts",
        // 메타마스크 계정 가져오기
        //위에이것만해도 메타마스크 연결되게됨
        // ["0x1b983c7cd106be1940a34168fc326fcd1303fe93"]
        // 위에 이런식으로 나오기때문에 구조분해할당으로 주소값만 뽑는다
      });
      setAccount(_account);

      const _web3 = new Web3(window.ethereum);
      // _web3는 여러 함수들이 나온다 (eth등 web3의 메서드를 쓸수있게됨)

      setWeb3(_web3);
    })();
  }, []);

  return [web3, account];
};

export default useWeb3;
