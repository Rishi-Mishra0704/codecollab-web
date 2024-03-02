"use client"
import React, { useState, useEffect } from 'react';

interface Message {
  message: string;
}

interface ChatRoomProps {
  roomName: string;
}

function Page({ roomName }: ChatRoomProps): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newWs = new WebSocket(`ws://yourdomain.com/ws/chat/${roomName}/`);
    
    newWs.onopen = () => {
      console.log('WebSocket connected');
    };
    
    newWs.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };
    
    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, [roomName]);

  const sendMessage = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket not connected');
      return;
    }

    ws.send(JSON.stringify({ message: messageInput }));
    setMessageInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Page;
