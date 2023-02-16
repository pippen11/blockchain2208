import styled from "styled-components";
import transactionimg from "./img/transaction.png";

const LatesttransactionComponent = () => {
  return (
    <TransactionBoxs>
      <LastestTransactionsTitle>Latest Transactions</LastestTransactionsTitle>
      <TransactionBox>
        <TransactionTable>
          <Transaction>
            <TransactionImg src={transactionimg}></TransactionImg>
            <Transactionhash>0x74e8f3bd8c3a2</Transactionhash>
          </Transaction>
          <TXDetail>
            <From>From 0x74e8f3bd8c3a2</From>
            <To>To 0x74e8f3bd8c3a2</To>
          </TXDetail>
          <Amount>0.08451 Eth</Amount>
        </TransactionTable>
      </TransactionBox>
      <ViewTransactions>VIEW ALL TRANSACTIONS</ViewTransactions>
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
