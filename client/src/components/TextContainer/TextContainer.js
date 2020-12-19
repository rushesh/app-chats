import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';
import {ListGroup} from 'react-bootstrap';
const TextContainer = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <h1>Active members</h1>
            <div className="activeContainer">
            <ListGroup>
                {users.map(({name},index) => (
                      <ListGroup.Item  key={index} variant="warning">
                        <img alt="Online Icon" src={onlineIcon}/> {name}
                      </ListGroup.Item>
                ))}
             </ListGroup >
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;