const express = require("express");
const Web3 = require("web3");
const cors = require("cors");

const VoteContract = require("./build/contracts/Vote.json");
// 배포후

const app = express();
const web3 = new Web3("http://127.0.0.1:8545");

app.use(cors({ origin: true, credentials: true }));
//origin : true => 모든주소에 대해서 cors무시 *적은거랑똑같다
app.use(express.json());

app.post("/api/send", async (req, res) => {
  const networkId = await web3.eth.net.getId();
  // 네트워크 아이디
  const CA = VoteContract.networks[networkId].address;
  // 스마트 컨트랙트 주소
  // contracts폴더안 Vote.json파일을 Contrat붙임?

  const abi = VoteContract.abi;
  //sol파일 컴파일한거정보

  const deployed = new web3.eth.Contract(abi, CA);

  // abi와 ca넣어서 배포한 변수 만든다
  const obj = {};
  //빈객체에 넣어주기위해 선언

  switch (req.body.method) {
    // req.body.method가 있을때
    case "candidates":
      // method가 cadidates일때
      obj.candidates = await deployed.methods.candidates().call();
      // Vote.sol에서 투표전체목록 호출해서 보내준다
      //[ '핵밥', '냉면', '닭가슴살', '단식' ]
      //   console.log(result);
      break;
    case "totalVotesFor":
      //method가 totalVotesFor일때
      // console.log(req.body.item);
      // 각스트링으로나온다 핵밥,냉면,닭가슴살,단식
      obj.vote = await deployed.methods.totalVotesFor(req.body.item).call();
      //totalVoteFor함수를통해 각 투표된 수가 나온다
      //   console.log(obj.vote);
      obj.CA = CA;

      break;

    case "voteForCandidate":
      //   console.log(req.body.candidate);
      //mthod가 voteForCandidate일때
      obj.nonce = await web3.eth.getTransactionCount(req.body.from);
      //   nonce: 트랜잭션 갯수 << 매개변수로 전달된 지갑 주소의 Transaction 개수를 다음 트랜잭션에서 확인한다<< 생성된 트랜잭션들은 순서가 있다.
      //- 메타마스크에서 다른 계정에 Ether를 보내고 채굴을 했는데 그 지갑 주소의 트랜잭션이 순서대로 되지 않았을때 정상 작동 하지 않는 경우가 발생한다
      // - 메타마스크에서는 3개의 트랜잭션을 기억하고 있고 그래서 다음 nonce가 3으로 전달되었고/ Ganache는 새로 시작해서 그지갑 주소의 트랜잭션이 없을때는 nonce가 0이여야하지만
      // 메타마스크 기준 3으로 전달된다. -> 정상적인 트랜잭션이 아니라고 판단되어 블록에 추가되지 않는다.
      obj.to = CA;
      // 받는건 스마트컨트랙스 주소
      obj.from = req.body.from;
      // 보내는건 그 지갑 계정
      obj.data = await deployed.methods
        .voteForCandidate(req.body.candidate)
        .encodeABI();

      //보낸사람기준  트랜잭션의 총횟수
      //트랜잭션을 바로 보내는(send)하는것이 아닌 bytecode 형식으로 변환하여 data에 포함시킨다
      break;
    default:
      break;
  }
  res.json(obj);
});

app.listen(8080, () => {
  console.log("8080 server open");
});
