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
        <BlockheightTitle>Transaction Details</BlockheightTitle>
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
  /* margin: auto;
  width: 60%; */
  margin: 30px auto;
  width: 900px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px lightgray;
  padding: 10px;
`;
const Blockheight = styled.div`
  font-size: 30px;
  font-weight: 750;
  border-bottom: 1px solid black;
  width: 50%;
  margin-bottom: 50px;
`;

const BlockheightTitle = styled.div`
  font-size: 30px;
  font-weight: 750;
  border-bottom: 1px solid black;
  /* width: 30%; */
  margin-bottom: 50px;
`;

const DetailBox = styled.div`
  line-height: 50px;
`;
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
  width: 67%;
`;
const BlockHeight = styled.div`
  font-size: 20px;
`;
const BlockHeightNumber = styled.div`
  /* margin-left: 20px; */
  width: 50%;
`;

const TotalDifficulty = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 30%;
`;

const Timestamp = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 27%;
`;
const TotalDifficultytitle = styled.div``;
const Timestamptitle = styled.div`
  /* width: 100px; */
`;
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
const Transactiontitle = styled.div`
  width: 50px;
`;
const Transactionvalue = styled.div`
  /* padding-left: 20px; */
`;
const TotalDifficultyvalue = styled.div`
  /* padding-left: 44px; */
  width: 50%;
`;
const GasUsedtitle = styled.div``;
const GasUsedvalue = styled.div`
  width: 50%;
`;
const GasLimitvalue = styled.div`
  width: 50%;
`;
const GasLimittitle = styled.div``;

export default TransactionDetailComponent;
