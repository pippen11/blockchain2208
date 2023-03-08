import { useEffect, useState } from "react";

import BreadShopContract from "./contracts/BreadShop.json";

export const BreadShop = ({ web3, account }) => {
  const [bread, setBread] = useState(0);
  const [deployed, setDeployed] = useState();
  const [CA, setCA] = useState();
  const [buyAmount, setBuyamount] = useState(1);
  const [sellAmount, setSellamount] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [price, setPrice] = useState([1, 1]);
  const [inputPrice, setInputPrice] = useState(1);
  const [CBalance, setCBalance] = useState(0);

  const constructor = async () => {
    if (!web3) return;

    const networkId = await web3.eth.net.getId();
    const _CA = BreadShopContract.networks[networkId].address;
    const abi = BreadShopContract.abi;
    setCA(_CA);

    const _deployed = new web3.eth.Contract(abi, _CA);
    setDeployed(_deployed);

    const _bread = await _deployed.methods.getBread().call({ from: account });
    setBread(_bread);

    const temp = await _deployed.methods.getSender().call({ from: account });
    // console.log(temp);

    setIsOwner(await _deployed.methods.isOwner().call({ from: account }));
    // setIsOwner()안에 true, false값을 반환해서 owner인지 확인하는 state
    const _price = (
      await _deployed.methods.getPrice().call({ from: account })
    ).map((item) => web3.utils.fromWei(item));

    // map돌려서 이더단위로 바꿔준다
    // console.log(_price);
    // ['1', '0.9']

    setPrice(_price);
    setInputPrice(_price[0]);
  };

  //처음에 0이맞는건지?(CA라그런듯?) CA잔액
  useEffect(() => {
    if (isOwner) {
      (async () => {
        setCBalance(web3.utils.fromWei(await web3.eth.getBalance(CA)));
      })();
    }
  }, [isOwner, price]);

  // owner인지확인후 가격조정(온클릭시 호출)
  const sendPrice = async () => {
    await deployed.methods.setPrice(web3.utils.toWei(inputPrice)).send({
      from: account,
      to: CA,
    });
    // 보내는사람 받는사람 적어야함 setPrice에서 비교

    // map돌려서 이더단위로 바꿔준다
    const _price = (
      await deployed.methods.getPrice().call({ from: account })
    ).map((item) => web3.utils.fromWei(item));
    setPrice(_price);
    setInputPrice(_price[0]);
  };

  const buy = async () => {
    console.log(web3.utils.toWei((price[0] * buyAmount).toString()));
    await deployed.methods.buyBread(buyAmount).send({
      from: account,
      to: CA,
      value: web3.utils.toWei((price[0] * buyAmount).toString()),
    });
    const _bread = await deployed.methods.getBread().call({ from: account });
    setBread(_bread);
  };

  const sell = async () => {
    await deployed.methods
      .sellBread(sellAmount)
      .send({ from: account, to: CA });
    const _bread = await deployed.methods.getBread().call({ from: account });
    setBread(_bread);
  };

  useEffect(() => {
    constructor();
  }, []);

  return (
    <div>
      <div>현재 빵 개수 : {bread}</div>
      {isOwner && (
        <>
          <div>
            <input
              type="number"
              step={1}
              min={0}
              value={inputPrice}
              onInput={(e) => {
                setInputPrice(e.target.value);
              }}
            />{" "}
            <button onClick={sendPrice}>가격 조정</button>
          </div>
          <div>{CBalance} Ether 남음</div>
        </>
      )}
      <div>
        <Input setState={setBuyamount} value={buyAmount} />{" "}
        {parseInt(price[0] * buyAmount * 1000) / 1000} Ether{" "}
        <button onClick={buy}>구매</button>
      </div>
      <div>
        <Input setState={setSellamount} value={sellAmount} max={bread} />{" "}
        {parseInt(price[1] * sellAmount * 1000) / 1000} Ether{" "}
        <button onClick={sell}>판매</button>
      </div>
    </div>
  );
};

// Input컴포넌트따로만듬
const Input = ({ setState, value, max }) => {
  const onInput = (e) => {
    setState(parseInt(e.target.value));
  };

  return (
    <input
      type="number"
      onInput={onInput}
      min={max === undefined ? 1 : 0}
      max={max}
      step={1}
      value={value}
    />
  );
};
