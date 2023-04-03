import { BlockVisionProvider, BvNetwork } from "blockvision.js";
import { useState } from "react";
function DefiComponent() {
  const [deFiPortfolio, setDeFiPortfolio] = useState([]);

  const test = async () => {
    const bv = new BlockVisionProvider(
      BvNetwork.ETH_MAINNET,
      "2NlAd0YJgKG7KMfVCamD3LCccqg"
    );

    // const protocolData = await bv.;

    bv.getAccountDeFiPortfolio({
      protocol: "1inch",
      accountAddress: "0xb18fBAd70a07D4CAB5510e2f87Fae20eE22cF2b4",

      // protocolData: protocolData,
    })
      .then((result) => {
        console.log(result);
        setDeFiPortfolio(result.data);

        // setDeFiPortfolio(result);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {deFiPortfolio[0] && <img src={deFiPortfolio[0].logo}></img>}
      <button onClick={test}>defi테스트</button>
    </div>
  );
}

export default DefiComponent;
