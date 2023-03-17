import { useState, useCallback, useEffect } from "react";
import Web3 from "web3";

export const useWeb3 = (): {
  // 여기는 리턴값에대한 타입지정 return { web3, account, chainId, logIn };
  web3: Web3 | undefined;
  //web3?:Web3도된다
  account: string;
  chainId: string | null;
  logIn: () => void;
  // void는 undifined다 return이없는거
} => {
  const [web3, setWeb3] = useState<Web3 | undefined>();
  const [account, setAccount] = useState<string>("");
  const [chainId, setChainId] = useState<string | null>("");

  // mount될때만 처음만 재정의해라 => 함수를 내보내려고씀=>랜더링될때마다 정의안하고 정의를한번만하려고
  // usecallback으로 안쓰면 web3 , account, chainid등 하나라도바뀌면 다시정의한다
  const logIn = useCallback(async () => {
    try {
      if (window.ethereum) {
        // 타입지정해주면 ethereum빨간줄없어진다
        const _web3: Web3 = new Web3((window as any).ethereum);
        // as는 앞에있는 타입이 이렇다는걸 알려줌 여기서는 any(Web3가 받는게 여러가지라서 any?) _web3는 new라서 Web3타입이라 지정안해줘도됨(해주면 Web3)
        setWeb3(_web3);

        const [_account]: Array<string> = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as Array<string>;
        // 얘는 이결과가 이결과가 나올꺼다라고 타입을 두번 지정해줘야함 반환값을 모르니까? (앞에타입 지정안해줘도 뒤에서 해줘서 되긴함)
        //const [_account]= (await window.ethereum.request({
        // method: "eth_requestAccounts",
        // })) as Array<string>;
        if (_account) {
          setAccount(_account);
        }

        window.ethereum.on("accountsChanged", async () => {
          if (window.ethereum) {
            const [_account] = (await window.ethereum.request({
              method: "eth_requestAccounts",
            })) as Array<string>;
            setAccount(_account);
          }
        });

        setChainId(window.ethereum.networkVersion);
      } else {
        console.log("MetaMask is not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { web3, account, chainId, logIn };
};
