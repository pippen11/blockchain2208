// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec7{
    //storage: 대부분의 변수 , 함수들이 저장되며 , 영속적으로 저장이되어 가스비용이 비싸다
    //meomory: 함수의 파라미터, 리턴값, 레퍼런스 타입이 주로 저장이된다 , storage처럼 영속적이지않고 , 함수내에서만 유효하기에 storage보다 가스비용이 싸다
    //Colldata: 주로 external function의 파라메터에서 사용된다
    // stack: EVM에서 stack data를 관리할때 쓰는 영역인데 1024개로 제한적


    //function -string
    function get_string(string memory _str) public pure returns(string memory){
        //string을 함수내에서쓰려면 memory를 적어줘야한다
        return _str;
    }

     function get_uint(uint256 _ui) public pure returns(uint256){
         //uint256은 memory가 필요가없다?
        return _ui;
    }
}