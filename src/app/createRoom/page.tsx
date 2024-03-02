"use client"
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

function ChatRoomSelector(): JSX.Element {
  const [roomName, setRoomName] = useState<string>('');

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleEnterRoom = () => {
    if (roomName.trim() !== '') {
      window.location.pathname = `/Chatroom/${roomName}/`;
    } else {
      alert('Please enter a room name.');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEnterRoom();
    }
  };

  return (
    <div>
      <h1>Chat Rooms</h1>
      <label htmlFor="room-name-input">What chat room would you like to enter?</label>
      <br />
      <input
        id="room-name-input"
        type="text"
        size={100}
        value={roomName}
        onChange={handleRoomNameChange}
        onKeyPress={handleKeyPress}
      />
      <br />
      <button id="room-name-submit" onClick={handleEnterRoom}>Enter</button>
    </div>
  );
}

export default ChatRoomSelector;
