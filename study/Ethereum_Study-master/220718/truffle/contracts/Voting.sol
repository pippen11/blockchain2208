// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Voting {
    string[] public candidateList;
    mapping(string => uint8) public votesReceived; 
    /*
        {
            '후보자1' : 0,
            '후보자2' : 2,
        }
    */

    // 컨트랙트 배포 시점에서 candidateList에 값 할당.
    constructor(string[] memory candidateNames) {
        candidateList = candidateNames;
    }

    function voteForCandidate(string memory candidate) public {
        // 후보군에 없는 사람일 경우 실행 종료
        require(validCandidate(candidate), "Error !!");
        votesReceived[candidate] += 1;

    }
    
    // 득표수 확인
    function totalVotesFor(string memory candidate) public view returns (uint8) {
        require(validCandidate(candidate), "Error !!");
        return votesReceived[candidate];
    }

    function validCandidate(string memory candidate) private view returns (bool) {
        // 1. 후보자 리스트 : candidateList
        // 2. candidateList 안에 입력한 후보자와 일치하는 후보자가 있는지 검증
        for (uint i = 0; i < candidateList.length; i++) {
            // 0, 1, 2, 3 반복
            // 스마트 컨트랙트에서는 string 비교가 안된다.
            // keccak256 을 사용해 16진수로 변환한 뒤 해시값을 비교
            // keccak256(abi.encodePacked(candidateList[i]))
            // keccak256(abi.encodePacked(candidate))
            if (keccak256(abi.encodePacked(candidateList[i])) == keccak256(abi.encodePacked(candidate))) {
                return true;
            }

        }
        return false;
    }
}