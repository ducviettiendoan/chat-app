import React, { useState } from 'react';
import {Tab, Nav, TabContainer, TabPane, Button} from "react-bootstrap";
import Conversations from './Conversations';
import Contact from './Contact';

export default function Sidebar(props) {
  const CONVERSATION = "conversation";
  const CONTACTS = "contact";
  const [selectTab, setTab] = useState(CONVERSATION);

  return (
      <div>
          <Tab.Container  activeKey={selectTab} onSelect = {setTab}>
              <Nav variant='tabs'>
                  <Nav.Item>
                      <Nav.Link eventKey={CONVERSATION}>Conversation</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey={CONTACTS}>Contacts</Nav.Link>
                  </Nav.Item>
              </Nav>
              {/* Content of the whole Tab (inside Tab Container) */}
              <Tab.Content className='p-2'>
                  {/* Normally the content of that linked to the Nave Link tương ứng trg Tab Container */}
                <Tab.Pane eventKey = {CONVERSATION}>
                    <Conversations/>
                </Tab.Pane>
                <Tab.Pane eventKey = {CONTACTS}>
                    <Contact/>  
                </Tab.Pane>
                <div className='d-flex flex-column justify-content-end' style={{height: "80vh"}}>
                    <div className='border-top'>Your Id:</div>
                    <div>{props.id}</div>
                </div>
                <Button className="mt-3">
                    Create new {selectTab}
                </Button>
              </Tab.Content>
          </Tab.Container>
      </div>
  )
}
