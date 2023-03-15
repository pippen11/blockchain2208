import axios from 'axios';

const getBlockData = async () => {
    const url = 'http://localhost:4000/api/blocks/info';

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export default getBlockData;
