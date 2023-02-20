import styled from "styled-components";
import blockimg from "./img/block.png";
import { useNavigate, Link } from "react-router-dom";

const LatestblockComponent = ({ item, index }) => {
  const navigate = useNavigate();
  // console.log(item);
  // let arr = {};
  // for (let i = 0; i <= 10; i++) {
  //   arr += item;
  // }
  // console.log(arr);
  // let temp = arr.splice(0, 10);
  // console.log(temp);
  return (
    <LatestBlockBoxs>
      <LatestBlockBox>
        <BlockTable>
          <Block>
            <BlockImg src={blockimg}></BlockImg>
            <BlockHeight>
              <Link to={`/block/${item.number}`}>{item.number}</Link>
            </BlockHeight>
          </Block>
          <TXDetail>
            <FeeRecipient>
              <Link to={`/block/${item.number}`}>hash: {item.hash}</Link>
            </FeeRecipient>
            {/* <TxCount>transactions:{item.transactions}</TxCount> */}
          </TXDetail>
          {/* <BlockReward></BlockReward> */}
        </BlockTable>
      </LatestBlockBox>
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

const BlockTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-style: solid;
  border-color: lightgray;
`;

const BlockImg = styled.img``;

const BlockHeight = styled.div`
  a {
    text-decoration: none;
    color: rgba(7, 132, 195, 1);
  }
`;

const Block = styled.div`
  display: flex;
`;

const TXDetail = styled.div``;

const FeeRecipient = styled.div`
  a {
    text-decoration: none;
    color: #065076;
  }
`;

const TxCount = styled.div``;

const BlockReward = styled.div``;
