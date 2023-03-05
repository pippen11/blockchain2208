// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract Father{
    event FatherName(string name);
    function who() public virtual{
        emit FatherName("KimDaeho");
    }

}

contract Son is Father{
    event sonName(string name);
    function who() public override{
        // emit FatherName("KimDaeho");
        super.who(); // super로 위에껄쓸수있다 super를 쓰면 그대로 Father 컨트랙의 이벤트를 들고 올 수 있다 여러줄의 코드를 써야하면 간편하게
        emit sonName("kimJin");
    }
}