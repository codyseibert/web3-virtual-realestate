import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export const BuyPlotModal = ({
  color,
  onBuy,
  plot,
  setColor,
  setShowModal,
  setText,
  showModal,
  text,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Buy Plot #{plot.id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
          onClick={() => setShowModal(false)}
        >
          Close
        </Button>
        <Button variant="primary" onClick={onBuy}>
          Buy
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
