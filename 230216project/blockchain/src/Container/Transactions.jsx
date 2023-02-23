import { useState } from "react";
import styled from "styled-components";
import SearchContainer from "./Search";
import EtherstatusContainer from "./Etherstatus";
// import BlocksComponent from "../Components/Blocks";
import TransactionsComponent from "../Components/Transactions";
import { useEffect } from "react";
import PagingContainer from "./Paging";

const TransactionsContainer = ({
  Blocksdata,
  Transactiondata,
  Transactionsdata,
}) => {
  const [count, setCount] = useState(0);
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(10); // 보여주는아이템수

  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);

  useEffect(() => {
    setCount(Transactionsdata.length);

    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(Transactionsdata.slice(indexOfFirstPost, indexOfLastPost));
  }, [
    currentpage,
    indexOfFirstPost,
    indexOfLastPost,
    Transactionsdata,
    postPerPage,
  ]);

  const setPage = (e) => {
    setCurrentpage(e);
  };
  return (
    <>
      <SearchContainer />
      <EtherstatusContainer
        Transactiondata={Transactiondata}
        Transactionsdata={Transactionsdata}
      />
      <TransactionsTitle>Transactions</TransactionsTitle>
      <BlocksDetail>
        {/* <BlocksTitle>
          <Blocks>Transaction Hash</Blocks>
          <Blocksheight>height</Blocksheight>
          <Blockstimestamp>timestamp</Blockstimestamp>
          <Blockstxs>From</Blockstxs>
          <BlocksgasLimit>To</BlocksgasLimit>
          <BlocksgasUsed>Value</BlocksgasUsed>
          <TransactionsFee>Transactions Fee</TransactionsFee>
          <GasPrice>Gas Price</GasPrice>
        </BlocksTitle> */}
        {currentPosts.map((item, index) => {
          return (
            <TransactionsComponent
              currentpage={currentpage}
              setPage={setPage}
              count={count}
              Transactionsdata={Transactionsdata}
              key={`list-${index}`}
              item={item}
              index={index}
            ></TransactionsComponent>
          );
        })}
        <PagingContainer page={currentpage} count={count} setPage={setPage} />
        {/* <ViewBlocks>VIEW ALL BLOCKS</ViewBlocks> */}
      </BlocksDetail>
    </>
  );
};
const TransactionsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  font-size: 30px;
  font-weight: 700;
`;

const GasPrice = styled.div``;

const TransactionsFee = styled.div``;

const Blockstxs = styled.div``;

const BlocksgasLimit = styled.div``;

const BlocksgasUsed = styled.div``;

const Blocks = styled.div`
  margin-left: 150px;
`;

const Blocksheight = styled.div``;

const Blockstimestamp = styled.div``;

const BlocksTitle = styled.div`
  margin-top: 20px;
  /* margin-left: 5px; */
  font-size: 20px;
  width: 1800px;
  /* border-style: solid; */
  /* border-color: lightgray; */
  /* margin-left: 200px; */
  display: flex;
  /* margin: auto; */
  justify-content: space-around;
`;

const BlocksDetail = styled.div`
  /* display: flex;
  flex-direction: column; */
`;

const ViewBlocks = styled.div`
  /* display: flex;
  width: 100%;
  justify-content: center; */
`;

export default TransactionsContainer;
