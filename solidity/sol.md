1. // SPDX-License-Identifier: GPL-3.0 : 이 라이센스는 무조건 맨위에 명시 해주셔야 에러가 나지 않습니다.

pragma solidity >=0.7.0 <0.9.0; : 솔리디티의 컴파일 버전 명시 입니다 ( 즉 0.7 ~0.9 의 버전을 사용)

contract Hello{ : 스마트 컨트랙 명시 입니다. 
 string public hi = "Hello solidity";  : hi 라는 public 함수에 hello solidity 를 넣었습니다. 
}

2. bytes : 솔리디티는 byte1 ~ byte32 까지 존재합니다. int : 기호있는 integer
uint:  기호없는 integer 
순전히 기호 있고 없는 차이는 음수의 값을 쓰냐 안쓰냐에 따라서 인티져의 범위가 달라진답니다. 
int : 기호있는 integer 
int8 : -2^7 ~ 2^7-1
int16: -2^15~2^15-1
int32: -2^31~2^31-1
int64: -2^63~2^63-1
int128 : -2^127~2^127-1
int256 (=int): -2^255~2^255-1
uint:  기호없는 integer 
uint8 : 0~2^8-1
uint16: -0~2^16-1
uint32: -0~2^32-1
uint64: -0~2^64-1
uint128 : -0~2^128-1
uint256 (=uint): 0~2^256-1

address는 20 bytes 의 길이 인데요. 


    function 이름 () public { // (public, private, internal, external) 변경가능.  
      // 내용
    }

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lec4 {
    uint256 public a = 3;
    function changeA() public{
        a =5;
    }
}

public: 모든곳에서 접근 가능
external: public 처럼 모든곳에서 접근 가능하나, external이 정의된 자기자신 컨트랙 내에서 접근 불가
 
private: 오직 private이 정의된 자기 컨트랙에서만 가능( private이 정의된 컨트랙을 상속 받은 자식도 불가능)
internal: private 처럼 오직 internal 이 정의된 자기 컨트랙에서만 가능하고, internal이 정의된 컨트랙을 상속받은 자식들도 접근이 가능
 

 view : function 밖의 변수들을 읽을수 있으나 변경 불가능
pure : function 밖의 변수들을 읽지 못하고, 변경도 불가능
viwe 와 pure 둘다 명시 안할때: function 밖의 변수들을 읽어서, 변경을 해야함.

storage : 대부분의 변수, 함수들이 저장되며, 영속적으로 저장이되어 가스 비용이 비싸답니다.
 
memory: 함수의 파라미터, 리턴값, 레퍼런스 타입이 주로 저장이 됩니다.
그러나, storage 처럼 영속적이지 않고, 함수내에서만 유효하기에 storage보다 가스 비용이 싸답니다.
 
Colldata : 주로 external function 의 파라메터에서 사용 됩니다.  예를 들어 함수를 실행할 때 파라메터의 값 자체를 calldata로 받을 수 있습니다. calldata로 받게 된다면, 값은 변경할 수 없고 읽기만 가능합니다. 
 
stack:  EVM (Ethereum Virtual Machine) 에서 stack data를 관리할때 쓰는 영역인데 1024Mb 1024개의 data를 제한적으로 저장해 사용할 수 있습니다. 예를 들어, 함수를 실행할 때 로컬 변수와 같은것들을 잠시 기억할 때 EVM이 사용을 합니다. 


1. 오늘은 인스턴스(instance)에 대해서 알아 보도록하겠습니다.
인스턴스는 주로 하나의 컨트랙에서 다른 컨트랙을 접근할 때 쓰인답니다.

// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract A{
    
    uint256 public a = 5;
    
    function change(uint256 _value) public {
        a = _value;
    } 

}

contract B{
    
    A instance = new A();
    
    function get_A() public view returns(uint256) {
        return instance.a();
    }
    function change_A(uint256 _value) public  {
        instance.change(_value);
    }    

}
컨트랙이름  인스터스의 이름 = new  컨트랙이름();

get_A 에서는 컨트랙 A의 변수를 접근해야하니 instance.a()를 써준걸 알 수가 있어요.
그리고 한가지더, 변수를 접근할때는 () 를 붙여 주셔야 리턴이 된답니다.

한가지 더 유의 하실 점은 instance 는 A 스마트 컨트랙의 분신과 같은 존재입니다.
즉 스마트컨트랙 A를 따로 배포하고, 인스턴스 A를 스마트컨트랙 B를 통해서 배포한다고 가정하였을때, 
이 두개의 컨트랙은 완전히 다르답니다. 
 
그렇기 때문에, instance를 만들어서 변수 a의 값을 변경한다해도, 스마트컨트랙 A 자체만 따로 배포한곳에는 값에 영향을 주지가 않아요. 


