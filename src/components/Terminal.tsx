import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

interface TerminalControllerProps {
  className?: string;
}

const TerminalController: React.FC<TerminalControllerProps> = () => {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key={0}>Welcome to the CodeCollab!</TerminalOutput>
  ]);
  const ws = useRef<WebSocket | null>(null);
  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/execute');
  
    socket.onopen = () => {
      console.log('WebSocket connection established');
      // Save the WebSocket connection reference for later use
      ws.current = socket;
    };
  
    socket.onmessage = (event) => {
      const message = event.data;
      console.log('Message received:', message);
      
      // Split the message by newline characters to handle multiline responses
      const lines = message.split('\n');
      
      // Add each line as a separate entry in the terminal output
      setTerminalLineData(prevState => [
        ...prevState,
        ...lines.map((line:string, index:number) => (
          <TerminalOutput key={prevState.length + index}>{line}</TerminalOutput>
        ))
      ]);
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  
  const handleInput = (terminalInput: string) => {
    console.log(`Sending command: '${terminalInput}'`);
  
    // Check if the WebSocket connection is open
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // Send the command through the existing WebSocket connection
      ws.current.send(terminalInput);
    } else {
      console.error('WebSocket connection is not open.');
    }
  };
  
  return (
    <Container style={{overflowX:"hidden"}}>
      <Terminal
        name='CodeCollab Terminal'
        colorMode={ColorMode.Dark}
        onInput={handleInput}
        prompt="$"
        height='600px'
      >
        {terminalLineData}
      </Terminal>
    </Container>
  );
};

export default TerminalController;
