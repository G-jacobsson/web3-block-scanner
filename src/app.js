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

function initApp() {
  console.log(rpc);
}

async function connectWallet() {
  try {
    console.log(await ethereum.request({ method: 'eth_requestAccounts' }));
  } catch (error) {
    throw new Error('User denied account access...', error);
    alert('You need to connect your wallet to use this app');
  }
}

document.addEventListener('DOMContentLoaded', initApp);
connectBtn.addEventListener('click', connectWallet);
