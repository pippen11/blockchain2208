const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8545",
  headers: {
    "content-type": "application/json",
  },
});
// create는 axios 클라이언트 인스턴스 작성위한 메소드
// 일일이 밑에처럼 안쓰려고 이렇게쓴다
// axios.post(
//   "http://localhost:8080",
//   { data: { id: 50 } },
//   { headers: { "content-type": "application/json" } }
// );

// 이런식으로도 쓸수있다.
// const request2 = async (_data) => {
//   return await axios.post("http://localhost:8080", _data, {
//     headers: { "content-type": "application/json" },
//   });
// };

const walletListElem = document.getElementById("wallet-list");
const accountElem = document.getElementById("account");
const balanceElem = document.getElementById("balance");
const selectElem = document.getElementById("select-account");

let isCreating = false;
let interval;
let accounts = [];
//기존 목록 저장하기위해

document.forms["confirmaccount"].onsubmit = function (e) {
  e.preventDefault();
  getWallet(e.target["confirm"].value);
};

async function mineStop() {
  await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "miner_stop",
    },
  });
  clearInterval(interval);
  interval = undefined;
}

//2초마다 잔액 계속 업데이트
async function getBalance(_account) {
  // console.log(_account);
  const {
    data: { result },
  } = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [_account, "latest"],
    },
  });

  // 구조분해할당 안하면 이렇게써도됨
  //   const balanceData = (
  //     await request({
  //       data: {
  //         id: 1337,
  //         jsonrpc: "2.0",
  //         method: "eth_getBalance",
  //         params: [_account, "latest"],
  //       },
  //     })
  //   ).data.result;
  //   console.log(parseInt(parseInt(balanceData, 16) / Math.pow(10, 15)) / 1000);
  //   console.log(result);
  //   accountElem.innerHTML = _account;

  balanceElem.innerHTML =
    parseInt(parseInt(result, 16) / Math.pow(10, 15)) / 1000;
}

//이렇게해야 다른거클릭했을때 멈춰준다
// async앞에 붙이는거랑 getBalance앞에 await붙여도됨
function getWallet(_account) {
  // if (interval !== undefined) mineStop();
  accountElem.innerHTML = _account;
  getBalance(_account);
  selectElem.innerHTML = "";

  accounts.forEach((item) => {
    if (item !== _account)
      selectElem.innerHTML += `<option value="${item}">${item}<option>`;
  });
  // paseInt(result,16)은 16진수를 10진수로 바꾸고 10의 15승으로 나누고 소수점 세자리까지로 나타내기위해 1000으로나눔
  //   balanceElem.innerHTML = result;
  //   let address = _account;
  //   const data = await request({
  //     data: {
  //       id: 1337,
  //       jsonrpc: "2.0",
  //       method: "eth_getBalance",
  //       params: [`${address}`],
  //     },
  //   });
  //   console.log(data);
}

async function getAccounts() {
  const {
    data: { result },
    // {data:{result}}-> result로쓰면 여러개나온다
    //data여러개나오니 result로 구조분해할당해서 띄우려고씀
  } = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "eth_accounts",
    },
  });
  //request는 함수자체
  console.log(result);
  // result.unshift(confirmtest);
  walletListElem.innerHTML = "";
  // 계정생성후 함수 실행시키면 중복해서 계속뜨니 초기화시킴
  result.forEach((item) => {
    walletListElem.innerHTML += `<li onclick="getWallet('${item}')">${item}</li>`;
    // 템플릿리터널으로 묶어서 다른걸로 묶음
  });
  accounts = result;
}

getAccounts();
// mineStop();

document.forms["new-wallet"].onsubmit = async function (e) {
  e.preventDefault();
  if (e.target["new-pw"].value.length < 5 || isCreating) return;
  // 비밀번호 조건걸었따 true면 return 시킴
  isCreating = true;

  await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "personal_newAccount",
      params: [e.target["new-pw"].value],
    },
  });
  await getAccounts();
  // 불러와서 새로고침안해도 뜨게함 모든작업
  e.target["new-pw"].value = "";
  isCreating = false;
};

//params안넣어도 넣어도상관없음
document.getElementById("start").onclick = async function () {
  if (accountElem.innerHTML === "") return;
  // 위에 지갑주소 없으면 돌리면 안돼서 if적어줘야함
  await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "miner_setEtherbase",
      params: [accountElem.innerHTML],
    },
  });
  // miner할 이더계정 설정
  await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "miner_start",
    },
    // params: [1],
  });
  // 2초마다 잔액 계속 업데이트
  interval = setInterval(() => {
    getBalance(accountElem.innerHTML);
  }, 2000);
};

document.getElementById("stop").onclick = mineStop;
// 온클릭에 minstop함수를 그냥 넣어줌
// console.log(mineStop);
// minstop함수 그 자체임

document.forms["transaction"].onsubmit = async function (e) {
  e.preventDefault();
  let to = selectElem.value;

  if (e.target["transaction-account"].value)
    to = e.target["transaction-account"].value;
  const datatest = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "personal_unlockAccount",
      params: [accountElem.innerHTML, e.target["tran-pw"].value],
    },
    // 트젝보내기전 계정 언락 풀어야함 params:[계정아이디,비번]
  });
  //   console.log(datatest);
  const data = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "eth_sendTransaction",
      params: [
        {
          from: accountElem.innerHTML,
          to,
          value:
            "0x" + (+e.target["ether"].value * Math.pow(10, 18)).toString(16),
          //    <input type="number" id="ehter" step="0.001" placeholder="Ether" /> form태그안에 id ehter가져와서 16진수로바꿈
          // 16진수로 만들어서 보내야함 e.target["ether"].value는 스트링으로나옴
        },
      ],
    },
  });
  getBalance(accountElem.innerHTML);
  //   console.log(data);
};
