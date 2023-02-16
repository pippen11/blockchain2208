import LatestblockContainer from "./Latestblock";
import LatesttransactionContainer from "./Latesttransaction";
import styled from "styled-components";

const BlockandTxContainer = () => {
  return (
    <Latest>
      <LatestblockContainer />
      <LatesttransactionContainer />
    </Latest>
  );
};
const Latest = styled.div`
  display: flex;
  justify-content: space-around;
  /* margin: auto; */
  width: 2000px;
  /* justify-content: center; */
  /* align-items: center; */
`;

export default BlockandTxContainer;
