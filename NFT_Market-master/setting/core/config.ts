/**
 * 블럭 생성 시간 (단위:분)
 */
export const BLOCK_GENERATION_INTERVAL: number = 10
/**
 * 난이도 조정 블록 범위
 */
export const DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10
/**
 * 블럭 한개당 생성하는 시간(단위:초)
 */
export const BLOCK_GENERATION_TIME: number = 60
export const COINBASE_AMOUNT: number = 50

export const INTERVAL_BALANCE: number = 1000
export const GENESIS: IBlock = {
    version: '1.0.0',
    height: 0,
    hash: '0'.repeat(64),
    previousHash: '10'.repeat(63),
    timestamp: 1231006506,
    merkleRoot: 'FFA..',
    difficulty: 0,
    nonce: 0,
    data: ['hello world!'],
}
