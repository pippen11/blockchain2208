import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import itemJSON from "../public/items.json";
import { Item } from "../interface/item.interface";
import { useContext, useState } from "react";
import { Global } from "../pages/_app";
import { useCookies } from "react-cookie";
import axios, { AxiosError } from "axios";

type ModalProps = {
  isOpen: boolean;
  //   onOpen: () => void;
  onClose: () => void;
  num: string;
};

type itemType = {
  [key: string]: Item;
};

const DIDpoint = [
  { a_idx: "1", name: "kong", pt: "500" },
  { a_idx: "2", name: "sj", pt: "1000" },
  { a_idx: "3", name: "jongs", pt: "300" },
  { a_idx: "4", name: "jujan", pt: "1000" },
  { a_idx: "5", name: "won", pt: "700" },
  { a_idx: "6", name: "upbit", pt: "100" },
];

const PayModal: React.FC<ModalProps> = ({ isOpen, onClose, num }) => {
  const item: itemType = itemJSON;

  const property = {
    imageUrl: item[num]["imageUrl"],
    imageAlt: item[num]["imageAlt"],
    title: item[num]["title"],
    formattedPrice: item[num]["formattedPrice"],
    reviewCount: item[num]["reviewCount"],
  };

  const { isLogin, setUserToken, userData, setUserData } = useContext(Global);
  const [, setCookie] = useCookies();
  const [site, setSite] = useState<string>("");

  const buyItem = async (e: any) => {
    e.preventDefault();
    if (!isLogin) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    if (setUserToken === undefined) return;
    const { value } = e.target.DIDpoint;
    console.log(value);

    try {
      const response = await axios.post(
        "http://localhost:4003/api/user/buyItem",
        { userData, itemPrice: property.formattedPrice, a_idx: value }
      );
      const { error, result, token } = response.data;
      if (error && !result) {
        alert("포인트가 부족합니다.");
      } else if (!error && result) {
        setUserToken(token);
        setCookie("CHANNEL_Token", token);
        alert("상품 구매가 완료되었습니다.");
        onClose();
      }
    } catch (err) {
      const error = err as AxiosError<any>;
      console.log(error);
      alert(
        "상품 구매가 정상적으로 처리되지 않았습니다. 잠시후 다시 시도해주십시요."
      );
    }
  };

  const pointList = () => {
    return DIDpoint.map((v, i) => {
      return (
        <Radio colorScheme="green" value={v.a_idx} key={i}>
          {v.name} ( 보유 포인트 : {v.pt} )
        </Radio>
      );
    });
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal
        size="xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={buyItem}>
          <ModalContent>
            <ModalHeader>상품 구매</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justify="space-evenly">
                <Flex direction="column" justify="center" align="center">
                  <Text fontWeight="bold" mb="1rem">
                    해당 상품을 구매하시겠습니까?
                  </Text>
                  <Box w="120px" h="120px">
                    <Image
                      src={property.imageUrl}
                      alt={property.imageAlt}
                      width="100px"
                      height="100px"
                      layout="responsive"
                    />
                  </Box>
                  <Text mt="10px">
                    상품가격 : {property.formattedPrice} points
                  </Text>
                </Flex>
                <Box>
                  <RadioGroup name="DIDpoint">
                    <Stack spacing={5} direction="column">
                      <Radio colorScheme="green" value={"local"}>
                        CHANNEL ( 보유 포인트 : {userData?.point} )
                      </Radio>
                      {/* 여기에 추가 */}
                      {pointList()}
                    </Stack>
                  </RadioGroup>
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Buy
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default PayModal;
