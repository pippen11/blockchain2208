// import LatestblockContainer from "./Latestblock";
// import LatesttransactionContainer from "./Latesttransaction";
import styled from "styled-components";
import SearchContainer from "./Search";
import EtherstatusContainer from "./Etherstatus";
import BlockandTxContainer from "./BlockandTx";
import BlocksContainer from "./Blocks";
import { Route, Routes, Link, useParams } from "react-router-dom";

const MainContainer = ({
  Transactiondata,
  BlockInfodata,
  Transactionsdata,
  Blocksdata,
}) => {
  return (
    <>
      <SearchContainer />
      <EtherstatusContainer
        Transactiondata={Transactiondata}
        Transactionsdata={Transactionsdata}
        Blocksdata={Blocksdata}
      />
      <BlockandTxContainer
        BlockInfodata={BlockInfodata}
        Transactiondata={Transactiondata}
      />
    </>
  );
};

export default MainContainer;
