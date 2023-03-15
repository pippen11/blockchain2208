// TxIn 객체를 만들어주기 위한 클래스
export class TxIn {
    public txOutId: string;
    public txOutIndex: number; // txOuts 배열 인덱스값 / 코인베이스일 경우 블록의 높이로
    public signature?: string; // wallet -> blockchain server 로 들어올 때 string으로 들어온다.

    // TxIn에는 서명이 없을 수도 있다. (ex. 코인베이스)
    constructor(_txOutId: string, _txOutIndex: number, _signature: string | undefined = undefined) {
        this.txOutId = _txOutId;
        this.txOutIndex = _txOutIndex;
        this.signature = _signature;
    }

    static createTxIns(_receivedTx: any, _myUTXO: IUnspentTxOut[]) {
        let sum = 0;
        let txIns: TxIn[] = [];
        for (let i = 0; i < _myUTXO.length; i++) {
            const { txOutId, txOutIndex, amount } = _myUTXO[i];
            const item: TxIn = new TxIn(txOutId, txOutIndex, _receivedTx.signature);

            txIns.push(item);
            sum += amount;

            if (sum >= _receivedTx.amount) return { sum, txIns };
        }

        return { sum, txIns };
    }
}

/*
코인베이스 트랜잭션

block height: 1
transaction {
    hash: 0x1234099A...
    txIns: X,
    txOuts: [{
        account: '인구',
        amount: 50
    }]
}

인구50 => 0x1234099A...

다음번 채굴에도 성공한다면 hash값이 같아진다.
따라서 txIns 안의 txOutIndex 값으로 블록 높이를 넣어준다.

block height: 1
transaction {
    hash: 0x1234099A...
    txIns: [
        txOutIndex: 1
    ],
    txOuts: [{
        account: '인구',
        amount: 50
    }]
}

*/
