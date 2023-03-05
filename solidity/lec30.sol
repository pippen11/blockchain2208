// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

//modifier

contract lec30{
    
    // function onlyAdults2(uint256 _age) public pure returns(string memory){
    //     require(_age>25,"You are not allowed to pay for the cigarette");
    //     // 위에랑 같은데 조건이 false일때 에러발생
    //     return "Your payment is scceeded";
    // }

    
    // function onlyAdults32(uint256 _age) public pure returns(string memory){
    //     require(_age>25,"You are not allowed to pay for the cigarette");
    //     // 위에랑 같은데 조건이 false일때 에러발생
    //     return "Your payment is scceeded";
    // }
    // 이렇게 똑같은함수 똑같이 많이 수정해줘야할때 modifier을 쓴다

// 이건 modifer가 파라미터값을 안받을때
     modifier onlyAdults{
         revert("You are not allowed to pay for the cigarette");
         _; // 밑에주석이랑 _;이랑 같다
    //      function BuyCigarette() public onlyAdults returns(string memory){
    //      return "Your payment is succeeded"
    //  }
     }

     function BuyCigarette() public onlyAdults returns(string memory){
         return "Your payment is succeeded";
     }


// 17넣으면 require에 걸려서 에러 19넣으면 안걸려서 에러안뜬다
     modifier onlyAdults2(uint256 _age){
         require(_age>18, "You are not allowed to pay for the cigarette");
         _;
     }

     function BuyCigarette2(uint256 _age) public onlyAdults2(_age) returns(string memory){
         return "Youre payment is succeeded";
     }


  uint256 public num = 5;
  modifier numChange{
      _;
      // 이게먼저있으니 밑에함수를 먼저실행한다는 얘기이다 결국 num은 10이됨 만약 순서가다르면 num은 15가된다
      num = 10;
  }
  function numChangeFunction() public numChange{
      num = 15;
  }
}