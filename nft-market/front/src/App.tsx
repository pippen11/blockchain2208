import { useWeb3 } from "./modules/useWeb3";
import { Mint } from "./components/Mint";
import { List } from "./components/List";

function App() {
  // 삼항연산자쓸때 {account ? :}만들고 시작
  const { chainId, account, logIn, web3 } = useWeb3();
  return (
    <div>
      <div>
        {account && web3 ? (
          // account랑 web3있을때만
          <div>
            <div>ChainId:{chainId}</div>
            <div>Account:{account}</div>
            <Mint account={account} web3={web3} />
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                logIn();
                // 메타마스크 로그인함수 호출 useWeb3.ts파일에있음
              }}
            >
              MetaMask Log In
            </button>
          </div>
        )}
      </div>
      <List account={account} />
    </div>
  );
}

export default App;
