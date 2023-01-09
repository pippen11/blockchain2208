const SHA256 = require("crypto-js").SHA256;
const merkle = require("merkle");

const data = [1, 2, 3];

const merkleRoot = merkle("sha256").sync(data).root();

const firstTree = [];
for (let i = 0; i < data.length; i++) {
  firstTree.push(SHA256(data[i].toString()).toString().toUpperCase());
}

const secondTree = [];
for (let i = 0; i < firstTree.length; i += 2) {
  let temp = ""; // 이름 그대로 임시값을 준다. 아래에서 조건에 따라 값을 정의한다.
  if (i + 1 == firstTree.length) {
    // 홀수 개이며 다음 인덱스(아이템)이 없을때
    temp = firstTree[i];
    //기존의 아이템을 그대로 사용한다
  } else {
    //다음 인덱스(아이템)이 있을때
    temp = SHA256(firstTree[i] + firstTree[i + 1])
      .toString()
      .toUpperCase();
  }
  secondTree.push(temp);
}

const oddThirdRoot = SHA256(secondTree[0] + secondTree[1])
  .toString()
  .toUpperCase();

const createMerkleRoot = (_data) => {
  //매개변수에 _붙이는 이유 : 매개변수 구분 <<이 변수는 매개변수이다 하고 알려준다.
  // _data=["fsdfsd",fsdfsd","123424","fsdfsdf"]

  // 받은 매개변수 값이 배열인지 확인
  if (!Array.isArray(_data)) return { isError: true, msg: "너배열아님" };
  //   Array.isArray는 인자가 배열인지 판별하는 메서드
  //배열이라면 true을 반환한다,return한다.
  //return을 객체로 내보내는 이유: 블록생성 후 해당 블록이 정상적인 블록인지 확인하기 위해서 객체로 내보낸다. isError를 통해서 생성 도중
  // 문제가 발생했는지를 먼저 파악 할수있다.
  // -jest에서 사용하는것이 아닌 블록 생성 단계에서 사용한다.

  //배열의 값을 전체 암호화해서 merkleArr 변수에 반환 해준다
  let merkleArr = _data.map((item) => SHA256(item).toString().toUpperCase());

  // 조건 머클루트 한개의 값이 나올때까지
  // merkleArr 배열의 길이 1이될때까지 반복
  while (merkleArr.length > 1) {
    const tempArr = [];
    //합친것을 넣어주려고 빈배열에 push함
    // 0
    for (let i = 0; i < merkleArr.length; i += 2) {
      if (i + 1 === merkleArr.length) {
        tempArr.push(merkleArr[i]);
        //
      } else {
        tempArr.push(
          SHA256(merkleArr[i] + merkleArr[i + 1])
            .toString()
            .toUpperCase()
        );
      }
    }

    merkleArr = tempArr;
  }
  return { isError: false, value: merkleArr[0] };
};

module.exports = { oddMerkleRoot: merkleRoot, oddThirdRoot };
