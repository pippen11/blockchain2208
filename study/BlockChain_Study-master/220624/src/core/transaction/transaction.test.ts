import { Transaction } from './transaction';
import { TxIn } from './txin';
import { TxOut } from './txout';

describe('Transaction 생성', () => {
    // 코인베이스 (첫번째 트랜잭션)
    // 코인베이스에는 TxIn의 내용이 없다. (TxOut만 존재)
    let txin: TxIn;
    let txout: TxOut;
    let transaction: Transaction;

    it('txIn 생성하기', () => {
        txin = new TxIn('', 0); // 인자값: 1.txOutId 2.txOutIndex 3.signature(옵션)
    });

    it('txOut 생성하기', () => {
        txout = new TxOut('5d2baed8466782579ea8102a46a1b567d4e6fc6d', 50); // 인자값: 1.account 2.amount
    });

    it('transaction 생성하기', () => {
        // 트랜잭션 hash는 txIns, txOuts이 만들어져야 생성할 수 있다.
        transaction = new Transaction([txin], [txout]);
        console.log(transaction);
        const UTXOs = transaction.createUTXO();
        console.log('UTXOs : ', UTXOs);
    });
});
