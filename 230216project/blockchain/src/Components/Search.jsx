import { useState } from "react";
import styled from "styled-components";
// import SearchBackground from "./img/background.png";
import searchpng from "./img/search1.png";
import MordalContainer from "../Container/MordalContainer";

const SearchComponent = ({ SearchFx, mordal, SetMordal }) => {
  const [search, setSearch] = useState("");
  return (
    <SearchBox>
      {mordal ? <MordalContainer SetMordal={SetMordal} /> : <></>}
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
          <Searchimg src={searchpng} />
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
  background-image: url("/imgs/waves-light.svg");
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );

  // 배경이미지 왜안먹히는지?
  /* background-color: rgba(17, 27, 54, 1); */
`;
const SerchForm = styled.form`
  display: flex;
`;

const SearchInput = styled.input`
  margin-top: 10px;
  width: 500px;
  padding: 10px;
`;

const SearchButton = styled.button`
  margin-top: 10px;

  /* padding: 10px; */
  /* padding: 10px 0px; */
  /* background-color: purple; */
  /* background-color: purple; */
  background-color: rgba(17, 27, 54, 1);
  :hover {
    cursor: pointer;
  }

  border-style: none;
`;

const Searchimg = styled.img`
  width: 40px;
  box-sizing: content-box;
  /* height: 80px; */
`;
