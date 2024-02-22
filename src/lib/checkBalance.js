export async function checkBalance(
  ethereumService,
  accountInput,
  displayBalance
) {
  try {
    const account = accountInput.value;

    if (!account) {
      alert('Please connect your wallet');
      return;
    }
    const balance = await ethereumService.checkBalance(account);
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
