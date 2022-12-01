//5번
//7번(디브가 적혀있으면 거의 컴포넌트다 컨테이너는 값 넘겨주는것?)
import store from "../../../modules/store";

import RegistComponent from "./Component";
import { action } from "../../../modules/userDB";
//액션가져옴

import axios from "axios";
//yarn add axios쓴다음 여기서 추가

const RegistContainer = () => {
  //1.onClick을 선언한다
  const onClick = (userId, userPw, userName) => {
    //5. onClick을 호출당했다. 매개변수로 userId,userPw,userName를 받았다.
    console.log("5.RegistContainer onClik=>6. dispatch");
    // 6. store의 dispatch를 호출했다. 매개변수로 action의 regist를 호출해
    //return 값을 전달했다=> dispatch호출보다 action의 regist호출이 먼저실행된다

    //호출해서 2번 이거찍힌거

    //온클릭했을때 값 세개 받아오고
    //7. action의 regist를 호출했다. userId, userPw,userName를 매개변수로 전달했다.
    // 10. dispatch를 호출했다 . action.regist의 return값(반환값,==액션)을 매개변수로 전달햇다.<<action
    //11.dispatch는 reducer를 호출하며 액션을 매개변수로 전달한다.
    store.dispatch(action.regist(userId, userPw, userName));

    axios.post("http://localhost:8080/api/user/regist", {
      userId,
      userPw,
      userName,
    });
    //axios를 이용해서 8080서버에 api/user/regist로
    // req.body인 {userId,userPw,userName} 보냄

    //regist호출해서 반환값을 dispatch로 reducer로 보내줌
    //regist는 userdb에서 옴 거기서 호출
    // 액션으로 레지스트 보내고있음
    //이부분 좀 헷갈림
  };
  console.log("1.RegistContainer", onClick);
  // onClick 위에함수찍어놓은거

  //2. onClick을 RegistComponent에 props로 전달한다
  return <RegistComponent onClick={onClick} />;
  //함수를 전달안하면 component에서 못씀 함수를 전달함
};

export default RegistContainer;

//화살표 함수
//()=>({}) <<왼쪽 ()안에 있는것이 function() 괄호안에잇는것과 같다. 즉 왼쪽()안의것이 매개변수이다
// - =>(화살표) 오른쪽은 함수의 return값이다 (현재는 {},객체를 반환한다)
//()=>[] << 왼쪽()는 받는 매개변수이다 .오른쪽은 함수가 return하는 []배열이다.
//()=>{} << 왼쪽 ()는 받는 매개변수이다 오른쪽 {} 중괄호는 함수의 내용이다
//()=>{return{}} << 왼쪽  ()는 받는 매개변수이다. 오른쪽 {}는 함수의 내용이며 return 다음의 {},객체를 반환한다
// ()=>({a:1})==()=>{return {a:1}}==function(){return{a:1}}
//() => []== () => {return[];}
//(a) => {return a+1;}===function(a){return a+1;}
