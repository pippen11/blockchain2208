import { useEffect, useState } from 'react';
// const Web3 = require('web3/dist/web3.min')
import Web3 from 'web3';

const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [account, setAccount] = useState<string>('');
  const [networkId, setNetworkId] = useState<number>(0);

  useEffect(() => {
    if (!web3)
      try {
        if (window.ethereum) {
          setWeb3(new Web3(window.ethereum as any));
        }
      } catch (e) {
        console.error(e);
      }
    else {
      (async () => {
        try {
          const networkId: number = await web3.eth.net.getId();
          // ... get contract 작성
          setNetworkId(networkId);
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          if (accounts && Array.isArray(accounts)) {
            setAccount(accounts[0]);
          }
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [web3]);

  return { web3, networkId, account };
};

export default useWeb3;
