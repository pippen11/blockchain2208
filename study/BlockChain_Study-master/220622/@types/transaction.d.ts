// 받는사람 주소 (동훈)
// 받을 양 (1000)
declare interface ITxOut {
    account: string; // 해당하는 사람의 주소
    amount: number; // 잔액. (객체 안의 amount 속성값이 하나의 단위이다.)
}

// 보내는 사람 (인구)
// 보낸 금액 (1000)
// 보내는 사람의 서명 (OTP)
declare interface ITxIn {
    txOutId: string; // ITransaction {} 의 hash 값
    txOutIndex: number; // ITransaction에 있는 txouts 배열의 인덱스
    signature?: string | undefined;
}

declare interface ITransaction {
    hash: string; // txins, txouts를 이용해 만든 hash값
    txOuts: ITxOut[];
    txIns: ITxIn[];
}

// TxIn은 UnspentTxOuts를 참조해서 만들어진다.
// TxIn 만들 때 UnspentTxOuts 삭제
// TxOut 만들 때 UnspentTxOuts 생성
declare interface IUnspentTxOut {
    txOutId: string; // TxOut을 담고 있는 트랙잭션의 hash값
    txOutIndex: number; // 트랙잭션의 txouts 배열의 인덱스
    account: string;
    amount: number;
}

// 비트코인
// account = 공개키 라고 가정
/**
 * A : 인구
 * B : 동훈
 */

/**
 * A와 B의 거래 : A -> B 전송
 * txins: [{A의 TxIn}]
 * txouts: [{A의 TxOut}, {B의 TxOut}]
 */
