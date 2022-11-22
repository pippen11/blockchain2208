import { useState } from "react";

export default function List() {
  const [listArr, setListArr] = useState([
    { text: "adsf1", user: "adsf" },
    { text: "adsf2", user: "adsf" },
    { text: "adsf3", user: "adsf" },
    { text: "adsf4", user: "adsf" },
    { text: "adsf5", user: "adsf" },
  ]);
  return (
    <div>
      {listArr.map((item, index) => (
        <div>
          <div key={`${index}-1`}>{item.text}</div>
          <div key={`${index}-2`}>{item.user}</div>
        </div>
        //중복되지않는키 1-1 1-2 이렇게 넣으려고 넣음
      ))}
    </div>
    //map은 차곡차곡쌓아서 반환값이잇는것 forEach는 반환값이없다 화살표함수 중괄호쓰면 return써야함 소괄호는 return안써도됨
  );
}
