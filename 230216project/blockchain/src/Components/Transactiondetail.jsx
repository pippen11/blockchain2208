import styled from "styled-components";
import { useEffect } from "react";

// import etherIcon from "./img/ethereum.png";
// import transactionIcon from "./img/Transactions.png";
import SearchContainer from "../Container/Search";

const TransactionDetailComponent = ({
  TransactionDetail,
  TransactionDetailInfo,
}) => {
  let Ethvalue;

  if (TransactionDetailInfo.data) {
    Ethvalue = parseInt(TransactionDetailInfo.data.value) / Math.pow(10, 18);
  }

  return (
    <>
      <SearchContainer />
      <BlockdetailBox>
        <Blockheight>Transaction Details</Blockheight>
        <DetailBox>
          <Height>
            <BlockHeight>Hash:</BlockHeight>
            <BlockHeightNumber>
              {TransactionDetailInfo.data && TransactionDetailInfo.data.hash}
            </BlockHeightNumber>
          </Height>
          <Height>
            <BlockHeight>height:</BlockHeight>
            <BlockHeightNumber>
              {TransactionDetailInfo.data &&
                TransactionDetailInfo.data.blockNumber}
            </BlockHeightNumber>
          </Height>
          <Timestamp>
            <Timestamptitle>Timestamp:</Timestamptitle>
            <Timestampvalue>
              {" "}
              {TransactionDetailInfo.datatwo &&
                TransactionDetailInfo.datatwo.timestamp}
            </Timestampvalue>
          </Timestamp>
          <Transactions>
            <Transactiontitle>From: </Transactiontitle>
            <Transactionvalue>
              {" "}
              {TransactionDetailInfo.data && TransactionDetailInfo.data.from}
            </Transactionvalue>
          </Transactions>
          <TotalDifficulty>
            <TotalDifficultytitle>To: </TotalDifficultytitle>
            <TotalDifficultyvalue>
              {" "}
              {TransactionDetailInfo.data && TransactionDetailInfo.data.to}
            </TotalDifficultyvalue>
          </TotalDifficulty>
          <GasUsed>
            <GasUsedtitle>value: </GasUsedtitle>
            <GasUsedvalue>
              {" "}
              {TransactionDetailInfo.data && Ethvalue} ETH
            </GasUsedvalue>
          </GasUsed>
          <GasLimit>
            <GasLimittitle>Gas: </GasLimittitle>
            <GasLimitvalue>
              {" "}
              {TransactionDetailInfo.data &&
                TransactionDetailInfo.data.gas}{" "}
            </GasLimitvalue>
          </GasLimit>
          <GasLimit>
            <GasLimittitle>GasPrice: </GasLimittitle>
            <GasLimitvalue>
              {" "}
              {TransactionDetailInfo.data &&
                TransactionDetailInfo.data.gasPrice}{" "}
            </GasLimitvalue>
          </GasLimit>
        </DetailBox>
      </BlockdetailBox>
    </>
  );
};
const TransactionDetails = styled.div``;

const Hash = styled.div``;

const TransactionHash = styled.div``;

const TransactionHashvalue = styled.div``;

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

export default TransactionDetailComponent;
