import React from 'react';
import { useContacts } from './contexts/ContactsProvider';

export default function Contact(props) {
  const userContact = useContacts();
 
  return (
    <div>
      {
        userContact && userContact.contacts && userContact.contacts.map((contact) => {
          return <div>{contact.username}</div>
        })
      }
    </div>
  )
}
