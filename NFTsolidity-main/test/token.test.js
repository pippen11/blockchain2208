const SdToken = artifacts.require("SdToken");
const Market = artifacts.require("Market");

function toEther(n) {
  return web3.utils.toWei(n, "ether");
}

// 콜백함수의 인자값 = web3.eth.getAccount() = []
contract("nft test", ([deployer, account1, account2]) => {
  let token, market;

  describe("token & market deployment", async () => {
    it("deployed", async () => {
      token = await SdToken.deployed();
      market = await Market.deployed();
      console.log(token.address, market.address); // 테스트코드 실행 시 매번 새롭게 컨트랙트 배포되므로 ca는 실행시마다 바뀜.
    });

    it("mint Token", async () => {
      // deployer, account1, account2에게 각각 2개, 1개, 1개씩 토큰발급
      await token.mintToken({
        from: deployer,
        value: toEther("1"),
      });

      await token.mintToken({
        from: deployer,
        value: toEther("1"),
      });

      await token.mintToken({
        from: account1,
        value: toEther("1"),
      });

      await token.mintToken({
        from: account2,
        value: toEther("1"),
      });

      let balance = await token.balanceOf(deployer);
      console.log(balance);
    });

    it("get latest token", async () => {
      const latestToken = await market.latestToken(deployer);
      console.log(latestToken); // [ '2', '2', '3', '0', tokenId: '2', Rank: '2', Type: '3', price: '0' ]
    });

    it("내 소유 토큰 목록 조회", async () => {
      const myTokens = await market.getOwnerTokens(deployer);
      console.log(myTokens);
    });

    it("토큰 판매하기", async () => {
      // market에게 대리자 위임 후 saleToken
      await token.setApprovalForAll(market.address, true, {
        from: deployer,
      });

      await market.SalesToken(1, 2, { from: deployer });
      await market.SalesToken(2, 2, { from: deployer });

      const list = await market.getSaleTokenList();
      console.log(list);
    });

    it("토큰 판매 취소하기", async () => {
      await market.cancelSaleToken(1, { from: deployer });

      const list = await market.getSaleTokenList();
      console.log(list);
    });

    it("판매중인 토큰 구매하기", async () => {
      await market.PurchaseToken(2, {
        from: account1,
        value: toEther("2"),
      });
      console.log("구매완료");

      // const list = await market.getSaleTokenList();
      // console.log(list);
      // 리스트가 없을 때 에러 발생

      let balance = await token.balanceOf(account1);
      console.log(balance);
    });
  });
});
