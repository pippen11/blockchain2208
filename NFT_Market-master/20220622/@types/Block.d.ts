declare interface IBlock extends IBlockHeader {
    merkleRoot: string
    hash: string
    nonce: number
    difficulty: number
    data: ITransaction[]
}

declare interface IBlockHeader {
    version: string
    height: number
    timestamp: number
    previousHash: string
}
