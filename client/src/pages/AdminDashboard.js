import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>Users</Card.Header>
            <Card.Body>
              <Card.Title>Manage users</Card.Title>
              <Card.Text>
                View and manage all registered users on the platform.
              </Card.Text>
              <Button variant="primary">View users</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Products</Card.Header>
            <Card.Body>
              <Card.Title>Manage products</Card.Title>
              <Card.Text>
                View and manage all products available on the platform.
              </Card.Text>
              <Button variant="primary">View products</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Orders</Card.Header>
            <Card.Body>
              <Card.Title>Manage orders</Card.Title>
              <Card.Text>
                View and manage all orders placed on the platform.
              </Card.Text>
              <Button variant="primary">View orders</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

  


