import styled from "styled-components";
import transactionimg from "./img/transaction.png";

const LatesttransactionComponent = ({ item, index }) => {
  return (
    <TransactionBoxs>
      <TransactionBox>
        <TransactionTable>
          <Transaction>
            <TransactionImg src={transactionimg}></TransactionImg>
            <Transactionhash>{item.hash}</Transactionhash>
          </Transaction>
          <TXDetail>
            <From>From: {item.from}</From>
            <To>To: {item.to}</To>
          </TXDetail>
          <Amount>{item.value} Eth</Amount>
        </TransactionTable>
      </TransactionBox>
    </TransactionBoxs>
  );
};

export default LatesttransactionComponent;

const TransactionBoxs = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`;

const TransactionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LastestTransactionsTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  width: 100%;
  border-style: solid;
  border-color: lightgray;
`;

const TransactionTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-style: solid;
  border-color: lightgray;
`;

const TransactionImg = styled.img``;

const Transactionhash = styled.div``;

const Transaction = styled.div`
  display: flex;
`;

const TXDetail = styled.div``;

const From = styled.div``;

const To = styled.div``;

const Amount = styled.div``;

const ViewTransactions = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
