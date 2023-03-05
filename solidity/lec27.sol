// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// 0.6버전 이후 try/catch 왜 써야하는가?
// 기존의 에러핸들러 assert/revert/require는 에러를 발생시키고 프로그램을 끝냄.
// 그러나 , try/catch로 에러가 났어도 , 프로그램을 종료시키지 않고 어떠한 대처를 하게 만들수있다.

//1 try catch 특징 1. try/catch문 안에서, assert/revert/require을 통해 에러가 난다면 catch는 에러를 잡지를 못하고 , 개발자가 의도한지알고 정상적으로 프로그램끝낸다

// try/catch문 밖에서 assert/revert/require을 통해 에러가 난다면 catch는 에러를 잡고 , 에러를 핸들할수있다.

//2 . 3가지 catch
// 한가지더, Panic은 0.8.0 버전에는 없고 0.8.1 버전 부터 있습니다. 
// catch Error(string memory reason) { ... } : revert 나 require을 통해 생성된 에러는 이 catch 에 잡힌답니다.
// catch Panic(uint errorCode) { ... } : 26강에서 봤던 Paninc이네여, assert 를 통해 생선된 에러가 날 때 이 catch에 잡혀요. 에러들은, division zero(나누기 0 ), 오버플로우, 배열에 없는 인덱스 접근시 등등이 있답니다.
// errorCode 는  솔리디티에서 정의 Panic 에러 별로 나온답니다. 
// 0x00: Used for generic compiler inserted panics.
// 0x01: If you call assert with an argument that evaluates to false.
// 0x11: If an arithmetic operation results in underflow or overflow outside of an unchecked { ... } block.
// 0x12; If you divide or modulo by zero (e.g. 5 / 0 or 23 % 0).
// 0x21: If you convert a value that is too big or negative into an enum type.
// 0x22: If you access a storage byte array that is incorrectly encoded.
// 0x31: If you call .pop() on an empty array.
// 0x32: If you access an array, bytesN or an array slice at an out-of-bounds or negative index (i.e. x[i] where i >= x.length or i < 0).
// 0x41: If you allocate too much memory or create an array that is too large.
// 0x51: If you call a zero-initialized variable of internal function type.

// 예를들어, 나누기가 0 이 된다면 0x12(=18) errorCode 를 리턴해요. 
// 한가지더, Panic은 0.8.0 버전에는 없고 0.8.1 버전 부터 있습니다. 

// catch(bytesmemorylowLevelData){...} : 이 catch는 로우 레벨에러를 잡습니다. 

// 자 인제 try/catch 문을 배워 보도록 해볼게요.  
// 사실 try/catch 문은
// 외부 스마트 컨트랙을 함수를 부를때 : 다른 스마트 컨트랙을 인스턴스화 하여서, try/catch문이 있는 스마트 컨트랙의 함수를 불러와서 사용.
// 외부 스마트 컨트랙을 생성 할 때 : 다른 스마트컨트랙을 인스턴스화 생성 할 때 씀
// 이 경우들로 도입되었다고 합니다.
 
// 그리고 추가적으로 , try/catch문이 있는 스마트컨트랙 내에서 함수를 부를때도 try/catch를 쓸 수 있습니다.
// 스마트컨트랙 내의 함수 부를를때 this 라는 글로벌 번수를 사용하여 try/catch를 이용할 수 있습니다.
 
 
// 1. 외부 스마트 컨트랙을 함수를 부를때 try/catch
// 2. 외부 스마트 컨트랙을 생성 할 때 try/catch
// 3. 내부 스마트 컨트랙에서 함수를 부를때 try/catch
// 그래서, 저희는  총 3가지;예제를 통해서, 어떻게 try/catch를 써야하는지 볼게요

// 1 외부 스마트컨트랙을 함수 부를때

contract math{
    
    function division(uint256 _num1,uint256 _num2) public pure returns (uint256){
        require(_num1<10,"num1 shoud not be more than 10");
        return _num1/_num2; // playTryCatch에 6 하고 3넣으면 2가된다 // 2넣고 0넣으면 panic에러가뜬다->위에패닉에러 0x12 0으로나눴을때의 에러 16진수라  10진수로변환하면 18로나옴
    }
}

contract runner{
    event catchErr(string _name,string _err);
    event catchPanic(string _name,uint256 _err);
    event catchLowLevelErr(string _name,bytes _err);
 
    math public mathInstance = new math() ;
    // math를 인스턴스화함
    
    function playTryCatch(uint256 _num1, uint256 _num2) public returns(uint256,bool){
        
        try mathInstance.division(_num1, _num2) returns(uint256 value){
            // 2가 value안에들어간다
            return(value,true);
        } catch Error(string memory _err) {
            // require에서 10넣었을때 에러걸린게 여기걸린다
            emit catchErr("revert/require",_err);
            return(0,false);
        } catch Panic(uint256 _errorCode) {
            emit catchPanic("assertError/Panic",_errorCode);
            return(0,false);
        } catch (bytes memory _errorCode) {
            emit catchLowLevelErr("LowlevelError",_errorCode);
            return(0,false);
        }
        
    } 
}