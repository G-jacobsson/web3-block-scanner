export async function sendTransaction(
  ethereumService,
  accountInput,
  toAccountInput,
  amount,
  listTransactions
) {
  console.log('You clicked the send button');

  try {
    const fromAddress = accountInput.value;
    const toAddress = toAccountInput.value;
    const amountEther = amount.value;

    if (!ethereumService) {
      console.error('Ethereum service is not initialized');
      alert('Please connect your wallet first.');
      return;
    }

    const transactionHash = await ethereumService.sendTransaction({
      from: fromAddress,
      to: toAddress,
      amountEther: amountEther,
    });

    const transaction = await ethereumService.getTransactionByHash(
      transactionHash
    );

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
        <span>${ethereumService.formatAddress(transaction.from)}</span> 
        <span>${ethereumService.formatAddress(transaction.to)}</span>
        <span>${ethereumService
          .weiToEther(transaction.value)
          .toFixed(2)} ETH</span>
      </div>`;

    console.log('Transaction Hash:', transactionHash);
  } catch (error) {
    console.error('Error sending transaction:', error);
    alert(`Error sending transaction: ${error.message}`);
  }
}
