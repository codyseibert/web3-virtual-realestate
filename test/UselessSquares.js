const UselessSquares = artifacts.require('UselessSquares');
const assert = require('assert');
const truffleAssert = require('truffle-assertions');

contract('UselessSquares', (accounts) => {
  const BUYER = accounts[1];

  it("should allow anyone to buy a plot of land that's for sale", async () => {
    const instance = await UselessSquares.deployed();
    const PLOT_ID = 12;
    const plot = await instance.plots(PLOT_ID);
    const ownerBalanceBefore = BigInt(
      await web3.eth.getBalance(plot.owner)
    );
    const result = await instance.buyPlot(
      PLOT_ID,
      'yolo',
      0x00ff00,
      { from: BUYER, value: plot.price }
    );
    console.log(result.logs.map((log) => log.args));
    const plotAfter = await instance.plots(PLOT_ID);
    const ownerBalanceAfter = BigInt(
      await web3.eth.getBalance(plot.owner)
    );
    assert.equal(
      ownerBalanceBefore + BigInt(plot.price),
      ownerBalanceAfter,
      'the original owner of the plot should be paid'
    );
    assert.equal(
      plotAfter.owner,
      BUYER,
      'plot should be owned by the buyer'
    );
    assert.equal(
      plotAfter.price,
      0,
      'plot should no longer be for sale'
    );
    assert.equal(
      plotAfter.text,
      'yolo',
      'plot text should be set correctly'
    );
    assert.equal(
      plotAfter.color,
      0x00ff00,
      'plot color should be set correctly'
    );
  });
});
