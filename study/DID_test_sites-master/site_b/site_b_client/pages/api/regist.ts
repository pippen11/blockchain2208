import axios from 'axios';

export interface IRegistAlias {
  account: string;
  alias: string;
}

const registAlias = async (payload: IRegistAlias) => {
  try {
    const response = await axios.post('http://localhost:4002/alias', payload);
    return response.data;
  } catch (error) {
    console.log('regist Alias axios error');
    console.log(error);
    return false;
  }
};

export default registAlias;
