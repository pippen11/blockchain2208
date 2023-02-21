import LatestblockComponent from "../Components/Latestblock";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LatestblockContainer = ({ BlockInfodata }) => {
  // BlockInfodata.reverse();
  // console.log(BlockInfodata);
  // const [list, setList] = useState([
  //   {
  //     height: "16638393",
  //     recipient: "ssm",
  //     txn: "163",
  //     BlockReward: "0.8451",
  //   },
  // ]);
  return (
    <LatestBlock>
      <LastestBlockTitle>Latest Blocks</LastestBlockTitle>
      {BlockInfodata.map((item, index) => {
        return (
          <LatestblockComponent
            key={`list-${index}`}
            item={item}
            index={index}
          ></LatestblockComponent>
        );
      })}
      <Link to={`/blocks`}>
        <ViewBlocks>VIEW ALL BLOCKS</ViewBlocks>
      </Link>
    </LatestBlock>
  );
};
const LastestBlockTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  width: 100%;
  border-style: solid;
  border-color: lightgray;
`;

const LatestBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewBlocks = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default LatestblockContainer;
