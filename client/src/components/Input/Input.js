import React from 'react';

import './Input.css';
import { BiSend } from "react-icons/bi";
import { ImLocation2 } from "react-icons/im";
const Input = ({ setMessage, sendMessage, message, location }) => (
  <div>
      <form className="form">
      <button className="sendLocation" onClick={e => location(e)}>
        {/* <strong>Send Location</strong> */}
          <ImLocation2/></button>
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
    <button className="sendButton" onClick={e => sendMessage(e)}>
      {/* <strong>Send Message</strong>  */}
      <BiSend/></button>
  </form>
  </div>
)

export default Input;