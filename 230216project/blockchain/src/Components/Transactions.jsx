import styled from "styled-components";
import blockimg from "./img/block.png";
import { useNavigate, Link } from "react-router-dom";

const TransactionsComponent = ({ item, index }) => {
  console.log(item);
  let Ethvalue = parseInt(item.value) / Math.pow(10, 18);

  return (
    <LatestBlockBoxs>
      <LatestBlockBox>
        <BlockTable>
          <Block>
            <BlockImg>hash: {item.hash}</BlockImg>
            <BlockHeight>height: {item.blockNumber}</BlockHeight>{" "}
            <Blocktimestamp>timestamp: {item.createdAt}</Blocktimestamp>
            <Blocktxs>From: {item.from}</Blocktxs>
            {/* <TXDetail>
              <FeeRecipient>hash: {item.hash}</FeeRecipient>
            </TXDetail> */}
            <BlockgasLimit>To: {item.to}</BlockgasLimit>
            <BlockgasUsed>ETh: {Ethvalue}</BlockgasUsed>
            <TransactionFee>gas: {item.gas}</TransactionFee>
            <Transactiongasprice>gasPrice: {item.gasPrice}</Transactiongasprice>
          </Block>

          {/* <BlockReward></BlockReward> */}
        </BlockTable>
      </LatestBlockBox>
    </LatestBlockBoxs>
  );
};

export default TransactionsComponent;

const Transactiongasprice = styled.div`
  font-size: 20px;
`;
const TransactionFee = styled.div`
  font-size: 20px;
`;
const BlockgasLimit = styled.div`
  font-size: 20px;
`;
const BlockgasUsed = styled.div`
  font-size: 20px;
`;

const LatestBlockBoxs = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* width: 100%; */
`;

const LatestBlockBox = styled.div`
  /* width: 100%; */
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: space-around; */
  /* align-items: center; */
`;

const BlockTable = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-around; */
  /* width: 1900px; */
  margin: auto;
  width: 50%;
  border-style: solid;
  border-color: lightgray;
`;

const BlockImg = styled.div`
  font-size: 20px;
  /* text-overflow: ellipsis;
  white-space: nowrap; */
  /* word-break: break-all; */
  /* overflow: hidden;
  width: 100px; */
`;

const BlockHeight = styled.div`
  font-size: 20px;
`;

const Block = styled.div`
  /* display: flex; */
  /* justify-content: space-evenly; */
  /* text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  overflow: hidden;
  width: 100px; */

  /* justify-items: center; */
  /* align-items: center; */
`;

const Blocktxs = styled.div`
  font-size: 20px;
`;

const Blocktimestamp = styled.div`
  /* text-overflow: ellipsis;
  white-space: nowrap;
  /* word-break: break-all; */
  /* overflow: hidden; */
  font-size: 20px;

  /* width: 100px; */
`;
const TXDetail = styled.div``;

const FeeRecipient = styled.div``;

const TxCount = styled.div``;

const BlockReward = styled.div``;
