import styled from "styled-components";
import blockimg from "./img/block.png";

const LatestblockComponent = ({ item, index }) => {
  return (
    <LatestBlockBoxs>
      <LastestBlockTitle>Latest Blocks</LastestBlockTitle>
      <LatestBlockBox>
        <BlockTable>
          <Block>
            <BlockImg src={blockimg}></BlockImg>
            <BlockHeight>{item.height}</BlockHeight>
          </Block>
          <TXDetail>
            <FeeRecipient>Fee Recipient: {item.recipient}</FeeRecipient>
            <TxCount>{item.txn} txns</TxCount>
          </TXDetail>
          <BlockReward>{item.BlockReward} Eth</BlockReward>
        </BlockTable>
      </LatestBlockBox>

      <ViewBlocks>VIEW ALL BLOCKS</ViewBlocks>
    </LatestBlockBoxs>
  );
};

export default LatestblockComponent;

const LatestBlockBoxs = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`;

const LatestBlockBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LastestBlockTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  width: 100%;
  border-style: solid;
  border-color: lightgray;
`;

const BlockTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-style: solid;
  border-color: lightgray;
`;

const BlockImg = styled.img``;

const BlockHeight = styled.div``;

const Block = styled.div`
  display: flex;
`;

const TXDetail = styled.div``;

const FeeRecipient = styled.div``;

const TxCount = styled.div``;

const BlockReward = styled.div``;

const ViewBlocks = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
