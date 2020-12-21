import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';
import { useHistory } from 'react-router-dom';
import SnackBar from '../Snackbar/Snackbar';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const history = useHistory();
  const handleFormSubmit = (event)=>{
    event.preventDefault();
    if(name.trim() ==="" || room.trim() ===""){
      setName('');
      setRoom('');
    }
    else{
      history.push(`/chat?name=${name}&room=${room}`);
    }
  }
return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <form onSubmit={handleFormSubmit}>
        <div>
          <input placeholder="Name" required pattern="[A-Za-z]{1}[A-Za-z0-9 ]*" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" required  pattern="[A-Za-z]{1}[A-Za-z0-9 ]*" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
                  <button className={'button mt-20'} type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
