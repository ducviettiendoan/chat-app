import React from 'react';
import {Container, Form} from "react-bootstrap";

export default function Login() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
        </Form>
    </Container>
  )
}
