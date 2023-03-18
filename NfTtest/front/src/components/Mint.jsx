import { useCallback, useState } from "react";
import axios from "axios";
import Web3 from "web3";

export const Mint = ({ web3, account }) => {
  const [NftName, setName] = useState("");
  const [NftDescription, setDescription] = useState("");
  const [file, setFile] = useState();
  const [img, setImg] = useState("");

  const nameInput = useCallback((e) => {
    setName(e.currentTarget.value);
  }, []);

  const discriptionInput = useCallback((e) => {
    setDescription(e.currentTarget.value);
  }, []);

  const fileChange = useCallback((e) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setFile(e.currentTarget.files[0]);

      const reader = new FileReader();

      reader.readAsDataURL(e.currentTarget.files[0]);
      console.log(reader);
      reader.onload = () => {
        if (reader.result) {
          setImg(reader.result);
        }
      };
    }
  }, []);

  const mint = async () => {
    if (!NftName || !NftDescription || !file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", NftName);
    formData.append("description", NftDescription);
    formData.append("from", account);
    const result = (
      await axios.post("http://localhost:8080/api/mint", formData)
    ).data;
    console.log(result);
    web3.eth.sendTransaction(result);
  };

  return (
    <div>
      <input type="text" onInput={nameInput} placeholder={"NFT Name"} />
      <input
        type="text"
        onInput={discriptionInput}
        placeholder={"NFT Discription"}
      />
      <input type="file" onInput={fileChange} />
      {img && (
        <div>
          {" "}
          <img src={img.toString()} />
        </div>
      )}
      <button onClick={mint}>Mint</button>
    </div>
  );
};
