import TempTd from "./TempTD";

export default function TempTr({ isHead, tableData, head }) {
  //매개변수를 구조분해할당으로 받았다.
  //const {tableData}=props랑 같은얘기

  //export default function TempTr(props)
  console.log("hi");
  console.log(head);
  console.log("hi1");
  console.log(tableData);
  console.log("hi2");

  //console.log(props.tableData)
  if (isHead) {
    return (
      <tr>
        {head.map((item, index) => (
          <th key={index}>{tableData[item]}</th>
        ))}
      </tr>
    );
  }

  return (
    <tr>
      {head.map((item, index) => (
        <TempTd key={index} item={tableData[item]} />
      ))}
    </tr>
  );
}
