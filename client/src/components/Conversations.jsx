import React, {useEffect, useState} from 'react'
import { ListGroup } from 'react-bootstrap';
import { useConversation } from './contexts/ConversationProvider';

export default function Conversations() {
  const cons = useConversation();
  //this global var is for the useEffect Hook in setting a new value to the state renderOnMessage everytime there is a 
  //new message.
  let NEWEST_CONVERSATION_LENGTH = 0;
  //this global var hold the id of the receiver who receives the newest message (see newestSender prop in ConversationProvider)
  let NEWEST_SENDER = cons.newestSender;

  //find the newest conversation where the selectedUser is the same as the newestSender
  if (NEWEST_SENDER){
    const foundConversation = cons.conversations.find(conver => conver.selectedUser[0] === NEWEST_SENDER)
      || cons.conversations.find(conver => conver.message[conver.message.length-1].sender === NEWEST_SENDER);
      NEWEST_CONVERSATION_LENGTH = foundConversation.message.length;
  }

  const [renderOnMessage, setRenderOnMessage] = useState(NEWEST_SENDER);

  useEffect(()=>{
    setRenderOnMessage(NEWEST_SENDER);
  },[NEWEST_CONVERSATION_LENGTH])

  const handleClickConversation = (i) => {
    cons.setSelectedConversationIndex(i);
  } 

  const displayNoneNewestSender =  () => {
    return cons && cons.conversations.map((conver, index) => {
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
    )})
  }

  const displayNewestSender = () => {
    const changeOrderConversations = [];
    const found = cons.conversations.find(conver => conver.selectedUser[0] === NEWEST_SENDER) 
                  || cons.conversations.find(conver => conver.message[conver.message.length-1].sender === NEWEST_SENDER);
    changeOrderConversations.push(found);
    cons.conversations.filter(conver => {
      if (conver !== found){
        changeOrderConversations.push(conver);
      }
    })

    const handleClickConversationSpecial = (i,e)=> {
      // e.target.style.cssText = 'fontWeight: normal';
      setRenderOnMessage(prev => !prev);
      NEWEST_SENDER = "";
      cons.setSelectedConversationIndex(i);
    }

    return changeOrderConversations.map((conver, index) => {
      return(
        <>
        {conver.selectedUser[0] === NEWEST_SENDER?
          <ListGroup.Item
          key = {index}
          //set the action to make the Item like the Button
          action
          onClick={() => handleClickConversationSpecial(cons.conversations.indexOf(conver))}
          active={cons.conversations[cons.conversations.indexOf(conver)].selected}
          >
            {conver.recipient.map(re => {return <span style={{fontWeight: 900}}>{re.username}</span> })}
          </ListGroup.Item>
          :
          <ListGroup.Item
          key = {index}
          //set the action to make the Item like the Button
          action
          onClick={() => handleClickConversation(cons.conversations.indexOf(conver))}
          active={cons.conversations[cons.conversations.indexOf(conver)].selected}
        >
          {conver.recipient.map(re => {return <span>{re.username}</span> })}
        </ListGroup.Item>}
        </>
    )})
  }
  return (
    <ListGroup variant='flush'>
      {renderOnMessage ? displayNewestSender() : displayNoneNewestSender()}
    </ListGroup>
  )
}
