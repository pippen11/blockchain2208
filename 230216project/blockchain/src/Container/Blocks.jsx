import { useState } from "react";
import styled from "styled-components";
import SearchContainer from "./Search";
import EtherstatusContainer from "./Etherstatus";
import BlocksComponent from "../Components/Blocks";

const BlocksContainer = ({ Blocksdata, Transactiondata }) => {
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
        <BlocksTitle>
          <Blocks>Blocks</Blocks>
          <Blocksheight>height</Blocksheight>
          <Blockstimestamp>timestamp</Blockstimestamp>
          <Blockstxs>txs</Blockstxs>
          <BlocksgasLimit>gasLimit</BlocksgasLimit>
          <BlocksgasUsed>gasUsed</BlocksgasUsed>
        </BlocksTitle>
        {Blocksdata.map((item, index) => {
          return (
            <BlocksComponent
              key={`list-${index}`}
              item={item}
              index={index}
            ></BlocksComponent>
          );
        })}
        {/* <ViewBlocks>VIEW ALL BLOCKS</ViewBlocks> */}
      </BlocksDetail>
    </>
  );
};
const Blockstxs = styled.div``;

const BlocksgasLimit = styled.div``;

const BlocksgasUsed = styled.div``;

const Blocks = styled.div``;

const Blocksheight = styled.div``;

const Blockstimestamp = styled.div``;

const BlocksTitle = styled.div`
  margin-top: 20px;
  margin-left: 5px;
  font-size: 20px;
  width: 100%;
  border-style: solid;
  border-color: lightgray;
  display: flex;
  justify-content: space-around;
`;

const BlocksDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewBlocks = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default BlocksContainer;
