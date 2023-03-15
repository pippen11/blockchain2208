import axios from 'axios';

const getTxData = async () => {
    const url = 'http://localhost:4000/api/tx/info';

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export default getTxData;
