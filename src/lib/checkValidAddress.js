export function isValidEthereumAddress(address) {
  return (
    address.startsWith('0x') &&
    address.length === 42 &&
    /^[0-9a-fA-F]+$/i.test(address.substring(2))
  );
}
