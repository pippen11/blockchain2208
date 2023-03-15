// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

// Solidity에도 interface가 존재
// ERC20에 사용되는 인터페이스
interface IERC20 {

    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);

    // 토큰 스왑
    // 위임 받은 돈을 관리하는 공간
    // 데이터 저장 공간
    function allowance(address owner, address spender) external view returns (uint); 
    
    // 제 3자가 돈을 사용할지 말지 허락
    // 위임장
    function approve(address spender, uint amount) external returns (bool);

    // 관리하는 돈을 보내는 메소드
    function transferFrom(address spender, address recipient, uint amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    // Transfer 함수의 로그 기록을 받아올 때 
    // indexed 가 적혀있는 것을 기준으로 구분해서 가져온다.
    // primary key 같은 존재
    
    // 위임장
    event Approval(address indexed owner, address indexed spender, uint value);
}


/*
    접근제한자

    public
    internal

    private : 
    external : 상속까지는 허용 

*/

/*
    allowance[보내는사람][관리자] = 3000

    allowance[account1][account3] = 3000
    allowance[account2][account3] = 2000

    account1이 account3에게 위임해야만 가능하다.
    account3이 account1의 코인을 3000개 관리할 수 있음
    account3이 account2의 코인을 2000개 관리할 수 있음
*/

/*
    A라는 사람이 있음. 토큰 10000개
    B라는 사림이 있고 A의 토큰에 대한 위임장 (approve)

    allowance[보내는사람][관리자] = 5000
    arr[B][A] = 5000

*/