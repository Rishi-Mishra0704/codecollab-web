import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import AceEditor from "react-ace";
import {supportedLanguages,supportedThemes} from "../utils/imports"

interface EditorProps {
  fileContent: string;
}


const CodeEditor: React.FC<EditorProps> = ({ fileContent }) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("monokai");
  const [code, setCode] = useState<string>("");

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    setCode(code);

    // Connect to WebSocket server
    ws.current = new WebSocket("ws://localhost:8000/ws");

    // Set up event listeners
    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Update local state with new code received from the server
      setCode(message.content);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    // Clean up WebSocket connection
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const selectedLanguageLabel =
    supportedLanguages.find((lang) => lang.value === language)?.label ||
    "Select Language";
  const selectedThemeLabel =
    supportedThemes.find((t) => t.value === theme)?.label || "Select Theme";


  const handleCodeChange = (newCode: string) => {
    // Send code changes to WebSocket server
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        username: "user123", // Set username as needed
        content: newCode,
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  return (
    <Container fluid>
      <Row className="mt-3">
      <Col>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="language-dropdown">
            {selectedLanguageLabel}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {supportedLanguages.map((lang) => (
              <Dropdown.Item
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
              >
                {lang.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col>
        <Dropdown className="ml-3">
          <Dropdown.Toggle variant="primary" id="theme-dropdown">
            {selectedThemeLabel}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {supportedThemes.map((theme) => (
              <Dropdown.Item
                key={theme.value}
                onClick={() => setTheme(theme.value)}
              >
                {theme.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>

      <Row className="mt-3">
        <Col>
          <AceEditor
            mode={language}
            theme={theme}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            showGutter={true}
            fontSize={16}
            value={code !== "" ? code : fileContent}
            onChange={handleCodeChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;
