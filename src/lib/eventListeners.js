import { connectWallet } from './connectWallet.js';
import { checkBalance } from './checkBalance.js';
import { sendTransaction } from './sendTransaction.js';
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
