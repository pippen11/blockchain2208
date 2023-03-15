import React, { useEffect, useState } from 'react';
import AppleShopContract from '../contracts/AppleShop.json';

const AppleShop = ({ web3, account }) => {
    const [apple, setApple] = useState();
    const [deployed, setDeployed] = useState();

    const buy = async () => {
        await deployed.methods.buyApple().send({
            from: account,
            to: '0x660ec2062AE3523505973c1651C62Fd9c9Af2413',
            value: web3.utils.toWei('1', 'ether'),
        });
    };

    const sell = async () => {
        const eth = web3.utils.toWei('1', 'ether');
        await deployed.methods.sellApple(eth).send({
            from: account,
            to: '0x660ec2062AE3523505973c1651C62Fd9c9Af2413',
        });
    };

    useEffect(() => {
        (async () => {
            if (!web3) return;

            // 인자값 2개
            // abi , CA
            const instance = await new web3.eth.Contract(
                AppleShopContract.abi,
                '0x660ec2062AE3523505973c1651C62Fd9c9Af2413',
            );

            const currentApple = await instance.methods.getApple().call();
            setApple(currentApple);
            setDeployed(instance);
        })();
    }, []);

    return (
        <div>
            <div>사과 가격 : 1 ETH</div>

            <div>내가 가진 사과 : {apple}</div>
            <button onClick={buy}>구매하기</button>

            <div>사과 판매 가격 : {apple * 1} ETH</div>
            <button onClick={sell}>환불</button>
        </div>
    );
};

export default AppleShop;
