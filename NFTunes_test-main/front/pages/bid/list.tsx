import styled from 'styled-components';
import Cards from '../../src/features/bidList/Cards';
import CardList from '../../src/features/bidList/CardList';
import CardDetail from '../../src/features/bidList/CardDetail';

import { NextPage } from 'next';

const OutBox = styled.div`
  width: 100%;
  height: 1200px;
`;

const bidInfoList = [
  {
    coverUrl: 'http://localhost:4000/upload/user.png',
    nickname: 'yjlee',
    details: {
      tokenId: 'dsadadasdadsad',
      subject: '하하하',
      ca: '0x102932913283218123',
      owner: '이연정',
      minBid: '10 ETH',
    },
  },
  {
    coverUrl: 'http://localhost:4000/upload/user.png',
    nickname: 'yjlee',
    details: {
      tokenId: 'dsadadasdadsad',
      subject: '하하하',
      ca: '0x102932913283218123',
      owner: '이연정',
      minBid: '10 ETH',
    },
  },
  {
    coverUrl: 'http://localhost:4000/upload/user.png',
    nickname: 'yjlee',
    details: {
      tokenId: 'dsadadasdadsad',
      subject: '하하하',
      ca: '0x102932913283218123',
      owner: '이연정',
      minBid: '10 ETH',
    },
  },
  {
    coverUrl: 'http://localhost:4000/upload/user.png',
    nickname: 'yjlee',
    details: {
      tokenId: 'dsadadasdadsad',
      subject: '하하하',
      ca: '0x102932913283218123',
      owner: '이연정',
      minBid: '10 ETH',
    },
  },
  {
    coverUrl: 'http://localhost:4000/upload/user.png',
    nickname: 'yjlee',
    details: {
      tokenId: 'dsadadasdadsad',
      subject: '하하하',
      ca: '0x102932913283218123',
      owner: '이연정',
      minBid: '10 ETH',
    },
  },
  {
    coverUrl: 'http://localhost:4000/upload/user.png',
    nickname: 'yjlee',
    details: {
      tokenId: 'dsadadasdadsad',
      subject: '하하하',
      ca: '0x102932913283218123',
      owner: '이연정',
      minBid: '10 ETH',
    },
  },
  {
    coverUrl: 'http://localhost:4000/upload/user.png',
    nickname: 'yjlee',
    details: {
      tokenId: 'dsadadasdadsad',
      subject: '하하하',
      ca: '0x102932913283218123',
      owner: '이연정',
      minBid: '10 ETH',
    },
  },
  {
    coverUrl: 'http://localhost:4000/upload/user.png',
    nickname: 'yjlee',
    details: {
      tokenId: 'dsadadasdadsad',
      subject: '하하하',
      ca: '0x102932913283218123',
      owner: '이연정',
      minBid: '10 ETH',
    },
  },
  {
    coverUrl: 'http://localhost:4000/upload/user.png',
    nickname: 'yjlee',
    details: {
      tokenId: 'dsadadasdadsad',
      subject: '하하하',
      ca: '0x102932913283218123',
      owner: '이연정',
      minBid: '10 ETH',
    },
  },
  {
    coverUrl: 'http://localhost:4000/upload/user.png',
    nickname: 'yjlee',
    details: {
      tokenId: 'dsadadasdadsad',
      subject: '하하하',
      ca: '0x102932913283218123',
      owner: '이연정',
      minBid: '10 ETH',
    },
  },
];

const bidList: NextPage = () => {
  return (
    <OutBox>
      {bidInfoList.map((v, i) => (
        <CardDetail url={v.coverUrl} key={i} details={v.details} />
      ))}
      <CardList>
        {bidInfoList.map((v, i) => (
          <Cards url={v.coverUrl} key={i} nickname={v.nickname} />
        ))}
      </CardList>
    </OutBox>
  );
};

export default bidList;
