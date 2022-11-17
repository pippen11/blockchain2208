import logo from "./logo.svg";
import "./App.css";

import TempTr from "./components/TempTr";
import TempTable from "./components/TempTable";

//index.js에서 한번호출
function App() {
  const tempArr = [
    {
      name: "우석",
      age: 17,
      number: "1",
      work: "Front",
    },
    {
      name: "선주",
      age: 1,
      number: "2",
      work: "Front",
    },
    {
      name: "성진",
      age: 45,
      number: "3",
      work: "Back",
    },
    {
      name: "영준",
      age: 2,
      number: "4",
      work: "Back",
    },
    {
      name: "재일",
      age: 10,
      number: "5",
      work: "Front",
    },
    {
      name: "정규",
      age: 3,
      number: "6",
      work: "Back",
    },
  ];

  // app temptr temptd 세가지를 컴포넌트 구현 걔네 가져다쓴거 호출갯수:

  const headData = {
    name: "이름",
    age: "나이",
    number: "번호",
    work: "필살기",
  };

  const tempHead = ["name", "age", "number", "work"];
  //객체에서 받아옴 위에있는 키들을 순서대로 가져옴

  return (
    <div className="App">
      <TempTable headData={headData} tempHead={tempHead} tempArr={tempArr} />
    </div>
    // <table>
    //   <thead>
    //     <TempTr isHead={true} tableData={headData} head={tempHead} />
    //     {/* temptr한테 idhead라는 불린값을 줬다 */}
    //   </thead>
    //   <tbody>
    //     {/* temptr호출 temparr만큼돌림 뭐다른거랑 합해서 총 31번 컴포넌트 사용 */}
    //     {tempArr.map((item, index) => (
    //       <TempTr key={index} tableData={item} head={tempHead} />
    //     ))}

    /* <tr>
            <td>{tempArr[0].name}</td>
            <td>{tempArr[0].age}</td>
            <td>{tempArr[0].number}</td>
            <td>{tempArr[0].work}</td>
          </tr>
          <tr>
            <td>{tempArr[1].name}</td>
            <td>{tempArr[1].age}</td>
            <td>{tempArr[1].number}</td>
            <td>{tempArr[1].work}</td>
          </tr>
          <tr>
            <td>{tempArr[2].name}</td>
            <td>{tempArr[2].age}</td>
            <td>{tempArr[2].number}</td>
            <td>{tempArr[2].work}</td>
          </tr>
          <tr>
            <td>{tempArr[3].name}</td>
            <td>{tempArr[3].age}</td>
            <td>{tempArr[3].number}</td>
            <td>{tempArr[3].work}</td>
          </tr>
          <tr>
            <td>{tempArr[4].name}</td>
            <td>{tempArr[4].age}</td>
            <td>{tempArr[4].number}</td>
            <td>{tempArr[4].work}</td>
          </tr>
          <tr>
            <td>{tempArr[5].name}</td>
            <td>{tempArr[5].age}</td>
            <td>{tempArr[5].number}</td>
            <td>{tempArr[5].work}</td>
          </tr> */
    //   </tbody>
    // </table>
    // </div>
  );
}

export default App;
