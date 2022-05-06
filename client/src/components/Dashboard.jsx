import React, {useRef, useEffect} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import Sidebar from './Sidebar';

export default function Dashboard(props) {

  return (
      <div>
          <Sidebar id = {props.id}/>
      </div>
  )
}
