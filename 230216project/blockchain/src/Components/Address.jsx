import styled from "styled-components";
import { useEffect } from "react";

// import etherIcon from "./img/ethereum.png";
// import transactionIcon from "./img/Transactions.png";
import SearchContainer from "../Container/Search";
import { useParams } from "react-router-dom";

const AddressComponent = ({ addressdetail, addressdetails }) => {
  // console.log(addressdetails);

  let balance = addressdetails.addressbalance;
  let test = parseInt(balance) / Math.pow(10, 18);
  //10의 18승으로나눔
  // console.log(test);

  return (
    <>
      <SearchContainer />
      <BlockdetailBox>
        <Blockheight>Address #{addressdetails.address}</Blockheight>
        <DetailBox>
          <Height>
            <ETHBalance>Eth Balance: {test}</ETHBalance>
            <BlockHeightNumber></BlockHeightNumber>
          </Height>
          <Timestamp>
            <Timestamptitle>FirstTx: {addressdetails.firsttx}</Timestamptitle>
            <Timestampvalue></Timestampvalue>
          </Timestamp>
          <Transactions>
            <Transactiontitle>LastTx: {addressdetails.lasttx}</Transactiontitle>
            <Transactionvalue> </Transactionvalue>
          </Transactions>
          {/* <TotalDifficulty>
            <TotalDifficultytitle>TotalDifficulty: </TotalDifficultytitle>
            <TotalDifficultyvalue></TotalDifficultyvalue>
          </TotalDifficulty>
          <GasUsed>
            <GasUsedtitle>GasUsed: </GasUsedtitle>
            <GasUsedvalue></GasUsedvalue>
          </GasUsed>
          <GasLimit>
            <GasLimittitle>GasLimit: </GasLimittitle>
            <GasLimitvalue> </GasLimitvalue>
          </GasLimit> */}
        </DetailBox>
      </BlockdetailBox>
    </>
  );
};

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
const ETHBalance = styled.div`
  font-size: 20px;
  font-weight: 500;
`;
const Blockheight = styled.div`
  /* font-size: 20px;
  margin-bottom: 50px; */
  font-size: 20px;
  font-weight: 750;
  border-bottom: 1px solid black;

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
const Timestamptitle = styled.div`
  font-size: 20px;
  font-weight: 600;
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
  font-weight: 600;
`;
const Transactionvalue = styled.div``;
const TotalDifficultyvalue = styled.div``;
const GasUsedtitle = styled.div``;
const GasUsedvalue = styled.div``;
const GasLimitvalue = styled.div``;
const GasLimittitle = styled.div``;

export default AddressComponent;
