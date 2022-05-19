import React, {useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversation } from '../contexts/ConversationProvider';

export default function ConversationModal({closeShow}) {
  const contacts = useContacts();
  const convers = useConversation();
  console.log(convers);
  const [selectedContacts,setSelectedContacts] = useState([]);
  const createNewConversation = (e) => {
    e.preventDefault();
    convers.createConversation(selectedContacts);
    closeShow();
  }
  const handleCheckConversation = (id) => {
    if (selectedContacts.includes(id)){
      setSelectedContacts(prev => prev.filter((idNotCheck)=> idNotCheck !== id));
    }
    else{
      setSelectedContacts(prev => [...prev, id]);
    }
  }
  console.log(selectedContacts);
  return (
    <>
    <Modal.Header closeButton={true}>Create new Conversation</Modal.Header>
    <Modal.Body>
      <Form onSubmit={createNewConversation}>
        <Form.Group>
          {contacts.contacts.map((contact) => {
            return (
              <Form.Group controlId={contact.id}>
                <Form.Check>
                  <Form.Check type="checkbox" label={contact.username} onChange={() => handleCheckConversation(contact.id)} />
                </Form.Check>
              </Form.Group>
            )
          })}
        </Form.Group>
        <Button onClick={createNewConversation} className="mt-3">
            Create
        </Button>
    </Form>
    </Modal.Body>
    </>
  )
}
