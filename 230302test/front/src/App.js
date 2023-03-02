import useWeb3 from "./useWeb3";
import Counter from "./Counter";
function App() {
  const [web3, account] = useWeb3();
  // console.log(web3);
  // 함수가 나오고
  // console.log(account);
  // 계정 하나가나온다
  if (!account) return <h1>메타마스트 설치 및 계정 연결해줘</h1>;
  return (
    <div className="App">
      <h1>Account: {account}</h1>
      <Counter web3={web3} account={account} />
    </div>
  );
}

export default App;
