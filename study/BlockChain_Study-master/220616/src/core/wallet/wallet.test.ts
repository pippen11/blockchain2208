// 테스트 코드 실행 npx jest ./src/core/wallet

import { randomBytes } from 'crypto';
// randomBytes() : 랜덤으로 byte를 뽑아주는 함수

import elliptic from 'elliptic';
// elliptic 라이브러리

import { SHA256 } from 'crypto-js';

const ec = new elliptic.ec('secp256k1'); // 인스턴스 생성

describe('지갑 이해하기', () => {
    let privKey: string;
    let pubKey: string;
    let signature: elliptic.ec.Signature;

    it('비밀키 생성 (privKey)', () => {
        privKey = randomBytes(32).toString('hex'); // 16진수로 32 byte 가져오기 (64글자)
        console.log('길이 : ', privKey.length);
    });

    it('공개키 생성하기', () => {
        // 현재 privKey는 string이기 때문에 keyFromPrivate()를 이용해 값으로 변환
        // 컴퓨터가 읽을 수 있는 값으로,,
        const keyPair = ec.keyFromPrivate(privKey);
        // console.log(keyPair);
        pubKey = keyPair.getPublic().encode('hex', true);
        console.log(pubKey);
    });

    it('디지털 서명', () => {
        /**
         * 서명을 만들 때 필요한 값
         * 개인키, hash값 (transaction hash, 거래내역 해싱한 값)
         */
        const keyPair = ec.keyFromPrivate(privKey);
        const hash = SHA256('ingoo').toString(); // 원래는 트랜잭션 내용이 들어감

        signature = keyPair.sign(hash, 'hex');
        console.log(signature);
    });

    it('검증 (verify)', () => {
        // 필요한 값 : hash값, 서명, 공개키
        const hash = SHA256('ingoo').toString();
        const verify = ec.verify(hash, signature, ec.keyFromPublic(pubKey, 'hex'));
        console.log(verify);
    });

    // 이더리움 방식
    // 앞에서 12byte (16진수 24글자) 잘라서 만든다.
    it('계정 만들기(주소)', () => {
        const buffer = Buffer.from(pubKey);
        const address = buffer.slice(26).toString();
        console.log(address.length);
    });
});
