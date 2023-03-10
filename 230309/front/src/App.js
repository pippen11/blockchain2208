// import logo from "./logo.svg";
import { useEffect, useState } from "react";

import "./App.css";
import Web3 from "web3";
import BitTokenContract from "./BitToken.json";

function App() {
  // 토큰추가하는 함수 여기서 이름,심볼,발행량 지정한다(compile은해야함)
  useEffect(() => {
    (async () => {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(BitTokenContract.abi);

      const [_account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const txObj = {
        data: BitTokenContract.bytecode,
        arguments: ["BitToken", "Bitcoin", 10000],
        // 이름, 심볼, 발행량
      };
      const deployed = await contract.deploy(txObj).send({
        from: _account,
        gas: 2000000,
      });

      console.log(deployed.options.address);
      // 여기서 찍히는건 CA다 돌아갈때마다 CA주소가 바껴서나온다
    })();
  }, []);

  return <div className="App"></div>;
}

export default App;
