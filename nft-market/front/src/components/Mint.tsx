import {
  useCallback,
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
} from "react";
import axios from "axios";
import Web3 from "web3";

export const Mint = ({ web3, account }: { web3: Web3; account: string }) => {
  const [NftName, setName] = useState<string>("");
  const [NftDescription, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();
  const [img, setImg] = useState<string | ArrayBuffer>("");

  const nameInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    //FormEvent<HTMLInputElement> 이건 타입이다
    // console.log(e.Target.value); <이거안되고 e.currentTarget.value만되는이유?
    // useCallback함수말고 그냥 함수로하면 안되나? useCallback으로쓰는이유?
    //FormEvent<HTMLInputElement> 이거줘서 e.target.value가안된다
    setName(e.currentTarget.value);
    // e.target.value하면안됨
  }, []);

  const discriptionInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  }, []);

  const fileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.files?.[0]);
    // console.log(e.currentTarget.files[0]) 어떻게찍는지
    // File {name: '71OHdJXXGVS.jpg', lastModified: 1678086725234, lastModifiedDate: Mon Mar 06 2023 16:12:05 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 201197, …}
    // 이런식으로 길이 1짜리가나옴

    // 파일이 있을때
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      //e.currentTarget.files가 undefined나올수도있다
      setFile(e.currentTarget.files[0]);

      const reader = new FileReader();
      // 파일을 읽는 객체를 만든다.
      reader.readAsDataURL(e.currentTarget.files[0]);
      // 파일 내용을 가지고 element에서 띄울수있게 준비해도록 시킨다.
      console.log(reader);
      reader.onload = () => {
        // 준비가 끝나면
        if (reader.result) {
          setImg(reader.result);
          // 결과값으로 이미지설정
          //"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAq4" 이런식으로나옴 그냥 스트링이다
        }
      };
    }
  }, []);

  const mint = async () => {
    if (!NftName || !NftDescription || !file) return;
    const formData = new FormData();
    // formData만들어서 싸그리 다 백엔드로 보낸다
    formData.append("file", file);
    formData.append("name", NftName);
    formData.append("description", NftDescription);
    formData.append("from", account);
    const result = (
      await axios.post("http://localhost:8080/api/mint", formData)
    ).data;
    console.log(result);
    // 백에서 obj보내준거임(트랜잭션)
    web3.eth.sendTransaction(result);
    // 메타마스크에서 블록체인서버로 트잭보낸다

    // console.log(NftName);
    // console.log(NftDescription);
    // console.log(file);
  };

  return (
    <div>
      <input type="text" onInput={nameInput} placeholder={"NFT Name"} />
      <input
        type="text"
        onInput={discriptionInput}
        // onInput={(e)=>{}} 이런식으로쓰고 마우스올리면 타입뭐쓸지 나옴
        placeholder={"NFT Discription"}
      />
      <input type="file" onInput={fileChange} />
      {img && (
        <div>
          {" "}
          <img src={img.toString()} />
          {/* // 이미지띄우는거 */}
          {/* arraybuffer때문에tostring한다 */}
        </div>
      )}
      <button onClick={mint}>Mint</button>
    </div>
  );
};
