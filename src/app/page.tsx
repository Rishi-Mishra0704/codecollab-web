"use client";
import React, { useState } from 'react';
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
    <>
      {/* Pass updateFileContent function as a prop to FileFolder */}
      <FileFolder updateFileContent={updateFileContent} />
      {/* Pass fileContent as a prop to Editor */}
      <Editor fileContent={fileContent} />
      <TerminalController />
    </>
  );
}
