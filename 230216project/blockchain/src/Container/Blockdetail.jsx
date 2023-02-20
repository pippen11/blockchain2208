import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import BlockdetailComponent from "../Components/Blockdetail";
const BlockdetailContainer = () => {
  const params = useParams();
  const [BlockDetailInfo, setBlockDetailInfo] = useState([]);

  const BlockDetail = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8080/api/block/blockdetail",
        {
          number: params.number,
        }
      );
      setBlockDetailInfo(data.data.number);
    } catch (error) {
      console.error("error");
    }
  };
  return (
    <BlockdetailComponent
      BlockDetail={BlockDetail}
      BlockDetailInfo={BlockDetailInfo}
    />
  );
};

export default BlockdetailContainer;
