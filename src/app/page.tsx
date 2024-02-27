"use client"
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Editor from "@/components/Editor";
import FileFolder from "@/components/FileFolder";
import TerminalController from "@/components/Terminal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  // State to hold the file content
  const [fileContent, setFileContent] = useState('');

  // Function to update the file content
  const updateFileContent = (content:string) => {
    setFileContent(content);
  };

  return (
    <Container fluid style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Row style={{ flex: 1 }}>
        {/* FileFolder component */}
        <Col sm={3} style={{ borderRight: '1px solid #ccc', height: '100%' }}>
          <FileFolder updateFileContent={updateFileContent} />
        </Col>

        {/* Editor component */}
        <Col sm={9} style={{ height: '100%' }}>
          <Editor fileContent={fileContent} />
        </Col>
      </Row>

    </Container>
  );
}
