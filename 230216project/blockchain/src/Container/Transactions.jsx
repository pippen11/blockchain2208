import { useState } from "react";
import styled from "styled-components";
import SearchContainer from "./Search";
import EtherstatusContainer from "./Etherstatus";
// import BlocksComponent from "../Components/Blocks";
import TransactionsComponent from "../Components/Transactions";

const TransactionsContainer = ({
  Blocksdata,
  Transactiondata,
  Transactionsdata,
}) => {
  //   console.log("Blocksdata :", Blocksdata);
  //   console.log("Transactiondata", Transactiondata);
  // console.log(BlockInfodata);
  // BlockInfodata.reverse();
  // console.log(BlockInfodata);
  // const [list, setList] = useState([
  //   {
  //     height: "16638393",
  //     recipient: "ssm",
  //     txn: "163",
  //     BlockReward: "0.8451",
  //   },
  // ]);
  return (
    <>
      <SearchContainer />
      <EtherstatusContainer Transactiondata={Transactiondata} />
      <BlocksDetail>
        {/* <BlocksTitle>
          <Blocks>Transaction Hash</Blocks>
          <Blocksheight>height</Blocksheight>
          <Blockstimestamp>timestamp</Blockstimestamp>
          <Blockstxs>From</Blockstxs>
          <BlocksgasLimit>To</BlocksgasLimit>
          <BlocksgasUsed>Value</BlocksgasUsed>
          <TransactionsFee>Transactions Fee</TransactionsFee>
          <GasPrice>Gas Price</GasPrice>
        </BlocksTitle> */}
        {Transactionsdata.map((item, index) => {
          return (
            <TransactionsComponent
              key={`list-${index}`}
              item={item}
              index={index}
            ></TransactionsComponent>
          );
        })}
        {/* <ViewBlocks>VIEW ALL BLOCKS</ViewBlocks> */}
      </BlocksDetail>
    </>
  );
};
const GasPrice = styled.div``;

const TransactionsFee = styled.div``;

const Blockstxs = styled.div``;

const BlocksgasLimit = styled.div``;

const BlocksgasUsed = styled.div``;

const Blocks = styled.div`
  margin-left: 150px;
`;

const Blocksheight = styled.div``;

const Blockstimestamp = styled.div``;

const BlocksTitle = styled.div`
  margin-top: 20px;
  /* margin-left: 5px; */
  font-size: 20px;
  width: 1800px;
  /* border-style: solid; */
  /* border-color: lightgray; */
  /* margin-left: 200px; */
  display: flex;
  /* margin: auto; */
  justify-content: space-around;
`;

const BlocksDetail = styled.div`
  /* display: flex;
  flex-direction: column; */
`;

const ViewBlocks = styled.div`
  /* display: flex;
  width: 100%;
  justify-content: center; */
`;

export default TransactionsContainer;
