import axios from 'axios';

const disconnectFromApp = async (userCode: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4002/did/disconnect?userCode=${userCode}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default disconnectFromApp;
