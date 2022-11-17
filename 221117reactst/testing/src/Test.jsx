import { useState } from "react";
//이거 써야함 가상돔때문에
//usetState는 내장함수

export default function ({ test1, children, idx }) {
  console.log(idx)
  //children넣어줘야함
  // let count = 0;
  const [count1, setCount] = useState(0);
  //count은 변수 setCoun1은 함수
  //배열 구조분해할당임
  //카운트 0부터 시작이라 0을 넣은거다

  //props다, 나중에 다시설명
  //props는 상위 컴포넌트에서 설정된 값이다.
  //props.children은 상위 컴포넌트에서 해당 컴포넌트의 자식으로 설정된 값이다.
  const tempArr = [1, 2, 3, 4, 6, 7, 8, 9];
  const arr = [{ title: "테스트 중입니다", text: "dkahffk", userName: "ssm" }];
  //이렇게 쓰고 밑에다 가져다가 쓸수있다.

  return (
    <div>
      <div style={{ fontSize: "30px", backgroundColor: "red" }}>
        {test1}
        {children}
        {/* chlidren넣어줘야함 */}
      </div>
      <ul>
        {tempArr.map((item, index) => {
          return <li key={`test-${index}`}>{item}</li>;
          //배열을 상용해서 html태그들을 넣을때는 보통 key를 넣게된다 안넣어도 정상작동은 함
          // 그냥 key={index} 만적어도 문제는 없다
        })}
      </ul>

      <button
        onClick={function () {
          console.log(count1);
          setCount(count1 + 1);
        }}
      >
        {count1}
      </button>
    </div>
  );
  //빈태그가 가능하다
  //html 태그의 형제 방식으로 return하지 못한다 << 하나로 구조를 묶어서 return해야한다 .

  //HTML 문법 내에 자바스크립트 변수 / 함수 등등을 사용할경우 {}로 묶어준다.
}

//Component란 여러 개의 함수들을 모아 하나의 특정한 기능을 수행할수있도록 구성한 작은 기능적 단위
//React는  view를 위한 라이브러리<< Front end에 보여주기 위한 라이브러리>> 랜더링(화면에 띄워주는거)이 주된기능이다 >> 기능은 div등등의 element구조로 많이 나뉘어진다.
