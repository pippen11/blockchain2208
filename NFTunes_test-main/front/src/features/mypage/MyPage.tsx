import { NextPage } from 'next';
// import Header from '../../src/features/_main/Header';
// import { useWheels } from '../../src/hooks/useWheel';
// import Minting from '../../src/features/mypage/Minting';
import styled from 'styled-components';
import Image from 'next/image';
import Subscribe from '../subscribe/SubscribeModal';

// worker : gyuri
// last work : 220824
const OutBox = styled.div`
  /* background: black; */
  width: 100%;
  height: 1200px;
  padding-top: 100px;
`;

const MainBox = styled.div`
  width: 70%;
  height: 1000px;
  /* background: red; */
  margin: 0 auto;
`;

const ProfileBox = styled.div`
  /* background: pink; */
  width: 80%;
  height: 240px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const imgStyle = {
  borderRadius: '60%',
};

const ProfileInfo = styled.div`
  /* background: skyblue; */
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  > h1 {
    font-size: 22px;
    margin-left: 30px;
    color: #fff;
    font-family: 'Light';
  }
`;

const ContentsBox = styled.div`
  /* background: red; */
  width: 100%;
  height: 600px;
  margin-top: 100px;
`;

const MusicMenu = styled.ul`
  /* background: purple; */
  width: 80%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

const IndividualMenu = styled.li`
  /* background: pink; */
  width: 12%;
  height: 100%;
  text-align: center;
  font-size: 20px;
  color: white;
  line-height: 46px;
  font-family: 'SemiBold';

  > a {
    display: block;
  }
  > a:hover {
    border-bottom: 2px solid #fff;
  }
`;

const Mypage: React.FC<{ userInfo: IUserInfo }> = ({ userInfo }) => {
  const date = userInfo.subscribeStartTimestamp;

  console.log(date);
  // date.setDate(date.getTime() + 1);
  // console.log('date', date);
  const modifyProfile = (account) => {};
  return (
    <div>
      <OutBox>
        <MainBox>
          <ProfileBox>
            <Image src={userInfo.avatar} width={240} height={240} style={imgStyle} />
            <ProfileInfo>
              <h1>{userInfo.nickname}</h1>
              <h1>{userInfo.email}</h1>
              <h1>{userInfo.account}</h1>
              <h1>
                <Subscribe />
              </h1>
            </ProfileInfo>
          </ProfileBox>
          <ContentsBox>
            <MusicMenu>
              <IndividualMenu>
                <a>All</a>
              </IndividualMenu>
              <IndividualMenu>
                <a>Likes</a>
              </IndividualMenu>
              <IndividualMenu>
                <a>My Music</a>
              </IndividualMenu>
              <IndividualMenu>
                <a>Play List</a>
              </IndividualMenu>
              <IndividualMenu>
                <a>Payment</a>
              </IndividualMenu>
            </MusicMenu>
          </ContentsBox>
        </MainBox>
      </OutBox>
    </div>
  );
};

export default Mypage;
