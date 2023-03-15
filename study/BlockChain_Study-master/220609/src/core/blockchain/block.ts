// crypto-js
// merkle
import { SHA256 } from 'crypto-js';
import merkle from 'merkle';
import { BlockHeader } from './blockHeader';

export class Block extends BlockHeader implements IBlock {
    public hash: string;
    public merkleRoot: string;
    public data: string[];

    constructor(_previousBlock: Block) {
        // 부모 속성 가져오기
        super(_previousBlock);
        this.hash = '';
        this.merkleRoot = '';
        this.data = [];
    }
}
