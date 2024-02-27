import elements from './dom.js';

export async function switchNetwork(ethereumService, chainName) {
  console.log(`You clicked the ${chainName} button`);
  try {
    await ethereumService.switchEthereumChain(chainName);
    console.log(`Sucdessfully switched to ${chainName} network`);
    updateButtonColors(chainName);
  } catch (error) {
    console.log(`Error switching to ${chainName} network: ${error}`);
  }
}

export function updateButtonColors(currentNetwork) {
  if (currentNetwork === 'goerli') {
    elements.goerliBtn.classList.add('active');
    elements.sepoliaBtn.classList.remove('active');
  } else if (currentNetwork === 'sepolia') {
    elements.sepoliaBtn.classList.add('active');
    elements.goerliBtn.classList.remove('active');
  } else {
    elements.goerliBtn.classList.remove('active');
    elements.sepoliaBtn.classList.remove('active');
  }
}
