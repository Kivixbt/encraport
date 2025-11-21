import { createInstance } from 'fhevmjs';
import { BrowserProvider, Contract } from 'ethers';

export const FHE_CONFIG = {
    chainId: 8009,
    rpcUrl: 'https://devnet.zama.ai',
    // UPDATE THIS WITH YOUR DEPLOYED CONTRACT ADDRESS
    contractAddress: '0x0000000000000000000000000000000000000000' 
};

const ABI = [
    'function deposit(string symbol, bytes encryptedAmount) public',
    'function getBalanceHandle(string symbol) public view returns (uint256)'
];

export const ZamaService = {
    instance: null,
    contract: null,
    signer: null,

    async init() {
        if (!window.ethereum) throw new Error('No wallet found');
        const provider = new BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        this.signer = await provider.getSigner();

        this.instance = await createInstance({ 
            chainId: Number(network.chainId),
            publicKey: this.instance?.publicKey
        });

        this.contract = new Contract(FHE_CONFIG.contractAddress, ABI, this.signer);
        return true;
    },

    async encryptAndDeposit(amount, symbol) {
        if (!this.instance || !this.contract) await this.init();
        const userAddress = await this.signer.getAddress();
        const input = this.instance.createEncryptedInput(FHE_CONFIG.contractAddress, userAddress);
        input.add64(amount);
        const encryptedBytes = input.encrypt();
        const tx = await this.contract.deposit(symbol, encryptedBytes);
        await tx.wait();
        return true;
    },
    
    // For Demo Purposes: Simulate encryption delay
    async mockEncrypt(amount) {
        return new Promise(resolve => setTimeout(() => resolve('0xEncryptedBytes...'), 1500));
    }
};

