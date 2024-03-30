import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';


interface TerminalControllerProps{
  className?: string;
}

const TerminalController:React.FC<TerminalControllerProps> = () => {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key={0}>Welcome to the React Terminal UI Demo!</TerminalOutput>
  ]);

  const handleInput = (terminalInput:string) => {
    console.log(`New terminal input received: '${terminalInput}'`);
    // Here you can process the terminal input
    // For demo purposes, let's just add it to the terminal output
    setTerminalLineData(prevState => [
      ...prevState,
      <TerminalOutput key={prevState.length}>{terminalInput}</TerminalOutput>
    ]);
  };

  const handleRedButtonClick = () => {
    // Handle red button click if needed
    console.log("Red button clicked");
  };

  const handleYellowButtonClick = () => {
    // Handle yellow button click if needed
    console.log("Yellow button clicked");
  };

  const handleGreenButtonClick = () => {
    // Handle green button click if needed
    console.log("Green button clicked");
  };

  return (
    <div className="container">
      <Terminal
        name='React Terminal Usage Example'
        colorMode={ColorMode.Dark}
        onInput={handleInput}
        prompt="$"
        redBtnCallback={handleRedButtonClick}
        yellowBtnCallback={handleYellowButtonClick}
        greenBtnCallback={handleGreenButtonClick}
        height='100px'
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
};

export default TerminalController;
