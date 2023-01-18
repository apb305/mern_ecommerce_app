import React from "react";
import { Card, Button, Container, Image, Placeholder } from "react-bootstrap";

export default function CardSkeleton() {
  return (
    <>
      {Array(12)
        .fill()
        .map((item, index) => (
            <div className="col mt-5" key={index}>
          <Card className="text-center">
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={8} size="md" />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={8} size="sm" /> 
                <Placeholder xs={6} size="sm" />
              </Placeholder>
              {/* <Placeholder.Button variant="dark btn-sm" xs={3} /> */}
            </Card.Body>
          </Card>
          </div>
        ))}
    </>
  );
}
