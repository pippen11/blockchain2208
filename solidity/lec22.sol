// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec22{
event CountryIndexName(uint256 indexed _index, string _name);
// event는 대문자로 시작해야함

string[] private countryList= ["South Korea", "North Korea", "USA", "China", "Japan"];

function forLoopEvents() public{
    for(uint256 i =0; i<countryList.length;i++){
        emit CountryIndexName(i,countryList[i]);
    }
}

function whileLoopEvents() public{
    uint256 i=0;
    while(i<countryList.length){
        emit CountryIndexName(i,countryList[i]);
        i++;
    }
}

  function doWhileLoopEvnents() public{
      uint256 i =0;
      do{
          emit CountryIndexName(i,countryList[i]);
          i++;
      }
      while(i<countryList.length);
  }

}