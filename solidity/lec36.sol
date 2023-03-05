// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*
call : 로우 레벨 함수
1.송금하기
2.외부 스마트 컨트랙 함수 부르기
3. 가변적인gas
4.gas 가격 상승에따른 call사용권장
5.공격위험있기에 checks_effects_interactions_pattern사용
*/

contract add{
    event JustFallback(string _str);
    event JustReceive(string _str);
    function addNumber(uint256 _num1, uint256 _num2) public pure returns(uint256){
        return _num1 + _num2;
    }
    fallback() external payable{
        // 이더보내면서 없는함수 불러오려면 일단 payable 이더보내니까
        // caller가 add 스마트컨트랙을 불렀는데 add스마트컨트랙 없는함수를 불렀을경우 fallback 함수가 작동(ex caller에서 addnumber5를 불럿을때 이함수없으니)
        emit JustFallback("JustFallback is called");
    }
    receive() external payable{
        //receive는 add 스마트 컨트랙이 receive를 통해 이더를 받을수있다
        emit JustReceive("JustReceive is called");
    }
}

contract caller{
    event calledFunction(bool _success,bytes _output);

//1. 송금하기
    function transferEther(address payable _to) public payable{
        // 이더를 송금 받을사람 payable써줘야함, 그리고 함수자체가 이더보내는거니까 payable붙여야한다
        (bool success,) = _to.call{value:msg.value}(""); // 이건 0.7이후의 형식
        require(success,"failed to transfer ether");
    }

    //2.외부 스마트 컨트랙 함수 부르기
    function callMethod(address _contractAddr,uint256 _num1,uint256 _num2) public{
        //_contractAddr== add의 스마트컨트랙 어드레스,addNumber의 num1 num2

        (bool success, bytes memory outputFromCalledFunction)=_contractAddr.call(
            //bytes memory outputFromCalledFunction(addNumber함수의) 리턴값 bytes로 받기위해서 success뒤에 씀 
            abi.encodeWithSignature("addNumber(uint256,uint256)",_num1,_num2));
            //encodeWithSignature abi의 메서드를 이용해 외부스마트 컨트랙 부른다

        require(success,"failed to transfer ether");
        emit calledFunction(success,outputFromCalledFunction);
// true,_output": "0x0000000000000000000000000000000000000000000000000000000000000005
    }


     function callMethod3(address _contractAddr,uint256 _num1,uint256 _num2) public payable{
        //_contractAddr== add의 스마트컨트랙 어드레스,addNumber의 num1 num2

        (bool success, bytes memory outputFromCalledFunction)=_contractAddr.call{value:msg.value}(
            //bytes memory outputFromCalledFunction(addNumber함수의) 리턴값 bytes로 받기위해서 success뒤에 씀 
            abi.encodeWithSignature("Nothing()"));
            //encodeWithSignature abi의 메서드를 이용해 외부스마트 컨트랙 부른다

        require(success,"failed to transfer ether");
        emit calledFunction(success,outputFromCalledFunction);
     }
}
