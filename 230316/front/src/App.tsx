import { useWeb3 } from "./modules/useWeb3";
import { Mint } from "./components/Mint";
import { List } from "./components/List";

function App() {
  // 삼항연산자쓸때 {account ? :}만들고 시작
  const { chainId, account, logIn } = useWeb3();
  return (
    <div>
      <div>
        {account ? (
          <div>
            <div>ChainId:{chainId}</div>
            <div>Account:{account}</div>
            <Mint />
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                logIn();
                // 메타마스크 로그인함수 호출 useWeb3.ts파일에있음
              }}
            >
              MeataMastk Log In
            </button>
          </div>
        )}
      </div>
      <List />
    </div>
  );
}

export default App;
