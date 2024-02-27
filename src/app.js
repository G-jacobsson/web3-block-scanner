import EthereumService from './utilities/Http.js';
import { state } from './utilities/config.js';
import { setupEventListeners } from './lib/eventListeners.js';
// import { createDeepLink } from './lib/deepLink.js';
import { showModal } from './lib/showModal.js';
import { initNetwork } from './lib/initNetwork.js';

let ethereumService;

if (!window.ethereum && !/Mobi|Android/i.test(navigator.userAgent)) {
  showModal();
}

async function initApp() {
  ethereumService = new EthereumService();

  console.log('Current Path:', window.location.pathname);

  try {
    const currentNetwork = await ethereumService.getCurrentNetwork();
    console.log('Current network:', currentNetwork);
    initNetwork(currentNetwork);
  } catch (error) {
    console.log('Error getting current network:', error);
  }

  switch (state.currentPage) {
    case '/':
    case '/index.html':
      console.log('index page');
      setupEventListeners(ethereumService);
      break;
    case 'scanner':
    case 'scanner.html':
    case '/src/pages/scanner':
    case '/src/pages/scanner.html':
      console.log('scanner page');
      setupEventListeners(ethereumService);
      break;
  }
}

document.addEventListener('DOMContentLoaded', initApp);
