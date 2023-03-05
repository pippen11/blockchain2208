// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract lec24{
    string[] private countryList = ["South Korea","North Korea","USA","China","Japan"];
    
    function linearSearch(string memory _search) public view returns(int256,string memory){
        
        for(uint256 i=0; i<countryList.length; i++){
            if(keccak256(bytes(countryList[i])) == keccak256(bytes(_search))){
                return (i,countryList[i]);
            }
        }
        
        return(99,"Nothing");
        
    }

}
 // linearSearch는 배열의 값을 검색할때 쓴다

//만약 Taiwan을 넣으면 계속 비교해서 돌다가 없어서 맨밑에게나온다
  
  // 솔리디티는 스트링비교 "aa"=="aa" 이런게 없어서 bytes화 시켜서 해시화 시켜야 비교가능