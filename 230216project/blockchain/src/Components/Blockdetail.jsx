import styled from "styled-components";
import { useEffect } from "react";

// import etherIcon from "./img/ethereum.png";
// import transactionIcon from "./img/Transactions.png";
import SearchContainer from "../Container/Search";

const BlockdetailComponent = ({ BlockDetailInfo, BlockDetail }) => {
  console.log(BlockDetailInfo);
  useEffect(() => {
    BlockDetail();
  }, []);

  return (
    <>
      <SearchContainer />
      <BlockdetailBox>
        <Blockheight>Block #{BlockDetailInfo.number}</Blockheight>
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
  margin: auto;
  width: 60%;
`;
const Blockheight = styled.div`
  font-size: 20px;
  margin-bottom: 50px;
`;

const DetailBox = styled.div``;
const Height = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 30%;
`;
const Transactions = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 30%;
`;
const BlockHeight = styled.div``;
const BlockHeightNumber = styled.div``;

const TotalDifficulty = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 30%;
`;

const Timestamp = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 30%;
`;
const TotalDifficultytitle = styled.div``;
const Timestamptitle = styled.div``;
const GasUsed = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 30%;
`;
const Timestampvalue = styled.div``;
const GasLimit = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 30%;
`;
const Transactiontitle = styled.div``;
const Transactionvalue = styled.div``;
const TotalDifficultyvalue = styled.div``;
const GasUsedtitle = styled.div``;
const GasUsedvalue = styled.div``;
const GasLimitvalue = styled.div``;
const GasLimittitle = styled.div``;

export default BlockdetailComponent;
