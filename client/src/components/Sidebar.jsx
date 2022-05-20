import React, { useState } from 'react';
import {Tab, Nav, Button, Modal} from "react-bootstrap";
import Conversations from './Conversations';
import Contact from './Contact';
import ConversationModal from './modal/ConversationModal';
import ContactModal from './modal/ContactModal';

export default function Sidebar(props) {
  //Global variables
  const CONVERSATION = "conversation";
  const CONTACTS = "contact";
  const [selectTab, setTab] = useState(CONVERSATION);
  const [show, setShow] = useState(false);
  const openShow = () => setShow(true);
  const closeShow = () => setShow(false);

  return (
      <div className='d-flex flex-column' style={{"border-right": '1px solid black'}}>
          <Tab.Container activeKey={selectTab} onSelect = {setTab}>
              <Nav variant='tabs'>
                  <Nav.Item>
                      <Nav.Link eventKey={CONVERSATION}>Conversation</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey={CONTACTS}>Contacts</Nav.Link>
                  </Nav.Item>
              </Nav>
              {/* Content of the whole Tab (inside Tab Container) */}
              <Tab.Content className='p-2 overflow-auto'>
                  {/* Normally the content of that linked to the Nave Link tương ứng trg Tab Container */}
                <Tab.Pane eventKey = {CONVERSATION}>
                    <Conversations/>
                </Tab.Pane>
                <Tab.Pane eventKey = {CONTACTS}>
                    <Contact/>  
                </Tab.Pane>
                <div className='d-flex flex-column justify-content-end' style={{height:'80vh'}}>
                    <div className='border-top'>Your Id:</div>
                    <div>{props.id}</div>
                </div>
                {selectTab === CONVERSATION ?
                <Button className="mt-3" onClick={openShow}>
                    Create new {selectTab}
                </Button>
                :
                <Button className="mt-3" onClick={openShow}>
                    Create new {selectTab}
                </Button>
                }
              </Tab.Content>
          </Tab.Container>      
          <Modal show = {show} onHide={closeShow}>
              {selectTab === CONVERSATION?
                <ConversationModal closeShow={closeShow}/>
                :
                <ContactModal closeShow={closeShow}/>
            }
            </Modal>
      </div>
  )
}
