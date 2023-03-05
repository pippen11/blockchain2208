// this is where our code goes

pragma solidity >=0.7.0 <0.9.0;

// creat a contract that can store data and return the data back

// be able to do the following

// 1. recieve information 2. store information 3. return the information back

// 스마트 계약은 이더리움 특정 주소에 모여있는 코드(함수)와 데이터(상태)의 집합이며 이는 계약을 배포할때 발생한다

// simplestoreage라는 계약에 정보를 받아들이는 방식과 정보를 저장하는 방식 정보를 반환하는 방식을 작성
contract simpleStoreage{
    // 함수 및 상태 상태는 동적데이터 

   uint storeData;
// public은 계약외부에서도 호출할수있게해준다
   function set(uint x) public {
     storeData = x*5;
   }

// view는 상태를 수정할수없다는것을 알리는 전역 제어자 계약상태가 수정되자않게해야한다
// 여기서의 returns는 계약에대한 정수를 번환하게 해준다
    function get() public view returns (uint){
        return storeData;
    }
    // uint storage = '23'  // 이건정수
    // string names = 'tom'
    // bool switchON = true
    
    // 변수는 각 단어마다 카멜케이스 대문자로쓰기! 텍스트는 작은따옴표나 큰따옴표로묶기

    //데이터 정보를 설정함수는 set 정보를 가져오는건 get으로해본다
}

// 가져오는값을 5배로곱하는함수 set get만들기