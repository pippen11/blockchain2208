import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressComponent from "../Components/Address";

const AddressContainer = () => {
  const params = useParams();
  console.log(params);
  const [addressdetails, setAddressdetails] = useState([]);

  const addressdetail = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8080/api/transaction/addressbalance",
        { address: params.address }
      );
      setAddressdetails(data.data);
    } catch (error) {
      console.error("error");
    }
  };
  useEffect(() => {
    addressdetail();
  }, [params.address]);
  // 주소는 이동이되도 함수호출을 해서 다시 컴포넌트를 그리지않아서그대로

  return (
    <AddressComponent
      addressdetail={addressdetail}
      addressdetails={addressdetails}
    />
  );
};

export default AddressContainer;
