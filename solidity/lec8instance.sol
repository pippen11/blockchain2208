// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;


contract A{
   
   uint256 public a = 5;

   function change(uint256 _value) public {
       a = _value;
   }

}

contract B{
   
   A instance = new A();
   //컨트랙이름  인스터스의 이름 = new  컨트랙이름();
   // 인스턴스는 A구조만 갖고오고 분신을 가져온다고보면된다 A와 인스턴스는 따로논다 A contract에서 값바꿔도  B에서 따로논다

   function get_A() public view returns(uint256) {
       // a값을 읽어오고 변경안하니까 view씀
       return instance.a();
       //변수접근할때는 괄호를 붙여줘야 5라는 a값이 리턴이된다
    //    그렇기 때문에, instance를 만들어서 변수 a의 값을 변경한다해도, 스마트컨트랙 A 자체만 따로 배포한곳에는 값에 영향을 주지가 않아요. 
   }
   function change_A(uint256 _value) public {
       instance.change(_value);
   }

}