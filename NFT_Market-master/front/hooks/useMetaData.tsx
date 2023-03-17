import axios from "axios";
import { useState } from "react";
import TokenMetaData from "../interface/tokenMetaData";

export const useMetaData = () => {
    const [metadata, setMetadata] = useState<TokenMetaData | undefined>(undefined);

    const getMetadata = async (_uri: string) => {
        try {
            const response = await axios.get(
                "https://gateway.pinata.cloud/ipfs/QmPwjnvWYN4etA5eW4yAbWCTy2ukEC1Jj5417VLGyH5XpU/1/1.json"
            );

            console.log(response.data);
            setMetadata(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    return { metadata, getMetadata };
};
