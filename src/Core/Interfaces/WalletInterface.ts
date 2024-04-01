export interface WalletNativeInterface {
    getBalanceCoin(): Promise<string>;
    sendCoin(amount: string, toAddress: string): Promise<string>;
    getAddress(): string;
    getPrivateKey(): string;
    getPublicKey(): string;
}

export interface WalletERC20Interface extends WalletNativeInterface {
    getBalanceToken(contractAddress: string): Promise<string>;
    sendToken(amount: string, toAddress: string, contractAddress: string): Promise<string>;
}