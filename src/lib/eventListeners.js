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
}
