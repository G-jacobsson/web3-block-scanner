export default class EthereumService {
  constructor() {
    if (typeof window.ethereum === 'undefined') {
      throw new Error(
        'Ethereum object not found! Make sure MetaMask is installed'
      );
    }
    this.ethereum = window.ethereum;
    this.accounts = [];
    this.isConnecting = false;
  }

  async connect() {
    if (this.isConnecting) {
      console.log('Already connecting to MetaMask');
      alert('Already connecting to MetaMask');
      return;
    }

    this.isConnecting = true;

    try {
      this.accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      });
      this.isConnecting = false;
      return this.accounts[0];
    } catch (error) {
      this.isConnecting = false;
      if (error.code === -32002) {
        console.log(
          'MetaMask is already processing a connection request. Please wait.'
        );
        alert(
          'MetaMask is already processing a connection request. Please wait.'
        );
      } else {
        console.log(`Error connecting to MetaMask: ${error.message}`);
        alert(`Error connecting to MetaMask: ${error.message}`);
        throw new Error('User denied account access...', error);
      }
    }
  }

  async checkBalance(account) {
    try {
      const balance = await this.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });
      return this.weiToEther(balance);
    } catch (error) {
      console.error(`Error checking balance: ${error}`);
      throw error;
    }
  }

  async sendTransaction({
    from,
    to,
    amountEther,
    gas = '21000',
    gasPrice = '20000000000',
  }) {
    const params = {
      from,
      to,
      value: '0x' + this.etherToWei(amountEther).toString(16),
      gas: '0x' + parseInt(gas, 10).toString(16),
      gasPrice: '0x' + parseInt(gasPrice, 10).toString(16),
    };

    try {
      const transactionHash = await this.ethereum.request({
        method: 'eth_sendTransaction',
        params: [params],
      });
      return transactionHash;
    } catch (error) {
      console.error(`Error sending transaction: ${error}`);
      throw error;
    }
  }

  async getTransactionByHash(transactionHash) {
    try {
      const transaction = await this.ethereum.request({
        method: 'eth_getTransactionByHash',
        params: [transactionHash],
      });
      return transaction;
    } catch (error) {
      console.error(`Error fetching transaction by hash: ${error}`);
      throw error;
    }
  }

  async getBlockByNumber(blockNumber) {
    try {
      const block = await this.ethereum.request({
        method: 'eth_getBlockByNumber',
        params: [blockNumber, true],
      });
      return block;
    } catch (error) {
      console.error(`Error fetching block: ${error}`);
      throw error;
    }
  }

  async switchEthereumChain(chainName) {
    const chainIds = {
      sepolia: '0xaa36a7',
      goerli: '0x5',
    };
    const chainId = chainIds[chainName];

    if (!chainId) {
      throw new Error('Chain not supported');
    }

    try {
      await this.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (error) {
      console.error(`Error switching chain: ${chainName} - ${error}`);
      throw error;
    }
  }

  async getCurrentNetwork() {
    try {
      const networkId = await this.ethereum.request({ method: 'net_version' });
      return networkId;
    } catch (error) {
      console.error(`Error fetching current network: ${error}`);
      throw error; // Re-throw the error for handling by the caller
    }
  }

  weiToEther(weiBalance) {
    return parseInt(weiBalance) / Math.pow(10, 18);
  }

  etherToWei(amountEther) {
    return parseFloat(amountEther) * Math.pow(10, 18);
  }

  formatAddress(address) {
    return (
      address.substring(0, 6) + '...' + address.substring(address.length - 4)
    );
  }
}
