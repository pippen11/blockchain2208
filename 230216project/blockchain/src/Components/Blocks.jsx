import styled from "styled-components";
import blockimg from "./img/block.png";
import { useNavigate, Link } from "react-router-dom";

const BlocksComponent = ({ item, index }) => {
  console.log(item);
  return (
    <LatestBlockBoxs>
      <LatestBlockBox>
        <BlockTable>
          <Block>
            <BlockImg src={blockimg}></BlockImg>
            <BlockHeight>{item.number}</BlockHeight>{" "}
            <Blocktimestamp>{item.timestamp}</Blocktimestamp>
            <Blocktxs>{item.txs}</Blocktxs>
            {/* <TXDetail>
              <FeeRecipient>hash: {item.hash}</FeeRecipient>
            </TXDetail> */}
            <BlockgasLimit>{item.gasLimit}</BlockgasLimit>
            <BlockgasUsed>{item.gasUsed}</BlockgasUsed>
          </Block>

          {/* <BlockReward></BlockReward> */}
        </BlockTable>
      </LatestBlockBox>
    </LatestBlockBoxs>
  );
};

export default BlocksComponent;

const BlockgasLimit = styled.div``;
const BlockgasUsed = styled.div``;

const LatestBlockBoxs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LatestBlockBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
`;

const BlockTable = styled.div`
  /* display: flex; */
  align-items: center;
  /* justify-content: space-evenly */
  width: 100%;
  border-style: solid;
  border-color: lightgray;
`;

const BlockImg = styled.img``;

const BlockHeight = styled.div``;

const Block = styled.div`
  display: flex;
  justify-content: space-around;
  /* justify-items: center; */
  align-items: center;
`;

const Blocktxs = styled.div``;

const Blocktimestamp = styled.div``;
const TXDetail = styled.div``;

const FeeRecipient = styled.div``;

const TxCount = styled.div``;

const BlockReward = styled.div``;
