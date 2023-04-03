import { BlockVisionProvider, BvNetwork } from "blockvision.js";
import { useState } from "react";

function DefitwoCompoent() {
  const [deFiPortfolio, setDeFiPortfolio] = useState([]);
  const bv = new BlockVisionProvider(BvNetwork.ETH_MAINNET);

  return (
    <div>
      <button>defi테스트</button>
    </div>
  );
}

export default DefitwoCompoent;
