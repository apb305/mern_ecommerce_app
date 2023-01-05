import React from "react";
import { Container } from "react-bootstrap";


function OrderCompletion() {
  return (
    <div>
        <Container className="text-center mt-5">
      <header>
        <h1>Thanks for your order!</h1>
      </header>
      <main>
        <p>
          We appreciate your business! If you have any questions, please email
          <a className="text-decoration-none" href="mailto:orders@example.com"> orders@example.com</a>.
        </p>
      </main>
      </Container>
    </div>
  );
}

export default OrderCompletion;
