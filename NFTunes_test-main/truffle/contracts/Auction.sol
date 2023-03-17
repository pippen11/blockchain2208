// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./MintMusicToken.sol";
import "./node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";

contract Auction{
    //수익자
    address public TokenOwner;
    //토큰id
    uint public tokenId;
    //최소입찰가
    uint public minimumBid;
    //최고입찰자
    address public highestBidder;
    //최고입찰금액
    uint public highestBid;

    MintMusicToken public mintMusicTokenAddress;//변수에 넣어줌

    //입찰자리스트
    //(미낙찰자 데이터 저장)//환불계좌
    //토큰id=>(입찰자계정  => 입찰가)
    mapping(uint => mapping(address => uint)) refundOfBid;


    //경매등록담을배열
    uint[] public AuctionList;

    //event
    event AuctionInfo (address indexed owner, uint256 indexed tokenId, uint256 minimumBid);//경매시작정보
    event AuctionCancle (address indexed owner, uint256 indexed tokenid);//경매취소 정보
    event AuctionEnded (address indexed winner, uint256 winningBid, uint256 indexed tokenId);//경매종료정보

    constructor(address _mintMusicTokenAddress){
       mintMusicTokenAddress = MintMusicToken(_mintMusicTokenAddress);
    }

    function FilterRegistration(uint256 _tokenId) private view returns(bool){
        for(uint256 i=0; i<AuctionList.length; i++){
            if(AuctionList[i] == _tokenId){//이미경매등록되어있음  경매등록불가능
                return false;
            }else{//경매등록가능
                break;
            }
        }
        return true;
    }

    //Auction정보등록하는함수
    //**경매시간은 년 월 일 시간까지 설정가능하다 */
    function SimpleAuction(uint256 _tokenId, uint256 _minimumBid) public {
        TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);//tokenId로 나오는 계정을 TokenOwner변수에 담아주었다 

        require(FilterRegistration(_tokenId) , "Token already registered");//토큰이 등록이 된 토큰이면 안된다
        require(_minimumBid > 0 , "Minimum bid must be at least 0");//최소입찰가는  0초과이여야됨
        require(TokenOwner == msg.sender ,"Register your own token");//토큰주인이 경매등록을하는가
        
        tokenId = _tokenId;
        minimumBid = _minimumBid;

        AuctionList.push(_tokenId);//경매리스트를 배열에 담음

        emit AuctionInfo (TokenOwner, tokenId, minimumBid);

    }

    //리스트확인 함수
    function CheckList() public view returns(uint256[] memory){
        return AuctionList;
    }
 
    // 가격제시함수 + 입찰
    // 가격제시는 몇번이고 가능
    function OfferBid(uint256 _tokenId) public payable {
        TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);
        
        require(TokenOwner != msg.sender ,"Token owner cannot be a bidder");//토큰주인이 입찰자가 될수 없다
        require(msg.value > minimumBid , "The price I offer must be higher than the lowest bid");//제시한가격이 최저입찰가보다 높아야한다
        require(msg.value > highestBid , "Please provide the highest bid");//내가제시한가격이 최고입찰가보다 높아야된다 
        require(msg.sender.balance > msg.value , "Token balance is less than the amount presented");// 내가제시한 금액보다 더 많은 돈을 가지고 있어야 된다  
    
        if (highestBid != 0) {
            refundOfBid[_tokenId][highestBidder] += highestBid; 
        }//최고입찰금액이 0이 아니라면  즉  입찰자가 있다면, 그사람의 데이터를 맵핑에 저장 나중에 돈을 돌려줘야됨

        highestBidder = msg.sender;
        highestBid = msg.value;

        payable(address(this)).transfer(highestBid);//todo:주인말고 다른통장에 넣어놓아야할것같다//모든입찰자의 돈을 걷어놓는다
     
        //경매종료함수
    }

    function FilterUnregistration(uint256 _tokenId) private view returns(bool){ 
        for(uint256 i=0; i<AuctionList.length; i++){
            if(AuctionList[i] == _tokenId){//이미경매등록되어있음 취소가능
                break;
            }else{//경매등
                return false;
            }
        }
        return true;
        }
    
    //옥션취소함수 (시간은 안끝났지만 마음이변해서 취소하고싶을때, 입찰자는 없어야됨, 대신 경매종료시간이 지나기전에만 가능)
    function CancelAuction(uint256 _tokenId) public {
        TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);

        require(FilterUnregistration(_tokenId),"Not a registered token");//애초부터 경매등록이 된 토큰이어야한다
        require(msg.sender == TokenOwner, "Only the token owner can cancel");//취소하는자는 토큰주인이여야된다 
        require(highestBid < 0, "there is a bidder");//입찰자가 있으면 안된다

        // 팔린걸 배열에서 지워주는거
        for(uint256 i = 0; i < AuctionList.length; i++) {
            if(AuctionList[i] == _tokenId ) {
                AuctionList[i] = AuctionList[AuctionList.length - 1];
                AuctionList.pop();//맨마지막요소를 날려주는 아이
            
            }
        } 
    }

    //미낙찰자들 수동으로 돈돌려받는 함수
    //미낙찰자들이 함수실행
    function ReturnBid(uint256 _tokenId) public payable {
        uint amount = refundOfBid[_tokenId][msg.sender];

        payable(msg.sender).transfer(amount);//돈돌려주고
        refundOfBid[_tokenId][msg.sender] = 0;//amount를 0으로 바꿈
    }

    // 경매종료 +  낙찰자돈을  주인한테 송금하는함수
    function EndAuction(uint256 _tokenId) public {
        TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);

        mintMusicTokenAddress.transferFrom(TokenOwner, highestBidder, _tokenId);//권한이전

        // 팔린걸 배열에서 지워주는거
        for(uint256 i = 0; i < AuctionList.length; i++) {
            if(AuctionList[i] == _tokenId ) {
                AuctionList[i] = AuctionList[AuctionList.length - 1];
                AuctionList.pop();//맨마지막요소를 날려주는 아이
            }
        } 

        emit AuctionEnded (highestBidder, highestBid, _tokenId);
    }    
}


