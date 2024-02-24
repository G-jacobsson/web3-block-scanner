# Web3 Transaction and Scanner App

Web3 Transaction App is a JavaScript application designed to interact with the Ethereum blockchain. It enables users to connect their wallets, check balances, send transactions, and view transaction history.

## Features

- **Connect Wallet:** Connect your wallet to interact with the Ethereum blockchain.
- **Check Balance:** View the balance of your Ethereum account.
- **Send Transaction:** Send transactions to other Ethereum addresses.
- **View Transaction History:** Display a list of transactions sent from your wallet.

## Usage

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/G-jacobsson/web3-block-scanner.git
   ```

2. Navigate to the project directory:

   ```bash
   cd web3-block-scanner
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Usage

To use the Web3 Transaction App in desktop browser:

1. Ensure you have an Ethereum wallet set up as a plug-in, such as MetaMask.
2. Open the application in your preferred web browser, i.e. with VS code Live Server extention.
3. Connect your wallet using the provided interface.
4. Check your balance, send transactions, and view transaction history as needed.

To use the Web3 Transaction App with the MetaMask Mobile App:

1. Log in to your MetaMask Mobile App.
2. Make sure to check which network you are on. For test, connect to _Sepolia Testnet_.
3. Go to the broswer tab and enter
   > https://web3trxio.netlify.app
4. To use the application, press connect, choose your account (if several), then check balance. Account balance will be displayed.
5. Enter amount you want to send, then enter an account address for reciever.
6. Press send. You have to confirm or decline the transaction.
7. A confirmed transaction will be displayed.

## Running Tests

To run tests for the Web3 Transaction App:

1. Ensure you have followed the installation steps.
2. Open a terminal and navigate to the project directory if you haven't already.
3. Run the following command:

   ```bash
   npm test
   ```

   This will execute the tests and display the results in the terminal.
