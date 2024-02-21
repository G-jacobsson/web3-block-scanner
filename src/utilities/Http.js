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
