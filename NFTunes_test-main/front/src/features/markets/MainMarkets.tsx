import React from "react";
import Link from 'next/link';
import styled from 'styled-components';

// MainMarket 에서 내려온 markets 의 데이터
interface IMarketData {
  data: IMarketType;
}

// 클릭시 data.market 에 해당하는 [market] 라우터 이용.
export function MarketItem({ data }: IMarketData) {
  return (
    <Link href = {`/markets/[market]`} as = {`/markets/${data.market}`}>
      <Container className="text-zinc-400 text-3xl">
        <p>{data.market}</p>
        <p>{data.korean_name}</p>
      </Container>
    </Link>
  )
}

const Container = styled.div`
  width: 100%;
  border: 1px solid #eeeeee;
  padding: 32px;
  cursor: pointer;
`

// main 에서 내려온 markets arr 로 목록작성.
export function MainMarket({ markets }: IMainProps) {
  return (
    <div>
      {markets.map(content => {
        return (
          <>
            <span>{content.market}</span>
            <MarketWrapper key={content.market}>
              <MarketItem data={content}/>
            </MarketWrapper>
          </>
        )
      })}
    </div>
  )
}

const MarketWrapper = styled.div`
  margin-bottom: 12px;
  :last-child {
    margin-bottom: 0;
  }
`;


