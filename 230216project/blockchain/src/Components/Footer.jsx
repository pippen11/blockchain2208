import iconimg from "./img/icon.png";
import etherimg from "./img/ethereum.png";
import styled from "styled-components";
import mapimg from "./img/map.png";
// import backimg from "./img/back.png";

const FooterComponent = () => {
  return (
    <FooterBox>
      <Footertop>
        <Top>
          <img src={iconimg} />
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ▲ Back to Top
          </div>
        </Top>
      </Footertop>
      <Footermiddle>
        <Footerfirst>
          <Ethermain>
            <Etherimg src={etherimg} />
            <div style={{ fontSize: 21 }}>Powered by Ethereum</div>
          </Ethermain>
          <div>
            <div>
              Etherscan is a Block Explorer and Analytics Platform for
              Ethereum,a
            </div>
            <div>decentralized smart contracts platform</div>
          </div>
          <div>
            <img src={mapimg} />
          </div>
        </Footerfirst>
        <div className="test">
          <strong>
            <div style={{ fontSize: 16 }}>Company</div>
          </strong>
          <div>About Us</div>
          <div>Brand Assets</div>
          <div>Contackt Us</div>
          <div>Careers</div>
          <div>Terms of Service</div>
          <div>Bug Bounty</div>
        </div>
        <div className="testone">
          <strong>
            <div style={{ fontSize: 16 }}>Community</div>
          </strong>
          <div>API Documentation</div>
          <div>Knowledge Base</div>
          <div>Network Status</div>
          <div>Newsletters</div>
          <div>Disqus Comments</div>
        </div>
        <div className="testtwo">
          <strong>
            <div style={{ fontSize: 16 }}>Product & Services</div>{" "}
          </strong>
          <div>Advertise</div>
          <div>Explorer-as-a-Service(EaaS)</div>
          <div>API Plans</div>
          <div>Priority Support</div>
          <div>Blockscan</div>
          <div>Blockscan Chat</div>
        </div>
      </Footermiddle>
      <Footerlast>
        <Testcom>
          <div>Etherscan 2023(B1)</div>
          <div>Donations:0x36d...D5b5♥</div>
        </Testcom>
      </Footerlast>
    </FooterBox>
  );
};

const FooterBox = styled.div`
  width: 100%;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 110px;
  margin-right: 130px;
  padding: 10px;
`;

const Footertop = styled.div`
  /* width: 100%; */
  /* margin: auto; */
  /* margin-left: 50px; */
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
  padding: 15px;
  border-bottom: 1px;
  border-top: 1px;
  border-left: 1px;
  border-right: 1px;
  border-style: solid;
  border-color: lightgray;
  background-color: rgba(248, 249, 250, 1);
`;

const Footermiddle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(248, 249, 250, 1);
  .test {
    display: flex;
    flex-direction: column;
    line-height: 30px;
    /* align-items: center; */
  }
  .testone {
    display: flex;
    flex-direction: column;
    line-height: 35px;
  }
  .testtwo {
    display: flex;
    flex-direction: column;
    line-height: 28px;
  }
`;

const Ethermain = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const Etherimg = styled.img`
  width: 40px;
`;

const Footerfirst = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  /* align-items: center; */
`;

const Footerlast = styled.div`
  /* display: flex;
  width: 100%;
  justify-content: space-between;

  align-items: center; */

  /* margin-left: 110px; */

  /* padding: 10px; */
`;

const Testcom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 87%;
  margin-left: 130px;
`;

export default FooterComponent;
