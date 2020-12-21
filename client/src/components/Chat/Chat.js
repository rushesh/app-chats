import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';
import { useHistory } from 'react-router-dom';
import SnackBar from "../Snackbar/Snackbar";

const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const history = useHistory();
  const [snack, setSnack] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    if(name==null || room ==null || name==undefined || room ==undefined){
      setErrorMsg(`Name or roomname is not present`);
      setSnack({...snack,open:true});
      history.push("/");
    }
    else{
      socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
    
    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        setErrorMsg(error);
        setSnack({...snack,open:true});
        history.push("/");
      }
      setErrorMsg(null);
    });
  }
  }, [ location.search]);
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    if(name!==null && room !==null && name!==undefined && room !==undefined){
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });

    socket.on('location', loc => {
      var m = `<a href={loc}>Location</a>`;
      setMessages(messages => [ ...messages, m ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }
  else{
    setErrorMsg(`Name or roomname is not present`);
      setSnack({...snack,open:true});
      history.push("/");
  }
}, [location.search]);

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  const sendLocation = (event)=>{
    event.preventDefault();
    if(!("geolocation" in navigator)){
      setErrorMsg(`Some error with location. Check if permission enabled`);
      setSnack({...snack,open:true})
    }
    else{
      navigator.geolocation.getCurrentPosition((location)=>{
      socket.emit('sendLocation', `https://google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`, () => setMessage(''));
    },(error)=>{
      setErrorMsg(`Some error with location. ${error.message}.`);
      setSnack({...snack,open:true})
    });
  }
  }

  return (
    <div className="outerContainer">
        <TextContainer users={users}/>
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
          location={sendLocation}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage} />
      </div>
      {snack.open!=null?<SnackBar handleclose={()=>setSnack({ ...snack, open: false })} vertical={snack.vertical} horizontal={snack.horizontal} open={snack.open} message={errorMsg}/>:null}
    </div>
  );
}

export default Chat;
