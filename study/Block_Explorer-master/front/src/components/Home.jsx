import React, { useEffect, useState } from 'react';
import BlockPrev from './blocks/BlockPrev';
import TxPrev from './transactions/TxPrev';
import socketIO from 'socket.io-client';
import styles from '../public/Home.module.css';

const Home = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = socketIO.connect('http://localhost:4000', {
            transports: ['websocket'],
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            {socket && (
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <BlockPrev socket={socket} />
                    </div>
                    <div className={styles.wrapper}>
                        <TxPrev socket={socket} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
