import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { useConversation } from './contexts/ConversationProvider';

export default function Conversations() {
  const cons = useConversation();
  const handleClickConversation = (i) => {
    cons.setSelectedConversationIndex(i);
  } 
  return (
    <ListGroup variant='flush'>
      {cons && cons.conversations.map((conver, index) => {
        return(
        <ListGroup.Item
          key = {index}
          //set the action to make the Item like the Button
          action
          onClick={() => handleClickConversation(index)}
          active={cons.conversations[index].selected}
        >
          {conver.recipient.map(re => re.username).join(',')}
        </ListGroup.Item>
      )})}
    </ListGroup>
  )
}
