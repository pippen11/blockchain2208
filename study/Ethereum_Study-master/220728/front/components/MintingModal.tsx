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
} from '@chakra-ui/react';
import { FC } from 'react'; // 함수형 컴포넌트 타입
import useAccount from '../hooks/useAccount';
import useWeb3 from '../hooks/useWeb3';
import { useMetaData } from '../hooks/useMetaData';
import TokenData from '../interface/tokendata.interface';
import TokenCard from './TokenCard';

// props로 받을 내용의 타입을 지정해줘야 한다.
interface MintingModalProps {
    isOpen: boolean;
    onClose: () => void;
    getRemain: () => Promise<void>; // Promise<return 값 타입>
    getTokenTable: () => Promise<void>;
}

const MintingModal: FC<MintingModalProps> = ({ isOpen, onClose, getRemain, getTokenTable }) => {
    const { account } = useAccount();
    const { web3, jwToken, saleToken } = useWeb3();
    const { metadata, getMetadata } = useMetaData();

    const handleClick = async () => {
        try {
            if (!account || !web3 || !jwToken || !saleToken) return;
            console.log(jwToken);
            const response = await jwToken.methods.mintToken().send({
                from: account, // 연결된 account
                value: web3.utils.toWei('1', 'ether'),
            });

            // console.log(response);

            if (response.status) {
                // 민팅한 내역을 볼 수 있게 해야한다.
                // 가지고 있는 NFT 중 최신 NFT 가져오기
                const latestToken: TokenData = await saleToken.methods.getLatestToken(account).call(); // 인자값 : tokenOwner
                /*
                    {
                        tokenId,
                        Rank,
                        Type,
                        price,
                    }
                */
                // Rank 와 Type 값을 이용해 pinata 주소에 요청을 보내고 JSON 파일의 내용을 응답받아야 한다. (http 요청을 통해)
                // axios 요청을 보내 JSON 파일을 가져오고 JSON 파일 안에는 image 경로가 존재
                // https://gateway.pinata.cloud/ipfs/QmPwjnvWYN4etA5eW4yAbWCTy2ukEC1Jj5417VLGyH5XpU/1/1.json
                const tokenURI: string = await jwToken.methods.tokenURI(latestToken.tokenId).call();
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
                    <ModalHeader>Minting</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {metadata ? <TokenCard metadata={metadata} /> : <Text>민팅시 1 Eth가 소모됩니다.</Text>}
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
