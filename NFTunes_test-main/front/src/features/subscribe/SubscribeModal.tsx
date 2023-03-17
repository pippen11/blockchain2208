import { useAppDispatch, useAppSelector } from '../../hooks/exhook';
import useWeb3 from '../../hooks/useWeb3';
import {
  userState,
  subscribeTxAsync,
  subscribeStateAsync,
  subscribeRefundTxAsync,
  subscribeCancelStateAsync,
} from '../user/userSlice';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { batch } from 'react-redux';

const Subscribe = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { web3 } = useWeb3();
  const user = useAppSelector(userState);
  const subState = user.userInfo.subscribeState;
  const subStartTime = user.userInfo.subscribeStartTimestamp;
  const { account } = useWeb3();
  console.log('account', account);
  const dispatch = useAppDispatch();

  const sub = async () => {
    try {
      const txResult = await dispatch(subscribeTxAsync(account));
      console.log('txresult', txResult);
      const tx = await web3.eth.sendTransaction(txResult.payload);
      console.log('fronttx', tx);

      const stResult = await dispatch(subscribeStateAsync(account));
      if (stResult.type === 'user/subscribeState/fulfilled') {
        if (user.userInfo.subscribeState == true) {
          alert('구독 완료');
          window.location.href = '/';
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const subRefund = async () => {
    try {
      const txResult = await dispatch(subscribeRefundTxAsync(account));
      console.log('refundtx', txResult);
      const tx = await web3.eth.sendTransaction(txResult.payload);
      console.log('fronttx', tx);
      // batch(() => {
      //   dispatch(handleGnb());
      //   dispatch(handleScroll());
      // });

      if (txResult.type === 'user/subscribeRefundTx/fulfilled') {
        const stResult = await dispatch(subscribeCancelStateAsync(account));
        if (stResult.type === 'user/subscribeCancelState/fulfilled') {
          if (user.userInfo.subscribeState == false) {
            alert('구독 취소 완료');
            window.location.href = '/';
          }
        }
      }
    } catch (e) {
      console.error(e);
    }

    // const now = new Date();
    // const endDate = user.userInfo.subscribeEndTimestamp.toLocaleString();
    // const date = endDate.split('. ').slice(0, 3).join('-');
    // console.log(date);
    // const nowW = new Date(date);
    // console.log(nowW);

    // const makeDate = date[0]date[1]date[2]
    // console.log(makeDate);
    // endDate.setDate(endDate.getTime() + 7)
    // if (now <= endDate ) {
  };

  return (
    <>
      {subState ? (
        <>
          <button onClick={subRefund}>구독취소하기</button>
          <div>
            <p>다음 결제일 </p>
            <p>{user.userInfo.subscribeEndTimestamp}</p>
          </div>
        </>
      ) : (
        <>
          {subStartTime == null ? (
            <span className="cursor-pointer" onClick={onOpen}>
              구독하기
            </span>
          ) : (
            <span className="cursor-pointer" onClick={onOpen}>
              재구독하기
            </span>
          )}
          <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent bgColor="gray" h="300">
              <ModalHeader color="white">Subscribe</ModalHeader>
              <ModalCloseButton />
              <ModalBody fontSize="2xl" color="white" fontWeight="bold" lineHeight="160%">
                <p>매월 1ETH</p>
                <p>여러 아티스트들의 다양한 음악을 들어보세요!</p>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="yellow" mr={3}>
                  <div onClick={sub}>구독하기</div>
                </Button>
                <Button colorScheme="gray" variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default Subscribe;
