const rpc = new Web3(
  'https://sepolia.infura.io/v3/808b64a9d57e4dfc93f8f6de1ccd5739'
);

function initApp() {
  console.log(rpc);
}

document.addEventListener('DOMContentLoaded', initApp);
