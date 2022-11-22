import { useState, useEffect, useMemo, useCallback, useRef } from "react";

//일단한번 쭉실행된다
function EffectTest() {
  const [num, setNum] = useState(0);
  const [name, setName] = useState("");
  const [file, setFile] = useState({
    name: "asdf",
    ext: "png",
    type: "image/png",
  });

  console.log("확인중");

  useEffect(() => {
    console.log("이펙트훅 테스트 시작");
  }, []);
  //didmount됐을때만 실행된다

  useEffect(() => {
    console.log(`숫자가 ${num} 으로 변경됐어`);
    setName(`${num}`);
    setFile({ ...file, name: `${num}` });
    //기존에있는거 들어오고 나중꺼 들어와라 이름이 겹치면 나중게 들어옴
  }, [num]);

  useEffect(() => {
    console.log("이름이" + name + "으로 변경됐어");
    setFile({ ...file, name: name });
  }, [name]);

  useEffect(() => {
    console.log(file);
  }, [file]);

  //   const increase = () => {
  //     setNum(num + 1);
  //   };
  //인크리즈먼저 바뀌고

  //함수 선언대신(increase형식)에 쓰려고 usecallback
  const increaseCallback = useCallback(() => {
    setNum(num + 1);
  }, [num]);

  ////  usecallback이랑 usememo는 사용은 똑같은데 increasecallback은 함수가되고
  //usememo는 변수가된다 num +10
  //가입 = ID, PW, 이름 ,나이, 성별 , 지역
  //-input 함수를 만들어서 연결하겠지?
  //ID, PW, 이름 ,나이, 성별 , 지역<<각각은 state가 됨
  // -ID가 바뀌었을때  PW, 이름 ,나이, 성별 , 지역 에 대한 함수는 선언되는가?-->
  //const changeId()=>{}<<해당 방법과 같이 hook을 사용하지않았을경우 나머지 함수들도 전부 다시 선언된다.
  //- 다시 선언 하는 작업을 하지않기 위해서 useCallback을 사용한다.
  //최적화에 사용한다. << 그만큼 코드 사용량을 줄여준다 << 최적화를 생각하지않으면 쓸 필요는없다

  //   const tempNum = num + 10;
  //num이 바뀌지않아도 계속 실행된다
  const memoNum = useMemo(() => {
    return num + 10;
  }, [num]);

  const names = useRef();

  return (
    <div>
      <button onClick={increaseCallback}>{memoNum}</button>
      <div
        ref={names}
        onClick={() => {
          console.log(names.current);
        }}
      >
        {name}
      </div>

      <div>{file.name + "." + file.ext}</div>
    </div>
  );
}

export default EffectTest;
