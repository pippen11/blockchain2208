import { MainMarket } from "../../src/features/markets/MainMarkets";

import {GetStaticProps, GetServerSideProps, NextPage} from 'next'
import { getMarkets } from "../api/market.api"

// main Market 에 getStaticProps 로 등록된  markets 를 넘김
export default function Main( { markets }: IMainProps ) {
  return(
    <div className="pt-20 flex flex-col items-center justify-center min-h-screen py-2">
      <MainMarket markets={ markets } />
    </div>
  )
}

// Main 랜더링 전에 실행되어 markets state 를 등록하려고 시도함!
export const getStaticProps: GetStaticProps = async () => {
  // API 에서 목록 받아옴.
  const { markets } = await getMarkets();

  // markets 가 존재하지 않을시 props 등록 취소.
  if(!markets) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      markets
    }
  };
}
