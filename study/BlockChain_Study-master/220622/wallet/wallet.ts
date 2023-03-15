import { randomBytes } from 'crypto';
import elliptic from 'elliptic';
import { SHA256 } from 'crypto-js';
import fs from 'fs'; // Nodejs 파일시스템(fs)
import path from 'path';

// const dir = __dirname; // 현재 디렉토리
const dir = path.join(__dirname, '../data');

const ec = new elliptic.ec('secp256k1');

export class Wallet {
    public account: string;
    public privateKey: string;
    public publicKey: string;
    public balance: number;

    // privateKey를 인자값으로 넣을 경우, 해당 privateKey를 이용해서 생성
    // 인자값이 없을 경우 기존에 만들어 놓은 메소드를 이용해 생성
    constructor(_privateKey: string = '') {
        this.privateKey = _privateKey || this.getPrivateKey();
        // this.privateKey = this.getPrivateKey();
        this.publicKey = this.getPublicKey();
        this.account = this.getAccount();
        this.balance = 0;

        Wallet.createWallet(this);
    }

    static createWallet(myWallet: Wallet): void {
        // 파일만들기
        // writeFileSync() 인자값 : 1.파일명, 2.파일 안에 들어갈 내용들
        // 파일명을 account / 내용을 privateKey
        const filename = path.join(dir, myWallet.account);
        // console.log(filename);
        const filecontent = myWallet.privateKey;
        fs.writeFileSync(filename, filecontent);
    }

    static getWalletList(): string[] {
        // readdirSync() 인자값 : 디렉토리명
        // 디렉토리 안에 있는 파일 목록을 가져온다.
        const files: string[] = fs.readdirSync(dir);
        return files;
    }

    // 계정 정보를 받아서 개인키 구하기
    static getWalletPrivateKey(_account: string): string {
        const filepath = path.join(dir, _account);
        // 파일 내용 읽기
        const filecontent = fs.readFileSync(filepath);
        return filecontent.toString();
    }

    static createSign(_obj: any): elliptic.ec.Signature {
        const {
            sender: { publicKey, account },
            received,
            amount,
        } = _obj;

        // hashing
        const hash: string = SHA256([publicKey, received, amount].join('')).toString();

        // privateKey
        const privateKey: string = Wallet.getWalletPrivateKey(account);

        // 서명
        const keyPair: elliptic.ec.KeyPair = ec.keyFromPrivate(privateKey); // string 형태의 privateKey를 타원곡선 알고리즘에 활용하기

        return keyPair.sign(hash, 'hex');
    }

    public getPrivateKey(): string {
        return randomBytes(32).toString('hex');
    }

    public getPublicKey(): string {
        // 개인키 -> 공개키
        // 현재 개인키의 type은 string -> elliptic이 해석할 수 있게 변환 작업 필요
        const keyPair = ec.keyFromPrivate(this.privateKey);

        return keyPair.getPublic().encode('hex', true);
    }

    public getAccount(): string {
        return Buffer.from(this.publicKey).slice(26).toString();
    }
}
