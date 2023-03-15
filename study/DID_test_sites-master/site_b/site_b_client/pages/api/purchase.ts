import axios from 'axios';

interface IValues {
  [key: string | number]: string;
}

const purchase = async (values: IValues, userCode: string) => {
  try {
    const response = await axios.post('http://localhost:4002/purchase', {
      values,
      userCode,
    });
    if (response.data) {
      return true;
    } else {
      throw new Error('internal error');
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default purchase;
