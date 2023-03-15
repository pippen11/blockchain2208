import { useEffect, useState } from 'react';

const useAccount = () => {
    // 브라우저에 메타마스크가 설치되어 있다면 연결된 account 가져오기
    const [account, setAccount] = useState<string>('');

    const getAccount = async () => {
        try {
            if (!window.ethereum) throw new Error('Error');

            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            if (accounts && Array.isArray(accounts)) {
                // accounts : ["0x1234..."]
                setAccount(accounts[0]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getAccount();
    }, []);

    return { account };
};

export default useAccount;
