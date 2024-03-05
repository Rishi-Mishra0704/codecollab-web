"use client"
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CodeEditor from "@/components/Editor";
import FileFolder from "@/components/FileFolder";
import "bootstrap/dist/css/bootstrap.min.css";
import Video from "@/components/video";

export default function Home() {
  // State to hold the file content
  const [fileContent, setFileContent] = useState("");
  const [fileExtension, setFileExtension] = useState("");

  // Function to update the file content and extension
  const updateFileContent = (content: string, extension: string) => {
    setFileContent(content);
    setFileExtension(extension);
  };

  return (
    <Container
      fluid
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Row style={{ flex: 1 }}>
        {/* FileFolder component */}
        <Col sm={3} style={{ borderRight: "1px solid #ccc", height: "100%" }}>
          <FileFolder updateFileContent={updateFileContent} />
        </Col>

        {/* CodeEditor and Video components */}
        <Col sm={9} style={{ height: "100%" }}>
          <Row>
            <Col sm={9}>
              <CodeEditor
                fileContent={fileContent}
                fileExtension={fileExtension}
                className="w-100" 
              />
            </Col>
            <Col sm={3}>
              <Video />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
