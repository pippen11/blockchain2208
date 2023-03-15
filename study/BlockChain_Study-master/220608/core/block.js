// 함수 혹은 클래스를 이용해서 블록 생성
// 매개변수의 변수명인지 클래스 속성값인지를 구분하기 위해 매개변수에 언더바를 붙여주는 관례가 있다.
const merkle = require('merkle')
const SHA256 = require('crypto-js/sha256')

class BlockHeader {
    constructor(_height, _previousHash) {
        this.version = BlockHeader.getVersion() // 버전이 바뀌지 않는 이상 고정값, X
        this.height = _height  // O
        this.timestamp = BlockHeader.getTimestamp() // X
        this.previousHash = _previousHash || '0'.repeat(64)
    }

    // 정적 메소드
    // static 메소드의 경우 인스턴스가 해당 메소드를 갖지 않는다.
    static getVersion() {
        return '1.0.0'
    }

    static getTimestamp() {
        return new Date().getTime()
    }
}
// getVersion() {}
// 인스턴스를 생성하고 난 다음 사용할 수 있는 메소드

// static getVersion() {}
// 인스턴스를 생성하기 전에 사용할 수 있는 메소드

// new 키워드를 사용해서 class 문법을 사용했을 때 나오는 결과물의 객체를 인스턴스라고 한다.
const header = new BlockHeader(0)
console.log('blockheader : ', header)

const data = [ "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks" ]

// previousHash <- 이전 블록의 해시값
// block에서 첫번째 블록에는 이름이 붙는다 => 제네시스 블록
// 제네시스 블록에는 previousHash 값이 존재하지 않는다.


class Block {
    constructor(_header, _data) {
        const merkleroot = Block.getMerkleRoot(_data)
        this.version = _header.version
        this.height = _header.height
        this.timestamp = _header.timestamp
        this.previousHash = _header.previousHash
        this.hash = Block.createBlockHash(_header, merkleroot)
        this.merkleRoot = Block.getMerkleRoot(_data)
        this.data = _data
    }

    static getMerkleRoot(_data) {
        const merkleTree = merkle('sha256').sync(_data)
        const merkleRoot = merkleTree.root()
        return merkleRoot
    }

    static createBlockHash(_header, _merkleroot) {
        // header에 있는 모든 정보를 string으로 연결하고 싶다.
        // 1. header 객체 안에 있는 값을 string으로 연결
        const values = Object.values(_header)
        const data = values.join('') + _merkleroot
        return SHA256(data).toString()
    }
}

const block = new Block(header, data)
console.log(block)

// 매개변수는 3개 이상을 넘지 않도록,,
// OOP , 객체지향적 사고가 필요,,
/*

    _version, 
    _height, 
    _timestamp, 
    _previousHash, 
    _hash, 
    _merkleRoot, 
    _data

*/

// const block = new Block('a')
// console.log(block)