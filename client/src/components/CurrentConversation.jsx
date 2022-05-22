import React, {useState, useRef, useEffect} from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversation } from './contexts/ConversationProvider';

export default function CurrentConversation(props) {
    const cons = useConversation();
    const [textMessage, setTextMessage] = useState("");
    const latestMessage = useRef();
    //newMessage is for useEffect => call useEffect only when newMessage val changes
    const [newMessage, setNewMessage] = useState(false); 
    const handleChangeMessage = (e) => {
        setTextMessage(e.target.value);
    }
    const handleSendMessage = (e) => {
        console.log(textMessage);
        e.preventDefault();
        if (textMessage.trim().length > 0){
            cons.sendMessage(cons.selectedConversation.recipient.map((user)=> {return user.id}), textMessage);
            setNewMessage(prev => !prev);
            console.log("Sent");
        }
        setTextMessage("");
    }
    
    useEffect(()=>{
        if (latestMessage){
            latestMessage.current.scrollIntoView();
        }
    },[newMessage]);

    console.log(cons);
    return (
        <div className="w-100 d-flex flex-column justify-content-end flex-grow-1">
            <div className='overflow-auto'>
                <div className="flex-grow-1 d-flex">
                    <div className="flex-column align-items-start justify-content-end px-3 flex-grow-1">
                        {cons.selectedConversation.message.map((mes, index) => {
                            const newMessage = cons.selectedConversation.message.length - 1 === index;
                            return (
                                <div 
                                    ref={newMessage ? latestMessage : null}
                                    key={index}
                                    className={`d-flex flex-column ${mes.fromMe ? 'align-items-end' : 'align-items-start'} mb-2 w-100`}
                                >
                                    <div className={`${mes.fromMe ?'rounded bg-primary text-white p-2':'rounded bg-light p-2'}`}>{mes.text}</div>
                                        <div>{mes.fromMe ? 
                                            <span style={{color: '#A49E98'}}>You</span>
                                            : 
                                            <span style={{color: '#A49E98'}}>{mes.senderName}</span>}
                                        </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Form onSubmit={handleSendMessage} className='p-3'>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={textMessage}
                            onChange={handleChangeMessage}
                            style={{height: "75px", resize:"none"}}
                        />
                        <Button type="submit" variant='primary' onClick={handleSendMessage} style={{fontWeight: 700}}>Send</Button>
                    </InputGroup>
                    
                </Form.Group>
            </Form>
        </div>
    )
}
