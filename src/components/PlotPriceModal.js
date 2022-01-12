import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export const PlotPriceModal = ({
  show,
  plot,
  salePrice,
  setSalePrice,
  rates,
  onSetPrice,
  onClose,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          List Plot for Sell #{plot.id}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>WEI: {salePrice * rates * 1e18}</p>
        <p>ETH: {salePrice * rates}</p>
        <p>USD: {salePrice}</p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>List Price (in USD)</Form.Label>
            <Form.Control
              onChange={(e) => setSalePrice(e.target.value)}
              type="text"
              value={salePrice}
              placeholder="$40.00"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSetPrice}>
          List
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
