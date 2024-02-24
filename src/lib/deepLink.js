export const createDeepLink = () => {
  const url = 'https://web3trxio.netlify.app';
  const encodedUrl = encodeURIComponent(url);
  const deepLink = `https://metamask.app.link/dapp/${encodedUrl}`;
  const metamaskLinkElement = document.querySelector('#metamaskLink');
  console.log(deepLink);

  if (metamaskLinkElement) {
    metamaskLinkElement.href = deepLink;
    metamaskLinkElement.addEventListener('click', (e) => {
      if (!/Mobi/i.test(navigator.userAgent)) {
        e.preventDefault();
        alert(
          'This link is intended for use with MetaMask Mobile on a mobile device.'
        );
        console.log('Deep link clicked:', deepLink);
      }
    });
  }
};
