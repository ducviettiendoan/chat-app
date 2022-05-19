import React, {useState} from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversation } from './contexts/ConversationProvider';

export default function CurrentConversation(props) {
    const cons = useConversation();
    const [textMessage, setTextMessage] = useState("");
    const handleChangeMessage = (e) => {
        setTextMessage(e.target.value);
    }
    const handleSendMessage = (e) => {
        e.preventDefault();
        cons.sendMessage(cons.selectedConversation.recipient.map((user)=> {return user.id}), textMessage);
        setTextMessage("");
        console.log("Sent");
    }
    console.log(cons);
    return (
        <div className="w-100 d-flex flex-column justify-content-end">
            <div className="overflow-auto">Message</div>
            <Form onSubmit={handleSendMessage}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={textMessage}
                            onChange={handleChangeMessage}
                            style={{height: "75px", resize:"none"}}
                        />
                        <Button type="submit" variant='primary' onClick={handleSendMessage}>Send</Button>
                    </InputGroup>
                    
                </Form.Group>
            </Form>
        </div>
    )
}
