import React, { useState } from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage }) => {
  //   const [page, setPage] = useState(1);

  //   const handlePageChange = (page) => {
  //     setPage(page);
  //     console.log(page);
  //   };

  return (
    <Pagination
      activePage={page} // 현재페이지
      itemsCountPerPage={10}
      totalItemsCount={count} //총 아이템 갯수
      // 미개변수로 전체값 넣어줘야 전체다뜸 450은 전체끝까지 45페이지 위에매개변수받음
      pageRangeDisplayed={5}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={setPage} //페이지가바뀔때 헨들링
      //setPage대신 handlePageChange 이거였음
    />
  );
};

export default Paging;
