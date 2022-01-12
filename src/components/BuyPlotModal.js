import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export const BuyPlotModal = ({
  account,
  contract,
  onClose,
  onComplete,
  plot,
  rates,
  show,
}) => {
  const [color, setColor] = useState('00FF00');
  const [text, setText] = useState('YOLO');

  const buyPlot = async () => {
    await contract.methods
      .buyPlot(
        plot.id,
        escape(text).replace(/%/g, '/'),
        parseInt(color, 16)
      )
      .send({
        from: account,
        value: plot.price,
      });
    onClose(false);
    onComplete();
  };

  return (
    <Modal show={show} onHide={() => onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Buy Plot #{plot.id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h3>
          This plot costs $
          {(plot.price / rates / 1e18).toFixed(2)}
        </h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              onChange={(e) => setText(e.target.value)}
              type="text"
              value={text}
              placeholder="ヽ(´▽`)/"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              onChange={(e) => setColor(e.target.value)}
              type="text"
              value={color}
              placeholder="00ff00"
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
        <Button variant="primary" onClick={buyPlot}>
          Buy
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
