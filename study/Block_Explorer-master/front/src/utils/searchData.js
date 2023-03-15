import axios from 'axios';

const searchData = async (selected, inputData) => {
    try {
        if (selected === 'blockNum') {
            const url = 'http://localhost:4000/api/search/block';
            const response = await axios.post(url, { input: inputData });

            return response.data;
        } else if (selected === 'address') {
            const url = 'http://localhost:4000/api/search/address';
            const response = await axios.post(url, { input: inputData });

            return response.data;
        } else if (selected === 'txHash') {
            const url = 'http://localhost:4000/api/search/txHash';
            const response = await axios.post(url, { input: inputData });

            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
};

export default searchData;
