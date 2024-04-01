import {WalletERC20Interface} from "../Interfaces/WalletInterface";
import {
    Contract,
    ethers,
    formatEther,
    formatUnits,
    JsonRpcProvider,
    JsonRpcSigner,
    parseEther,
    parseUnits,
    TransactionResponse,
    Wallet
} from "ethers";
import {RPC_PROVIDER_ETH} from "../Utils/Constants";
import {ABI_ERC20} from "../Utils/ABI";

export default class EthereumWallet implements WalletERC20Interface {

    public mnemonic: string;
    public publicKey: string;
    public privateKey: string;
    public address: string;

    public provider: JsonRpcProvider;

    constructor(mnemonic: string, RPC_URL?: string) {
        this.mnemonic = mnemonic;
        this.provider = this.setEthereumClient(RPC_URL ?? RPC_PROVIDER_ETH);
        this.privateKey = this.getPrivateKey();
        this.publicKey = this.getPublicKey();
        this.address = this.getAddress();
    }

    public async getBalanceCoin(): Promise<string> {
        const balance: bigint = await this.provider.getBalance(this.address)
        return formatEther(balance);
    }

    public async getBalanceToken(contractAddress: string): Promise<string> {
        const contractERC20: Contract = this.getContractERC20(contractAddress);
        const decimals: string = await contractERC20.decimals()
        const balance: bigint = await contractERC20.balanceOf(this.address)
        return formatUnits(balance, decimals)
    }

    public async sendCoin(amount: string, toAddress: string): Promise<string> {
        const signer: JsonRpcSigner = await this.provider.getSigner()
        const tx: TransactionResponse = await signer.sendTransaction({
            to: toAddress,
            value: parseEther(amount)
        })
        await tx.wait()
        return tx.hash
    }

    public async sendToken(_amount: string, toAddress: string, contractAddress: string): Promise<string> {
        const contractERC20: Contract = this.getContractERC20(contractAddress);
        const decimals: string = await contractERC20.decimals()
        const amount: bigint = parseUnits(_amount, decimals)
        const tx = await contractERC20.transfer(toAddress, amount)
        await tx.wait()
        return tx.hash
    }

    public getAddress(): string {
        return Wallet.fromPhrase(this.mnemonic, this.provider).address;
    }

    public getPrivateKey(): string {
        return Wallet.fromPhrase(this.mnemonic, this.provider).privateKey;
    }

    public getPublicKey(): string {
        return Wallet.fromPhrase(this.mnemonic, this.provider).publicKey;
    }

    protected setEthereumClient(url: string): JsonRpcProvider {
        return new ethers.JsonRpcProvider(url)
    }

    private getContractERC20(contractAddress: string): Contract {
        return new Contract(contractAddress, ABI_ERC20, this.provider)
    }


}