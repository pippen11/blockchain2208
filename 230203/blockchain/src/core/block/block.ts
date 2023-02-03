console.log("block 확인중");

// const merkle = require("merkle");
// const SHA256 = require("crypto-js").SHA256;
// const hexToBinary = require("hex-to-binary");
import merkle from "merkle";
import { SHA256 } from "crypto-js";
import hexToBinary from "hex-to-binary";
//16진수를 2진수로

class BlockHeader implements IBlockHeader {
  // implements는 interface를 기준으로 타입을 확인한다.
  // class의 프로터티의 타입을 선언해주는 것이 아닌 정상적으로 타입이 정의되었나 확인한다.
  version: string;
  merkleRoot: string;
  timestamp: number;
  height: number;
  difficulty: number;
  nonce: number;

  constructor(_data: Array<ITransaction>, _previousBlock?: IBlock) {
    console.log("7-14 블록 헤더 생성");
    this.version = "1.0.0";
    const merkleRoot: TResult<string, string> = this.createMerkleRoot(_data);
    if (merkleRoot.isError === true) {
      // 확실하게 확인하면 msg 또는 value를 구분할수잇다
      this.merkleRoot = "";
      console.error(merkleRoot.msg);
    } else if (merkleRoot.isError === false) {
      this.merkleRoot = merkleRoot.value;
    }

    this.setTimestamp();
    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.difficulty = 0;
    this.nonce = 0;
  }

  setTimestamp(): void {
    //메서드내에 return이없어서 void다
    console.log("7-16 현재시간으로 블록 생성 시간 설정");
    this.timestamp = Date.now();
  }

  createMerkleRoot(_data: Array<ITransaction>): TResult<string, string> {
    // 여기서의 <string>은 ErrorCheck.d.ts파일의 매개변수로 T로 들어감
    console.log("7-15 머클 루트 생성");
    if (!Array.isArray(_data) || !_data.length) {
      return { isError: true, msg: "data가 배열이 아니거나 빈배열" };
    }
    return {
      isError: false,
      value: merkle("sha256")
        .sync(_data.map((item) => item.hash))
        .root(),
    };
  }

  getDifficulty({
    previousDifficulty,
    adjustmentDifficulty,
    adjustmentTimestamp,
    DAI,
    averageGenerationTime,
  }: {
    // previousDifficulty: number;
    // adjustmentDifficulty: number;
    // adjustmentTimestamp: number;
    // DAI: number;
    // averageGenerationTime: number;
    //이건 매개변수의 타입
    [keys: string]: number;
    // string 타입의 키에 대해서 값은 number 타입을 가진다
    // keys는 그냥 이름 지은거 아무거나 적어도됨 통상적으로 keys
    // 이렇게 줄여서 적을수있음
  }): void {
    console.log("7-17 난이도 설정");

    //void는 return없다 함수의 타입
    if (this.height < DAI) this.difficulty = 0;
    else if (this.height < DAI * 2) this.difficulty = 1;
    else if (this.height % DAI !== 0) {
      this.difficulty = previousDifficulty;
    } else {
      const timeToken: number = this.timestamp - adjustmentTimestamp;

      if (timeToken < averageGenerationTime * 0.9) {
        this.difficulty = adjustmentDifficulty + 1;
      } else if (timeToken > averageGenerationTime * 1.1) {
        this.difficulty = adjustmentDifficulty - 1;
      } else {
        this.difficulty = adjustmentDifficulty;
      }
    }
  }
}

class Block extends BlockHeader implements IBlock {
  previousHash: string;
  hash: string;
  data: Array<ITransaction>;

  constructor(
    _data: Array<ITransaction>,
    _previousBlock?: IBlock,
    _adjustmentBlock?: IBlock,
    _config?: IConfig
    //앞에 빈칸이 있을 수 없기 때문에 입력되지 않을수도 있는 ?는
    //뒤로 빠져야한다.
  ) {
    console.log("7-13 블록 생성시 블록 헤더 생성");
    super(_data, _previousBlock);
    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    if (this.merkleRoot) {
      if (_adjustmentBlock && _config) {
        this.getDifficulty({
          previousDifficulty: _previousBlock.difficulty,
          adjustmentDifficulty: _adjustmentBlock.difficulty,

          adjustmentTimestamp: _adjustmentBlock.timestamp,

          DAI: _config.DAI,
          averageGenerationTime: _config.averageGenerationTime,
        });
      }

      this.hash = Block.createHash(this);
      if (_adjustmentBlock && _config) {
        this.updateBlock({
          previousDifficulty: _previousBlock.difficulty,
          adjustmentDifficulty: _adjustmentBlock.difficulty,

          adjustmentTimestamp: _adjustmentBlock.timestamp,

          DAI: _config.DAI,
          averageGenerationTime: _config.averageGenerationTime,
        });
      }
    } else {
      this.hash = "";
    }
    this.data = _data;
  }

  static createHash(_block: IBlock): string {
    console.log("7-18 해시생성");

    let tempStr = "";
    const keys = Object.keys(_block);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "hash" || keys[i] === "data") {
        continue;
      }
      tempStr += _block[keys[i]];
    }

    return SHA256(tempStr).toString().toUpperCase();
  }

  updateBlock(difficultyOptions: { [keys: string]: number }): void {
    console.log("7-19 난이도에 따라 문제 풀이");

    // 0의 갯수를 난이도에따라 찾아서 돌림
    let hashBinary = hexToBinary(this.hash);
    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      this.nonce += 1;
      this.setTimestamp();
      this.getDifficulty(difficultyOptions);
      this.hash = Block.createHash(this);
      hashBinary = hexToBinary(this.hash);
    }
  }

  static isValidBlock(
    _newBlock: IBlock,
    _previousBlock: IBlock
  ): TResult<IBlock, string> {
    if (_newBlock.height !== _previousBlock.height + 1) {
      return { isError: true, msg: "높이가 다르다." };
    }
    if (_newBlock.previousHash !== _previousBlock.hash) {
      return {
        isError: true,
        msg: "이전블록의 해시와 새로운 블록의 이전hash가 다르다",
      };
    }
    if (_newBlock.hash !== Block.createHash(_newBlock)) {
      return {
        isError: true,
        msg: "hash 생성중 오류 발생",
      };
    }
    return { isError: false, value: _newBlock };
  }
}

export default Block;
