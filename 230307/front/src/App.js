// import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import useWeb3 from "./useWeb3";
// 계정이랑 web3메서드 쓰기위해 훅만들어서 가져옴
import axios from "axios";

function App() {
  const [web3, account] = useWeb3();

  const [candidateList, setCandidateList] = useState([]);

  //console.log(account);
  useEffect(() => {
    //useEffect안에서 async쓰고싶어서 즉시실행함수로함
    // async(asdf)만약 넣으면 끝에 ()안에 ("asdf") 이런식으로적음
    (async () => {
      const result = await axios.post("http://localhost:8080/api/send", {
        method: "candidates",
      });

      setCandidateList(result.data.candidates);

      //['핵밥','냉면','닭가슴살','단식']
    })();
    // 함수를 즉시 실행하는 이름 그대로 즉시실행함수다.
    // - 함수 전체를 ()로 묶고 끝에 ()를 붙여준다.
  }, []);

  return (
    <div className="App">
      <h1>오점뭐?</h1>
      <div className="vote-list">
        {candidateList.map((item, idx) => (
          <Candidate
            key={`candidate=${idx}`}
            item={item}
            account={account}
            web3={web3}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

// 외부 파일로 빼던 컴포넌트를 같은 파일내에서 정의
const Candidate = ({ item, account, web3 }) => {
  const [vote, setVote] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await axios.post("http://localhost:8080/api/send", {
        method: "totalVotesFor",
        item,
      });
      // 투표수 가져오기
      // console.log(result.data);
      setVote(result.data.vote);
      // 투표수를 넣어줌

      web3.eth
        .subscribe("logs", { address: result.data.CA })
        .on("data", (log) => {
          // subscribe로 소켓통신으로 받아오고있다.
          // subscribe 메서드를 사용해서 블록체인네트워크에 구독, 이벤트명은 logs이다.
          // Solidity에서 event 이벤트명(로그를 남길 데이터/변수)를 선언하고
          // event Voted(string candidate, uint votes);
          // 로그를 남길 순간에 emit으로 구독한 서버에 알린다.
          // emit Voted(candidate, votesReceived[candidate]);
          // emit으로 전달된 데이터는 log.data에 들어있다
          // subscribe의 두번째 매개변수에 옵션을 추가할수 있으며 address 옵션은 해당 주소에
          // 대해서만 logs를 받는다.
          // console.log(log);
          const params = [
            { type: "string", name: "candidate" },
            { type: "uint", name: "votes" },
          ];
          // 여기서의 params값은 event Voted(string candidate, uint votes); .sol파일의
          // event와 맞춰야한다

          const value = web3.eth.abi.decodeLog(params, log.data);

          // console.log(value.candidate, item, value.votes);
          //value.candidate그에맞는 리스트
          // item전부다
          // value.votes는 투표수
          if (value.candidate == item) {
            // console.log("투표됨");
            setVote(value.votes);
          }
        });
    })();
  }, []);

  const onClick = async () => {
    const result = await axios.post("http://localhost:8080/api/send", {
      method: "voteForCandidate",
      candidate: item,
      from: account,
      //트랜잭션하려면 from 보내야한다
    });
    // console.log(result);

    //voteForCandidate 이거에서 받은값을 메타마스크에서 트잭보내고
    // 그때서야 voteForCandidate함수가 호출돼서 emit을타고 subscribe를 타서 값이변한다
    web3.eth.sendTransaction(result.data);
    // 메타마스크 통해서 트랜잭션을 보낸다
  };

  return (
    <div className="vote-item" onClick={onClick}>
      <h3>{item}</h3>
      <div>{vote}</div>
    </div>
  );
};
