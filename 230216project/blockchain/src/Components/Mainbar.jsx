import styled from "styled-components";
import ethermainbar from "./img/ethereum.png";

const MainbarComponent = () => {
  return (
    <MainbarBox>
      <Mainicon>
        <Ethericon>
          <Etherimg src={ethermainbar} />
        </Ethericon>
        <h1 style={{ color: "grey" }}>Etherscan</h1>
      </Mainicon>
      <MainMenu>
        <div style={{ color: "blue" }}>home</div>
        <div>Blockchain</div>
        <div>Tokens</div>
        <div>NFTs</div>
        <div>Resources</div>
        <div>Developers</div>
        <div>More</div>
        <div>Sign In</div>
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
