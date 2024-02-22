import EthereumService from './utilities/Http.js';
import { connectWallet } from './lib/connectWallet.js';
import { checkBalance } from './lib/checkBalance.js';
import { sendTransaction } from './lib/sendTransaction.js';

const connectBtn = document.querySelector('#connect');
const accountInput = document.querySelector('#accountNumber');
const checkBalanceBtn = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');
const amount = document.querySelector('#amount');
const toAccountInput = document.querySelector('#toAccount');
const sendBtn = document.querySelector('#sendTrx');
const listTransactions = document.querySelector('#transactions');

let ethereumService;

function initApp() {
  ethereumService = new EthereumService();

  connectBtn.addEventListener('click', () => connectWallet(ethereumService));
  checkBalanceBtn.addEventListener('click', () =>
    checkBalance(ethereumService, accountInput, displayBalance)
  );
  sendBtn.addEventListener('click', () =>
    sendTransaction(
      ethereumService,
      accountInput,
      toAccountInput,
      amount,
      listTransactions
    )
  );
}

document.addEventListener('DOMContentLoaded', initApp);
