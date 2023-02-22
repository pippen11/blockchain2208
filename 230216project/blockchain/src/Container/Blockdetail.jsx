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
      console.log(params.number);
      const data = await axios.post(
        "http://localhost:8080/api/block/blockdetail",
        {
          number: params.number,
        }
      );
      console.log(data.data.number);
      setBlockDetailInfo(data.data.number);
    } catch (error) {
      console.error("error");
    }
  };

  useEffect(() => {
    BlockDetail();
  }, [params.number]);
  return (
    <BlockdetailComponent
      BlockDetail={BlockDetail}
      BlockDetailInfo={BlockDetailInfo}
    />
  );
};

export default BlockdetailContainer;
