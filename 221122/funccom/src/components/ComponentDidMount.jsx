import { useEffect } from "react";

function componentDidMount() {
  useEffext(() => {
    //여기에 mount시에 실행할 코드를 적는다.
  }, []);
  return <div></div>;
}

export default componentDidMount;
