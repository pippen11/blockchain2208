import axios from 'axios';

const joinOrLogin = async (address: string): Promise<any> => {
  try {
    const response = await axios.post('http://localhost:4002/user', {
      address,
    });
    return response.data;
  } catch (error) {
    console.log('유저정보 가져오기 에러남');
    console.log(error);
    return false;
  }
};

export default joinOrLogin;
