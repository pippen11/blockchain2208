// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
  function totalSupply() external view returns (uint);

  // 함수로 쓰는형식 이더측에서 정해놈

  // 토큰(코인)의 총 수량

  function balanceOf(address account) external view returns (uint);

  // 지갑 계정의 잔액(토큰)

  function transfer(address recipient, uint amount) external returns (bool);

  //토큰(코인)보내기

  function allowance(address owner, address spender) external returns (uint);

  //권한 위임받는 토큰을 관리하는 데이터 공간

  function approve(address spender, uint amount) external returns (bool);

  // 권한을 위임하는 메서드

  function transferFrom(
    address sender,
    address recipient,
    uint amount
  ) external returns (bool);

  // 권한을 위임받는 토큰에대해 거래(보내기)

  event Transfer(address indexed from, address indexed to, uint amount);
  // 거래시 기록하는 이벤트
  event Approval(address indexed owner, address indexed spender, uint amount);
  // 권한 위임시 기록하는 이벤트
}
