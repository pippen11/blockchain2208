import LatesttransactionComponent from "../Components/Latesttransaction";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
      <Link to={`/transactions`}>
        <ViewTransactions>VIEW ALL TRANSACTIONS</ViewTransactions>
      </Link>
    </LastestTransactions>
  );
};
const LastestTransactions = styled.div`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
  }
`;

const LastestTransactionTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  width: 100%;
  border: 1px solid lightgray;
  box-shadow: 2px 2px 2px 2px grey;
  border-radius: 10px;
  padding: 10px;
`;

const ViewTransactions = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  :hover {
    background-color: lightgray;
  }

  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px lightgray;
  /* background-color: lightgray; */
`;

export default LatesttransactionContainer;
