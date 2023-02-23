import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ethermainbar from "./img/ethereum.png";
import signin from "./img/signin.png";

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
          <Etherimg
            src={"https://media.giphy.com/media/DdpmhAQpQZzwHSrQ3f/giphy.gif"}
          />
        </Ethericon>
        <h1 style={{ color: "grey" }}>Etherscan</h1>
      </Mainicon>
      <MainMenu>
        <div
          className="home"
          onClick={() => {
            navigate(`/`);
          }}
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
          className="sign"
          style={{ display: "flex" }}
          onClick={() => {
            // isConnect();

            getChainId();
            getRequestAccounts();
          }}
        >
          <img src={signin} width={"30"} />
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
        <SendButton
          onClick={(e) => {
            e.preventDefault();
            sendTransaction(account, eth);
          }}
        >
          SendTransaction
        </SendButton>
      </MainMenu>
    </MainbarBox>
  );
};

export default MainbarComponent;

const MainbarBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
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
  justify-content: space-between;
  align-items: center;

  .home {
    cursor: pointer;
    color: black;
    &:hover {
      color: blue;
    }
  }
  .sign {
    cursor: pointer;
    color: black;
    &:hover {
      color: blue;
    }
  }
`;

const SendButton = styled.button`
  width: 130px;
  padding: 10px 0px;
  background-color: lightblue;
  border-style: none;
  :hover {
    color: blue;
    background-color: green;
    cursor: pointer;
  }
`;
