// market data interface
declare interface IMarketType {
  market: string;
  korean_name: string;
  english_name: string;
}

// markets array interfaces
declare interface IMainProps {
  markets: IMarketType[]
}

// tsconfig.json 의 isolatedModules 때문에 추가.
// export {}
