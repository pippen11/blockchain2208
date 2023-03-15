import React from 'react';
import AddressSearchTxForm from '../AddressSearchTxForm';

const Tx = (props) => {
    const { txData } = props;

    return <AddressSearchTxForm txData={txData} />;
};

export default Tx;
