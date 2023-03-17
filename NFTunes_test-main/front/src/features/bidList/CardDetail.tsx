import Image from 'next/image';
import styled from 'styled-components';

const DetailWrap = styled.div`
  width: 80%;
  height: 400px;
  margin: 0 auto;
  padding-top: 100px;
  display: flex;
  align-content: space-around;
  justify-content: space-between;
  font-family: 'SemiLight';
`;

const CoverWrap = styled.div`
  width: 30%;
  height: 100%;
  background-color: green;
`;

const BidInfoWrap = styled.div`
  width: 68%;
  border: solid 1px white;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const BidInfo = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  list-style: none;
  > li {
    font-size: 15px;
    color: white;
    .subject {
      width: 100px;
      display: inline-block;
      font-weight: bold;
    }
  }
`;

const CardDetail = ({ url, details }) => {
  return (
    <DetailWrap>
      <CoverWrap>
        <Image src="http://localhost:4000/upload/user.png" width="100%" height="100%" objectFit="cover" />
      </CoverWrap>
      <BidInfoWrap>
        <BidInfo>
          <li>
            <span className="subject">token Id</span>
            <span>{details.tokenId}</span>
          </li>
          <li>
            <span className="subject">음원제목</span>
            <span>{details.subject}</span>
          </li>
          <li>
            <span className="subject">컨트랙트 주소</span>
            <span>{details.ca}</span>
          </li>
          <li>
            <span className="subject">소유자</span>
            <span>{details.owner}</span>
          </li>
          <li>
            <span className="subject">최저입찰가</span>
            <span>{details.minBid}</span>
          </li>
        </BidInfo>
      </BidInfoWrap>
    </DetailWrap>
  );
};

export default CardDetail;
