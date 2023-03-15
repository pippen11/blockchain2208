import React from 'react';
import AddressSearchMinedForm from '../AddressSearchMinedForm';

const Mined = (props) => {
    const { minedData } = props;

    return <AddressSearchMinedForm minedData={minedData} />;
};

export default Mined;
