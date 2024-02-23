import elements from './dom.js';

export async function connectWallet(ethereumService) {
  console.log('connectwWallet function called');
  if (!ethereumService) {
    elements.accountInput.value = '';
    return;
  }
  try {
    const account = await ethereumService.connect();
    if (account !== undefined) {
      console.log(`Connected account: ${account}`);
      elements.accountInput.value = account;
    } else {
      elements.accountInput.value = '';
    }
  } catch (error) {
    console.log(`Error connecting to MetaMask: ${error.message}`);
    window.alert(`Error connecting to MetaMask: ${error.message}`);
  }
}
