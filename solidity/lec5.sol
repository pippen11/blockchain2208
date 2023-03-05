// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec5{
    // function 이름 () public(public,prvate,internal,external){}
    // 접근제한자
    // public 모든곳에서 접근가능, 
    //external :public처럼 모든곳에서 접근가능하나 external이 정의된 자기자신 컨트랙 내에서 접근불가( private와 반대된다)
    // private : 오직 private이 정의된 자기컨트랙에서만 가능(private이 정의된 컨트랙을 상속받은 자식도 불가능)
    // internal: private처럼 오직 internal이 정의된 자기 컨트랙에서만 가능하고 , internal이 정의된 컨트랙을 상속
    // 5강

    // 1. public

// 이렇게 변수앞에 쓰이기도한다
    uint256 public a = 5;

    // 2. private
     uint256 private a2 = 5;
     //배포하면  public 만 접근된다

}

contract Public_example{
 uint256 public a = 3;
 function changeA(uint256 _value) public{
     a = _value;
 }
 function get_a() view public returns (uint256){
     return a;
 }
 }

 contract Public_expample_2{

     Public_example instance = new Public_example();

     function changeA_2(uint256 _value) public{
         instance.changeA(_value);
     }
     function use_public_example_a() view public returns (uint256){
         return instance.get_a();
     }
 }