import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ethermainbar from "./img/ethereum.png";

const MainbarComponent = ({
  isConnect,
  getChainId,
  getRequestAccounts,
  accounts,
  Balance,
  sendTransaction,
}) => {
  // console.log(Balance);
  const navigate = useNavigate();

  const [myeth, setMyeth] = useState(Balance);

  const [account, setAccount] = useState("");

  const [eth, setETH] = useState(0);

  // console.log(myeth);
  useEffect(() => {
    setMyeth(Balance);
  }, [Balance]);
  useEffect(() => {
    getRequestAccounts();
  }, []);
  return (
    <MainbarBox>
      <Mainicon>
        <Ethericon>
          <Etherimg src={ethermainbar} />
        </Ethericon>
        <h1 style={{ color: "grey" }}>Etherscan</h1>
      </Mainicon>
      <MainMenu>
        <div
          onClick={() => {
            navigate(`/`);
          }}
          style={{ color: "blue" }}
        >
          home
        </div>
        {/* <div>Blockchain</div>
        <div>Tokens</div>
        <div>NFTs</div>
        <div>Resources</div>
        <div>Developers</div>
        <div>More</div> */}
        <div
          onClick={() => {
            // isConnect();

            getChainId();
            getRequestAccounts();
          }}
        >
          Sign In
        </div>
        <div>MyETH: {myeth}</div>
        <label>
          To:
          <input
            type="text"
            placeholder="To"
            value={account}
            onInput={(e) => {
              setAccount(e.target.value);
            }}
          />
        </label>
        <label>
          ETHER :
          <input
            type="number"
            step="0.001"
            placeholder="Ether"
            value={eth}
            onInput={(e) => {
              setETH(e.target.value);
            }}
          />
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            sendTransaction(account, eth);
          }}
        >
          SendTransaction
        </button>
      </MainMenu>
    </MainbarBox>
  );
};

export default MainbarComponent;

const MainbarBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Etherimg = styled.img`
  width: 60px;
`;

const Ethericon = styled.div``;
// 무조건 대문자

const Mainicon = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
`;

const MainMenu = styled.div`
  display: flex;
  font-size: 20px;
  width: 50%;
  justify-content: space-around;
  align-items: center;
`;
