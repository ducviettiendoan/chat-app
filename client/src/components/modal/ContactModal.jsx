import React, {useRef} from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';

export default function ContactModal({closeShow}) {

    const idRef = useRef();
    const nameRef = useRef();
    //value of ContactContext.Provider is an obj => createContext is an obj
    const createContext = useContacts();

    const createNewContact = (e) => {
        e.preventDefault();
        createContext.storeNewContacts(idRef.current.value, nameRef.current.value);
        closeShow();
    }
  return (
    <>
    <Modal.Header closeButton={true}>Create new Contact</Modal.Header>
    <Modal.Body>
        <Form onSubmit={createNewContact}>
            <Form.Group>
                <Form.Label>
                    Id
                </Form.Label>
                <Form.Control type="text" placeholder="Enter ID" ref = {idRef} required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control type="text" placeholder="Enter ID" ref = {nameRef} required/>
            </Form.Group>
            <Button onClick={createNewContact} className="mt-3">
                Create
            </Button>
        </Form>
    </Modal.Body>
    </>
  )
}
