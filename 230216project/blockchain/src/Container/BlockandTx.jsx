import LatestblockContainer from "./Latestblock";
import LatesttransactionContainer from "./Latesttransaction";
import styled from "styled-components";

const BlockandTxContainer = ({ BlockInfodata, Transactiondata }) => {
  return (
    <>
      <Latest>
        <LatestblockContainer BlockInfodata={BlockInfodata} />
        <LatesttransactionContainer Transactiondata={Transactiondata} />
      </Latest>
    </>
  );
};
const Latest = styled.div`
  display: flex;

  justify-content: space-around;
  /* flex-wrap: wrap; */
  /* margin: auto; */
  width: 100%;
  /* justify-content: center; */
  /* align-items: center; */
`;

export default BlockandTxContainer;
