interface TokenMetaData {
    name: string;
    description: string;
    image: string;
    attributes: [{ 0: { trait_type: "Rank"; value: number } }, { 1: { trait_type: "Type"; value: number } }];
}

export default TokenMetaData;
