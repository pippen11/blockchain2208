// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

//3. 어디서 쓰는가?
// 1. 외부 스마트 컨트랙을 함수를 부를때 : 다른 스마트 컨트랙을 인스턴스화하여 , try/catch문이 있는 스마트 컨트랙의 함수를 불러와 사용
// 2. 외부 스마트 컨트랙을 생성 할 때 : 다른 스마트컨트랙을 인스턴스화 생성 할때 씀
// 3. 내부 스마트 컨트랙에서 함수를 부를때 : this를 통해 try/catch를 씀

// 외부 스마트컨트랙을 생성할때

// 이게 외부 스마트 컨트랙
contract character{
    string private name;
    uint256 private power;
    constructor(string memory _name, uint256 _power){
        // revert("error") 이렇게 일부러 에러내면 catch로빠진다
        name = _name;
        power = _power;
    }

}
// 여기 runner엔 try catch가 들어있다
contract runner{
    event catchOnly(string _name,string _err);
    function playTryCatch(string memory _name, uint256 _power) public returns(bool){
        
        try new character(_name,_power) {
            // 이렇게 써도 인스턴스화 되나봄
            // revert("errors in the try/catch block");
            // 이런식으로 try안에넣어주면 revert같은거 넣어주면 프로그램은 바로멈춤
            return(true);
        }
        catch{
            emit catchOnly("catch","ErrorS!!");
            // catch하나로 모든에러다잡는다
            return(false);
        }
        
        
    } 
}

// 스마트 컨트랙 내에서 함수를 부를때

contract runner2{
    event catchOnly(string _name,string _err);

    function simple() public returns(uint256){
        return 4;
    }

    function playTryCatch() public returns(uint256,bool){
        try this.simple() returns(uint256 _value){
            // this는 runner2이다
            return(_value,true);
        }catch{
            emit catchOnly("catch","ErrorS!!");
            return(0,false);
        }
    }
}






