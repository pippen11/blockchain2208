// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec20{


    struct Character{
        uint256 age;
        string name;
        string job;
    }
    // 이구조체는 age,name,job이있어야 만들어진다
    // 구조체는 타입이랑같다고 보면된다


    mapping(uint256=>Character) public CharacterMapping;
    // 구조체를 매핑 구조체가 타입이니 value값에 타입대신 Character
     Character[] public CharacterArray;
    // 배열도 맨앞 타입대신 character

   function createCharacter(uint256 _age,string memory _name,string memory _job) pure public returns(Character memory) {
        return Character(_age,_name,_job);
    }
    
    function createChracterMapping(uint256 _key, uint256 _age,string memory _name,string memory _job )  public {
       CharacterMapping[_key] = Character(_age,_name,_job);
    }
    
    function getChracterMapping(uint256 _key)  public view returns(Character memory){
       return CharacterMapping[_key];
    }
    
    function createChracterArray(uint256 _age,string memory _name,string memory _job )  public {
       CharacterArray.push(Character(_age,_name,_job));
    }
    
    function getChracterArray(uint256 _index)  public view returns(Character memory){
       return CharacterArray[_index];
    }
}