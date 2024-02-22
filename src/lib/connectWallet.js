export async function connectWallet(ethereumService) {
  console.log('connectwWallet function called');
  if (!ethereumService) {
    accountInput.value = '';
    initApp();
  }
  try {
    const account = await ethereumService.connect();
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
