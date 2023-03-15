import axios from 'axios';

const getTxPrev = async () => {
    const url = 'http://localhost:4000/api/tx/prev';

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export default getTxPrev;
