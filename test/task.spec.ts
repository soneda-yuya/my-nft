import { deployTestContract, getTestWallet } from './test-helpers';
import { waffle, run } from 'hardhat';
import { expect } from 'chai';
import sinon from 'sinon';
import * as provider from '../lib/provider';

describe('tasks', () => {
  beforeEach(async () => {
    sinon.stub(provider, 'getProvider').returns(waffle.provider);
    const wallet = getTestWallet();
    sinon.stub(process, 'env').value({
      ETH_PUBLIC_KEY: wallet.address,
      ETH_PRIVATE_KEY: wallet.privateKey,
    });
  });

  describe('deploy-contract', () => {
    it('calls through and returns the transaction object', async () => {
      sinon.stub(process.stdout, 'write');

      await run('deploy-contract');

      expect(process.stdout.write).to.have.been.calledWith(
        'Contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3'
      )
    });
  });

  describe('mint-nft', () => {
    beforeEach(async () => {
      const deployedContract = await deployTestContract('MyNFT');
      process.env.NFT_CONTRACT_ADDRESS = deployedContract.address;
    });

    it('calls through and returns the transaction object', async () => {
      sinon.stub(process.stdout, 'write');

      await run('mint-nft', { tokenUri: 'https://example.com/record/4' });

      expect(process.stdout.write).to.have.been.calledWith(
        'TX hash: 0x275746f1b150283dd06d47e1e8645383ce8f6033f84eeb1936bb0aa105adf5d2'
      )
    });
  });
});
