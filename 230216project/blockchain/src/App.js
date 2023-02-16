// import logo from './logo.svg';
// import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import MainbarContainer from "./Container/Mainbar";
import SearchContainer from "./Container/Search";
import EtherstatusContainer from "./Container/Etherstatus";
import BlockandTxContainer from "./Container/BlockandTx";
import styled from "styled-components";
import axios from "axios";
// import Web3 from "web3";
// import { Block } from "./api";

function App() {
  // console.log(web3.eth);
  // let BlockInfo = [];

  useEffect(() => {
    BlockInfo();
  }, []);

  const BlockInfo = async () => {
    try {
      const data = await axios.post("http://localhost:8080/api/block", {
        block: "blockInfo",
      });
    } catch (error) {}
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainbarContainer />} />
        {/* <Route path="/" element={<SearchContainer />} /> */}
      </Routes>
      <SearchContainer />
      <EtherstatusContainer />
      <BlockandTxContainer />
    </div>
  );
}

export default App;
