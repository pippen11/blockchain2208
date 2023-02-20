import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import BlockdetailComponent from "../Components/Blockdetail";
import TransactionDetailComponent from "../Components/Transactiondetail";
const TransactionDetailContainer = () => {
  const params = useParams();
  const [TransactionDetailInfo, setTransactionDetailInfo] = useState([]);

  const TransactionDetail = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8080/api/transaction/transactiondetail",
        {
          id: params.id,
        }
      );

      setTransactionDetailInfo(data.data);
    } catch (error) {
      console.error("error");
    }
  };
  return (
    <TransactionDetailComponent
      TransactionDetailInfo={TransactionDetailInfo}
      TransactionDetail={TransactionDetail}
    />
  );
};

export default TransactionDetailContainer;
