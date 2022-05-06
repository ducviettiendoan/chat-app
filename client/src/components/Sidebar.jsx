import React from 'react';
import {Tab, Nav, TabContainer} from "react-bootstrap";

export default function Sidebar(props) {
  const CONVERSATION = "conversation";
  const CONTACTS = "contacts";
  return (
      <div>
          <Tab.Container activeKey={"hello"}>
              <Nav variant='pills'>
                  <Nav.Item>
                      <Nav.Link eventKey={CONVERSATION}>Conversation</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey={CONTACTS}>Contacts</Nav.Link>
                  </Nav.Item>
              </Nav>
          </Tab.Container>
      </div>
  )
}
