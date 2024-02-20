const connectBtn = document.querySelector('#connect');
const accountInput = document.querySelector('#accountNumber');
const checkBalanceBtn = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');
const amount = document.querySelector('#amount');
const toAccountInput = document.querySelector('#toAccount');
const sendBtn = document.querySelector('#sendTrx');
const listTransactions = document.querySelector('#transactions');

const rpc = new Web3(
  'https://sepolia.infura.io/v3/808b64a9d57e4dfc93f8f6de1ccd5739'
);

let accounts;

function initApp() {
  console.log(rpc);
}

async function connectWallet() {
  try {
    if (typeof ethereum !== 'undefined') {
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      alert('You need to install MetaMask to use this app');
      return;
    }
  } catch (error) {
    throw new Error('User denied account access...', error);
  }
}

async function checkBalance() {
  try {
    if (typeof ethereum !== undefined) {
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      const balance = await ethereum.request({
        method: 'eth_getBalance',
        params: [accountInput.value, 'latest'],
      });

      const parsedBalance = parseInt(balance) / Math.pow(10, 18);
      displayBalance.innerHTML = `<div 
      style="font-size: clamp(1rem, 2vw, 2rem);
      color: #0d1f1f;
      text-shadow: 0 0 5px #fababa;
      background: #fababa;
      border-radius: 10px;
      padding: 10px;">${parsedBalance.toFixed(2)} ETH </div>`;
    } else {
      throw new Error('Account not found');
    }
  } catch (error) {
    error.message = 'Error checking balance';
  }
}

document.addEventListener('DOMContentLoaded', initApp);
connectBtn.addEventListener('click', connectWallet);
checkBalanceBtn.addEventListener('click', checkBalance);
