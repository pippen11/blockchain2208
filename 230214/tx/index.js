// npm i ethereumjs-tx
// 트랜잭션 관련 라이브러리
const ethTx = require("ethereumjs-tx").Transaction;
// 트잭 만들어주는 라이브러리

const tx = new ethTx({
  from: "0x586eDE4B460f30c440a54097c95923Ff7092bef7",
  to: "0x2DAaeaeb5f7f462a8ab2722Cef2750955d7aa1af",
  value: "0x" + Math.pow(10, 18).toString(16),
});
// 위에껀 트랜잭션을 따로 만든거다
console.log(tx);
console.log(tx.r);
console.log(tx.v);
console.log(tx.s);
{
  /* <Buffer >
<Buffer >
<Buffer > */
}
// r , s , v 서명데이터가 없다 이렇게 생성하면 서명데이터없음

// 이렇게 private키를 위에서 적은 주소와 같은거를 가져오면
// 밑에 콘솔이 서명이 값이나온다
// 0x는 buffer로 바꿀때 빼고 뒤에 "hex"를 매개변수로 넣어줌
// from이 보내주는사람이니 서명을 from이하니 그주소와 맞게 맞춘다
tx.sign(
  Buffer.from(
    "105a46c4b8b6b809bd7360b2bd4ebbfe85e5b266bffa1d53dad64b3cc3cfbcf0",
    "hex"
  )
);
//r,s,v는 sign해야 채워진다 이렇게써야 16진수로 나옴

console.log(tx);
console.log(tx.r);
console.log(tx.v);
console.log(tx.s);
{
  /* <Buffer 8f 90 e8 6d a7 8c 91 45 95 99 4d da c6 10 28 d5 68 bf e8 91 6a 7d f7 b9 62 c2 ae da 9e 2b be 6c>
<Buffer 25>
<Buffer 0b 42 68 30 5f 59 20 af 5a c5 90 41 b7 74 9a e8 65 1f 3c f8 8e 91 86 45 58 b0 c2 dc ef 91 e8 57> */
}
/// rvs에 데이터가 들어가있으면 서명이 돼있는거다
// geth에서는 트랜잭션보내기전 unlock하고 가나슈는 언락안해도됨 메타마스크는 보내기전 확인버튼이 서명

console.log(tx.serialize().toString("hex"));
// tx.serialize는 tx모든정보가 16진수로 바뀜
