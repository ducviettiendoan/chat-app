import './App.css';
import React, {useState} from 'react';
import Login from "./Login";
import Dashboard from './Dashboard';
import useLocalStorage from '../customHooks/useLocalStorage';


function App() {
  //store the id value for now the uuidV4 random id
  const [id, setId] = useLocalStorage('id');
  console.log(id); 
  return (
    <div className="App">
      {id ? <Dashboard id={id}/> : <Login onIdSubmit = {setId}/>}
    </div>
  );
}

export default App;
