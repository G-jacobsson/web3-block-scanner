import { connectWallet } from './connectWallet.js';
import { checkBalance } from './checkBalance.js';
import { sendTransaction } from './sendTransaction.js';
import { checkTransactions } from './checkTransactions.js';
import { isValidEthereumAddress } from './checkValidAddress.js';
import { switchNetwork, updateButtonColors } from './switchNetwork.js';
import elements from './dom.js';

export function setupEventListeners(ethereumService) {
  if (elements.connectBtn) {
    elements.connectBtn.addEventListener('click', () =>
      connectWallet(ethereumService)
    );
  }
  if (elements.checkBalanceBtn) {
    elements.checkBalanceBtn.addEventListener('click', () =>
      checkBalance(
        ethereumService,
        elements.accountInput,
        elements.displayBalance
      )
    );
  }
  if (elements.checkTransactionsBtn) {
    elements.checkTransactionsBtn.addEventListener('click', () => {
      const accountInputValue = elements.accountInput.value;
      if (accountInputValue && isValidEthereumAddress(accountInputValue)) {
        checkTransactions(
          ethereumService,
          elements.accountInput,
          elements.listTransactions,
          elements.displayBalance
        );
      } else {
        alert('Please enter a valid Ethereum address.');
      }
    });
  }
  if (elements.goerliBtn) {
    elements.goerliBtn.addEventListener('click', () => {
      switchNetwork(ethereumService, 'goerli');
      updateButtonColors('goerli');
    });
  }
  if (elements.sepoliaBtn) {
    elements.sepoliaBtn.addEventListener('click', () => {
      switchNetwork(ethereumService, 'sepolia');
      updateButtonColors('sepolia');
    });
  }
  if (elements.sendBtn) {
    elements.sendBtn.addEventListener('click', () =>
      sendTransaction(
        ethereumService,
        elements.accountInput,
        elements.toAccountInput,
        elements.amount,
        elements.listTransactions
      )
    );
  }
  if (elements.metamaskLink && /Mobi|Android/i.test(navigator.userAgent)) {
    elements.metamaskLink.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Link clicked');
      const url =
        'https://metamask.app.link/dapp/web3trxio.netlify.app/scanner';
      openMetaMaskUrl(url);
    });
  }

  function openMetaMaskUrl(url) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
if (
  window.ethereum &&
  !/Mobi|Android/i.test(navigator.userAgent) &&
  elements.metamaskLink
) {
  elements.metamaskLink.style = 'display: none';
}
