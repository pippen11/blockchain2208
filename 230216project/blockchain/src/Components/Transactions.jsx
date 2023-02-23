import styled from "styled-components";
import blockimg from "./img/block.png";
import { useNavigate, Link } from "react-router-dom";

const TransactionsComponent = ({
  currentpage,
  count,
  setPage,
  item,
  index,
}) => {
  console.log(item);
  let Ethvalue = parseInt(item.value) / Math.pow(10, 18);

  return (
    <>
      <LatestBlockBoxs>
        <LatestBlockBox>
          <BlockTable>
            <Block>
              <BlockImg>
                <div>hash:</div> <div>{item.hash}</div>
              </BlockImg>
              <BlockHeight>
                <div>height:</div> <div>{item.blockNumber}</div>
              </BlockHeight>{" "}
              <Blocktimestamp>
                <div>timestamp:</div> {item.createdAt}
              </Blocktimestamp>
              <Blocktxs>
                <div>From:</div> {item.from}
              </Blocktxs>
              {/* <TXDetail>
              <FeeRecipient>hash: {item.hash}</FeeRecipient>
            </TXDetail> */}
              <BlockgasLimit>
                <div>To:</div> {item.to}
              </BlockgasLimit>
              <BlockgasUsed>
                <div>ETh:</div> {Ethvalue}
              </BlockgasUsed>
              <TransactionFee>
                <div>gas:</div> {item.gas}
              </TransactionFee>
              <Transactiongasprice>
                <div>gasPrice:</div> {item.gasPrice}
              </Transactiongasprice>
            </Block>

            {/* <BlockReward></BlockReward> */}
          </BlockTable>
        </LatestBlockBox>
      </LatestBlockBoxs>
    </>
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
  margin: 30px auto 0 auto;
  width: 50%;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 2px 2px 2px 2px lightgray;
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
  line-height: 40px;

  /* justify-items: center; */
  /* align-items: center; */
  & > div {
    display: flex;
    & > div:first-child {
      width: 200px;
      font-weight: 700;
    }
  }
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
