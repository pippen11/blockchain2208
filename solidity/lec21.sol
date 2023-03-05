// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

// if 조건문

 string private result = "";
 
    function isIt5(uint256 _number) public returns(string memory){
        if(_number == 5){
            result = "Yes, it is 5";
            return result;
        }
        else{
            result = "No, it is not 5";
            return result;
        }

    }