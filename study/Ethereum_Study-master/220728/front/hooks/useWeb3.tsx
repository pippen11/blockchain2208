import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-Contract';
import { AbiItem } from 'web3-utils';

const useWeb3 = () => {
    /**
     * web3
     * deployed JwToken (원래는 백엔드에서 가져오기)
     * deployed SaleToken (원래는 백엔드에서 가져오기)
     */

    const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
    const [jwToken, setJwToken] = useState<Contract>();
    const [saleToken, setSaleToken] = useState<Contract>();

    const getWeb3 = () => {
        try {
            if (window.ethereum) {
                setWeb3(new Web3(window.ethereum as any));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getJwToken = (networkId: number) => {
        if (!web3) return;
        const JwTokenJSON = require('../contracts/JwToken.json');
        const abi: AbiItem = JwTokenJSON.abi;
        const CA: string = JwTokenJSON.networks[networkId].address;

        const instance = new web3.eth.Contract(abi, CA);
        setJwToken(instance);
    };

    const getSaleToken = (networkId: number) => {
        if (!web3) return;
        const SaleTokenJSON = require('../contracts/SaleToken.json');
        const abi: AbiItem = SaleTokenJSON.abi;
        const CA: string = SaleTokenJSON.networks[networkId].address;

        const instance = new web3.eth.Contract(abi, CA);
        setSaleToken(instance);
    };

    useEffect(() => {
        getWeb3();
    }, []);

    useEffect(() => {
        (async () => {
            if (!web3) return;
            const networkId: number = await web3.eth.net.getId();
            getJwToken(networkId);
            getSaleToken(networkId);
        })();
    }, [web3]);

    return { web3, jwToken, saleToken };
};

export default useWeb3;

// 배포된 스마트 컨트랙트 인스턴스를 가져올 때 필요한 인자값 2개 : abi , CA
