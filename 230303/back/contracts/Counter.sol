// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Counter {
  int256 private count;

  event Count(int256 count);

  constructor() {
    count = 0;
  }

  function getCount() public view returns (int256) {
    return count;
  }

  function increment() public {
    count += 1;
    emit Count(count);
  }

  function decrement() public {
    count -= 1;
    emit Count(count);
  }
}
// 위에 sol파일만들고
//1.npx truffle compile 컴파일한다음
//2. migrations폴더에 2_deploy_Counter.js등으로 파일 만들고 내용적어주고
//3. 그다음 npx truffle migration 하면 배포한내용이나온다
