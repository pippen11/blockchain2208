const merkle = require('merkle')
// 머클루트를 만들어주는 라이브러리

const data = ['asdf', 'asdf', 'asdf', 'asdfasdf', 'asdfqwer', 'qwerqwer']

// sha256을 사용해서 암호화를 진행
const merkleTree = merkle('sha256').sync(data)
console.log(merkleTree)
/*
전체 트리 내용이 merkleTree 안에 들어가 있다.
우리가 필요한 값은 merkleRoot 값이다.
{
  root: [Function: root],
  level: [Function: level],
  depth: [Function: depth],
  levels: [Function: levels],
  nodes: [Function: nodes],
  getProofPath: [Function: getProofPath]
}
*/

const merkleRoot = merkleTree.root()
console.log(merkleRoot)
// 7C91020020680EFBE45B775942839479739294C686E15D70AD824E16822D7424

