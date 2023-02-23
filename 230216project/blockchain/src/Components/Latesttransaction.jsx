import styled from "styled-components";
import transactionimg from "./img/transaction.png";
import { useNavigate, Link } from "react-router-dom";

const LatesttransactionComponent = ({ item, index }) => {
  let Ethvalue = parseInt(item.value) / Math.pow(10, 18);
  // console.log(item.id);
  return (
    <TransactionBoxs>
      <TransactionBox>
        <TransactionTable>
          <Transaction>
            <TransactionImg src={transactionimg}></TransactionImg>
            <Link to={`/transaction/${item.id}`}>
              <Transactionhash>{item.hash}</Transactionhash>
            </Link>
          </Transaction>
          <TXDetail>
            <Link to={`/address/${item.from}`}>
              <From>From: {item.from}</From>
            </Link>
            <Link to={`/address/${item.to}`}>
              <To>To: {item.to}</To>
            </Link>
          </TXDetail>
          <Amount>{Ethvalue} Eth</Amount>
        </TransactionTable>
      </TransactionBox>
    </TransactionBoxs>
  );
};

export default LatesttransactionComponent;

const TransactionBoxs = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  width: 800px;
`;

const TransactionBox = styled.div`
  width: 100%;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
`;

const TransactionTable = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */
  padding: 10px;
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px lightgray;
`;

const TransactionImg = styled.img``;

const Transactionhash = styled.div``;

const Transaction = styled.div`
  display: flex;
  a {
    text-decoration: none;
    color: rgba(7, 132, 195, 1);
  }
`;

const TXDetail = styled.div`
  a {
    text-decoration: none;
    color: #065076;
  }
`;

const From = styled.div``;

const To = styled.div``;

const Amount = styled.div``;

const ViewTransactions = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
