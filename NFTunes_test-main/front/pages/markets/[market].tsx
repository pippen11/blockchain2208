import React from "react";
import { GetStaticProps, GetServerSideProps, GetStaticPaths } from "next";
import { useRouter } from 'next/router';

import { getOne } from "../api/market.api"

// getStaticProps 가 MarketPage 의 랜더링 전에 'market' state 를 등록시켰다!
export default function MarketPage({ market }: any) {
  const router = useRouter();
  // fallback : page's props is Empty
  if(router.isFallback) {// boolean
   return <div className="flex flex-col items-center justify-center min-h-screen py-2">Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>잘 나오니?</h1>
      <h2>{market}</h2>
    </div>
  )
}

// MarketItem 에서 Link 로 보내진 data.market 을 params 에 저장.
export const getStaticPaths: GetStaticPaths = async () => {
  return{
    // pre-render 할 path 설정.
    paths: [{ params: { market: 'KRW-BTC' } }, { params: { market: 'KRW-ETH' } }],
    // 오로지 이 path 들만 빌드타임에 프리랜더함.

    // false : 위 path 가 아니면 404 를 반환.
    // true :  만들어지지 않은 path 도 추후 요청이 들어오면 만들어 줄 거라는 뜻
     fallback: false
  };
};

// getStaticPaths 에 의해 저장된 params 를 매개변수로 사용! 이후 페이지에 state 저장.
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  console.log('market/[market] 에 도착한 params: ',params.market)
  const market  = getOne(params.market);
  console.log('테스트용 api getOne() res: ',market)

  if(!market) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      market
    }
  };
}
