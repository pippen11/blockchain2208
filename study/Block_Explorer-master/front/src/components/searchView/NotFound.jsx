import React from 'react';

const NotFound = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                fontWeight: 'bold',
                fontSize: '150px',
            }}
        >
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>NOT FOUND</div>
        </div>
    );
};

export default NotFound;
