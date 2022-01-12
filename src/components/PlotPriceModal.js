import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export const PlotPriceModal = ({
  show,
  plot,
  rates,
  contract,
  account,
  onComplete,
  onClose,
}) => {
  const [price, setPrice] = useState(plot.price);

  const setPlotPrice = async () => {
    await contract.methods
      .setPlotPrice(
        plot.id,
        `${parseInt(price * rates * 1e18)}`
      )
      .send({ from: account });
    onClose(false);
    onComplete();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          List Plot for Sell #{plot.id}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>WEI: {price * rates * 1e18}</p>
        <p>ETH: {price * rates}</p>
        <p>USD: {price}</p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>List Price (in USD)</Form.Label>
            <Form.Control
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              value={price}
              placeholder="$40.00"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => onClose(false)}
        >
          Close
        </Button>
        <Button variant="primary" onClick={setPlotPrice}>
          Set Price
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
