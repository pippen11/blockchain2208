import { TxIn } from './txin';
import { TxOut } from './txout';
import { UnspentTxOut } from './unspentTxOut';
import { SHA256 } from 'crypto-js';

export class Transaction {
    public hash: string; // 해당 트랜잭션의 고유한 값
    public txIns: TxIn[];
    public txOuts: TxOut[];

    constructor(_txIns: TxIn[], _txOuts: TxOut[]) {
        this.txIns = _txIns;
        this.txOuts = _txOuts;
        this.hash = this.createTransactionHash();
    }

    // 해당 메소드는 인스턴스 생성 후에 만들어진다.
    createTransactionHash(): string {
        const txoutContent: string = this.txOuts.map((v) => Object.values(v).join('')).join('');
        const txinContent: string = this.txIns.map((v) => Object.values(v).join('')).join('');

        console.log(txoutContent, txinContent);

        return SHA256(txoutContent + txinContent).toString();
    }

    createUTXO(): UnspentTxOut[] {
        const utxo: UnspentTxOut[] = this.txOuts.map((txout: TxOut, index: number) => {
            return new UnspentTxOut(this.hash, index, txout.account, txout.amount);
        });

        return utxo;
    }

    static createTransaction(_receivedTx: any, _myUTXO: UnspentTxOut[]): Transaction {
        // ToDo : 트랜잭션 만들 때는 UTXO가 필수. utxo <- 내 계정과 일치하는

        // 1. utxo -> txIns[]
        const { sum, txIns } = TxIn.createTxIns(_receivedTx, _myUTXO);
        // console.log(txIns);

        // 2. txIn -> txOuts[]
        const txOuts: TxOut[] = TxOut.createTxOuts(sum, _receivedTx);

        // 3. new Transaction()
        const tx = new Transaction(txIns, txOuts);
        // console.log(tx);

        return tx;
    }
}
