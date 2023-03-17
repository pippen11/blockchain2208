const Subscribe_yj = artifacts.require('Subscribe_yj');

function toWei(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('Subscribe', ([deployer, acct1, acct2]) => {
  let deployedCont;
  let CA;
  console.log(deployer, acct1, acct2);
  describe('deploy subscribe', async () => {
    it('subscribe Contract', async () => {
      deployedCont = await Subscribe_yj.deployed();
      CA = deployedCont.address;
      console.log('컨트랙트 주소', CA);
    });

    it('eth_balance before sub', async () => {
      const balance = await web3.eth.getBalance(CA);
      console.log('CA 밸런스', balance);
      const balance_subscriber = await web3.eth.getBalance(acct1);
      console.log('acct1 밸런스', balance_subscriber);
    });

    it('subscribe', async () => {
      // await deployedCont.subscribe({ from: acct1, value: toWei('1') });
      const status = await deployedCont.subscribe({ from: acct1, value: toWei('1') });
      console.log(status);
      const balance = await web3.eth.getBalance(CA);
      console.log('CA 밸런스', balance);
      const balance_subscriber = await web3.eth.getBalance(acct1);
      console.log('acct1 밸런스', balance_subscriber);
    });

    it('status after subscribe', async () => {
      const sub_state = await deployedCont.getSubsribeState(acct1);
      console.log(sub_state);
      console.log(sub_state.timestamp);
    });

    it('eth_balance after sub', async () => {
      const balance = await web3.eth.getBalance(CA);
      console.log('CA 밸런스', balance);
      const balance_subscriber = await web3.eth.getBalance(acct1);
      console.log('acct1 밸런스', balance_subscriber);
    });

    it('reSubscribe', async () => {
      const status = await deployedCont.reSubscribe({ from: acct1, value: toWei('1') });
      console.log(status);
      await deployedCont.reSubscribe({ from: acct1 });
      const balance = await web3.eth.getBalance(CA);
      console.log('CA 밸런스', balance);
      const balance_subscriber = await web3.eth.getBalance(acct1);
      console.log('acct1 밸런스', balance_subscriber);
    });

    it('cancelSubscribe', async () => {
      await deployedCont.cancelSubscribe({ from: acct1 });
    });

    it('status after cancel', async () => {
      const sub_state = await deployedCont.getSubsribeState(acct1);
      console.log(sub_state);
    });

    it('eth_balance after cancel', async () => {
      const balance = await web3.eth.getBalance(CA);
      console.log('CA 밸런스', balance);
      const balance_subscriber = await web3.eth.getBalance(acct1);
      console.log('acct1 밸런스', balance_subscriber);
    });
  });
});
