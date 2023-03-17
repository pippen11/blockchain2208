import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import useAccount from "../hooks/useAccount";
import useWeb3 from "../hooks/useWeb3";

interface MingtingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MintingModal: FC<MingtingModalProps> = ({ isOpen, onClose }) => {
  const { account } = useAccount();
  const { web3, ingToken, saleToken } = useWeb3();

  const handleClick = async () => {
    try {
      if (!account || !web3 || !ingToken || !saleToken) return;

      const response = await ingToken.methods.mintToken().send({
        from: account,
        value: web3.utils.toWei("1", "ether"),
      });

      console.log(response);

      if (response.status) {
        // 내가 민팅한 내역을 볼수있게
        // 내가 가지고있는 토큰중에 최신토큰
        const tokenId: string = await ingToken.methods.totalSupply().call();
        // console.log(total);
        const info = await ingToken.methods.TokenDatas(tokenId).call();
        console.log(info);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Minting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>민팅시 1 Eth가 소모됩니다.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleClick}>
              민팅
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MintingModal;
