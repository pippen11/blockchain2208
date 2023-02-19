import LatesttransactionComponent from "../Components/Latesttransaction";
import styled from "styled-components";

const LatesttransactionContainer = ({ Transactiondata }) => {
  // console.log(Transactiondata);
  return (
    <LastestTransactions>
      <LastestTransactionTitle>Latest Transactions</LastestTransactionTitle>

      {Transactiondata.map((item, index) => {
        return (
          <LatesttransactionComponent
            key={`list-${index}`}
            item={item}
            index={index}
          ></LatesttransactionComponent>
        );
      })}
      <ViewTransactions>VIEW ALL TRANSACTIONS</ViewTransactions>
    </LastestTransactions>
  );
};
const LastestTransactions = styled.div`
  display: flex;
  flex-direction: column;
`;

const LastestTransactionTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  width: 100%;
  border-style: solid;
  border-color: lightgray;
`;

const ViewTransactions = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default LatesttransactionContainer;
