import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

const AlertModal = () => {
  return (
    <Alert
      status="error"
      textAlign="center"
      justifyContent="center"
      position="absolute"
    >
      <AlertIcon />
      <AlertTitle>메타마스크가 연결되어 있지 않습니다!!</AlertTitle>
      <AlertDescription>메타마스크 연결 후 사용해주세요.</AlertDescription>
    </Alert>
  );
};

export default AlertModal;
