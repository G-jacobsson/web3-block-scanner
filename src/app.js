import EthereumService from './utilities/Http.js';

const connectBtn = document.querySelector('#connect');
const accountInput = document.querySelector('#accountNumber');
const checkBalanceBtn = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');
const amount = document.querySelector('#amount');
const toAccountInput = document.querySelector('#toAccount');
const sendBtn = document.querySelector('#sendTrx');
const listTransactions = document.querySelector('#transactions');

let ethereum;

function initApp() {
  ethereum = new EthereumService();
}

async function connectWallet() {
  if (!ethereum) {
    accountInput.value = '';
    initApp();
  }
  try {
    const account = await ethereum.connect();
    if (account !== undefined) {
      console.log(`Connected account: ${account}`);
      accountInput.value = account;
    } else {
      accountInput.value = '';
    }
  } catch (error) {
    console.log(`Error connecting to MetaMask: ${error.message}`);
  }
}

async function checkBalance() {
  try {
    const account = accountInput.value;

    if (!account) {
      alert('Please connect your wallet');
      return;
    }
    const balance = await ethereum.checkBalance(account);
    displayBalance.style.display = 'flex';
    displayBalance.style.justifyContent = 'center';
    displayBalance.style.alignItems = 'center';
    displayBalance.innerHTML = `<div 
      style="width: fit-content;
      font-size: clamp(1rem, 2vw, 2rem);
      color: #0d1f1f;
      text-shadow: 0 0 5px #fababa;
      background: #fababa;
      border-radius: 10px;
      padding: 10px;">${balance.toFixed(2)} ETH </div>`;
  } catch (error) {
    console.error(`Error checking balance: ${error}`);
    displayBalance.innerHTML = 'Error checking balance...';
  }
}

async function sendTransaction() {
  console.log('You clicked the send button');

  try {
    const fromAddress = accountInput.value;
    const toAddress = toAccountInput.value;
    const amountEther = amount.value;

    if (!ethereum) {
      console.error('Ethereum service is not initialized');
      alert('Please connect your wallet first.');
      return;
    }

    const transactionHash = await ethereum.sendTransaction({
      from: fromAddress,
      to: toAddress,
      amountEther: amountEther,
    });

    const transaction = await ethereum.getTransactionByHash(transactionHash);

    listTransactions.style.display = 'flex';
    listTransactions.style.flexDirection = 'column';
    listTransactions.style.justifyContent = 'center';
    listTransactions.style.alignItems = 'center';
    listTransactions.innerHTML = `<div
      style="width: fit-content;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      color: #0d1f1f;
      text-shadow: 0 0 5px #fababa;
      background: #fababa;
      border-radius: 10px;
      margin-top: 10px;
      padding: 10px;">
      <span>${ethereum.formatAddress(transaction.from)}</span> 
      <span>${ethereum.formatAddress(transaction.to)}</span>
      <span>${ethereum.weiToEther(transaction.value).toFixed(2)} ETH</span>
    </div>`;

    console.log('Transaction Hash:', transactionHash);
  } catch (error) {
    console.error('Error sending transaction:', error);
    alert(`Error sending transaction: ${error.message}`);
  }
}

// function formatAddress(address) {
//   return (
//     address.substring(0, 6) + '...' + address.substring(address.length - 4)
//   );
// }

// async function connectWallet() {
//   try {
//     if (typeof ethereum !== 'undefined') {
//       accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//     } else {
//       alert('You need to install MetaMask to use this app');
//       return;
//     }
//   } catch (error) {
//     throw new Error('User denied account access...', error);
//   }
// }

// async function sendTransaction() {
//   console.log('You clicked the send button');

//   try {
//     const parsedAmount = parseFloat(amount.value) * Math.pow(10, 18);
//     let params = [
//       {
//         from: accountInput.value,
//         to: toAccountInput.value,
//         value: Number(parsedAmount).toString(16),
//         gas: Number(21000).toString(16),
//         gasPrice: Number(20000000).toString(16),
//       },
//     ];

//     const response = await ethereum.request({
//       method: 'eth_sendTransaction',
//       params: params,
//     });

//     const transaction = await ethereum.request({
//       method: 'eth_getTransactionByHash',
//       params: [response],
//     });

//     listTransactions.style.display = 'flex';
//     listTransactions.style.flexDirection = 'column';
//     listTransactions.style.justifyContent = 'center';
//     listTransactions.style.alignItems = 'center';
//     listTransactions.innerHTML = `<div
//     style="width: fit-content;
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 10px;
//     color: #0d1f1f;
//     text-shadow: 0 0 5px #fababa;
//     background: #fababa;
//     border-radius: 10px;
//     margin-top: 10px;
//     padding: 10px;">
//     <span>${formatAddress(transaction.from)}</span>
//     <span>${formatAddress(transaction.to)}</span>
//     <span>${rpc.utils.fromWei(transaction.value, 'ether')} ETH</span>
//     </div>`;

//     console.log(transaction);
//   } catch (error) {
//     throw new Error('Error sending transaction', error);
//   }
// }

document.addEventListener('DOMContentLoaded', initApp);
connectBtn.addEventListener('click', connectWallet);
checkBalanceBtn.addEventListener('click', checkBalance);
sendBtn.addEventListener('click', sendTransaction);
