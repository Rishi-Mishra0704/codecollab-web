import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileFolder = () => {
  const [path, setPath] = useState('');
  const [isFolder, setIsFolder] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [fileContent, setFileContent] = useState<string>('');

  useEffect(() => {
    console.log("File content:", fileContent); // Log the file content when it changes
  }, [fileContent]);

  const createFileOrFolder = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/create', {
        path: path,
        isFolder: isFolder
      });
      setMessage(response.data.message);
    } catch (error:any) {
      setMessage(error.response.data.error);
    }
  };

  const listFiles = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/list', {
        path: path
      });
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error listing files:', error);
    }
  };

  const readFileContent = async (fileName:string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/read', {
        path: `${path}/${fileName}`
      });
      setFileContent(response.data.content);
    } catch (error) {
      console.error('Error reading file content:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter path" 
        value={path} 
        onChange={(e) => setPath(e.target.value)} 
      />
      <label>
        <input 
          type="checkbox" 
          checked={isFolder} 
          onChange={(e) => setIsFolder(e.target.checked)} 
        />
        Is Folder
      </label>
      <button onClick={createFileOrFolder}>Create</button>
      <button onClick={listFiles}>List Files</button>
      {files.length > 0 && (
        <ul>
          {files.map((fileName, index) => (
            <li key={index}>
              <button onClick={() => readFileContent(fileName)}>{fileName}</button>
            </li>
          ))}
        </ul>
      )}
      {fileContent && <pre>{fileContent}</pre>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileFolder;
