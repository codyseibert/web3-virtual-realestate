import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export const Header = ({ account }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Useless Squares</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Account: {account}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
