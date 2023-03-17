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
import useAccount from "../../hooks/useAccount";
import { useMetaData } from "../../hooks/useMetaData";
import useWeb3 from "../../hooks/useWeb3";
import TokenData from "../../interface/tokendata.interface";
import TokenCard from "./TokenCard";

interface MintingModalProps {
    isOpen: boolean;
    onClose: () => void;
    getRemain: () => Promise<void>;
    getTokenTable: () => Promise<void>;
}

const MintingModal: FC<MintingModalProps> = ({ isOpen, getRemain, onClose, getTokenTable }) => {
    const { account } = useAccount();
    const { web3, gyulToken, saleToken } = useWeb3();
    const { metadata, getMetadata } = useMetaData();

    const handleClick = async () => {
        try {
            if (!account || !web3 || !gyulToken || !saleToken) return;
            const response = await gyulToken.methods.mintToken().send({
                from: account,
                value: web3.utils.toWei("1", "ether"),
            });
            console.log(response);

            if (response.status) {
                //내가 민팅한 내역을 볼 수 있게
                const latestToken: TokenData = await saleToken.methods.getLatestToken(account).call();

                const tokenURI: string = await gyulToken.methods.tokenURI(latestToken.tokenId).call();
                console.log(tokenURI);

                getMetadata(tokenURI);
                getRemain();
                getTokenTable();
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
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {metadata ? (
                            <TokenCard metadata={metadata}></TokenCard>
                        ) : (
                            <Text>민팅 시 1 ETH가 소모 됩니다.</Text>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleClick}>
                            민팅하기
                        </Button>
                        <Button mr={3} colorScheme="blue" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MintingModal;
