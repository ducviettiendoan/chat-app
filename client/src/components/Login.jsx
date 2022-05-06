import React, {useRef, useEffect} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {v4 as uuidV4} from 'uuid';

export default function Login(props) {
  const userId = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    //value from Form.Control
    props.onIdSubmit(userId.current.value);
    console.log("Submit");
  }

  const createId = () => {
    props.onIdSubmit(uuidV4());
  }
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="Enter ID" ref = {userId}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            {/* uncomment type = submit to submit the form + trigger onSubmit */}
            <Button /*type="submit"*/ className="me-2">
              Log In
            </Button>
            <Button variant="secondary" onClick={createId}>
              Create a new account
            </Button>
        </Form>
    </Container>
  )
}
