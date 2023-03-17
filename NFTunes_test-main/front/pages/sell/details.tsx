import styled from 'styled-components';
import { NextPage } from 'next';

// Work: gyuri
// last update: 220825

const OutBox = styled.div`
  background: black;
  width: 100%;
  height: 1400px;
  padding-top: 100px;
`;

const MainBox = styled.div`
  width: 70%;
  height: 1200px;
  background: red;
  margin: 0 auto;
`;

const MusicInfoBox = styled.div`
  width: 100%;
  height: 400px;
  background: pink;
  position: relative;
  > h1 {
    padding: 30px;
    padding-left: 130px;
    font-size: 26px;
    font-family: Fly;
    color: #fff;
  }
  > div {
    width: 100%;
    height: 100%;
    background: green;
    display: flex;
    justify-content: center;
  }
`;

const ImgBox = styled.div`
  width: 30%;
  height: 90%;
  background: #fff;
  align-self: center;
`;

const MusicInfo = styled.div`
  width: 50%;
  height: 90%;
  background: purple;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #fff;
  > h1 {
    padding-left: 50px;
    font-size: 30px;
  }
  > h2 {
    padding-left: 50px;
    font-size: 16px;
  }
`;
const BtnBox = styled.div`
  width: 100%;
  height: 50px;
  background: purple;
`;

const PurchaseBtn = styled.button`
  display: block;
  width: 200px;
  height: 50px;
  background: blue;
  color: #fff;
  position: absolute;
  right: 0;
`;

const DetailsPage: NextPage = () => {
  return (
    <>
      <OutBox>
        <MainBox>
          <MusicInfoBox>
            <h1>곡 정보</h1>
            <div>
              <ImgBox></ImgBox>
              <MusicInfo>
                <h1>Title</h1>
                <h1>Singer</h1>
                <h2>발매일</h2>
                <h2>작곡가</h2>
                <h2>작사가</h2>
              </MusicInfo>
            </div>
            <PurchaseBtn>구매하기</PurchaseBtn>
          </MusicInfoBox>
          <BtnBox></BtnBox>
        </MainBox>
      </OutBox>
    </>
  );
};

export default DetailsPage;
