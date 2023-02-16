import LatestblockComponent from "../Components/Latestblock";
import { useState } from "react";

const LatestblockContainer = () => {
  const [list, setList] = useState([
    {
      height: "16638393",
      recipient: "ssm",
      txn: "163",
      BlockReward: "0.8451",
    },
  ]);
  return (
    <>
      {list.map((item, index) => {
        return (
          <LatestblockComponent
            key={`list-${index}`}
            item={item}
            index={index}
          ></LatestblockComponent>
        );
      })}
    </>
  );
};

export default LatestblockContainer;
