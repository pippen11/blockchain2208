import TempTr from "./TempTr";

// const tempArr = [
//   {
//     name: "우석",
//     age: 17,
//     number: "1",
//     work: "Front",
//   },
//   {
//     name: "선주",
//     age: 1,
//     number: "2",
//     work: "Front",
//   },
//   {
//     name: "성진",
//     age: 45,
//     number: "3",
//     work: "Back",
//   },
//   {
//     name: "영준",
//     age: 2,
//     number: "4",
//     work: "Back",
//   },
//   {
//     name: "재일",
//     age: 10,
//     number: "5",
//     work: "Front",
//   },
//   {
//     name: "정규",
//     age: 3,
//     number: "6",
//     work: "Back",
//   },
// ];

// // app temptr temptd 세가지를 컴포넌트 구현 걔네 가져다쓴거 호출갯수:

// const headData = {
//   name: "이름",
//   age: "나이",
//   number: "번호",
//   work: "필살기",
// };

// const tempHead = ["name", "age", "number", "work"];
// //객체에서 받아옴 위에있는 키들을 순서대로 가져옴

export default function TempTable(props) {
  return (
    <table>
      <thead>
        <TempTr
          isHead={true}
          tableData={props.headData}
          head={props.tempHead}
        />
      </thead>
      <tbody>
        {props.tempArr.map((item, index) => (
          <TempTr key={index} tableData={item} head={props.tempHead} />
        ))}
      </tbody>
    </table>
  );
}
