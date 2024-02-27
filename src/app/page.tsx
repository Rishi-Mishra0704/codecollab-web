"use client"
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CodeEditor from "@/components/Editor";
import FileFolder from "@/components/FileFolder";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  // State to hold the file content
  const [fileContent, setFileContent] = useState('');
  const [fileExtension, setFileExtension] = useState('');

  // Function to update the file content and extension
  const updateFileContent = (content: string, extension: string) => {
    setFileContent(content);
    setFileExtension(extension);
  };

  return (
    <Container fluid style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Row style={{ flex: 1 }}>
        {/* FileFolder component */}
        <Col sm={3} style={{ borderRight: '1px solid #ccc', height: '100%' }}>
          <FileFolder updateFileContent={updateFileContent} />
        </Col>

        {/* CodeEditor component */}
        <Col sm={9} style={{ height: '100%' }}>
          <CodeEditor fileContent={fileContent} fileExtension={fileExtension} />
        </Col>
      </Row>
    </Container>
  );
}
