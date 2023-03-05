// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec18{

   uint256[] public ageArray;
   // uint256배열은 그값도 당연히 uint256값만 들어가야하고 지금은 [] 이라 길이가 0이다

   uint256[10] public ageFixedSizeArray;
   // 인덱스 0부터 9까지 길이 10짜리 배열이다

   string[] public nameArray=["Kal","Jhon","kerri"];
   // 이렇게 미리 값을 정해줄수있다.
   
   // mapping이나 배열 둘다 초기값을 바꾸면 업데이트를 따로 해줘야 바뀐다 numMap[0]=num; 뭐이런식 맵핑은
   // mapping과 array는 값을 받아도 그뒤에 변경을 해줘야한다
//    에를들어서, num = 5 라는 변수가 있다고 가정해볼게요.
 
// 이 num 을 Mapping 이나 Array 에 넣었습니다.
// 그러면 Mapping 이나 Array는 num 을 5라고 인식 하겠죠!
 
// 자, 인제 저는 num = 15 로 바꿉니다.
// 그렇다면 Mapping 이나 Array는 num 을 15로 인식할까요?
// 아니요, num을 5로 인식합니다. 
// 왜냐하면, num의 레퍼런스로 저장하는게 아니라, 그 당시 값만 캡쳐해서 들고 오기 때문입니다.
   function AgeLength()public view returns(uint256){
       return ageArray.length;
   }


   // 0 -> 50/ 1 -> 70/ Length : 2
   function AgePush(uint256 _age)public{
       ageArray.push(_age);
   }

   // 1 -> 70
   function AgeGet(uint256 _index)public view returns(uint256){
       return ageArray[_index];
   }

    // 0 -> 50/ Length : 1
    // pop은 가장 최신의 값 지워져서 70이지워짐
   function AgePop()public{
       ageArray.pop();
   }
   
    // 0 -> 0/ 1 -> 70/ Length : 2
    // 만약 _index 0번째를 지우면 값만 지워지고 0으로채워진다
   function AgeDelete(uint256 _index)public{
       delete ageArray[_index];
   }

   // 0 -> 90/ 1 -> 70/ Length : 2 
   // _index 0넣고 _age 90넣으면 0대신 90으로 채워진다
   // 만약 3넣고 값넣으면 에러가 난다 범위 밖이라
   function AgeCahnge(uint256 _index, uint256 _age)public{
       ageArray[_index]= _age;
   }
}