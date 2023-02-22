// import LatestblockContainer from "./Latestblock";
// import LatesttransactionContainer from "./Latesttransaction";
import styled from "styled-components";
import Paging from "../Components/Paging";
import { Route, Routes, Link, useParams } from "react-router-dom";

const PagingContainer = ({ page, count, setPage }) => {
  return <Paging page={page} count={count} setPage={setPage} />;
};

export default PagingContainer;
