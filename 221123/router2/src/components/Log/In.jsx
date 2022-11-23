import { useParams } from "react-router-dom";

function In() {
  const params = useParams();
  //useParams를 통해 변수로 받아올수있다
  //라우터에 정해진 라우터가 아니라 변할수 잇는 값이 들어왔을때 받는 Hook이다
  //Route에서는 '/:이름 이라고 구현한다.
  // /src/components/Log/index.jsx에서 userId라고 이름을 선언했으며 params.userId로 가져올수있다.
  console.log(params);
  return <div>In!</div>;
}

// class In extends component{
//     render(){
//클래스형보다 함수형 권장함
//     }
// }

export default In;
