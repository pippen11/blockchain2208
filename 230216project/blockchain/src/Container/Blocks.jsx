import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchContainer from "./Search";
import EtherstatusContainer from "./Etherstatus";
import BlocksComponent from "../Components/Blocks";
import PagingContainer from "./Paging";
const BlocksContainer = ({ Blocksdata, Transactiondata, Transactionsdata }) => {
  // const [blockslength, setblocksLength] = useState(0);

  // useEffect(() => {
  //   setblocksLength(Blocksdata.length);
  // }, []);
  // console.log(Transactionsdata);
  // console.log(Blocksdata.length);

  const [count, setCount] = useState(0);
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(10); // 보여주는아이템수

  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);

  useEffect(() => {
    setCount(Blocksdata.length);

    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(Blocksdata.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, Blocksdata, postPerPage]);

  const setPage = (e) => {
    setCurrentpage(e);
  };

  // console.log(BlockInfodata);
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
    <>
      <SearchContainer />
      <EtherstatusContainer
        Transactiondata={Transactiondata}
        Transactionsdata={Transactionsdata}
      />
      <BlocksDetail>
        <BlocksTitle>
          <Blocks>Blocks</Blocks>
          <Blocksheight>height</Blocksheight>
          <Blockstimestamp>timestamp</Blockstimestamp>
          <Blockstxs>txs</Blockstxs>
          <BlocksgasLimit>gasLimit</BlocksgasLimit>
          <BlocksgasUsed>gasUsed</BlocksgasUsed>
        </BlocksTitle>
        {currentPosts.map((item, index) => {
          return (
            <BlocksComponent
              currentpage={currentpage}
              setPage={setPage}
              count={count}
              Blocksdata={Blocksdata}
              // blockslength={blockslength}
              key={`list-${index}`}
              item={item}
              index={index}
            ></BlocksComponent>
          );
        })}
        <PagingContainer page={currentpage} count={count} setPage={setPage} />
        {/* <ViewBlocks>VIEW ALL BLOCKS</ViewBlocks> */}
      </BlocksDetail>
    </>
  );
};
const Blockstxs = styled.div`
  width: 50px;
`;

const BlocksgasLimit = styled.div`
  width: 50px;
`;

const BlocksgasUsed = styled.div`
  width: 50px;
`;

const Blocks = styled.div`
  width: 50px;
`;

const Blocksheight = styled.div`
  width: 50px;
`;

const Blockstimestamp = styled.div`
  width: 50px;
`;

const BlocksTitle = styled.div`
  margin-top: 20px;
  /* margin-left: 5px; */
  font-size: 20px;
  width: 100%;
  border: 1px solid lightgray;
  display: flex;
  justify-content: space-around;
  box-shadow: 2px 2px 2px 2px lightgray;
  padding: 10px;
`;

const BlocksDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewBlocks = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default BlocksContainer;
