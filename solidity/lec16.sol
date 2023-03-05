// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract Father{
    event FatherName(string name);
    function who() public virtual{
        emit FatherName("KimDaeho");
    }

}


contract Mother{
    event MotherName(string name);
    function who() public virtual{
        emit MotherName("leeSol");
    }

}




contract Son is Father, Mother{
    // Father , Mother중에 오른쪽에 쓴 가장 최신껄 가져와서 override해서 who는 mother껄 들고온다
    
    function who() public override(Father,Mother){
        
        super.who(); 
       
    }
}