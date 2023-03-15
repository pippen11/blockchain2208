// 비트코인
// account = 공개키 라고 가정

interface ITxIn {
    txOutId: string; // ITransaction {} 의 hash 값
    txOutIndex: number; // ITransaction에 있는 txouts 배열의 인덱스
    signature?: any;
}

interface ITxOut {
    address: string; // 해당하는 사람의 주소
    amount: number; // 객체 안의 amount 속성값이 하나의 단위이다. (잔액)
}

interface ITransaction {
    hash: string; // txins, txouts를 이용해 만든 hash값
    txins: ITxIn[];
    txouts: ITxOut[];
}

/**
 * A와 B의 거래 : A -> B 전송
 * txins: [{A의 TxIn}]
 * txouts: [{A의 TxOut}, {B의 TxOut}]
 */
