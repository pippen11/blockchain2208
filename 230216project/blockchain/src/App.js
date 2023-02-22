// import logo from './logo.svg';
// import './App.css';
import { Route, Routes, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import MainbarContainer from "./Container/Mainbar";
import TransactionDetailContainer from "./Container/Transactiondetail";

// import EtherstatusContainer from "./Container/Etherstatus";
import BlockdetailContainer from "./Container/Blockdetail";
import MainContainer from "./Container/Main";
// import MainContainer from "./Container/Main";
// import styled from "styled-components";
import axios from "axios";
// import Web3 from "web3";
// import { Block } from "./api";
import BlocksContainer from "./Container/Blocks";
import TransactionsContainer from "./Container/Transactions";
import AddressContainer from "./Container/Address";
import MetamaskContainer from "./Container/Metamask";
import FooterContainer from "./Container/Footer";
function App() {
  // console.log(web3.eth);
  const [BlockInfodata, setBlockInfodata] = useState([]);
  const [Transactiondata, setTransactiondata] = useState([]);
  const [Blocksdata, setBlocksdata] = useState([]);
  const [Transactionsdata, setTransactionsdata] = useState([]);

  const params = useParams();

  // console.log(params);
  useEffect(() => {
    BlockInfo();
  }, []);

  useEffect(() => {
    findBlock();
  }, []);

  useEffect(() => {
    TransactionInfo();
  }, []);

  useEffect(() => {
    findTransaction();
  }, []);

  useEffect(() => {
    BlocksdetailInfo();
  }, []);
  useEffect(() => {
    TransactionsdetailInfo();
  }, []);

  // useEffect(() => {
  //   Addressbalance();
  // }, []);

  const findTransaction = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8080/api/transaction/findTransaction",
        {
          transaction: "transaction",
        }
      );
      // console.log(data.data);
      setTransactiondata(data.data);
    } catch (error) {
      console.error("err");
    }
  };

  const findBlock = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8080/api/block/findblock",
        {
          block: "block",
        }
      );

      // console.log(data.data[0].hash);
      setBlockInfodata(data.data);
    } catch (error) {
      console.error("err");
    }
  };

  const BlockInfo = async () => {
    try {
      const data = await axios.post("http://localhost:8080/api/block", {
        block: "blockInfo",
      });
    } catch (error) {}
  };

  const TransactionInfo = async () => {
    try {
      const data = await axios.post("http://localhost:8080/api/transaction", {
        transaction: "transactiontest",
      });
    } catch (error) {
      console.error("err");
    }
  };

  const BlocksdetailInfo = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8080/api/block/blocksdetailInfo",
        { blockdetail: "blockdetail" }
      );

      setBlocksdata(data.data);
    } catch (error) {
      console.error("err");
    }
  };

  const TransactionsdetailInfo = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8080/api/transaction/transactionsdetailInfo",
        { transactions: "transactions" }
      );
      // console.log(data.data);
      setTransactionsdata(data.data);
    } catch (error) {
      console.error("err");
    }
  };

  // const Addressbalance = async () => {
  //   try {
  //     const data = await axios.post(
  //       "http://localhost:8080/api/transaction/addressbalance",
  //       {
  //         address: "address",
  //       }
  //     );
  //   } catch (error) {
  //     console.error("err");
  //   }
  // };

  return (
    <div className="App">
      <MainbarContainer />

      <Routes>
        <Route path="/block/:number" element={<BlockdetailContainer />} />
        <Route
          path="/transaction/:id"
          element={<TransactionDetailContainer />}
        />

        <Route
          path="/blocks"
          element={
            <BlocksContainer
              Transactionsdata={Transactionsdata}
              Transactiondata={Transactiondata}
              Blocksdata={Blocksdata}
            />
          }
        />
        <Route path="/address/:address" element={<AddressContainer />} />

        <Route
          path="/transactions"
          element={
            <TransactionsContainer
              Transactiondata={Transactiondata}
              Transactionsdata={Transactionsdata}
              Blocksdata={Blocksdata}
            />
          }
        />

        <Route
          path="/"
          element={
            <MainContainer
              Transactionsdata={Transactionsdata}
              Transactiondata={Transactiondata}
              BlockInfodata={BlockInfodata}
            />
          }
        />
      </Routes>
      <FooterContainer />
    </div>
  );
}

export default App;
