import Link from 'next/link';

const Top5Tab = (props) => {
  const tempArr = ['auction1', 'auction2', 'auction3', 'auction4', 'auction5'];
  const tempArr2 = ['music1', 'music2', 'music3', 'music4', 'music5'];

  const musicList = () => {
    return tempArr2.map((v, i) => {
      return (
        <Link href="/" key={i}>
          <span>{v} </span>
        </Link>
      );
    });
  };

  const auctionList = () => {
    return tempArr.map((v, i) => {
      return (
        <Link href="/" key={i}>
          <span>{v} </span>
        </Link>
      );
    });
  };

  switch (props.cate) {
    case 'music':
      return (
        <>
          <h1>
            <Link href="/">Music Top 5</Link>
          </h1>
          {musicList()}
        </>
      );
    case 'auction':
      return (
        <>
          <h1>
            <Link href="/">Auction Top 5</Link>
          </h1>
          {auctionList()}
        </>
      );
    default:
      console.log('wtf');
  }
};

export default Top5Tab;
