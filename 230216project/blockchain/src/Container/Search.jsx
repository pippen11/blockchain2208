import { useEffect, useState } from "react";
import SearchComponent from "../Components/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const SearchContainer = () => {
  const navigate = useNavigate();

  let SearchFx = async (search) => {
    const data = await axios.post("http://localhost:8080/api/block/confirm", {
      confirm: search,
    });
    // console.log(data.data.addresstwo[0].to);

    if (data.data.number.length) {
      navigate(`/block/${data.data.number[0].number}`);
    }
    if (data.data.address.length) {
      navigate(`/address/${data.data.address[0].from}`);
    }

    if (data.data.txhash.length) {
      navigate(`/transaction/${data.data.txhash[0].id}`);
    }

    if (data.data.addresstwo.length) {
      navigate(`/address/${data.data.addresstwo[0].to}`);
    }
    if (
      !data.data.number.length &&
      !data.data.address.length &&
      !data.data.txhash.length &&
      !data.data.addresstwo.length
    ) {
      alert("not found");
    }
  };
  return <SearchComponent SearchFx={SearchFx}></SearchComponent>;
};

export default SearchContainer;
