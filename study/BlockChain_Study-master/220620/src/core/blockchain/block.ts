// crypto-js
// merkle
import { SHA256 } from 'crypto-js';
import merkle from 'merkle';
import hexToBinary from 'hex-to-binary';
import { BlockHeader } from './blockHeader';
import {
    GENESIS,
    DIFFICULTY_ADJUSTMENT_INTERVAL,
    BLOCK_GENERATION_INTERVAL,
    BLOCK_GENERATION_TIME_UNIT,
} from '@core/config';

/*
 * Block 클래스의 목적 : 객체를 만들기 위함.
 * constructor() : 인스턴스를 만들기 위함.
 */

export class Block extends BlockHeader implements IBlock {
    public hash: string;
    public merkleRoot: string;
    public nonce: number;
    public difficulty: number;
    public data: string[];

    constructor(_previousBlock: Block, _data: string[], _adjustmentBlock: Block) {
        // 부모 속성 가져오기
        super(_previousBlock);

        const merkleRoot = Block.getMerkleRoot(_data);

        this.merkleRoot = merkleRoot;
        this.hash = Block.createBlockHash(this);
        this.nonce = 0;
        this.difficulty = Block.getDifficulty(this, _adjustmentBlock, _previousBlock); // 난이도는 유동적이어야 한다.
        this.data = _data;
    }

    public static createGENESIS(_genesis: Block) {
        _genesis.merkleRoot = Block.getMerkleRoot(_genesis.data);
        _genesis.hash = Block.createBlockHash(_genesis);

        return _genesis;
    }

    public static getGENESIS(): Block {
        return GENESIS;
    }

    // 생성될 블록에 들어갈 데이터를 이용해 merkleRoot 값 만들기
    public static getMerkleRoot<T>(_data: T[]): string {
        const merkleTree = merkle('sha256').sync(_data);
        return merkleTree.root() || '0'.repeat(64);
    }

    // 이전 블록의 정보 + merkleRoot -> 생성될 블록의 해시값
    public static createBlockHash(_block: Block): string {
        /**
         * 블록 해시 값을 만들 때 들어가는 속성
         * version, timestamp, height, merkleRoot, previousHash
         */
        // const values: string = Object.values(rest).sort().join('');
        const { version, timestamp, height, merkleRoot, previousHash, difficulty, nonce } = _block;
        const values: string = `${version}${timestamp}${merkleRoot}${previousHash}${height}${difficulty}${nonce}`;
        return SHA256(values).toString();
    }

    public static generateBlock(_previousBlock: Block, _data: string[], _adjustmentBlock: Block): Block {
        const generateBlock = new Block(_previousBlock, _data, _adjustmentBlock);

        // ToDo : newBlock은 마이닝이 완료된 블록
        const newBlock = Block.findBlock(generateBlock);

        return newBlock;
    }

    public static findBlock(_generateBlock: Block): Block {
        /**
         * ToDo : 마이닝 작업 코드
         */
        // _generateBlock <- Block이 담김.
        // hexToBinary(_generateBlock.hash); // 16진수 -> 2진수
        let hash: string;
        let nonce: number = 0;

        while (true) {
            nonce++;
            _generateBlock.nonce = nonce;
            hash = Block.createBlockHash(_generateBlock);
            const binary: string = hexToBinary(hash);
            const result: boolean = binary.startsWith('0'.repeat(_generateBlock.difficulty));
            if (result) {
                _generateBlock.hash = hash;
                return _generateBlock;
            }
        }
    }

    public static getDifficulty(_newBlock: Block, _adjustmentBlock: Block, _previousBlock: Block): number {
        // if (_adjustmentBlock.height === 0) return 0; // adjustmentBlock이 제네시스 블록일 경우, 난이도는 계속해서 0

        if (_newBlock.height <= 9) return 0;
        if (_newBlock.height <= 19) return 1;

        // 시간을 구할 때, 10번째 배수의 블록일 때만 검사하도록 구현.
        // 10개의 묶음은 같은 난이도를 갖게 된다.
        if (_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) return _previousBlock.difficulty;

        // 블록 1개당 생성시간 10분 , 10개 생성되는데 걸리는 시간 : 6000초
        const timeTaken: number = _newBlock.timestamp - _adjustmentBlock.timestamp;
        const timeExpected: number =
            BLOCK_GENERATION_TIME_UNIT * BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL; // 6000

        if (timeTaken < timeExpected / 2) return _adjustmentBlock.difficulty + 1;
        else if (timeTaken > timeExpected * 2) return _adjustmentBlock.difficulty - 1;

        return _adjustmentBlock.difficulty;
    }

    // 블록 검증 코드
    /*
        블록 검증
        height : 10 블록이라면 ,
        height : 9 블록 정보와 height : 10 블록의 정보가 필요하다.
    */
    public static isValidNewBlock(_newBlock: Block, _previousBlock: Block): Failable<Block, string> {
        /**
         * ToDo
         *      1. 이전 블록 높이 + 1 === 새로 생긴 블록의 높이 ?
         *      2. 이전 블록의 해시값 === 새로 생긴 블록의 이전 해시값 ?
         *      3. _newBlock(...) -> hash 새로 생성 === _newBlock.hash ?
         *          JWT 검증과 유사 // JWT header, payload decoding -> hash === signature ?
         */

        if (_previousBlock.height + 1 !== _newBlock.height) return { isError: true, error: 'height error' };
        if (_previousBlock.hash !== _newBlock.previousHash) return { isError: true, error: 'previousHash error' };
        if (Block.createBlockHash(_newBlock) !== _newBlock.hash) return { isError: true, error: 'block hash error' };

        return { isError: false, value: _newBlock };
    }
}
