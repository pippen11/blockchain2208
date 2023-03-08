// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BreadShop {
  mapping(address => uint) public breads;

  //빵을 키는 주소 값은 숫자로 매핑

  //   struct BreadInfo {
  //     address owner;
  //     uint price;
  //     uint amount;
  //   }

  //   mapping(address => BreadInfo) public sellingBread;

  //   constructor(){

  //   }

  function buyBread() public payable {
    // require(msg.value >= 10 ** 18);
    require(msg.value >= 10 ** 18);
    //1이더보냐크냐-> 작으면 에러 밑으로안내려감
    // if (msg.value > 2 * 10 * 18) {
    //   payable(msg.sender).transfer(msg.value-2 * 10 ** 18);
    // }
    breads[msg.sender] += 1;
    //msg.sender: 트랜잭션보낸사람
    // 빵을 샀으니 산주소는 빵 한개를 추가한다
  }

  function sellBread() public payable {
    breads[msg.sender] -= 1;
    // 빵을 팔았으니 판 주소는 빵한개를 뺀다
    payable(msg.sender).transfer(0.5 * 10 ** 18);
    //빵하나 팔았으니 이더를 받는다-> 0.5이더를 받음
  }

  function getBread() public view returns (uint) {
    return breads[msg.sender];
    // 빵의 개수를 가져온다
  }

  function getSender() public view returns (address) {
    return msg.sender;
    // 보낸사람주소가져옴 여기서는 필요없음
  }
}
