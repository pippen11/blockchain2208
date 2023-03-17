import { useEffect, useState } from "react";
import axios from "axios";

// 이거 react-app-env.d.ts파일에 넣어도됨
interface nftData {
  name: string;
  description: string;
  image: string;
  // 이미지 주소가 들어와서 string
  //image: 'http://gateway.pinata.cloud/ipfs/QmacLa5jg39ZnYsCbphPGLSyCeHpRVVe7oWzkq4qMu42PV' 이게들어온다
}

// get은 데이터 보낼게 없을때 쓴다/ useEffect는 컴포넌트안에서만쓴다
export const List = ({ account }: { account: string }) => {
  const [list, setList] = useState<Array<nftData>>([]);
  useEffect(() => {
    (async () => {
      console.log("dd");
      const result = (
        await axios.post("http://localhost:8080/api/list", { from: account })
      ).data;
      setList(result);
      console.log(result);
      //[{name: 'Moonbirds', description: 'Moonbirds with Pinata', image: 'http://gateway.pinata.cloud/ipfs/QmacLa5jg39ZnYsCbphPGLSyCeHpRVVe7oWzkq4qMu42PV'}]
      // 배열안에 객체로 back에서 보내준 그대로 들어온다[{},{},{}]
      // 배열안에 객체 3개
    })();
  }, [account]);

  return (
    <ul>
      {list.map((item, idx) => (
        <Item item={item} key={`item-${idx}`} />
      ))}
    </ul>
  );
};

//Item컴포넌트 위에서 map
const Item = ({ item: { name, description, image } }: { item: nftData }) => {
  // map으로 배열풀어줘서 객체로묶음
  // list안에있는 배열안 객체들이 item인데 name, description, image로 구조분해할당
  // 그 item타입은 nftData이다 객체로 구조분해할당할때 묶어야함
  return (
    <li>
      <div>{name}</div>
      <div>{description}</div>
      <div>
        <img src={image} />
      </div>
    </li>
  );
};
