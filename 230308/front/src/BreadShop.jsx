import { useState, useEffect } from "react";
import BreadShopContract from "./contracts/BreadShop.json";

export const BreadShop = ({ web3, account }) => {
  const [bread, setBread] = useState(0);
  const [deployed, setDeplyed] = useState();
  const [CA, setCA] = useState();
  const [order, setOrder] = useState();

  const constructor = async () => {
    if (!web3) return;

    const networkId = await web3.eth.net.getId();
    // 네트워크 아이디 가져옴
    const _CA = BreadShopContract.networks[networkId].address;
    // CA주소 가져옴
    setCA(_CA);

    const abi = BreadShopContract.abi;
    // console.log(abi); abi Breadshop컨트랙트의 각 함수와 정보들담김

    const _deployed = new web3.eth.Contract(abi, _CA);
    setDeplyed(_deployed);
    // 배포한것을 담겨준다 다른곳에서도 쓸수잇게

    // console.log(deployed); 메서드쓰려고

    // 여기안에서 set해준거 console찍어도 안나온다

    const _bread = await _deployed.methods.getBread().call({ from: account });
    // call안의 from을 현재지갑계정으로설정해서 빵의 개수를 가져옴
    setBread(_bread);

    // const temp = await _deployed.methods.getSender().call({ from: account });
    // console.log(temp);
    // web3.eth.getCoinbase() 이거랑같다 채굴했을때 받는애랑 같다
    //  return msg.sender; .call({from:account}) 넣으면 내주소로바뀜
  };

  const buy = async () => {
    await deployed.methods
      .buyBread(order)
      .send({ from: account, to: CA, value: web3.utils.toWei("1") });
    //payable의 .send메서드써서 1이더를 CA한테 보내준다

    const _bread = await deployed.methods.getBread().call({ from: account });
    setBread(_bread);
    //빵의 개수 가져와서 바로 업데이트해줌
  };

  const sell = async () => {
    await deployed.methods.sellBread().send({ from: account, to: CA });

    const _bread = await deployed.methods.getBread().call({ from: account });
    setBread(_bread);
  };

  const change = (e) => {
    setOrder(e.target.value);
  };

  useEffect(() => {
    constructor();
  }, []);
  //이거돌때 빵바로 업데이트되게한다

  return (
    <div>
      <div>빵가격:10ETh </div>
      <div>현재 빵 개수: {bread}</div>

      <input type={"number"} onChange={change}></input>
      <button onClick={buy}>구매</button>
      <button onClick={sell}>판매</button>

      <div></div>
    </div>
  );
};
