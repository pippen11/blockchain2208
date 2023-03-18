import { useEffect, useState } from "react";
import axios from "axios";

// 이거 react-app-env.d.ts파일에 넣어도됨

// get은 데이터 보낼게 없을때 쓴다/ useEffect는 컴포넌트안에서만쓴다
export const List = ({ account }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      console.log("dd");
      const result = (
        await axios.post("http://localhost:8080/api/list", { from: account })
      ).data;
      setList(result);
      console.log(result);
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

const Item = ({ item: { name, description, image } }) => {
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
