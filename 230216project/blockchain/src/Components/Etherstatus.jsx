import styled from "styled-components";
import etherIcon from "./img/ethereum.png";
import transactionIcon from "./img/Transactions.png";

const EtherstatusComponent = ({ Transactiondata }) => {
  // console.log(Transactiondata);

  return (
    <StatusBox>
      <Status>
        <Ether>
          <EtherImg src={etherIcon} />
          <EtherPrice>ETHER PRICE: 200000000</EtherPrice>
        </Ether>
        <Transactions>
          <TransactionImg src={transactionIcon} />
          <Transactiontitle>
            TRANSACTIONS: {Transactiondata.length}
          </Transactiontitle>
        </Transactions>
      </Status>
    </StatusBox>
  );
};

export default EtherstatusComponent;

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
  border-color: blue;
  border-style: dashed;
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
