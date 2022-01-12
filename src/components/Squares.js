import React from 'react';
import { Button } from 'react-bootstrap';

export const Squares = ({
  setSelectedPlot,
  plots,
  account,
  setShowModal,
  setShowSellModal,
  rates,
}) => {
  const WIDTH = 220;
  const SIZE = 150;
  const ROWS = 4;

  const getLeft = (id) => {
    const row = Math.floor(id / ROWS);
    const isOdd = row % 2 === 1;
    return (
      (id % ROWS) * WIDTH + (isOdd ? WIDTH : WIDTH / 2)
    );
  };

  const getTop = (id) => {
    return (Math.floor(id / ROWS) * WIDTH) / 4;
  };

  const numberToColorHex = (number) => {
    const hex = parseInt(number).toString(16);
    return `000000${hex}`.slice(-6);
  };

  const weiToUsd = (wei) => {
    return (wei / rates / 1e18).toFixed(2);
  };

  return (
    <div className="plots">
      <div className="plots__wrapper">
        {plots.map((plot) => (
          <div
            key={plot.id}
            style={{
              backgroundColor: `#${numberToColorHex(
                plot.color
              )}`,
              left: getLeft(plot.id),
              top: getTop(plot.id),
              width: SIZE,
              height: SIZE,
            }}
            className="plots_plot"
          >
            <h3>
              {unescape(plot.text.replace(/\//g, '%'))}
            </h3>
            {plot.owner === account &&
              plot.price !== '0' && (
                <h5 className="text-center">
                  listed for ${weiToUsd(plot.price)}
                </h5>
              )}

            {plot.price !== '0' && plot.owner !== account && (
              <Button
                variant="success"
                onClick={() => {
                  setSelectedPlot(plot);
                  setShowModal(true);
                }}
              >
                Buy $
                {(plot.price / 1e18 / rates).toFixed(2)}
              </Button>
            )}

            {plot.owner === account && (
              <Button
                variant="danger"
                onClick={() => {
                  setSelectedPlot(plot);
                  setShowSellModal(true);
                }}
              >
                {plot.price === '0'
                  ? 'List for Sell'
                  : 'Change List Price'}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
