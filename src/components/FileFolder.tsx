import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Form, Button } from 'react-bootstrap';

interface FileFolderProps {
  updateFileContent: (content: string, extension: string) => void;
}

const FileFolder: React.FC<FileFolderProps> = ({ updateFileContent }) => {
  const [path, setPath] = useState('');
  const [isFolder, setIsFolder] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
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
    } catch (error: any) {
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

  const readFileContent = async (fileName: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/read', {
        path: `${path}/${fileName}`
      });
      // Extract file extension from file name
      const fileExtension = fileName.split('.').pop() || '';
      updateFileContent(response.data.content, fileExtension);
      setFileContent(response.data.content);
      setSelectedFile(fileName);
    } catch (error) {
      console.error('Error reading file content:', error);
    }
  };

  return (
    <div>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Enter path"
          className=''
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        <Form.Check
          type="checkbox"
          label="Is Folder"
          checked={isFolder}
          onChange={(e) => setIsFolder(e.target.checked)}
        />
      </Form.Group>
      <Button variant="primary" onClick={createFileOrFolder}>Create</Button>{' '}
      <Button variant="info" onClick={listFiles}>List Files</Button>
      {files.length > 0 && (
        <ListGroup>
          {files.map((fileName, index) => (
            <ListGroup.Item
              key={index}
              action
              active={selectedFile === fileName}
              onClick={() => readFileContent(fileName)}
              className="file-item"
            >
              {fileName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default FileFolder;
