import axios from 'axios';

const getBlockPrev = async () => {
    const url = 'http://localhost:4000/api/blocks/prev';
    try {
        const response = await axios.get(url);

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export default getBlockPrev;
