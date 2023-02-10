const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});
// request함수를 create메소드통해서 자주 쓸 옵션을 설정해줌

const walletListElem = document.getElementById("wallet-list");
// 지갑주소들
const accountElem = document.getElementById("account");
// 현재지갑
const balanceElem = document.getElementById("balance");
// 잔액
const selectElem = document.getElementById("select-account");
// 이더 보낼 지갑 선택

let isCreating = false;
let interval;
let accounts = [];

document.forms["confirmaccount"].onsubmit = function (e) {
  //input에서 받은 값을 getwallet함수에 매개변수로 전달해서
  // 계정주소와 잔액 띄워줌
  e.preventDefault();
  getWallet(e.target["confirm"].value);
};

// 채굴정지
async function mineStop() {
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_stop",
    },
  });
  clearInterval(interval);
  // clearInterval로 채굴정지
  interval = undefined;
  // getWallet에서 undefined아닐때 채굴중지시켜줘야해서 undefined로해줌
}

async function getBalance(_account) {
  const {
    data: { result },
    // 받은data에서 result만 쓰려고 구조분해할당
  } = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [_account, "latest"],
    },
  });
  // 0이더면 0x0뜸
  //0x340aad21b3b700000 60이더기준
  //Ether : 1,000,000,000,000,000,000 wei 총 19개
  // console.log(result);

  //60000000000000000000
  // console.log(parseInt(result));
  // console.log(parseInt(result, 16));
  // 16진수값을 받아서 10진수로 바꿔라
  // console.log((10).toString(2));
  // 숫자를 2진수로 바꿔라

  //60000000000000000000
  balanceElem.innerHTML =
    parseInt(parseInt(result, 16) / Math.pow(10, 15)) / 1000;
  // result라는 16진수값을 10진수로 바꾸고 10의 15승으로 나누고 소수점 세번째까지 나타내기위해 1000으로나눔
}

async function getWallet(_account) {
  //_account는 item
  if (interval !== undefined) mineStop();
  // 채굴시작 누르고 다른계정 눌렀을때 채굴 멈춰야해서 넣어줌
  accountElem.innerHTML = _account;
  // 계정지갑주소 위에띄워줌
  await getBalance(_account);
  // getBalace로 지갑주소 매개변수로 전달
  // 지갑주소와 잔액 띄워주기위해
  selectElem.innerHTML = "";

  accounts.forEach((item) => {
    if (item !== _account)
      // item은 모든주소들 _account는 하나의 주소
      selectElem.innerHTML += `<option value="${item}">${item}<option>`;
    // 옵션 선택값 선택한주소빼고 나머지
  });
}

// 지갑 계정들을 가져온다
async function getAccounts() {
  const {
    data: { result },
    // data들을 result로 구조분해할당
  } = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_accounts",
    },
  });
  // request함수 호출
  console.log(result);
  walletListElem.innerHTML = "";
  // 초기화 안하면 forEach 이전값들 다나옴

  result.forEach((item) => {
    walletListElem.innerHTML += `<li onclick="getWallet('${item}')">${item}</li>`;
    // getWallet함수에 리스트의 각 주소를 매개변수로 전달
  });
  accounts = result;
  // result값을 accounts로 바꿔줌
}

getAccounts();
// 시작하자마자 계정가져오려고 씀
mineStop();
// 채굴되고있으면 중지해놓으려고씀

document.forms["new-wallet"].onsubmit = async function (e) {
  //지갑생성
  e.preventDefault();
  if (e.target["new-pw"].value.length < 5 || isCreating) return;
  // pw길이가 5자리 미만이나 iscreating값이 false에서 true면
  // 연속해서 못만들게막음
  // true로 밑에서바뀌면서 다돌아야 다시 생성 가능
  isCreating = true;

  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "personal_newAccount",
      params: [e.target["new-pw"].value],
    },
  });
  await getAccounts();
  //새로고침안해도 띄워줄수있게  추가해줌
  e.target["new-pw"].value = "";
  //한번 비밀번호써서 계정생성하면 그값을 초기화시킴
  isCreating = false;
};

// 채굴시작
document.getElementById("start").onclick = async function () {
  if (accountElem.innerHTML === "") return;
  // 위에 띄워진 계정이없으면 리턴시킴

  //채굴시작전 채굴할 계정 선택
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_setEtherbase",
      params: [accountElem.innerHTML],
    },
  });
  // miner할 이더계정 설정

  // 채굴시작
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_start",
    },
  });
  // setinterl함수로 계정 잔액을 2초마다 업데이트시킴
  interval = setInterval(() => {
    getBalance(accountElem.innerHTML);
  }, 2000);
};

document.getElementById("stop").onclick = mineStop;

document.forms["transaction"].onsubmit = async function (e) {
  e.preventDefault();
  let to = selectElem.value;
  // 선택값을 to로

  if (e.target["transaction-account"].value)
    to = e.target["transaction-account"].value;
  // 만약 transaction-account값이 적혀있으면
  // 그값을 to로바꿈
  const datatest = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "personal_unlockAccount",
      params: [accountElem.innerHTML, e.target["tran-pw"].value],
    },
  });
  // 트잭보내기전 계정 unlock을 해야함
  // params에 계정아이디와 비밀번호를 같이 넣어준다
  console.log(
    "0x" + (+e.target["ether"].value * Math.pow(10, 18)).toString(16)
  );
  //0x1000000000000000000
  const data = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_sendTransaction",
      params: [
        {
          from: accountElem.innerHTML,
          // 보내는사람
          to,
          //받는사람
          value:
            "0x" + (+e.target["ether"].value * Math.pow(10, 18)).toString(16),
          // 값은 16진수로 보내줘야함 0x를 앞에붙이고 그뒤에 e.target["ether"].value앞에 +붙여서 숫자로바꾸고 원래string임
          // Math.pow(10,18) 10의 18승을 곱해주고 다시 16진수로바꾼다
          // 1이더가 0이 18개 임1,000,000,000,000,000,000
        },
      ],
    },
  });
};
