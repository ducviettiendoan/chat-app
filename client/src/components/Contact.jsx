import React from 'react';

export default function Contact(props) {
  console.log(props.contacts);
  return (
    <div>
      {props.contacts.map((contact) => {
        return <div>{contact.username}</div>
      })}
    </div>
  )
}
