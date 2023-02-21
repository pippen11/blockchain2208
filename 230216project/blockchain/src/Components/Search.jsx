import { useState } from "react";
import styled from "styled-components";
// import SearchBackground from "./img/background.png";

const SearchComponent = ({ SearchFx }) => {
  const [search, setSearch] = useState("");
  return (
    <SearchBox>
      <h2 style={{ color: "white" }}>The Ether Blockchain Explorer</h2>
      <SerchForm>
        {/* <select value={1}>1</select> */}
        {/* 셀렉어떻게쓰는지 보기 */}
        {/* adress 42 hash 66  */}
        <SearchInput
          placeholder="Search by Address/ Txn Hash/ Block"
          value={search}
          onInput={(e) => {
            setSearch(e.target.value);
          }}
        ></SearchInput>
        <SearchButton
          onClick={(e) => {
            e.preventDefault();
            SearchFx(search);
          }}
        >
          search
        </SearchButton>
      </SerchForm>
    </SearchBox>
  );
};

export default SearchComponent;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  /* background-image: url("./img/background.png"); */
  // 배경이미지 왜안먹히는지?
  background-color: #570b57;
`;
const SerchForm = styled.form``;

const SearchInput = styled.input`
  width: 500px;
  padding: 10px;
`;

const SearchButton = styled.button`
  padding: 10px;
`;
