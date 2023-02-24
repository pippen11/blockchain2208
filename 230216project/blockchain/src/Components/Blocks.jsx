import styled from "styled-components";
import blockimg from "./img/block.png";
import { useNavigate, Link } from "react-router-dom";
import PagingContainer from "../Container/Paging";
import { useEffect, useState } from "react";

const BlocksComponent = ({
  currentpage,
  count,
  setPage,
  // blockslength,
  item,
  index,
  Blocksdata,
}) => {
  // setPage();
  return (
    <>
      <LatestBlockBoxs>
        <LatestBlockBox>
          <BlockTable>
            <Block>
              <BlockImg
                src={
                  "https://media.giphy.com/media/XCTCBcDXbhtUfMLwRm/giphy.gif"
                }
              ></BlockImg>
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
    </>
  );
};

export default BlocksComponent;

const BlockgasLimit = styled.div`
  width: 50px;
`;
const BlockgasUsed = styled.div`
  width: 50px;
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
  width: 100%;
  border: 1px solid lightgrey;
  padding: 10px;
  /* border-style: solid; */
  /* border-color: lightgray; */
`;

const BlockImg = styled.img`
  width: 50px;
`;

const BlockHeight = styled.div`
  width: 50px;
`;

const Block = styled.div`
  display: flex;
  justify-content: space-around;
  /* width: 100%; */
  /* justify-items: center; */
  align-items: center;
`;

const Blocktxs = styled.div`
  width: 50px;
`;

const Blocktimestamp = styled.div`
  width: 50px;
`;
const TXDetail = styled.div``;

const FeeRecipient = styled.div``;

const TxCount = styled.div``;

const BlockReward = styled.div``;
