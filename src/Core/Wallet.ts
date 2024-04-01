import * as Bip39 from "bip39";
import TronWallet from "./Blockchain/Trx/TrxWallet";
import EthereumWallet from "./Blockchain/Ethereum";

export default class Wallet {

    public mnemonic: string;
    public tron: TronWallet;
    public ethereum: EthereumWallet;

    public constructor(mnemonic?: string) {
        this.mnemonic = mnemonic ?? this.generateMnemonic();
        this.tron = new TronWallet(this.mnemonic);
        this.ethereum = new EthereumWallet(this.mnemonic);
    }

    public async createWallet() {
        let mnemonic: string = this.generateMnemonic();
        this.ethereum = new EthereumWallet(mnemonic);
    }

    private generateMnemonic(): string {
        return Bip39.generateMnemonic();
    }
}
