import styled from "styled-components";
import etherIcon from "./img/ethereum.png";
import transactionIcon from "./img/Transactions.png";

const EtherstatusComponent = ({
  Blocksdata,
  Transactiondata,
  Transactionsdata,
}) => {
  // console.log(Transactionsdata);
  console.log(Blocksdata);
  return (
    <StatusBox>
      <Status>
        <Ether>
          <EtherImg
            src={"https://media.giphy.com/media/DdpmhAQpQZzwHSrQ3f/giphy.gif"}
          />
          <EtherPrice>ETHER PRICE: 200000000</EtherPrice>
        </Ether>
        <Blockscount>
          <Blockimg
            src={"https://media.giphy.com/media/XCTCBcDXbhtUfMLwRm/giphy.gif"}
          ></Blockimg>
          Blocks: {Blocksdata.length}
        </Blockscount>
        <Transactions>
          <TransactionImg src={transactionIcon} />
          {/* <div>{Blocksdata.length}</div> */}

          <Transactiontitle>
            TRANSACTIONS: {Transactionsdata.length}
          </Transactiontitle>
        </Transactions>
      </Status>
    </StatusBox>
  );
};

export default EtherstatusComponent;

const Blockimg = styled.img`
  width: 60px;
`;

const Blockscount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Ether = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Status = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-around;
`;

const StatusBox = styled.div`
  border-bottom: 3px solid rgb(9, 12, 109);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const EtherImg = styled.img`
  width: 40px;
`;

const EtherPrice = styled.div``;

const TransactionImg = styled.img``;

const Transactions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Transactiontitle = styled.div``;
