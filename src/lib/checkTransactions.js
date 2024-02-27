export async function checkTransactions(
  ethereumService,
  accountInput,
  listTransactions,
  displayBalance
) {
  console.log('You clicked the check transactions button');
  try {
    const account = accountInput.value.toLowerCase();
    const block = await ethereumService.getBlockByNumber('latest');
    console.log(block);
    console.log(
      'Block timestamp:',
      new Date(block.timestamp * 1000).toLocaleString()
    );
    const blockNumber = parseInt(block.number, 16);
    console.log('Block number:', blockNumber);
    console.log(listTransactions);

    // Add event listener for clear button using event delegation
    listTransactions.addEventListener('click', function (event) {
      if (event.target && event.target.id === 'clearBtn') {
        listTransactions.innerHTML = '';
        accountInput.value = '';
        displayBalance.innerHTML = '';
      }
    });

    if (block && block.transactions && block.transactions.length > 0) {
      console.log('block.transactions:', block.transactions);

      // Reset innerHTML and add clear button only once
      listTransactions.innerHTML = `<button id="clearBtn" class="btn" style="margin-top: 10px; padding: 10px; background: #fababa; border-radius: 10px; color: #0d1f1f; text-shadow: 0 0 5px #fababa; cursor: pointer;">clear</button><div><div id="blockNumber" style="width: fit-content; wrap: nowrap; margin-top: 10px; padding: 10px; background: #fababa; border-radius: 10px; color: #0d1f1f; text-shadow: 0 0 5px #fababa;">Block Number: ${blockNumber}</div></div>`;
      let foundTransactions = false;

      block.transactions.forEach((tx) => {
        if (account.toLowerCase() === tx.from.toLowerCase()) {
          console.log('tx.from:', tx.from);
          foundTransactions = true;

          listTransactions.innerHTML += `<div style="width: fit-content; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; color: #0d1f1f; text-shadow: 0 0 5px #fababa; background: #fababa; border-radius: 10px; margin-top: 10px; padding: 10px;">
              <span>${ethereumService.formatAddress(tx.from)}</span> 
              <span>${ethereumService.formatAddress(tx.to)}</span>
              <span>${ethereumService
                .weiToEther(tx.value.toString())
                .toFixed(2)} ETH</span>
            </div>`;
        }
      });

      if (!foundTransactions) {
        listTransactions.innerHTML += `<div style="text-wrap: nowrap; width: fit-content; color: #0d1f1f; text-shadow: 0 0 5px #fababa; background: #fababa; border-radius: 10px; margin-top: 10px; padding: 10px;">No transactions found in the latest block!</div>`;
      }
    } else {
      listTransactions.innerHTML = `<button id="clearBtn" class="btn" style="margin-top: 10px; padding: 10px; background: #fababa; border-radius: 10px; color: #0d1f1f; text-shadow: 0 0 5px #fababa; cursor: pointer;">clear</button><div><div id="blockNumber" style="width: fit-content; wrap: nowrap; margin-top: 10px; padding: 10px; background: #fababa; border-radius: 10px; color: #0d1f1f; text-shadow: 0 0 5px #fababa;">Block Number: ${blockNumber}</div></div><div
          style="text-wrap: nowrap; width: fit-content; color: #0d1f1f; text-shadow: 0 0 5px #fababa; background: #fababa; border-radius: 10px; margin-top: 10px; padding: 10px;">No transactions found in the latest block!</div>`;
    }
  } catch (error) {
    console.error(`Error checking transactions: ${error}`);
    throw error;
  }
}
