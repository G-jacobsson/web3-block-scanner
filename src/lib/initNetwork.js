import elements from './dom.js';

export function initNetwork(networkName) {
  const networkButtons = {
    5: elements.goerliBtn,
    11155111: elements.sepoliaBtn,
  };

  Object.entries(networkButtons).forEach(([network, button]) => {
    console.log('network:', network);
    if (network === networkName) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}
