import React from 'react';
import Sidebar from './Sidebar';
import CurrentConversation from './CurrentConversation';
import { useConversation } from './contexts/ConversationProvider';

export default function Dashboard(props) {
  const conversation = useConversation();
  return (
      <div className='d-flex' style={{height: '100vh'}}>
          <Sidebar id = {props.id}/>
          {conversation ? 
          <CurrentConversation conver={conversation.selectedConversation}/> 
          : 
          <div>Not found Conversation</div>}
      </div>
  )
}
