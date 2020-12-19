import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';
import { FcPortraitMode, FcAbout } from "react-icons/fc";
import { RiUserVoiceFill } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";

const Message = ({ message: { text, user, type }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">

            {type==="text"?<p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>:<a href={text} rel="noopener noreferrer" target="_blank">My Location<ImLocation2/></a>}
          </div>
          {user==="admin"?<FcAbout/>:<RiUserVoiceFill/>}
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            {user==="admin"?<FcAbout/>:<FcPortraitMode/>}
            <div className="messageBox backgroundLight">
              {type==="text"?<p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>:<a href={text} rel="noopener noreferrer" title="Click to open in google maps" target="_blank">{user} Location<ImLocation2/></a>}
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;