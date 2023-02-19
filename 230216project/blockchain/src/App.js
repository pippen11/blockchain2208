// import logo from './logo.svg';
// import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import MainbarContainer from "./Container/Mainbar";
import SearchContainer from "./Container/Search";
import EtherstatusContainer from "./Container/Etherstatus";
import BlockandTxContainer from "./Container/BlockandTx";
// import styled from "styled-components";
import axios from "axios";
// import Web3 from "web3";
// import { Block } from "./api";

function App() {
  // console.log(web3.eth);
  const [BlockInfodata, setBlockInfodata] = useState([]);
  const [Transactiondata, setTransactiondata] = useState([]);

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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainbarContainer />} />
        {/* <Route path="/" element={<SearchContainer />} /> */}
      </Routes>
      <SearchContainer />
      <EtherstatusContainer Transactiondata={Transactiondata} />
      <BlockandTxContainer
        BlockInfodata={BlockInfodata}
        Transactiondata={Transactiondata}
      />
    </div>
  );
}

export default App;
