import { Chain } from '@core/blockchain/chain';
import { Wallet } from '@core/wallet/wallet';

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
        for (let i = 1; i <= 5; i++) {
            // 현 높이가 2 , 두번째 블록을 가져오고 3번째 블록을 만들 때
            node.miningBlock('5d2baed8466782579ea8102a46a1b567d4e6fc6d');
        }

        console.log(node.getLatestBlock().data);
        console.log(node.getUnspentTxOuts());

        console.log(
            '총 금액 : ',
            Wallet.getBalance('5d2baed8466782579ea8102a46a1b567d4e6fc6d', node.getUnspentTxOuts()),
        );
    });
});
