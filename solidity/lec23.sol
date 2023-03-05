// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;


contract lec23{
    //contine: 다음 반복문으로 이동
    // break:반복문을 끝냄
    event CountryIndexName(uint256 indexed _index, string _name);
// event는 대문자로 시작해야함

string[] private countryList= ["South Korea", "North Korea", "USA", "China", "Japan"];

function useContinue() public{
    for(uint256 i =0; i<countryList.length;i++){
        if(i%2==1){
           continue;
            // 홀수일때 if문걸려서 다시 위로올라감
        }
        
        emit CountryIndexName(i,countryList[i]);
        //짝수일때만 이벤트가 출력이된다
    }
}

function useBreak() public{
    for(uint256 i=0; i<countryList.length;i++){
        if(i==2){
            break;
            // i가 2이면 멈춘다 1까지만 실행된다
        }
        emit CountryIndexName(i,countryList[i]);
    }
}
}