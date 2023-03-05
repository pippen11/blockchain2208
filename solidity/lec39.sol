// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*
interface: 스마트 컨트랙 내에서 정의되어야할 필요한것
1. 함수는 external표시
2. enum, structs가능
3. 변수, 생성자 불가(constructor x)
*/

interface ItemInfo{
    struct item{
        string name;
        uint256 price;
    }
    function addItemInfo(string memory _name,uint256 _price) external;
    function getItemInfo(uint256 _index) external view returns(item memory);
}

contract lec39 is ItemInfo{
    // lec39는 is를 통해 ItemInfo 인터페이스를 적용받음
    item[] public itemList;
    // item타입을 바로 사용가능 위에 struct있어서
    
    // 위에 인터페이스의 함수 명 똑같이적어야하고 override적어줘야한다 위에는 external적어줘야함
    function addItemInfo(string memory _name,uint256 _price) override public{
        itemList.push(item(_name,_price));
    }
    function getItemInfo(uint256 _index) override public view returns(item memory){
        return itemList[_index];
    }
}
