import EthereumService from './utilities/Http.js';
import { state } from './utilities/config.js';
import { setupEventListeners } from './lib/eventListeners.js';
// import { createDeepLink } from './lib/deepLink.js';
import { showModal } from './lib/showModal.js';

let ethereumService;

if (!window.ethereum && !/Mobi|Android/i.test(navigator.userAgent)) {
  showModal();
}

function initApp() {
  ethereumService = new EthereumService();

  console.log('Current Path:', window.location.pathname);

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
