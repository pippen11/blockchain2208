import styled from 'styled-components';
import Image from 'next/image';

const CardWrap = styled.span`
  width: 100px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 5px;
`;

const SingleCard = styled.span`
  background-color: white;
  display: inline-block;
  width: 100px;
  height: 100px;
  transform: skew(25rad) translateX(-5px);
  border-radius: 10px;
  overflow: hidden;

  &:hover {
    transform: skew(25rad) scale(1.2);
    transition: 0.2s linear;
    z-index: 2;
  }
`;

const CardText = styled.span`
  color: white;
  width: 80px;
  white-space: nowrap;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: skew(25rad) translateX(-5px);
  z-index: 3;
`;

type CardProps = {
  url: string;
  nickname: string;
};

const Cards: React.FC<CardProps> = ({ url, nickname }) => {
  return (
    <>
      <CardWrap>
        <SingleCard>
          <Image src={url} width="100%" height="100%" objectFit="cover" />
        </SingleCard>
        <CardText>{nickname}</CardText>
      </CardWrap>
    </>
  );
};

export default Cards;
