export async function checkTransactions(
  ethereumService,
  accountInput,
  listTransactions
) {
  console.log('You clicked the check transactions button');
  try {
    const account = accountInput.value.toLowerCase();
    const block = await ethereumService.getBlockByNumber('latest');
    console.log(block);
    console.log(listTransactions);

    if (block && block.transactions && block.transactions.length > 0) {
      console.log('block.transactions:', block.transactions);
      listTransactions.innerHTML = '';
      let foundTransactions = false;

      block.transactions.forEach((tx) => {
        if (account.toLowerCase() === tx.from.toLowerCase()) {
          console.log('tx.from:', tx.from);
          foundTransactions = true;

          listTransactions.innerHTML += `<div
              style="width: fit-content; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; color: #0d1f1f; text-shadow: 0 0 5px #fababa; background: #fababa; border-radius: 10px; margin-top: 10px; padding: 10px;">
              <span>${ethereumService.formatAddress(tx.from)}</span> 
              <span>${ethereumService.formatAddress(tx.to)}</span>
              <span>${ethereumService
                .weiToEther(tx.value.toString())
                .toFixed(2)} ETH</span>
            </div>`;
        }
      });

      if (!foundTransactions) {
        listTransactions.innerHTML = `<div
            style="text-wrap: nowrap; width: fit-content; color: #0d1f1f; text-shadow: 0 0 5px #fababa; background: #fababa; border-radius: 10px; margin-top: 10px; padding: 10px;">No transactions found in the latest block!
          </div>`;
      }
    } else {
      listTransactions.innerHTML = `<div
          style="text-wrap: nowrap; width: fit-content; color: #0d1f1f; text-shadow: 0 0 5px #fababa; background: #fababa; border-radius: 10px; margin-top: 10px; padding: 10px;">No transactions found in the latest block!
        </div>`;
    }
  } catch (error) {
    console.error(`Error checking transactions: ${error}`);
    throw error;
  }
}
