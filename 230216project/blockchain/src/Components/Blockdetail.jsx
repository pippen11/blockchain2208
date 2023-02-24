import styled from "styled-components";
import { useEffect } from "react";
import "./Paging.css";
import { useState } from "react";
import Pagination from "react-js-pagination";
import { useNavigate, useParams } from "react-router-dom";
import blockimg from "./img/block.png";

// import etherIcon from "./img/ethereum.png";
// import transactionIcon from "./img/Transactions.png";
import SearchContainer from "../Container/Search";

const BlockdetailComponent = ({ BlockDetailInfo, BlockDetail }) => {
  // console.log(BlockDetailInfo);
  // const navigate = useNavigate();

  // let params = useParams();
  // console.log(params);
  // useEffect(() => {
  //   // navigate(`/block/${params}`);
  // }, [params]);
  // useEffect(() => {
  //   // window.location.reload();
  // }, [params]);
  // window.location.reload();
  // useEffect(() => {
  //   BlockDetail();
  // }, []);
  console.log(BlockDetailInfo);

  return (
    <>
      <SearchContainer />
      <BlockdetailBox>
        <Blockheight>
          <img
            src={"https://media.giphy.com/media/XCTCBcDXbhtUfMLwRm/giphy.gif"}
            width="50"
          ></img>
          Block #{BlockDetailInfo.number}
        </Blockheight>
        <DetailBox>
          <Height>
            <BlockHeight>Block Height:</BlockHeight>
            <BlockHeightNumber>{BlockDetailInfo.number}</BlockHeightNumber>
          </Height>
          <Timestamp>
            <Timestamptitle>Timestamp:</Timestamptitle>
            <Timestampvalue>{BlockDetailInfo.timestamp}</Timestampvalue>
          </Timestamp>
          <Transactions>
            <Transactiontitle>Transaction: </Transactiontitle>
            <Transactionvalue> {BlockDetailInfo.txs}</Transactionvalue>
          </Transactions>
          <TotalDifficulty>
            <TotalDifficultytitle>TotalDifficulty: </TotalDifficultytitle>
            <TotalDifficultyvalue>
              {BlockDetailInfo.totalDifficulty}
            </TotalDifficultyvalue>
          </TotalDifficulty>
          <GasUsed>
            <GasUsedtitle>GasUsed: </GasUsedtitle>
            <GasUsedvalue> {BlockDetailInfo.gasUsed}</GasUsedvalue>
          </GasUsed>
          <GasLimit>
            <GasLimittitle>GasLimit: </GasLimittitle>
            <GasLimitvalue> {BlockDetailInfo.gasLimit}</GasLimitvalue>
          </GasLimit>
        </DetailBox>
      </BlockdetailBox>
    </>
  );
};

const BlockdetailBox = styled.div`
  /* margin: auto; */
  /* width: 30%; */

  /* display: flex; */
  margin: 20px auto;
  width: 500px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px lightgray;
  padding: 10px;
`;
const Blockheight = styled.div`
  font-weight: 750;
  font-size: 22px;
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 50px;

  /* width: 50%; */
  /* margin: auto; */
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: space-around; */
  /* align-items: center; */
  /* margin: auto; */
`;
const Height = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;
const Transactions = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;
const BlockHeight = styled.div``;
const BlockHeightNumber = styled.div``;

const TotalDifficulty = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

const Timestamp = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;
const TotalDifficultytitle = styled.div``;
const Timestamptitle = styled.div``;
const GasUsed = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;
const Timestampvalue = styled.div``;
const GasLimit = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;
const Transactiontitle = styled.div``;
const Transactionvalue = styled.div``;
const TotalDifficultyvalue = styled.div``;
const GasUsedtitle = styled.div``;
const GasUsedvalue = styled.div``;
const GasLimitvalue = styled.div``;
const GasLimittitle = styled.div``;

export default BlockdetailComponent;
