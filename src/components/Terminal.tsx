import React, { useState } from 'react';

const TerminalController: React.FC = () => {
  const [inputCommand, setInputCommand] = useState('');
  const [output, setOutput] = useState('');

  const executeCommand = () => {
    // Placeholder implementation: echo the input command as output
    setOutput(inputCommand);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={inputCommand}
        onChange={(e) => setInputCommand(e.target.value)}
      />
      <button onClick={executeCommand}>Execute</button>
      <div>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default TerminalController;
