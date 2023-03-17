import { useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";

const useWeb3 = () => {
    const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
    const [gyulToken, setGyulToken] = useState<Contract>();
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

    const getGyulToken = (networkId: number) => {
        if (!web3) return;
        const gyulTokenJSON = require("../contracts/GyulToken.json");
        const abi: AbiItem = gyulTokenJSON.abi;
        const ca: string = gyulTokenJSON.networks[networkId]?.address;

        const instance = new web3.eth.Contract(abi, ca);
        setGyulToken(instance);
    };

    const getSaleToken = (networkId: number) => {
        if (!web3) return;
        const saleTokenJSON = require("../contracts/SaleToken.json");
        const abi: AbiItem = saleTokenJSON.abi;
        const ca: string = saleTokenJSON.networks[networkId]?.address;
        const instance = new web3.eth.Contract(abi, ca);
        setSaleToken(instance);
    };

    useEffect(() => {
        getWeb3();
    }, []);

    useEffect(() => {
        (async () => {
            if (!web3) return;
            const networkId: number = await web3.eth.net.getId();
            getGyulToken(networkId);
            getSaleToken(networkId);
        })();
    }, [web3]);

    return { web3, gyulToken, saleToken };
};

export default useWeb3;
