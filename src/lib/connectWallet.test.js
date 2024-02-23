import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Window } from 'happy-dom';
import fs from 'fs';
import path from 'path';

let elements;
let connectWallet;

const setupVirtualDOM = async () => {
  const docPath = path.join(process.cwd(), '/src/pages/scanner.html');
  const content = fs.readFileSync(docPath).toString();
  const window = new Window();
  const document = window.document;
  document.write(content);
  global.document = document;
  global.window = window;

  if (typeof window.alert === 'undefined') {
    window.alert = () => {};
  }

  vi.spyOn(window, 'alert').mockImplementation(() => {});

  const connectWalletModule = await import('./connectWallet.js');
  connectWallet = connectWalletModule.connectWallet;

  const domElements = await import('./dom.js');
  elements = domElements.default;
};

describe('connectWallet function', () => {
  beforeEach(async () => {
    await setupVirtualDOM();
  });

  afterEach(() => {
    if (vi.isMockFunction(window.alert)) {
      window.alert.mockRestore();
    }
  });

  // Test for clearing account input if ethereumService is not provided
  it('should clear account input if ethereumService is not provided', async () => {
    await connectWallet(null);
    expect(elements.accountInput.value).toBe('');
  });

  // Test for updating account input on successful connection
  it('should update account input on successful connection', async () => {
    const mockEthereumService = {
      connect: vi.fn().mockResolvedValue('0x123'),
    };

    await connectWallet(mockEthereumService);
    expect(elements.accountInput.value).toBe('0x123');
  });

  // Test for clearing account input if connect resolves with undefined
  it('should clear account input if connect resolves with undefined', async () => {
    const mockEthereumService = {
      connect: vi.fn().mockResolvedValue(undefined),
    };

    await connectWallet(mockEthereumService);
    expect(elements.accountInput.value).toBe('');
  });

  // Test for displaying an alert on connection failure
  it('should display an alert on connection failure', async () => {
    const errorMessage = 'Error connecting to MetaMask';
    const mockEthereumService = {
      connect: vi.fn().mockRejectedValue(new Error(errorMessage)),
    };

    await connectWallet(mockEthereumService);
    // Verify that window.alert was called with the correct error message
    expect(window.alert).toHaveBeenCalledWith(
      `Error connecting to MetaMask: ${errorMessage}`
    );
  });
});
