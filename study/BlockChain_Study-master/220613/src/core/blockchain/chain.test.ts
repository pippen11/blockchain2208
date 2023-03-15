import { Chain } from '@core/blockchain/chain';

describe('Chain 함수 체크', () => {
    let node: Chain = new Chain(); // [GENESIS]

    it('getChain() 함수 체크', () => {
        console.log(node.getChain());
    });

    it('getLength() 함수 체크', () => {
        console.log(node.getLength());
    });

    it('getLatestBlock() 함수 체크', () => {
        console.log(node.getLatestBlock());
    });

    it('addBlock 함수 체크', () => {
        for (let i = 1; i <= 200; i++) {
            node.addBlock([`Block #${i}`]);
        }

        console.log(node.getChain());
    });
});
