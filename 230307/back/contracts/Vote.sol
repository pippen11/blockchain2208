// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Vote {
  string[] public candidateList;
  // 투표목록 string 배열로 타입지정

  mapping(string => uint) public votesReceived;
  // votesReceived key는 string 값은 uint로 매핑: 투표목록에대한 투표수
  event Voted(string candidate, uint votes);

  // candidate는 각 목록,votes는 투표수
  // Voted는 그냥 변수명아무거나

  //candidate는 각 핵밥,냉면,닭가슴살,단식

  // 값 프론트에서 보여주기위해 event씀

  constructor(string[] memory candidateNames) {
    // 처음배포할시에 candidateNames를 배열로해서 투표목록으로 해준다
    //["핵밥", "냉면", "닭가슴살", "단식"] 이부분이됨
    candidateList = candidateNames;
  }

  function validCandidate(string memory candidate) private view returns (bool) {
    //private는 다른곳에서 호출못하게 쓴다
    // 예외처리 투표목록과 투표 비교
    //candidate는 각 핵밥,냉면,닭가슴살,단식
    for (uint i = 0; i < candidateList.length; ++i) {
      if (
        keccak256(abi.encodePacked(candidateList[i])) ==
        keccak256(abi.encodePacked(candidate))
      ) return true;
      // 투표목록과 투표한걸 비교한다
      // 스트링끼리는 바로 비교안되도 address는 정보가 들어가있어서(길이등) 바로비교됨
    }
    return false;
  }

  // 이건 pure적은 버전
  //   function validCandidatePure(
  //     string memory candidate,
  //     string[] memory _candidateList
  //   ) private pure returns (bool) {
  //     for (uint i = 0; i < _candidateList.length; ++i) {
  //       if (
  //         keccak256(abi.encodePacked(_candidateList[i])) ==
  //         keccak256(abi.encodePacked(candidate))
  //       ) return true;

  //     }
  //     return false;
  //   }

  function totalVotesFor(string memory candidate) public view returns (uint) {
    // 투표수 받아오기
    // 이건 view고 밑에는 아닌이유?
    require(validCandidate(candidate));
    // true면 넘어가고 false면 멈춤
    return votesReceived[candidate];
    // uint값(투표수)이나옴
  }

  function voteForCandidate(string memory candidate) public {
    // 투표하기

    require(validCandidate(candidate));
    // true면 넘어가고 false면 멈춤
    votesReceived[candidate] += 1;
    //투표했으니 투표수를 +1해줌
    emit Voted(candidate, votesReceived[candidate]);
    // string,uint값 내보내준다
  }

  function candidates() public view returns (string[] memory) {
    //이것도 view인이유?
    // 투표 전체목록 받아오기
    return candidateList;
  }
}
