export const createDeepLink = () => {
  const currentPageUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentPageUrl);
  const deepLink = `https://metamask.app.link/dapp/${encodedUrl}`;
  const metamaskLinkElement = document.getElementById('metamaskLink');
  console.log(deepLink);

  if (metamaskLinkElement) {
    metamaskLinkElement.href = deepLink;
    metamaskLinkElement.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the default action
      console.log('Deep link clicked:', deepLink);
      // Optionally, you can prompt the user
      alert(
        'This link is intended for use with MetaMask Mobile on a mobile device.'
      );
    });
  }
};
