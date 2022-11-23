import { useLocation } from "react-router-dom";

function Home({ propsNum }) {
  console.log(useLocation().state);
  //state데이터 받음

  return <div>Home!{propsNum}</div>;
}

export default Home;
