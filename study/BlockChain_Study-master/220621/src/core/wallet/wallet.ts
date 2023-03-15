// transaction 내용에 대한 검증 파일

import { SHA256 } from 'crypto-js';
import elliptic from 'elliptic';

const ec = new elliptic.ec('secp256k1');

export type Signature = elliptic.ec.Signature;

export interface ReceivedTx {
    sender: string;
    received: string;
    amount: number;
    signature: Signature;
}

export class Wallet {
    public publicKey: string;
    public account: string;
    public balance: number;
    public signature: Signature;

    constructor(_sender: string, _signature: Signature) {
        this.publicKey = _sender;
        this.account = this.getAccount();
        this.balance = 0;
        this.signature = _signature;
    }

    static sendTransaction(_receivedTx: ReceivedTx) {
        // ToDo : 서명 검증
        // 공개키를 사용해 서명 검증,
        // hash값: 보내는사람:공개키, 받는사람:계정, 보낼금액
        const verify = Wallet.getVerify(_receivedTx);
        if (verify.isError) throw new Error(verify.error);

        console.log(verify.isError);

        // ToDo : 보내는 사람의 지갑정보 최신화
        // 현재 가지고 있는 정보:publicKey, 실제 transaction 안에 넣을 정보는 account 정보
        const myWallet = new this(_receivedTx.sender, _receivedTx.signature);

        // ToDo : Balance 확인
        // ToDo : Transaction 만드는 과정
    }

    static getVerify(_receivedTx: ReceivedTx): Failable<undefined, string> {
        const { sender, received, amount, signature } = _receivedTx;
        const data: [string, string, number] = [sender, received, amount];
        const hash: string = SHA256(data.join('')).toString();

        // ToDo : 타원곡선 알고리즘 사용 -> 공개키를 이용해 서명 검증
        const keyPair = ec.keyFromPublic(sender, 'hex');
        const isVerify = keyPair.verify(hash, signature);
        // const isVerify = ec.verify(hash, signature, keyPair);
        if (!isVerify) return { isError: true, error: '서명이 올바르지 않습니다.' };

        return { isError: false, value: undefined };
    }

    getAccount(): string {
        return Buffer.from(this.publicKey).slice(26).toString();
    }

    // 필요한 값 : account , unspentTxOut[]
    static getBalance(_account: string, _unspentTxOuts: IUnspentTxOut[]): number {
        return _unspentTxOuts
            .filter((v) => {
                return v.account == _account;
            })
            .reduce((acc, utxo) => {
                return (acc += utxo.amount);
            }, 0);
    }
}
