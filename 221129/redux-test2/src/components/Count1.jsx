import { useState } from "react";

const Count1Comp = ({ count1 = 0, plus, minus, input }) => {
  // 안에 매개변수는 containers의 count1파일 밑에서 매개변수 보내주는걸 받아옴
  const [inputNum, setInputNum] = useState(0);
  return (
    <div>
      <div>{count1}</div>

      <div>
        <button
          onClick={() => {
            plus();
            //이건 함수호출?
            //하는이유?
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            minus();
          }}
        >
          -
        </button>
      </div>
      <div>
        <input
          type={"number"}
          value={inputNum}
          onInput={(e) => {
            setInputNum(+e.target.value);
          }}
          placeholder={"count1 input"}
        />
        <button
          onClick={() => {
            input(inputNum);
          }}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Count1Comp;
